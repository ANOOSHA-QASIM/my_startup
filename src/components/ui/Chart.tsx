"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

const THEMES = { light: "", dark: ".dark" } as const;

// Config type for each chart item
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

// Context to share chart config
type ChartContextProps = { config: ChartConfig };
const ChartContext = React.createContext<ChartContextProps | null>(null);

// Custom hook to access chart context
function useChart() {
  const context = React.useContext(ChartContext);
  if (!context)
    throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

// Main chart container
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground ...",
          className
        )}
        {...props}
      >
        {/* Inject CSS variables based on config */}
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

// Generate CSS variables for colors/themes
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, cfg]) => cfg.theme || cfg.color
  );
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

// Default Recharts Tooltip
const ChartTooltip = RechartsPrimitive.Tooltip;

// Custom tooltip content
const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  any & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  }
>((props: any, ref) => {
  const { config } = useChart();
  const {
    active,
    payload,
    hideLabel = false,
    hideIndicator = false,
    indicator = "dot",
    label,
    labelKey,
    nameKey,
  } = props;

  if (!active || !Array.isArray(payload) || payload.length === 0) return null;

  // Determine label to show
  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !Array.isArray(payload) || payload.length === 0)
      return null;
    const [item] = payload as any[];
    const key = `${labelKey || item.dataKey || item.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label;
    if (!value) return null;
    return <div className="font-medium">{value}</div>;
  }, [payload, hideLabel, label, labelKey, config]);

  return (
    <div
      ref={ref}
      className="grid min-w-[8rem] items-start gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl"
    >
      {!tooltipLabel ? null : tooltipLabel}
      {/* Render payload items */}
      {(payload as any[]).map((item: any, index: number) => {
        const key = `${nameKey || item.name || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        const indicatorColor = item.color || item.payload.fill;
        return (
          <div
            key={item.dataKey}
            className="flex w-full flex-wrap items-stretch gap-2"
          >
            {!hideIndicator && (
              <div
                className="h-2.5 w-2.5 rounded-[2px]"
                style={{ backgroundColor: indicatorColor }}
              />
            )}
            <div className="flex flex-1 justify-between leading-none">
              <span>{itemConfig?.label || item.name}</span>
              {item.value && <span>{item.value.toLocaleString()}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltipContent";

// Default Recharts Legend
const ChartLegend = RechartsPrimitive.Legend;

// Custom legend content
const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    payload?: RechartsPrimitive.LegendPayload[];
    verticalAlign?: RechartsPrimitive.LegendProps["verticalAlign"];
  } & { hideIcon?: boolean; nameKey?: string }
>((props, ref) => {
  const { config } = useChart();
  const {
    payload,
    hideIcon = false,
    verticalAlign = "bottom",
    nameKey,
    className,
  } = props;
  if (!payload?.length) return null;

  return (
    <div
      ref={ref}
      className={`flex items-center justify-center gap-4 ${
        verticalAlign === "top" ? "pb-3" : "pt-3"
      } ${className}`}
    >
      {payload.map((item: RechartsPrimitive.LegendPayload) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return (
          <div key={item.value} className="flex items-center gap-1.5">
            {!hideIcon && itemConfig?.icon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegendContent";

// Helper: get config for a given payload item
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) return undefined;
  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object"
      ? payload.payload
      : undefined;
  let configLabelKey = key;
  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }
  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  useChart,
};
