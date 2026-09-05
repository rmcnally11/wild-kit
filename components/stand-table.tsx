import { CrookedPoster } from "@/components/crooked-poster";
import { Rascal } from "@/lib/rascal";

export function StandTable() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <CrookedPoster />
      <div className="absolute -bottom-2 left-0 rounded-[1.4rem] bg-cream p-2 ring-1 ring-border sm:-left-4">
        <Rascal pose="boss" size={112} line="" />
      </div>
      <div className="mt-3 h-6 rounded-b-[1.2rem] bg-[#7A4E2D]" />
      <div className="mx-6 h-10 bg-[#5C3A22]" />
    </div>
  );
}
