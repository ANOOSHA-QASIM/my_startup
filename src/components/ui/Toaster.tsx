"use client"; // client-side component

import { useToast } from "@/hooks/use-toasts";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/Toast";

// Toaster component to render all toasts
export function Toaster() {
  const { toasts } = useToast(); // get toasts from hook

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          {/* Toast content */}
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose /> {/* Close button */}
        </Toast>
      ))}
      <ToastViewport /> {/* Container for toasts */}
    </ToastProvider>
  );
}
