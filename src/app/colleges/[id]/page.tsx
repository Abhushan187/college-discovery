import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCollegeImage } from "@/lib/college-images";
import Link from "next/link";
import { MapPin, Star, Calendar, TrendingUp, BookOpen, ArrowLeft } from "lucide-react";

export default async function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = await prisma.college.findUnique({
    where: { id },
    include: { courses: true, placements: true },
  });

  if (!college) notFound();
  
  const p = college.placements;
  const imgSrc = getCollegeImage(college.id);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link href="/colleges" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors mb-6 no-underline">
        <ArrowLeft size={14} /> Back to colleges
      </Link>

      <div className="relative h-72 rounded-2xl overflow-hidden bg-[#12141f] mb-7">
        <img src={imgSrc} alt={college.name} className="w-full h-full object-cover" />
      </div>
      
      <h1 className="text-3xl font-bold text-white mb-2">{college.name}</h1>
      <p className="flex items-center gap-1.5 text-zinc-400 text-sm mb-8">
        <MapPin size={13} /> {college.location}
      </p>

      {/* Courses Section */}
      <div className="bg-[#0d0f1a] border border-white/[0.07] rounded-xl p-6">
        <h2 className="text-[15px] font-semibold text-white mb-5 flex items-center gap-2">
          <BookOpen size={15} className="text-blue-400" /> Courses Offered
        </h2>
        <div className="space-y-3">
          {college.courses.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <div>
                <div className="text-sm font-medium text-white">{c.name}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{c.duration} years · {c.seats} seats</div>
              </div>
              <div className="text-sm font-semibold text-emerald-400">
                ₹{(c.fees / 100000).toFixed(1)} L/yr
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}