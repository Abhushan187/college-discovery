"use client";
import { useState, useEffect, useCallback } from "react";
import CollegeCard from "@/components/CollegeCard";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useSession } from "next-auth/react";

interface College {
  id: string; name: string; location: string; type: string;
  fees: number; rating: number; naac: string | null; nirf: number | null;
  imageUrl: string | null;
  placements: { avgPackage: number; placementRate: number } | null;
}

const FILTER_ROWS = [
  { label: "Sort By",    key: "sortBy",    opts: [["rating","Top Rated"],["nirf","NIRF Rank"],["fees_asc","Fees ↑"],["fees_desc","Fees ↓"]] },
  { label: "Type",       key: "type",      opts: [["","All Types"],["Government","Government"],["Private","Private"],["Deemed","Deemed"]] },
  { label: "Min Rating", key: "minRating", opts: [["0","Any"],["3","3+"],["4","4+"],["4.5","4.5+"]] },
  { label: "Max Fees",   key: "maxFees",   opts: [["10000000","Any"],["200000","< ₹2L"],["300000","< ₹3L"],["500000","< ₹5L"]] },
] as const;

const DEFAULT_FILTERS = { type: "", state: "", minRating: "0", maxFees: "10000000", sortBy: "rating" };

export default function CollegesPage() {
  const { data: session } = useSession();
  const [colleges, setColleges] = useState<College[]>([]);
  const [total, setTotal]       = useState(0);
  const [pages, setPages]       = useState(1);
  const [page, setPage]         = useState(1);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [filters, setFilters]   = useState(DEFAULT_FILTERS);

  const upd = (k: string, v: string) => setFilters(p => ({ ...p, [k]: v }));

  const fetchColleges = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ search, page: String(page), ...filters });
    const res  = await fetch(`/api/colleges?${params}`);
    const data = await res.json();
    setColleges(data.colleges ?? []);
    setTotal(data.total   ?? 0);
    setPages(data.pages   ?? 1);
    setLoading(false);
  }, [search, page, filters]);

  useEffect(() => {
    const t = setTimeout(fetchColleges, 300);
    return () => clearTimeout(t);
  }, [fetchColleges]);

  useEffect(() => { setPage(1); }, [search, filters]);

  useEffect(() => {
    if (!session) return;
    fetch("/api/saved")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setSavedIds(new Set(d.map((s: any) => s.collegeId))); });
  }, [session]);

  return (
    <div className="w-full py-10" style={{ padding: "40px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-white">Explore Colleges</h1>
          <p className="mt-1 text-sm text-zinc-500">{total} colleges found</p>
        </div>

        {/* Search + filter toggle */}
        <div className="mb-8 flex w-full items-center gap-3">
          <div className="relative flex-1">
            <Search size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search colleges, cities, states..."
              className="w-full rounded-xl border border-white/10 bg-[#0d0f1a] py-3 pl-11 pr-10 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-violet-500/40"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(p => !p)}
            className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all
              ${showFilters
                ? "border-violet-500/30 bg-violet-500/15 text-violet-300"
                : "border-white/10 bg-[#0d0f1a] text-zinc-400 hover:text-white"}`}
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
        </div>

        {/* Sidebar + Grid */}
        <div className="flex items-start gap-6">

          {/* Filter sidebar */}
          {showFilters && (
            <aside className="w-52 shrink-0">
              <div className="rounded-2xl border border-white/[0.07] bg-[#0d0f1a] p-5">
                <h2 className="mb-4 text-sm font-semibold text-white">Filters</h2>
                <div className="space-y-4">
                  {FILTER_ROWS.map(f => (
                    <div key={f.key}>
                      <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-zinc-600">
                        {f.label}
                      </label>
                      <select
                        value={(filters as any)[f.key]}
                        onChange={e => upd(f.key, e.target.value)}
                        className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#07080f] px-3 py-2.5 text-sm text-zinc-300 outline-none"
                      >
                        {f.opts.map(([v, l]) => (
                          <option key={v} value={v}>{l}</option>
                        ))}
                      </select>
                    </div>
                  ))}

                  <div>
                    <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-zinc-600">State</label>
                    <input
                      placeholder="e.g. Maharashtra"
                      value={filters.state}
                      onChange={e => upd("state", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#07080f] px-3 py-2.5 text-sm text-zinc-300 placeholder-zinc-700 outline-none"
                    />
                  </div>

                  <button
                    onClick={() => setFilters(DEFAULT_FILTERS)}
                    className="w-full cursor-pointer py-1.5 text-xs text-zinc-600 transition-colors hover:text-violet-400"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </aside>
          )}

          {/* Grid */}
          <div className="min-w-0 flex-1">
            {loading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="skeleton h-80 rounded-2xl" />
                ))}
              </div>
            ) : colleges.length === 0 ? (
              <div className="py-24 text-center">
                <p className="mb-3 text-5xl">🔍</p>
                <p className="text-zinc-500">No colleges found. Try different filters.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {colleges.map(c => (
                    <CollegeCard key={c.id} college={c} isSaved={savedIds.has(c.id)} />
                  ))}
                </div>

                {pages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition-all
                          ${p === page
                            ? "bg-violet-600 text-white"
                            : "border border-white/10 bg-[#0d0f1a] text-zinc-500 hover:text-white"}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}