import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const saved = await prisma.savedCollege.findMany({
    where: { userId: session.user.id },
    include: { college: { include: { placements: true } } },
    orderBy: { savedAt: "desc" },
  });

  return NextResponse.json(saved);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { collegeId } = await req.json();
  if (!collegeId) return NextResponse.json({ error: "collegeId required" }, { status: 400 });

  const existing = await prisma.savedCollege.findUnique({
    where: { userId_collegeId: { userId: session.user.id, collegeId } },
  });

  if (existing) {
    await prisma.savedCollege.delete({ where: { id: existing.id } });
    return NextResponse.json({ saved: false });
  }

  await prisma.savedCollege.create({
    data: { userId: session.user.id, collegeId },
  });
  return NextResponse.json({ saved: true });
}