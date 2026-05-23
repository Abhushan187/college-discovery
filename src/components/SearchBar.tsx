"use client";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search colleges, cities, states..."
        className="w-full bg-[#111118] border border-white/10 rounded-xl pl-11 pr-10 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
      />
      {value && (
        <button onClick={() => onChange("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
          <X size={14} />
        </button>
      )}
    </div>
  );
}