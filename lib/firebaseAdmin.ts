// lib/firebaseAdmin.ts
import admin from "firebase-admin";

if (!admin.apps.length) {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT env missing");

  // raw is a string (single-line JSON). Parse it.
  const parsed = JSON.parse(raw as string);

  // If private_key contains escaped newlines (\n), convert them to actual newlines
  if (parsed.private_key && parsed.private_key.includes("\\n")) {
    parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
  }

  admin.initializeApp({
    credential: admin.credential.cert(parsed as admin.ServiceAccount),
  });
}

export const adminDb = admin.firestore();
