// app/api/CVuploads/presign/route.js
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
async function getParams(context) {
  // context can be a Promise-like in this Next version — await it.
  const ctx = await context;
  return ctx.params || {};
}
export async function POST(req, context) {
  const { id } = await getParams(context);
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File missing" }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: "public",
      contentType: file.type || "application/pdf",
    });

    console.log("blob went good")
    return NextResponse.json({
      [`CV${id}Url`]: blob.url,
      [`CV${id}Key`]: blob.pathname,
      [`CV${id}Name`]: file.name,
      [`CV${id}Size`]: file.size,
      [`CV${id}Mime`]: file.type,
    });
  } catch (err) {
    console.error("Blob upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
