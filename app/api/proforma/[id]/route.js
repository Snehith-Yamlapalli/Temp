// app/api/proforma/[id]/route.js
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
    const p = await prisma.proforma.findUnique({ where: { id: numericId } });
    if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(p);
  } catch (err) {
    console.error("GET /api/proforma/[id] error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function PUT(req, context) {
  const { id } = await getParams(context);
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const decoded = await verifyIdTokenFromReq(req);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (decoded.email !== "taps@nitw.ac.in") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = await req.json();

    const updated = await prisma.proforma.update({
      where: { id: numericId },
      data: {
        companyName: body.companyName,
        jobRole: body.jobRole,
        driveMode: body.driveMode,
        cgpaCutoff: body.cgpaCutoff !== undefined && body.cgpaCutoff !== null ? Number(body.cgpaCutoff) : null,
        tentativeLocation: body.tentativeLocation || null,
        ctcBreakup: body.ctcBreakup || null,
        eligibleBatch: Array.isArray(body.eligibleBatch) ? body.eligibleBatch : (body.eligibleBatch ? [body.eligibleBatch] : []),
        eligibleBranches: Array.isArray(body.eligibleBranches) ? body.eligibleBranches : (body.eligibleBranches ? [body.eligibleBranches] : []),
        driveInfo: body.driveInfo || null,
        assessmentDates: Array.isArray(body.assessmentDates) ? body.assessmentDates.map(d => new Date(d)) : [],
        deadlineForForm: body.deadlineForForm ? new Date(body.deadlineForForm) : null,
        spoc: body.spoc || null,
        jobDescriptionUrl: body.jobDescriptionUrl || null,
        jobDescriptionKey: body.jobDescriptionKey || null,
        jobDescriptionName: body.jobDescriptionName || null,
        jobDescriptionSize: body.jobDescriptionSize ? Number(body.jobDescriptionSize) : null,
        jobDescriptionMime: body.jobDescriptionMime || null,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/proforma/[id] error:", err);
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
    await prisma.proforma.delete({ where: { id: numericId } });
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/proforma/[id] error:", err);
    return NextResponse.json({ error: "DB delete error" }, { status: 500 });
  }
}
