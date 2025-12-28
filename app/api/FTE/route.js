export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyIdTokenFromReq } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const list = await prisma.FTEP.findMany({ orderBy: { createdAt: "asc" } });
    return NextResponse.json(list);
  } catch (err) {
    console.error("GET /api/FTE error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}