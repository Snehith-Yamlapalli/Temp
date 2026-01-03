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
  console.log("ROLL NO IS ", id)


  try {
    const p = await prisma.Application.findMany({ where: { studentId: id } });
    if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(p);
  } catch (err) {
    console.error("GET /api/applications/[id] error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}


export async function POST(req, context) {
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
        studentId: body.studentId,
        profileId: body.profileId,
        status: body.status,
        appliedAt: body.appliedAt,
        branchAtApply: body.branchAtApply,
        degreeAtApply: body.degreeAtApply,
        batchAtApply: body.batchAtApply,
        resumeUrlAtApply: body.resumeUrlAtApply,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(`POST /api/appications/${Id} error:`, err);
    return NextResponse.json({ error: "DB create error" }, { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  try {
    const { id } = await params; // applicationId
    if (!id) {
      return NextResponse.json(
        { error: "Application id required" },
        { status: 400 }
      );
    }

    // Optional: check if application exists
    const existing = await prisma.Application.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    await prisma.Application.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Application cancelled successfully" },
      { status: 200 }
    );

  } catch (err) {
    console.error("DELETE application error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
