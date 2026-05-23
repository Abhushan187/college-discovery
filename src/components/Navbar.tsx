"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { BookmarkCheck, LogIn, LogOut, User, ChevronDown, GraduationCap } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#07080f]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
            <GraduationCap size={15} className="text-white" />
          </div>
          <span className="font-semibold text-lg text-white tracking-tight">
            Scholar<span className="text-violet-400">Path</span>
          </span>
        </Link>

        {/* Nav items */}
        <div className="flex items-center gap-1">
          <Link href="/colleges" className="text-sm px-4 py-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all no-underline">
            Explore
          </Link>

          {session ? (
            <>
              <Link href="/saved" className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all no-underline">
                <BookmarkCheck size={14} /> Saved
              </Link>

              <div className="relative ml-1" ref={ref}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-all cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                    <User size={11} className="text-white" />
                  </div>
                  <span className="text-sm text-white max-w-[100px] truncate">
                    {session.user?.name || session.user?.email?.split("@")[0]}
                  </span>
                  <ChevronDown size={13} className={`text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                </button>

                {open && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden bg-[#0d0f1a] border border-white/8 shadow-2xl shadow-black/50">
                    <div className="p-4 border-b border-white/6">
                      <p className="text-sm font-medium text-white truncate">{session.user?.name || "User"}</p>
                      <p className="text-xs text-zinc-500 mt-0.5 truncate">{session.user?.email}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/saved"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm text-violet-400 hover:bg-violet-500/10 transition-all no-underline"
                      >
                        <BookmarkCheck size={14} /> My Saved Colleges
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/8 transition-all cursor-pointer mt-0.5 text-left"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-sm text-white px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 transition-all ml-1 no-underline"
            >
              <LogIn size={14} /> Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}