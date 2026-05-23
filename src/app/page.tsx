import Link from "next/link";
import { ArrowRight, BarChart3, Shield, Search, BookmarkCheck, Zap, MapPin } from "lucide-react";

const stats = [
  { value: "50+",  label: "Top Colleges"    },
  { value: "15+",  label: "States Covered"  },
  { value: "98%",  label: "Data Accuracy"   },
  { value: "10K+", label: "Students Helped" },
];

const features = [
  { icon: BarChart3,     title: "Real Placement Data",    desc: "Actual avg & highest packages, placement rates, and top recruiters — not guesses.",              color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { icon: Shield,        title: "NIRF & NAAC Verified",   desc: "Every college tagged with official govt rankings and accreditation grades so you never guess.",    color: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/20"  },
  { icon: Search,        title: "Smart Filtering",        desc: "Filter by state, type, fees, rating — sort by NIRF rank or placement average instantly.",          color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20"   },
  { icon: BookmarkCheck, title: "Personal Shortlist",     desc: "Save colleges to your profile and build a shortlist you can revisit anytime.",                     color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20"    },
  { icon: Zap,           title: "Instant Results",        desc: "Debounced live search with sub-300ms results. No page reloads, no waiting.",                      color: "text-orange-400",  bg: "bg-orange-500/10",  border: "border-orange-500/20"  },
  { icon: MapPin,        title: "Location Intelligence",  desc: "Filter by state or city, see full addresses and understand regional fee structures at a glance.",  color: "text-pink-400",    bg: "bg-pink-500/10",    border: "border-pink-500/20"    },
];

const steps = [
  { num: "01", title: "Search or Browse",    desc: "Type a college name, city, or state — or browse all 50+ colleges." },
  { num: "02", title: "Filter & Sort",       desc: "Narrow down by type, fees budget, minimum rating, or NIRF rank." },
  { num: "03", title: "Dive Into Details",   desc: "Click any card to see full placement stats, courses, fees, and NAAC grade." },
  { num: "04", title: "Save Your Shortlist", desc: "Bookmark colleges you like. Sign in to persist your list and come back later." },
];

const wrap = { maxWidth: "1200px", margin: "0 auto", padding: "0 24px" };

export default function Home() {
  return (
    <div className="w-full bg-[#07080f]">

      {/* HERO */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute right-10 top-1/3 h-64 w-64 rounded-full bg-indigo-600/8 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-4xl text-center mx-auto">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-400">
            ⭐ India&apos;s most transparent college discovery platform
          </div>

          <h1 className="font-serif mb-6 leading-[1.05] text-[#f1f0ff]"
            style={{ fontSize: "clamp(44px, 8vw, 82px)" }}>
            Stop guessing.<br />
            <em className="not-italic bg-gradient-to-br from-violet-300 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
              Find your college.
            </em>
          </h1>

          <p className="mx-auto mb-10 max-w-xl leading-relaxed text-zinc-500"
            style={{ fontSize: "clamp(16px, 2vw, 19px)" }}>
            Real placement data, verified rankings, and smart filters — everything you need to pick the right college with confidence.
          </p>

          {/* Buttons */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-[15px] font-semibold text-white no-underline transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]"
            >
              Explore All Colleges <ArrowRight size={17} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-[15px] font-medium text-white no-underline transition-all hover:bg-white/10"
            >
              Create Free Account
            </Link>
          </div>

          {/* Stats */}
          <div className="mx-auto grid max-w-md grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map(s => (
              <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 text-center">
                <p className="text-2xl font-bold text-violet-400">{s.value}</p>
                <p className="mt-1 text-[11px] text-zinc-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SCHOLARPATH */}
      <section className="w-full py-28">
        <div style={wrap}>
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-violet-500">Why ScholarPath</p>
            <h2 className="font-serif mb-4 text-[#f1f0ff]" style={{ fontSize: "clamp(30px, 5vw, 50px)" }}>
              Everything you need.<br />Nothing you don&apos;t.
            </h2>
            <p className="mx-auto max-w-md text-base text-zinc-500">
              Built for students who are serious about their college decision.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map(f => (
              <div key={f.title}
                className="rounded-2xl border border-white/[0.06] bg-[#0d0f1a] p-7 transition-all duration-300 hover:border-violet-500/20">
                <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl border ${f.bg} ${f.border}`}>
                  <f.icon size={18} className={f.color} />
                </div>
                <h3 className="mb-2 text-[15px] font-semibold text-white">{f.title}</h3>
                <p className="text-[13px] leading-relaxed text-zinc-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full border-y border-white/[0.04] bg-[#0d0f1a] py-24">
        <div style={wrap}>
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-violet-500">How It Works</p>
            <h2 className="font-serif text-[#f1f0ff]" style={{ fontSize: "clamp(30px, 5vw, 46px)" }}>
              From search to shortlist<br />in 4 steps
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {steps.map(s => (
              <div key={s.num} className="flex gap-5 rounded-2xl border border-white/[0.06] bg-[#07080f] p-7">
                <span className="font-serif shrink-0 text-4xl leading-none text-violet-500/25">{s.num}</span>
                <div>
                  <h3 className="mb-2 text-[15px] font-semibold text-white">{s.title}</h3>
                  <p className="text-[13px] leading-relaxed text-zinc-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-28 text-center">
        <div style={wrap}>
          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-5xl">🎓</p>
            <h2 className="font-serif mb-4 text-[#f1f0ff]" style={{ fontSize: "clamp(30px, 5vw, 50px)" }}>
              Your best college is<br />one search away.
            </h2>
            <p className="mb-10 text-base text-zinc-500">
              Join thousands of students who made smarter decisions with ScholarPath.
            </p>
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-10 py-4 text-[15px] font-semibold text-white no-underline transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-[0_0_40px_rgba(124,58,237,0.3)]"
            >
              Start Exploring <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="w-full border-t border-white/[0.04] py-8 text-center text-xs text-zinc-700">
        © 2025 ScholarPath. Built for students, by students.
      </footer>
    </div>
  );
}