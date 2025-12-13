// app/api/uploads/presign/route.js
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File missing" }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: "public",
      contentType: file.type || "application/pdf",
      addRandomSuffix: true,   // ✅ THIS FIXES THE ERROR
    });


    return NextResponse.json({
      jobDescriptionUrl: blob.url,
      jobDescriptionKey: blob.pathname,
      jobDescriptionName: file.name,
      jobDescriptionSize: file.size,
      jobDescriptionMime: file.type,
    });
  } catch (err) {
    console.error("Blob upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
