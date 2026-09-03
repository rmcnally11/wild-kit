import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_CREW, DEFAULT_MENU, MENU_CAP, type TemplateId } from "@/brand";
import { emptyPoster, hydratePoster, type Poster, type Sticker, type Stroke } from "@/poster";

const KEY = "wild-kit-lemonade-v1";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
};

export type Sale = {
  id: string;
  itemId: string;
  itemName: string;
  price: number;
  at: string;
};

export type CrewJob = {
  id: string;
  role: string;
  who: string;
};

export type Stand = {
  standName: string;
  kidName: string;
  parentEmail: string;
  parentYear: string;
  template: TemplateId;
  setupDone: boolean;
  menu: MenuItem[];
  sales: Sale[];
  closedAt: string | null;
  todaysRecipe: string;
  supplies: string[];
  crew: CrewJob[];
  poster: Poster;
};

export function emptyStand(): Stand {
  return {
    standName: "",
    kidName: "",
    parentEmail: "",
    parentYear: "",
    template: "citrus",
    setupDone: false,
    menu: DEFAULT_MENU.map((item) => ({ ...item })),
    sales: [],
    closedAt: null,
    todaysRecipe: "",
    supplies: [],
    crew: DEFAULT_CREW.map((job) => ({ ...job })),
    poster: emptyPoster(),
  };
}

export function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;
}

export function snapPrice(value: number) {
  return Math.min(99, Math.max(0, Math.round(value * 4) / 4));
}

function hydrate(raw: string): Stand {
  const parsed = JSON.parse(raw) as Partial<Stand> & { zip?: string };
  const base = emptyStand();
  const menu = Array.isArray(parsed.menu) && parsed.menu.length ? parsed.menu : base.menu;
  const crew = Array.isArray(parsed.crew) && parsed.crew.length ? parsed.crew : base.crew;
  const template: TemplateId =
    parsed.template === "berry" || parsed.template === "sky" || parsed.template === "citrus"
      ? parsed.template
      : "citrus";
  return {
    ...base,
    ...parsed,
    template,
    menu: menu.map((item) => ({
      id: String(item.id),
      name: String(item.name ?? ""),
      price: Number(item.price) || 0,
    })),
    crew: crew.map((job) => ({
      id: String(job.id),
      role: String(job.role ?? ""),
      who: String(job.who ?? ""),
    })),
    supplies: Array.isArray(parsed.supplies) ? parsed.supplies.map(String) : [],
    sales: Array.isArray(parsed.sales) ? parsed.sales : [],
    parentYear: String(parsed.parentYear ?? ""),
    parentEmail: String(parsed.parentEmail ?? ""),
    kidName: String(parsed.kidName ?? ""),
    standName: String(parsed.standName ?? ""),
    todaysRecipe: String(parsed.todaysRecipe ?? ""),
    closedAt: parsed.closedAt ?? null,
    setupDone: Boolean(parsed.setupDone),
    poster: hydratePoster(parsed.poster),
  };
}

const StandContext = createContext<{
  stand: Stand;
  ready: boolean;
  save: (patch: Partial<Stand>) => void;
  sell: (itemId: string) => void;
  undo: () => void;
  addItem: () => void;
  updateItem: (id: string, patch: Partial<MenuItem>) => void;
  removeItem: (id: string) => void;
  toggleSupply: (id: string) => void;
  setCrew: (id: string, who: string) => void;
  putPitcherOnMenu: (name: string, price: number) => void;
  savePoster: (poster: Poster) => void;
  addStroke: (stroke: Stroke) => void;
  addSticker: (sticker: Sticker) => void;
  undoPoster: () => void;
  clearPoster: () => void;
  resetSaturday: () => void;
  todaySales: Sale[];
  todayTotal: number;
  todayCups: number;
  lastCup: Sale | undefined;
  money: (n: number) => string;
} | null>(null);

