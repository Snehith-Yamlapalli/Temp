// app/api/FTEP/[id]/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyIdTokenFromReq } from "@/lib/firebaseAdmin";

async function getParams(context) {
  // context can be a Promise-like in this Next version — await it.
  const ctx = await context;
  return ctx.params || {};
}

export async function GET(req, context) {
  const { id } = await getParams(context);
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  try {
    const p = await prisma.FTEP.findUnique({ where: { id: numericId } });
    if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(p);
  } catch (err) {
    console.error("GET /api/FTE/[id] error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req, context) {
  const { id } = await getParams(context);
 
  const decoded = await verifyIdTokenFromReq(req);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (decoded.email !== "taps@nitw.ac.in") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = await req.json();

    const created = await prisma.FTEP.create({
      data: {
        name: body.name,
        role: body.role,
        company:body.company,
        degree:body.degree,
        branch:body.branch,
        rollno:body.rollno,
        year:body.year
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST /api/FTE/[id] error:", err);
    return NextResponse.json({ error: "DB update error" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  const { id } = await getParams(context);
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const decoded = await verifyIdTokenFromReq(req);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (decoded.email !== "taps@nitw.ac.in") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    await prisma.FTEP.delete({ where: { id: numericId } });
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/FTE/[id] error:", err);
    return NextResponse.json({ error: "DB delete error" }, { status: 500 });
  }
}
