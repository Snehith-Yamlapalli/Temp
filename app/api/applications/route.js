export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";                 // ensure this file exports the Prisma client default
import { Prisma } from "@prisma/client";           // for PrismaClientKnownRequestError

export async function GET() {
    try {
        const list = await prisma.application.findMany({
            orderBy: { createdAt: "asc" }
        });
        return NextResponse.json(list);
    } catch (err) {
        console.error("GET /api/Application error:", err);
        return NextResponse.json({ error: "DB Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Body at application is", body);

        if (!body.rollno || !body.companyname || !body.role || !body.profile || !body.cgpa) {
            return NextResponse.json({ error: "Some imp data is not given at input" }, { status: 400 });
        }

        const createdData = await prisma.application.create({
            data: {
                Name: body.name,
                studentId: body.rollno,
                Company: body.companyname,
                role: body.role,
                profile: body.profile,
                branchAtApply: body.branch,
                degreeAtApply: body.degree,
                batchAtApply: body.batch,
                resumeUrlAtApply: body.resume,
                cgpa: body.cgpa,
                ResumeNo: body.num
            }
        });

        return NextResponse.json(createdData, { status: 201 });
    } catch (err) {
        // Prisma duplicate-constraint error
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
        ) {
            return NextResponse.json(
                { error: "You have already applied to this company" },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
