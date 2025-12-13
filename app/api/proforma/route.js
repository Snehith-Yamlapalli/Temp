// app/api/proforma/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyIdTokenFromReq } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const list = await prisma.proforma.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(list);
  } catch (err) {
    console.error("GET /api/proforma error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const decoded = await verifyIdTokenFromReq(req);
    if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (decoded.email !== "taps@nitw.ac.in") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    console.log(`Body is ${body}`)
    // basic validation
    if (!body.companyName || !body.jobRole || !body.DriveMode) {
      return NextResponse.json({ error: "companyName, jobRole and DriveMode required" }, { status: 400 });
    }


    const created = await prisma.proforma.create({
      data: {
        companyName: body.companyName,
        jobRole: body.jobRole,
        driveMode: body.DriveMode,
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

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST /api/proforma error:", err);
    return NextResponse.json({ error: "DB create error" }, { status: 500 });
  }
}
