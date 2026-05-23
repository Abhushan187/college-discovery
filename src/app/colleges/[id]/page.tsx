import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// The context type must explicitly declare params as a Promise for Next.js 16
export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Await the params to resolve the ID
  const { id } = await context.params;

  const college = await prisma.college.findUnique({
    where: { id },
    include: { 
      courses: true, 
      placements: true 
    },
  });

  if (!college) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(college);
}