"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ColorDots } from "@/components/color-dots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isEmail } from "@/lib/email";
import { StandLogo } from "@/lib/logo";
import { Rascal } from "@/lib/rascal";
import { isZip } from "@/lib/shops";
import { useStand } from "@/lib/stand-store";
import { type PaletteId, type Stand } from "@/lib/types";

export default function SetupPage() {
  const { stand } = useStand();
  return <SetupFlow stand={stand} />;
}

function SetupFlow({ stand }: { stand: Stand }) {
  const start =
    stand.parentEmail && stand.zip && stand.kidName && !stand.setupDone
      ? "kid"
      : stand.parentYear
        ? "parent"
        : "who";
  const [step, setStep] = useState<"who" | "parent" | "kid">(start);

  if (step === "who") {
    return (
      <div className="mx-auto grid min-h-dvh max-w-lg content-center gap-5 px-5 py-10">
        <Rascal pose="scheme" size={120} line="Kids invent it. Parents print it." />
        <p className="text-sm font-extrabold tracking-wide text-accent uppercase">Wild Kit</p>
        <h1 className="font-display text-5xl leading-none">Who&apos;s holding the phone?</h1>
        <p className="text-lg text-muted-foreground">
          Parent buys. Kid uses. You own the account. They invent the stand.
        </p>
        <Button className="h-16 rounded-2xl text-xl font-extrabold" onClick={() => setStep("parent")}>
          I&apos;m the parent
        </Button>
        <Button
          variant="secondary"
          className="h-16 rounded-2xl text-xl font-extrabold"
          onClick={() => setStep("kid")}
        >
          I&apos;m the kid
        </Button>
        <p className="text-sm text-muted-foreground">
          Kids never type an email. If a kid starts, a parent can add print later.
        </p>
      </div>
    );
  }

  if (step === "parent") {
    return <ParentStart stand={stand} onNext={() => setStep("kid")} />;
  }

  return <KidStart stand={stand} />;
}

function ParentStart({ stand, onNext }: { stand: Stand; onNext: () => void }) {
  const { save } = useStand();
  const [year, setYear] = useState(stand.parentYear);
  const [email, setEmail] = useState(stand.parentEmail);
  const [zip, setZip] = useState(stand.zip);
  const [kidName, setKidName] = useState(stand.kidName);
  const adult = Number(year) > 1900 && Number(year) <= new Date().getFullYear() - 18;
  const canNext = adult && isEmail(email) && isZip(zip) && kidName.trim().length > 0;

  return (
    <div className="mx-auto grid min-h-dvh max-w-lg content-center gap-5 px-5 py-10">
      <p className="text-sm font-extrabold tracking-wide text-accent uppercase">Parent Desk</p>
      <h1 className="font-display text-4xl leading-none">You hit print.</h1>
      <p className="text-muted-foreground">
        Saturday. They&apos;re already in the cabinets. Give them a stand. Email gets the poster.
        Zip finds a shop. No street address. No kid inbox.
      </p>
      <label className="grid gap-1 font-bold">
        What year were you born?
        <Input
          inputMode="numeric"
          value={year}
          onChange={(event) => setYear(event.target.value.replace(/\D/g, "").slice(0, 4))}
          placeholder="1990"
          className="h-14 rounded-2xl text-lg"
        />
      </label>
      {!adult && year.length === 4 && (
        <p className="font-extrabold text-[var(--raspberry)]">Ask a grown-up.</p>
      )}
      <label className="grid gap-1 font-bold">
        Your email
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@email.com"
          className="h-14 rounded-2xl text-lg"
          autoComplete="email"
        />
      </label>
      <label className="grid gap-1 font-bold">
        Zip
        <Input
          inputMode="numeric"
          value={zip}
          onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))}
          placeholder="77006"
          className="h-14 rounded-2xl text-lg"
        />
      </label>
      <label className="grid gap-1 font-bold">
        Kid&apos;s first name
        <Input
          value={kidName}
          onChange={(event) => setKidName(event.target.value)}
          placeholder="Sam"
          className="h-14 rounded-2xl text-lg"
          autoComplete="off"
        />
      </label>
      <Button
        disabled={!canNext}
        className="h-16 rounded-2xl text-xl font-extrabold"
        onClick={() => {
          save({
            parentYear: year,
            parentEmail: email.trim(),
            zip: zip.trim(),
            kidName: kidName.trim(),
          });
          onNext();
        }}
      >
        Next — they invent it
      </Button>
    </div>
  );
}

function KidStart({ stand }: { stand: Stand }) {
  const router = useRouter();
  const { save } = useStand();
  const [kidName, setKidName] = useState(stand.kidName);
  const [standName, setStandName] = useState(stand.standName);
  const [palette, setPalette] = useState<PaletteId>(stand.palette);
  const canOpen = kidName.trim().length > 0;

  return (
    <div className="mx-auto grid min-h-dvh max-w-lg content-center gap-5 px-5 py-10">
      <p className="text-sm font-extrabold tracking-wide text-accent uppercase">Kid Studio</p>
      <h1 className="font-display text-5xl leading-none">You&apos;re the boss of this stand.</h1>
      <p className="text-lg text-muted-foreground">
        First name only. Make the sign. Set the price. Grown-up runs the printer.
      </p>
      <label className="grid gap-1 font-bold">
        Your first name
        <Input
          value={kidName}
          onChange={(event) => setKidName(event.target.value)}
          placeholder="Sam"
          className="h-14 rounded-2xl text-lg"
          autoComplete="given-name"
        />
      </label>
      <label className="grid gap-1 font-bold">
        Stand name
        <Input
          value={standName}
          onChange={(event) => setStandName(event.target.value)}
          placeholder={standName ? undefined : "The stand needs a name."}
          className="h-14 rounded-2xl text-lg"
        />
      </label>
      <ColorDots value={palette} onChange={setPalette} />
      <div className="grid place-items-center gap-2">
        <StandLogo
          key={`${standName}-${palette}`}
          name={standName}
          palette={palette}
          badge="circle"
          mascot="lemon"
          size={200}
        />
        <p className="font-display text-xl">
          {(standName.trim() || "Lemonade Stand").toUpperCase()}
        </p>
      </div>
      <Button
        disabled={!canOpen}
        className="h-16 rounded-2xl text-xl font-extrabold"
        onClick={() => {
          save({
            kidName: kidName.trim(),
            standName: standName.trim(),
            palette,
            setupDone: true,
          });
          router.replace("/");
        }}
      >
        Open Saturday Jobs
      </Button>
      <p className="text-center text-sm text-muted-foreground">Go outside.</p>
    </div>
  );
}
