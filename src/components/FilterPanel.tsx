"use client";

interface Filters {
  type: string;
  state: string;
  minRating: string;
  maxFees: string;
  sortBy: string;
}

export default function FilterPanel({ filters, onChange }: { filters: Filters; onChange: (f: Filters) => void }) {
  const update = (key: keyof Filters, value: string) => onChange({ ...filters, [key]: value });

  const selectClass = "w-full bg-[#111118] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-violet-500/50 transition-all";

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-zinc-500 mb-1.5 block uppercase tracking-wider">Sort By</label>
        <select className={selectClass} value={filters.sortBy} onChange={(e) => update("sortBy", e.target.value)}>
          <option value="rating">Top Rated</option>
          <option value="nirf">NIRF Rank</option>
          <option value="fees_asc">Fees: Low to High</option>
          <option value="fees_desc">Fees: High to Low</option>
        </select>
      </div>

      <div>
        <label className="text-xs text-zinc-500 mb-1.5 block uppercase tracking-wider">College Type</label>
        <select className={selectClass} value={filters.type} onChange={(e) => update("type", e.target.value)}>
          <option value="">All Types</option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
          <option value="Deemed">Deemed</option>
        </select>
      </div>

      <div>
        <label className="text-xs text-zinc-500 mb-1.5 block uppercase tracking-wider">State</label>
        <input
          type="text"
          placeholder="e.g. Maharashtra"
          className={selectClass}
          value={filters.state}
          onChange={(e) => update("state", e.target.value)}
        />
      </div>

      <div>
        <label className="text-xs text-zinc-500 mb-1.5 block uppercase tracking-wider">Min Rating</label>
        <select className={selectClass} value={filters.minRating} onChange={(e) => update("minRating", e.target.value)}>
          <option value="0">Any Rating</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
        </select>
      </div>

      <div>
        <label className="text-xs text-zinc-500 mb-1.5 block uppercase tracking-wider">Max Annual Fees</label>
        <select className={selectClass} value={filters.maxFees} onChange={(e) => update("maxFees", e.target.value)}>
          <option value="10000000">Any Budget</option>
          <option value="200000">Under ₹2L</option>
          <option value="300000">Under ₹3L</option>
          <option value="500000">Under ₹5L</option>
        </select>
      </div>

      <button
        onClick={() => onChange({ type: "", state: "", minRating: "0", maxFees: "10000000", sortBy: "rating" })}
        className="w-full text-xs text-zinc-500 hover:text-violet-400 py-2 transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}