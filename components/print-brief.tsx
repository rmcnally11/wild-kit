"use client";

export function PrintBrief() {
  return (
    <button
      type="button"
      className="tap no-print inline-flex h-14 items-center justify-center rounded-2xl bg-ink px-6 text-lg font-extrabold text-cream"
      onClick={() => {
        const root = document.documentElement;
        const previous = root.dataset.print;
        root.dataset.print = "brief";
        const done = () => {
          if (previous) root.dataset.print = previous;
          else delete root.dataset.print;
          window.removeEventListener("afterprint", done);
        };
        window.addEventListener("afterprint", done);
        window.print();
      }}
    >
      Print this Saturday
    </button>
  );
}
