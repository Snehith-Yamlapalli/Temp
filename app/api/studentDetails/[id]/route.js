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
    const params = await context.params; // params is async
    const rollno = params.id;            // ✅ id → rollno

    
    try {
        const student = await prisma.Student.findUnique({
            where: { id: rollno },
        });

        if (!student) {
            return NextResponse.json(
                { error: "Not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(student, { status: 200 });

    } catch (err) {
        console.error("GET /api/studentDetails/[id] error:", err);
        return NextResponse.json(
            { error: "DB error" },
            { status: 500 }
        );
    }
}

export async function PUT(req, {params}) {
    try {
        const { id } = await params;
        const body = await req.json();
        const CGPA = body.cgpa;

        // 1️⃣ Basic validation
        if (CGPA === undefined || CGPA === null) {
            return NextResponse.json(
                { error: "CGPA is required" },
                { status: 400 }
            );
        }

        const cgpaValue = Number(CGPA);

        if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
            return NextResponse.json(
                { error: "Invalid CGPA value" },
                { status: 400 }
            );
        }

        // round to 2 decimals
        const roundedCGPA = Math.round(cgpaValue * 100) / 100;

        // 2️⃣ Find student
        const student = await prisma.student.findUnique({
            where: { id: id },
        });

        if (!student) {
            return NextResponse.json(
                { error: "Student not found" },
                { status: 404 }
            );
        }

        // 3️⃣ Prevent second update
        if (student.cgpastudentupdate) {
            return NextResponse.json(
                { error: "CGPA already updated once" },
                { status: 403 }
            );
        }

        // 4️⃣ Update CGPA and lock it
        const updatedStudent = await prisma.student.update({
            where: { id: id },
            data: {
                CGPA: roundedCGPA,
                cgpastudentupdate: true,
            },
        });

        return NextResponse.json(
            { message: "CGPA updated successfully", student: updatedStudent },
            { status: 200 }
        );
    } catch (error) {
        console.error("CGPA update error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
