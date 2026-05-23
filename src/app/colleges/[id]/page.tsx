import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCollegeImage } from "@/lib/college-images";
import { MapPin, Star, Calendar, TrendingUp, BookOpen, ArrowLeft } from "lucide-react";

export default async function CollegeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const college = await prisma.college.findUnique({
    where: { id: params.id },
    include: { courses: true, placements: true },
  });
  if (!college) notFound();

  const p = college.placements;
  const imgSrc = getCollegeImage(college.id);

  const tags = [
    { label: college.type, cls: "bg-black/60 text-zinc-300 border-white/15" },
    college.naac ? { label: `NAAC ${college.naac}`, cls: "bg-violet-500/25 text-violet-300 border-violet-500/25" } : null,
    college.nirf ? { label: `NIRF #${college.nirf}`, cls: "bg-amber-500/20 text-amber-300 border-amber-500/20" } : null,
  ].filter(Boolean) as { label: string; cls: string }[];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link
        href="/colleges"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors mb-6 no-underline"
      >
        <ArrowLeft size={14} /> Back to colleges
      </Link>

      {/* Hero */}
      <div className="relative h-72 rounded-2xl overflow-hidden bg-[#12141f] mb-7">
        <Image
          src={imgSrc}
          alt={`${college.name} campus`}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080f] via-[#07080f]/30 to-transparent" />
        <div className="absolute bottom-6 left-7">
          <div className="flex gap-2 flex-wrap mb-3">
            {tags.map(t => (
              <span
                key={t.label}
                className={`text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-sm border ${t.cls}`}
              >
                {t.label}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{college.name}</h1>
          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
            <MapPin size={13} /> {college.location}
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { icon: Star, label: "Rating", value: String(college.rating), sub: `${college.totalRatings} reviews`, color: "text-amber-400" },
          { icon: TrendingUp, label: "Annual Fees", value: `₹${(college.fees / 100000).toFixed(1)}L`, sub: "per year", color: "text-emerald-400" },
          { icon: Calendar, label: "Established", value: String(college.established), sub: `${new Date().getFullYear() - college.established} yrs`, color: "text-blue-400" },
        ].map(s => (
          <div key={s.label} className="bg-[#0d0f1a] border border-white/[0.07] rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* About */}
      <div className="bg-[#0d0f1a] border border-white/[0.07] rounded-xl p-6 mb-4">
        <h2 className="text-[15px] font-semibold text-white mb-3">About</h2>
        <p className="text-sm text-zinc-400 leading-relaxed">{college.description}</p>
      </div>

      {/* Placements */}
      {p && (
        <div className="bg-[#0d0f1a] border border-white/[0.07] rounded-xl p-6 mb-4">
          <h2 className="text-[15px] font-semibold text-white mb-5 flex items-center gap-2">
            <TrendingUp size={15} className="text-emerald-400" /> Placements
          </h2>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Avg Package", value: `₹${(p.avgPackage / 100).toFixed(1)} LPA` },
              { label: "Highest Package", value: `₹${(p.highestPackage / 100).toFixed(1)} LPA` },
              { label: "Placement Rate", value: `${p.placementRate}%` },
            ].map(s => (
              <div key={s.label} className="text-center p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                <div className="text-lg font-bold text-emerald-400">{s.value}</div>
                <div className="text-[11px] text-zinc-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-zinc-600 uppercase tracking-wider mb-2">Top Recruiters</p>
          <div className="flex flex-wrap gap-2">
            {p.topRecruiters.split(",").map(r => (
              <span
                key={r}
                className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300"
              >
                {r.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Courses */}
      {college.courses.length > 0 && (
        <div className="bg-[#0d0f1a] border border-white/[0.07] rounded-xl p-6">
          <h2 className="text-[15px] font-semibold text-white mb-5 flex items-center gap-2">
            <BookOpen size={15} className="text-blue-400" /> Courses Offered
          </h2>
          <div className="space-y-3">
            {college.courses.map(c => (
              <div
                key={c.id}
                className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl"
              >
                <div>
                  <p className="text-sm font-medium text-white">{c.name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{c.duration} years · {c.seats} seats</p>
                </div>
                <span className="text-sm font-semibold text-emerald-400">
                  ₹{(c.fees / 100000).toFixed(1)}L/yr
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}