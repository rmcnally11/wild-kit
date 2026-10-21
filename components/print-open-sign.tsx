"use client";

export function PrintOpenSign() {
  return (
    <button
      type="button"
      className="tap no-print inline-flex h-14 items-center justify-center rounded-2xl bg-lemonade px-6 text-lg font-extrabold text-ink"
      onClick={() => {
        const root = document.documentElement;
        const sign = document.getElementById("open-sign");
        const parent = sign?.parentNode ?? null;
        const next = sign?.nextSibling ?? null;
        const previous = root.dataset.print;
        if (sign) document.body.appendChild(sign);
        root.dataset.print = "sign";
        const restore = () => {
          if (sign && parent) {
            if (next && next.parentNode === parent) parent.insertBefore(sign, next);
            else parent.appendChild(sign);
          }
          if (previous) root.dataset.print = previous;
          else delete root.dataset.print;
          window.removeEventListener("afterprint", restore);
        };
        window.addEventListener("afterprint", restore);
        window.print();
      }}
    >
      Print the open sign
    </button>
  );
}
