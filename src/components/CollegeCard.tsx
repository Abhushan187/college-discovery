"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MapPin, Star, TrendingUp, Bookmark, BookmarkCheck } from "lucide-react";
import { getCollegeImage } from "@/lib/college-images";

interface College {
  id: string;
  name: string;
  location: string;
  type: string;
  fees: number;
  rating: number;
  naac: string | null;
  nirf: number | null;
  imageUrl: string | null;
  placements?: { avgPackage: number; placementRate: number } | null;
}

export default function CollegeCard({
  college,
  isSaved: init = false,
}: {
  college: College;
  isSaved?: boolean;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [saved, setSaved] = useState(init);
  const [saving, setSaving] = useState(false);
  const [imgError, setImgError] = useState(false);

  async function toggleSave(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!session) { router.push("/login"); return; }
    setSaving(true);
    const res = await fetch("/api/saved", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collegeId: college.id }),
    });
    const data = await res.json();
    setSaved(data.saved);
    setSaving(false);
  }

  const imgSrc = getCollegeImage(college.id);
  const avgCtc = college.placements
    ? `${(college.placements.avgPackage / 100).toFixed(1)}L`
    : "—";

  return (
    <Link href={`/colleges/${college.id}`} className="group block no-underline">
      <article className="rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0d0f1a] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10">

        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-[#12141f]">
          {!imgError ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={imgSrc}
              alt={college.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#12141f] to-[#1a1c2e]">
              <span className="font-serif text-5xl text-violet-500/30">
                {college.name.split(" ").filter(w => w.length > 2).slice(0, 2).map(w => w[0]).join("")}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a] via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-zinc-300 backdrop-blur-sm">
              {college.type}
            </span>
            {college.naac && (
              <span className="rounded-full border border-violet-500/25 bg-violet-500/25 px-2.5 py-1 text-[11px] font-medium text-violet-300 backdrop-blur-sm">
                NAAC {college.naac}
              </span>
            )}
          </div>

          {/* Save button */}
          <button
            onClick={toggleSave}
            disabled={saving}
            aria-label={saved ? "Unsave" : "Save"}
            className={`absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border backdrop-blur-sm transition-all disabled:opacity-50
              ${saved
                ? "border-violet-500/40 bg-violet-500/30 text-violet-300"
                : "border-white/15 bg-black/60 text-zinc-400 hover:border-violet-500/30 hover:bg-violet-500/20 hover:text-violet-300"
              }`}
          >
            {saved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="mb-1.5 line-clamp-2 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-violet-300">
            {college.name}
          </h3>
          <div className="mb-4 flex items-center gap-1 text-xs text-zinc-500">
            <MapPin size={11} className="shrink-0" />
            <span className="truncate">{college.location}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5 text-center">
              <div className="mb-0.5 flex items-center justify-center gap-1 text-amber-400">
                <Star size={10} fill="currentColor" />
                <span className="text-xs font-bold">{college.rating}</span>
              </div>
              <div className="text-[10px] text-zinc-600">Rating</div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5 text-center">
              <div className="mb-0.5 text-xs font-bold text-emerald-400">
                ₹{(college.fees / 100000).toFixed(1)}L
              </div>
              <div className="text-[10px] text-zinc-600">Annual</div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5 text-center">
              <div className="mb-0.5 flex items-center justify-center gap-1 text-blue-400">
                <TrendingUp size={10} />
                <span className="text-xs font-bold">{avgCtc}</span>
              </div>
              <div className="text-[10px] text-zinc-600">Avg CTC</div>
            </div>
          </div>

          {college.nirf && (
            <p className="mt-3 text-center text-[11px] text-zinc-700">
              NIRF Rank <span className="font-medium text-zinc-500">#{college.nirf}</span>
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}