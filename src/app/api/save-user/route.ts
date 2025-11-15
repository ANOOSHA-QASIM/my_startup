import { NextResponse } from "next/server";
import { adminDb } from "@/../lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    await adminDb.collection("businesses").add({
      ...data,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error saving data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
