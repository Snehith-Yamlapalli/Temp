// app/api/proforma/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyIdTokenFromReq } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const list = await prisma.proformaN.findMany({ orderBy: { createdAt: "asc" } });
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


    const created = await prisma.proformaN.create({
      data: {
        companyName: body.companyName,
        CompanyCategory: body.CompanyCategory,
        jobRole: body.jobRole,
        profile: body.profile,
        Location: Array.isArray(body.Location) ? body.Location : (body.Location ? [body.Location] : []),
        CTC: body.CTC,
        CTCBase: body.CTCBase,
        CTCStocks: body.CTCStocks,
        CTCSignOn: body.CTCSignOn,
        CTCReLoc: body.CTCReLoc,
        CTCOth: body.CTCOth,
        Internship: body.Internship,
        Internshipstipend: body.Internshipstipend,
        DriveMode: body.DriveMode,
        cgpaCutoff: body.cgpaCutoff !== undefined && body.cgpaCutoff !== null ? Number(body.cgpaCutoff) : null,
        eligibleBatch: body.Batch,
        eligibleBranches: Array.isArray(body.eligibleBranches) ? body.eligibleBranches : (body.eligibleBranches ? [body.eligibleBranches] : []),
        DriveDates: Array.isArray(body.DriveDates) ? body.DriveDates : (body.DriveDates ? [body.DriveDates] : []),
        round1: body.round1,
        round2: body.round2,
        round3: body.round3,
        round4: body.round4,
        Deadline: body.Deadline ? new Date(body.Deadline) : null,
        Spoc: body.Spoc || null,
        SpocCont: body.SpocCont,
        DescriptionUrl: body.DescriptionUrl || null,
        DescriptionKey: body.DescriptionKey || null,
        DescriptionName: body.DescriptionName || null,
        DescriptionSize: body.DescriptionSize ? Number(body.DescriptionSize) : null,
        DescriptionMime: body.DescriptionMime || null,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST /api/proforma error:", err);
    return NextResponse.json({ error: "DB create error" }, { status: 500 });
  }
}
