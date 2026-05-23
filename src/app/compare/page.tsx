"use client";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Update the interface to match your actual API response structure
interface College { 
  id: string; 
  name: string; 
  fees: number; 
  rating: number; 
  placements: { placementRate: number } | null;
}

export default function ComparePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [c1, setC1] = useState<string>("");
  const [c2, setC2] = useState<string>("");

  useEffect(() => {
    fetch("/api/colleges?limit=50")
      .then(res => res.json())
      .then(data => setColleges(data.colleges || []));
  }, []);

  const data1 = colleges.find(c => c.id === c1);
  const data2 = colleges.find(c => c.id === c2);

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <Link href="/colleges" className="text-zinc-500 hover:text-white mb-6 block flex items-center gap-2">
        <ArrowLeft size={16} /> Back to colleges
      </Link>
      
      <h1 className="text-3xl font-bold text-white mb-8">Compare Colleges</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {[setC1, setC2].map((setter, i) => (
          <select key={i} onChange={(e) => setter(e.target.value)} className="w-full bg-[#0d0f1a] border border-white/10 p-3 rounded-xl text-white outline-none focus:border-violet-500/40">
            <option value="">Select College {i + 1}</option>
            {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        ))}
      </div>

      {(data1 && data2) && (
        <div className="bg-[#0d0f1a] border border-white/10 rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-zinc-300">
            <thead className="border-b border-white/10 bg-white/5">
              <tr><th className="p-4">Feature</th><th className="p-4 text-white">{data1.name}</th><th className="p-4 text-white">{data2.name}</th></tr>
            </thead>
            <tbody>
              {[
                { label: "Fees", val1: `₹${(data1.fees/100000).toFixed(1)}L`, val2: `₹${(data2.fees/100000).toFixed(1)}L` },
                { label: "Rating", val1: data1.rating, val2: data2.rating },
                { label: "Placement", val1: `${data1.placements?.placementRate || 0}%`, val2: `${data2.placements?.placementRate || 0}%` },
              ].map((row) => (
                <tr key={row.label} className="border-b border-white/5">
                  <td className="p-4 font-semibold text-violet-400">{row.label}</td>
                  <td className="p-4">{row.val1}</td>
                  <td className="p-4">{row.val2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}