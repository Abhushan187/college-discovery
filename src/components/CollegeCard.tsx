"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MapPin, Star, TrendingUp, Bookmark, BookmarkCheck } from "lucide-react";
import { getCollegeImage } from "@/lib/college-images";

export default function CollegeCard({ college, isSaved = false }: any) {
  const { data: session } = useSession();
  const router = useRouter();
  const [saved, setSaved] = useState(isSaved);
  const [loading, setLoading] = useState(false);

  const toggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) return router.push("/login");
    setLoading(true);
    const res = await fetch("/api/saved", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ collegeId: college.id }) });
    const data = await res.json();
    setSaved(data.saved);
    setLoading(false);
  };

  return (
    <Link href={`/colleges/${college.id}`} className="group block no-underline">
      <article className="h-full rounded-2xl border border-white/[0.07] bg-[#0d0f1a] overflow-hidden transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10">
        <div className="relative h-44 overflow-hidden">
          <img src={getCollegeImage(college.id)} alt={college.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
          <button onClick={toggleSave} className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-violet-600 transition-colors">
            {saved ? <BookmarkCheck size={16} className="text-violet-400" /> : <Bookmark size={16} className="text-white" />}
          </button>
        </div>
        <div className="p-5">
          <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">{college.name}</h3>
          <p className="flex items-center gap-1 text-xs text-zinc-500 mb-4"><MapPin size={11} /> {college.location}</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/5 rounded-lg p-2 text-center"><div className="text-xs font-bold text-amber-400">{college.rating}</div><div className="text-[10px] text-zinc-600">Rating</div></div>
            <div className="bg-white/5 rounded-lg p-2 text-center"><div className="text-xs font-bold text-emerald-400">₹{(college.fees/100000).toFixed(1)}L</div><div className="text-[10px] text-zinc-600">Annual</div></div>
            <div className="bg-white/5 rounded-lg p-2 text-center"><div className="text-xs font-bold text-blue-400">{college.placements ? `${(college.placements.avgPackage/100).toFixed(1)}L` : 'N/A'}</div><div className="text-[10px] text-zinc-600">Avg CTC</div></div>
          </div>
        </div>
      </article>
    </Link>
  );
}