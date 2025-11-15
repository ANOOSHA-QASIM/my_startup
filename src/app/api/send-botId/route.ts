import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { botId } = await req.json();

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK;
    if (!webhookUrl) throw new Error("Webhook URL is not defined in .env");

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ botId }),
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error connecting bot:", error);
    return NextResponse.json({ error: "Failed to connect bot" }, { status: 500 });
  }
}
