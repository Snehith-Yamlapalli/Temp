// app/api/proformauploads/presign/route.js
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

    console.log("blob went good")
    return NextResponse.json({
      DescriptionUrl: blob.url,
      DescriptionKey: blob.pathname,
      DescriptionName: file.name,
      DescriptionSize: file.size,
      DescriptionMime: file.type,
    });
  } catch (err) {
    console.error("Blob upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
