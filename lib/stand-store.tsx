"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { emptyStand, type MenuItem, type Plan, type Stand } from "@/lib/types";

const KEY = "my-stand-v1";

let memory = emptyStand();
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function readStored(): Stand {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyStand();
    const parsed = JSON.parse(raw) as Stand;
    return {
      ...emptyStand(),
      ...parsed,
      menu: parsed.menu?.length ? parsed.menu : emptyStand().menu,
    };
  } catch {
    return emptyStand();
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  memory = readStored();
  hydrated = true;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getClientSnapshot() {
  hydrate();
  return memory;
}

function getServerSnapshot() {
  return emptyStand();
}

function write(next: Stand) {
  memory = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }
  emit();
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

type Store = {
  stand: Stand;
  ready: boolean;
  todaySales: Stand["sales"];
  todayTotal: number;
  todayCups: number;
  save: (next: Partial<Stand>) => void;
  addItem: () => void;
  updateItem: (id: string, patch: Partial<MenuItem>) => void;
  removeItem: (id: string) => void;
  sell: (itemId: string) => void;
  undo: () => void;
  unlock: (plan: Plan) => void;
  isPaid: boolean;
};

const StandContext = createContext<Store | null>(null);

export function StandProvider({ children }: { children: ReactNode }) {
  const stand = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const todaySales = stand.sales.filter((sale) => sale.at.slice(0, 10) === todayKey());
  const todayTotal = todaySales.reduce((sum, sale) => sum + sale.price, 0);
  const todayCups = todaySales.length;
  const isPaid =
    stand.plan === "lifetime" ||
    (stand.plan === "season" && !!stand.seasonEnds && stand.seasonEnds >= todayKey());

  const save = useCallback((next: Partial<Stand>) => {
    write({ ...memory, ...next });
  }, []);

  const addItem = useCallback(() => {
    write({
      ...memory,
      menu: [
        ...memory.menu,
        { id: `item-${Date.now()}`, name: "New drink", price: 1, soldOut: false },
      ],
    });
  }, []);

  const updateItem = useCallback((id: string, patch: Partial<MenuItem>) => {
    write({
      ...memory,
      menu: memory.menu.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    write({ ...memory, menu: memory.menu.filter((item) => item.id !== id) });
  }, []);

  const sell = useCallback((itemId: string) => {
    const item = memory.menu.find((row) => row.id === itemId);
    if (!item || item.soldOut) return;
    write({
      ...memory,
      sales: [
        {
          id: `sale-${Date.now()}`,
          itemId: item.id,
          itemName: item.name,
          price: item.price,
          at: new Date().toISOString(),
        },
        ...memory.sales,
      ],
    });
  }, []);

  const undo = useCallback(() => {
    const firstToday = memory.sales.find((sale) => sale.at.slice(0, 10) === todayKey());
    if (!firstToday) return;
    write({ ...memory, sales: memory.sales.filter((sale) => sale.id !== firstToday.id) });
  }, []);

  const unlock = useCallback((plan: Plan) => {
    write({
      ...memory,
      plan,
      seasonEnds:
        plan === "season"
          ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 100).toISOString().slice(0, 10)
          : memory.seasonEnds,
    });
  }, []);

  const value: Store = {
    stand,
    ready,
    todaySales,
    todayTotal,
    todayCups,
    save,
    addItem,
    updateItem,
    removeItem,
    sell,
    undo,
    unlock,
    isPaid,
  };

  return <StandContext.Provider value={value}>{children}</StandContext.Provider>;
}

export function useStand() {
  const store = useContext(StandContext);
  if (!store) throw new Error("useStand needs StandProvider");
  return store;
}

export function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}
