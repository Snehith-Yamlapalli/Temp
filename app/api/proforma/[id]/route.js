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
    const p = await prisma.proformaN.findUnique({ where: { id: numericId } });
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

    const updated = await prisma.proformaN.update({
      where: { id: numericId },
      data: {
        companyName: body.companyName,
        CompanyCategory:body.CompanyCategory,
        jobRole: body.jobRole,
        profile:body.profile,
        Location:body.Location,
        CTC:body.CTC,
        CTCBase:body.CTCBase,
        CTCStocks:body.CTCStocks !== undefined && body.CTCStocks !== ""? Number(body.CTCStocks): null,
        CTCSignOn:body.CTCSignOn !== undefined && body.CTCSignOn !== ""? Number(body.CTCSignOn): null,
        CTCReLoc:body.CTCReLoc !== undefined && body.CTCReLoc !== ""? Number(body.CTCReLoc): null,
        CTCOth:body.CTCOth !== undefined && body.CTCOth !== ""? Number(body.CTCOth): null,
        Internship:body.Internship,
       Internshipstipend:body.Internshipstipend !== undefined && body.Internshipstipend !== ""? Number(body.Internshipstipend): null,
        DriveMode: body.DriveMode,
        cgpaCutoff: body.cgpaCutoff !== undefined && body.cgpaCutoff !== null ? Number(body.cgpaCutoff) : null,
        eligibleBatch: body.Batch,
        eligibleBranches: Array.isArray(body.eligibleBranches) ? body.eligibleBranches : (body.eligibleBranches ? [body.eligibleBranches] : []),
        DriveDates:Array.isArray(body.DriveDates) ? body.DriveDates : (body.DriveDates ? [body.DriveDates] : []),
        round1:body.round1,
        round2:body.round2,
        round3:body.round3,
        round4:body.round4,
        Deadline:body.Deadline ? new Date(body.Deadline) : null,
        Spoc: body.Spoc|| null,
        SpocCont:body.SpocCont,
        DescriptionUrl: body.DescriptionUrl || null,
        DescriptionKey: body.DescriptionKey || null,
        DescriptionName: body.DescriptionName || null,
        DescriptionSize: body.DescriptionSize ? Number(body.DescriptionSize) : null,
        DescriptionMime: body.DescriptionMime || null,
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
    await prisma.proformaN.delete({ where: { id: numericId } });
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/proforma/[id] error:", err);
    return NextResponse.json({ error: "DB delete error" }, { status: 500 });
  }
}