export function StandProvider({ children }: { children: ReactNode }) {
  const [stand, setStand] = useState<Stand>(emptyStand);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (!raw) return;
        setStand(hydrate(raw));
      })
      .catch(() => undefined)
      .finally(() => setReady(true));
  }, []);

  const persist = useCallback((next: Stand) => {
    setStand(next);
    AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => undefined);
  }, []);

  const save = useCallback(
    (patch: Partial<Stand>) => {
      persist({ ...stand, ...patch });
    },
    [persist, stand],
  );

  const sell = useCallback(
    (itemId: string) => {
      const item = stand.menu.find((row) => row.id === itemId);
      if (!item || stand.closedAt) return;
      persist({
        ...stand,
        sales: [
          {
            id: `${Date.now()}`,
            itemId: item.id,
            itemName: item.name,
            price: item.price,
            at: new Date().toISOString(),
          },
          ...stand.sales,
        ],
      });
    },
    [persist, stand],
  );

  const undo = useCallback(() => {
    persist({ ...stand, sales: stand.sales.slice(1) });
  }, [persist, stand]);

  const addItem = useCallback(() => {
    if (stand.menu.length >= MENU_CAP) return;
    persist({
      ...stand,
      menu: [
        ...stand.menu,
        { id: `item-${Date.now()}`, name: "New cup", price: 2 },
      ],
    });
  }, [persist, stand]);

  const updateItem = useCallback(
    (id: string, patch: Partial<MenuItem>) => {
      persist({
        ...stand,
        menu: stand.menu.map((row) => (row.id === id ? { ...row, ...patch } : row)),
      });
    },
    [persist, stand],
  );

  const removeItem = useCallback(
    (id: string) => {
      if (stand.menu.length <= 1) return;
      persist({ ...stand, menu: stand.menu.filter((row) => row.id !== id) });
    },
    [persist, stand],
  );

  const toggleSupply = useCallback(
    (id: string) => {
      const on = stand.supplies.includes(id);
      persist({
        ...stand,
        supplies: on ? stand.supplies.filter((row) => row !== id) : [...stand.supplies, id],
      });
    },
    [persist, stand],
  );

  const setCrew = useCallback(
    (id: string, who: string) => {
      persist({
        ...stand,
        crew: stand.crew.map((job) => (job.id === id ? { ...job, who } : job)),
      });
    },
    [persist, stand],
  );

  const putPitcherOnMenu = useCallback(
    (name: string, price: number) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      const exists = stand.menu.some((row) => row.name.toLowerCase() === trimmed.toLowerCase());
      const menu =
        exists || stand.menu.length >= MENU_CAP
          ? stand.menu
          : [...stand.menu, { id: `mix-${Date.now()}`, name: trimmed, price: snapPrice(price) }];
      persist({ ...stand, todaysRecipe: trimmed, menu });
    },
    [persist, stand],
  );

  const savePoster = useCallback(
    (poster: Poster) => {
      persist({ ...stand, poster });
    },
    [persist, stand],
  );

  const addStroke = useCallback(
    (stroke: Stroke) => {
      persist({
        ...stand,
        poster: {
          ...stand.poster,
          strokes: [...stand.poster.strokes, stroke].slice(-160),
          history: [...stand.poster.history, "stroke" as const].slice(-160),
        },
      });
    },
    [persist, stand],
  );

  const addSticker = useCallback(
    (sticker: Sticker) => {
      persist({
        ...stand,
        poster: {
          ...stand.poster,
          stickers: [...stand.poster.stickers, sticker].slice(-80),
          history: [...stand.poster.history, "sticker" as const].slice(-160),
        },
      });
    },
    [persist, stand],
  );

  const undoPoster = useCallback(() => {
    const last = stand.poster.history[stand.poster.history.length - 1];
    if (!last) return;
    persist({
      ...stand,
      poster: {
        ...stand.poster,
        strokes: last === "stroke" ? stand.poster.strokes.slice(0, -1) : stand.poster.strokes,
        stickers: last === "sticker" ? stand.poster.stickers.slice(0, -1) : stand.poster.stickers,
        history: stand.poster.history.slice(0, -1),
      },
    });
  }, [persist, stand]);

  const clearPoster = useCallback(() => {
    persist({
      ...stand,
      poster: { ...stand.poster, strokes: [], stickers: [], history: [] },
    });
  }, [persist, stand]);

  const resetSaturday = useCallback(() => {
    const kept = emptyStand();
    persist({
      ...kept,
      parentEmail: stand.parentEmail,
      parentYear: stand.parentYear,
      kidName: stand.kidName,
      setupDone: true,
    });
  }, [persist, stand.kidName, stand.parentEmail, stand.parentYear]);

  const todayKey = new Date().toISOString().slice(0, 10);
  const todaySales = stand.sales.filter((sale) => sale.at.startsWith(todayKey));
  const todayTotal = todaySales.reduce((sum, sale) => sum + sale.price, 0);

  const value = useMemo(
    () => ({
      stand,
      ready,
      save,
      sell,
      undo,
      addItem,
      updateItem,
      removeItem,
      toggleSupply,
      setCrew,
      putPitcherOnMenu,
      savePoster,
      addStroke,
      addSticker,
      undoPoster,
      clearPoster,
      resetSaturday,
      todaySales,
      todayTotal,
      todayCups: todaySales.length,
      lastCup: todaySales[0],
      money,
    }),
    [
      addItem,
      addSticker,
      addStroke,
      clearPoster,
      putPitcherOnMenu,
      ready,
      removeItem,
      resetSaturday,
      save,
      savePoster,
      sell,
      setCrew,
      stand,
      todaySales,
      todayTotal,
      toggleSupply,
      undo,
      undoPoster,
      updateItem,
    ],
  );

  return <StandContext.Provider value={value}>{children}</StandContext.Provider>;
}

export function useStand() {
  const ctx = useContext(StandContext);
  if (!ctx) throw new Error("useStand must be inside StandProvider");
  return ctx;
}
