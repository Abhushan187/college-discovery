import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { MapPin, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  const college = await prisma.college.findUnique({
    where: { id },
    include: { courses: true, placements: true },
  });

  if (!college) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-white">
      <Link href="/colleges" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-6">
        <ArrowLeft size={16} /> Back to colleges
      </Link>
      <h1 className="text-4xl font-bold mb-2">{college.name}</h1>
      <p className="flex items-center gap-1.5 text-zinc-400">
        <MapPin size={16} /> {college.location}
      </p>
      {/* Add your detail view content here */}
    </div>
  );
}