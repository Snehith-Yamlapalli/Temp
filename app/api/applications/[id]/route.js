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
    const p = await prisma.Application.findUnique({ where: { id: numericId } });
    if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(p);
  } catch (err) {
    console.error("GET /api/applications/[id] error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}


export async function POST(req,context) {
     const { Id } = await getParams(context);
     const numericId = Number(Id);
  if (Number.isNaN(numericId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });


  try {
    const decoded = await verifyIdTokenFromReq(req);
    if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (decoded.email !== "taps@nitw.ac.in") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    console.log(`Body is ${body}`)
    // basic validation
    if (!body.studentId || !body.profileId || !body.resumeUrlAtApply) {
      return NextResponse.json({ error: "companyName, jobRole and DriveMode required" }, { status: 400 });
    }


    const created = await prisma.Application.create({
      data: {
        id: body.id,
        studentId:body.studentId,
        profileId: body.profileId,
        status:body.status,
        appliedAt:body.appliedAt,
        branchAtApply:body.branchAtApply,
        degreeAtApply:body.degreeAtApply,
        batchAtApply:body.batchAtApply,
        resumeUrlAtApply:body.resumeUrlAtApply,
        },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(`POST /api/appications/${Id} error:`, err);
    return NextResponse.json({ error: "DB create error" }, { status: 500 });
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

    const updated = await prisma.Application.update({
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
        jobDescriptionUrl: body.jobDescriptionUrl || null,
        jobDescriptionKey: body.jobDescriptionKey || null,
        jobDescriptionName: body.jobDescriptionName || null,
        jobDescriptionSize: body.jobDescriptionSize ? Number(body.jobDescriptionSize) : null,
        jobDescriptionMime: body.jobDescriptionMime || null,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/applications/[id] error:", err);
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
    await prisma.Application.delete({ where: { id: numericId } });
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/proforma/[id] error:", err);
    return NextResponse.json({ error: "DB delete error" }, { status: 500 });
  }
}
