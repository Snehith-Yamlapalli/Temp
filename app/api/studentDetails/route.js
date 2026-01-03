export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyIdTokenFromReq } from "@/lib/firebaseAdmin";



export async function POST(req) {
  try {
    // ✅ Read body ONCE
    const body = await req.json();

    // ✅ Verify Firebase token (must NOT read body)
    const decoded = await verifyIdTokenFromReq(req);
    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!decoded.email.endsWith("@student.nitw.ac.in")) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // ✅ Create student (id = roll number)
    const created = await prisma.Student.create({
      data: {
        id: body.rollno,                 // 🔑 PRIMARY KEY
        instituteEmail: body.email,
        name: body.name,
        branch: body.branch,
        degree: body.degree,
        batch: body.batch,
        CGPA: null,
        cgpaVerified: false,
        InternApply: false,
        InternOffer: false,
        FTEApply: false,
        FTEOffer: false,
      },
    });

    return NextResponse.json(created, { status: 201 });

  } catch (err) {
    console.error("POST /api/studentDetails error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
