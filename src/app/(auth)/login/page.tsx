"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GraduationCap, Loader2 } from "lucide-react";

const inputCls = "w-full bg-[#12141f] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-violet-500/40 transition-all";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true); setError("");
    if (mode === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      if (!res.ok) { setError("Email already exists"); setLoading(false); return; }
    }
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) { setError("Invalid email or password"); setLoading(false); return; }
    router.push("/colleges");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-[0_0_40px_rgba(124,58,237,0.4)] flex items-center justify-center mx-auto mb-5">
            <GraduationCap size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-sm text-zinc-500">
            {mode === "login" ? "Sign in to your ScholarPath account" : "Join thousands of students"}
          </p>
        </div>

        <div className="bg-[#0d0f1a] border border-white/[0.07] rounded-2xl p-7 space-y-4">
          {mode === "register" && (
            <input className={inputCls} placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
          )}
          <input className={inputCls} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
          <input className={inputCls} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            {mode === "login" ? "Sign in" : "Create account"}
          </button>

          <p className="text-center text-xs text-zinc-500">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-violet-400 hover:text-violet-300 cursor-pointer"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>

          {mode === "login" && (
            <p className="text-center text-xs text-zinc-700">Demo: test@demo.com · demo1234</p>
          )}
        </div>
      </div>
    </div>
  );
}