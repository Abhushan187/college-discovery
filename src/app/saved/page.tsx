import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import CollegeCard from "@/components/CollegeCard";

export default async function SavedPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const saved = await prisma.savedCollege.findMany({
    where: { userId: session.user.id },
    include: { college: { include: { placements: true } } },
    orderBy: { savedAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Bookmark size={20} className="text-violet-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Saved Colleges</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{saved.length} saved</p>
        </div>
      </div>

      {saved.length === 0 ? (
        <div className="text-center py-24">
          <Bookmark size={48} className="text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500 mb-4">No saved colleges yet</p>
          <Link href="/colleges" className="text-violet-400 hover:text-violet-300 text-sm no-underline">
            Browse colleges →
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {saved.map(s => (
            <CollegeCard key={s.id} college={s.college} isSaved />
          ))}
        </div>
      )}
    </div>
  );
}