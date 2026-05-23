import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const college = await prisma.college.findUnique({
    where: { id: params.id },
    include: { courses: true, placements: true },
  });

  if (!college) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(college);
}