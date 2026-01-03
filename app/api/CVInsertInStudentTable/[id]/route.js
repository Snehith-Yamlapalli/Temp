import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
async function getParams(context) {
    // context can be a Promise-like in this Next version — await it.
    const ctx = await context;
    return ctx.params || {};
}
export async function PUT(req, context) {
    try {
        const body = await req.json()
        const rollno = body.rollno
        const num = body.cvnum
        console.log(`rollno is ${rollno} -- ${body.rollno} && cvnum is ${num} -- ${body.cvnum}`)

        const student = await prisma.Student.findUnique({
            where: { id: body.rollno },
        });

        if (!student) {
            return NextResponse.json(
                { error: "Student not found" },
                { status: 404 }
            );
        }

        const updatedStudent = await prisma.Student.update({
            where: { id: body.rollno },
            data: {
                [`CV${num}Url`]: body.DescriptionUrl || null,
                [`CV${num}Key`]: body.DescriptionKey || null,
                [`CV${num}Name`]: body.DescriptionName || null,
            },
        });
        return NextResponse.json(
            { message: "CV updated successfully", student: updatedStudent },
            { status: 200 }
        );
    } catch (error) {
        console.error("CV update error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}