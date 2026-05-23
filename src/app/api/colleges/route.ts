import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const state = searchParams.get("state") || "";
  const minRating = parseFloat(searchParams.get("minRating") || "0");
  const maxFees = parseInt(searchParams.get("maxFees") || "10000000");
  const sortBy = searchParams.get("sortBy") || "rating";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 50;

  const where: any = {
    AND: [
      search ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { city: { contains: search, mode: "insensitive" } },
          { state: { contains: search, mode: "insensitive" } },
        ],
      } : {},
      type ? { type } : {},
      state ? { state: { contains: state, mode: "insensitive" } } : {},
      { rating: { gte: minRating } },
      { fees: { lte: maxFees } },
    ],
  };

  const orderBy: any =
    sortBy === "fees_asc" ? { fees: "asc" }
    : sortBy === "fees_desc" ? { fees: "desc" }
    : sortBy === "nirf" ? { nirf: "asc" }
    : { rating: "desc" };

  const [colleges, total] = await Promise.all([
    prisma.college.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: { placements: true },
    }),
    prisma.college.count({ where }),
  ]);

  return NextResponse.json({ colleges, total, pages: Math.ceil(total / limit), page });
}