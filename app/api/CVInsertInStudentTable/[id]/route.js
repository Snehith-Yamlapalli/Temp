import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req,
  { params }
) {
  try {
    const { id } = params || {};

    if (!id) {
      return NextResponse.json(
        { error: "Missing route parameter id" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const num = body.cvnum;

    const student = await prisma.Student.findUnique({
      where: { id },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    const updatedStudent = await prisma.Student.update({
      where: { id },
      data: {
        [`CV${num}Url`]: body.DescriptionUrl ?? null,
        [`CV${num}Key`]: body.DescriptionKey ?? null,
        [`CV${num}Name`]: body.DescriptionName ?? null,
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
