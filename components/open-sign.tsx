import { RascalSign } from "@/lib/rascal";

export function OpenSign({ exact = false }: { exact?: boolean }) {
  return (
    <article
      id="open-sign"
      className={exact ? "open-sign open-sign-exact" : "open-sign"}
      aria-label="Open sign. One letter sheet. Fold in half."
    >
      <style>{`@media print { @page { size: letter portrait; margin: 0; } }`}</style>
      <div className="open-sign-sheet">
        <section className="open-sign-half open-sign-top" aria-label="We’re open">
          <div className="open-sign-face open-sign-open">
            <p className="open-sign-words">
              <span>We’re</span>
              <span>open</span>
            </p>
            <RascalSign pose="wave" />
          </div>
        </section>
        <div className="open-sign-fold">
          <span className="open-sign-ticks" aria-hidden="true" />
          <p>Fold on the line. Stand it up.</p>
          <span className="open-sign-ticks" aria-hidden="true" />
        </div>
        <section className="open-sign-half open-sign-bottom" aria-label="Back soon">
          <div className="open-sign-face open-sign-soon">
            <p className="open-sign-words">
              <span>Back</span>
              <span>soon</span>
            </p>
            <RascalSign pose="nap" />
          </div>
        </section>
      </div>
    </article>
  );
}
