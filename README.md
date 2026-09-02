# Bite Window

A saltwater bite-window planner. Live NOAA tides, local weather, and species scoring so you can tell which tide is actually worth launching for.

This is the first of three side-income ideas, built as a working product.

## The three ideas

### 1. Bite Window (built)

A digital almanac. Recurring revenue, no inventory, and it can run between tides.

- **Offer:** scored fishing windows by station and species, not just high/low times.
- **Money:** free 3-day horizon, Pro at $9/month for 10 days plus (later) SMS when a green window opens. Inlet-level SEO pages are the distribution.
- **Why it wins first:** you can ship tonight. The data is free (NOAA + Open-Meteo). The wedge is species-specific scoring, which generic tide apps do not do.
- **Risk:** weather apps exist. Differentiation has to stay local and honest — show *why* a window scored, never pretend fish are guaranteed.

### 2. The Leader Bench (not built)

Custom-tied fluorocarbon leaders sold as kits with a printed spec card.

- **Offer:** six SKUs to start (redfish popping cork, snook dock, trout jig, tarpon fly, flounder Carolina, striper bunker). $22–38, roughly 70% margin.
- **Money:** productized skill you already have. Instagram and ramp talk. Local bait shops on consignment later.
- **Why it waits:** first weekend you can tie and ship, you make money — and you are immediately trading hours for dollars until you batch. Shipping saltwater gear and handling returns is real ops.

### 3. Open Seat (not built)

Last-minute leftover charter seats. Captains post empty chairs the night before. Anglers take them at 40–60% off. You take ~12%.

- **Money:** 20 captains × 2 leftover seats/week × $150 × 12% is a real number *if* the dock shows up.
- **Why it waits:** chicken-and-egg, weather cancellations, liability, payouts. Biggest ceiling, ugliest failure mode.

Bite Window shipped because it is the one you can launch without inventory or a two-sided marketplace.

## Run it locally

```bash
npm install
npm run dev
```

Opens on [http://localhost:43143](http://localhost:43143).

No API keys. Tides come from the public NOAA CO-OPS API. Weather comes from Open-Meteo. If NOAA is down, the planner falls back to a labeled harmonic estimate.

## What is in the app

- Planner for 34 NOAA stations and 8 inshore species
- Transparent scores (tide stage, light, swing, moon, wind, season)
- 48-hour tide curve with scored windows marked
- Device logbook
- Pro unlock stored in `localStorage` (billing is not wired)

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
