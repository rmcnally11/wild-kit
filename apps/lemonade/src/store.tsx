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

import { DEFAULT_MENU } from "@/brand";

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

export type Stand = {
  standName: string;
  kidName: string;
  parentEmail: string;
  zip: string;
  template: "citrus" | "berry" | "sky";
  setupDone: boolean;
  menu: MenuItem[];
  sales: Sale[];
  closedAt: string | null;
};

function emptyStand(): Stand {
  return {
    standName: "",
    kidName: "",
    parentEmail: "",
    zip: "",
    template: "citrus",
    setupDone: false,
    menu: DEFAULT_MENU.map((item) => ({ ...item })),
    sales: [],
    closedAt: null,
  };
}

function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;
}

const StandContext = createContext<{
  stand: Stand;
  ready: boolean;
  save: (patch: Partial<Stand>) => void;
  sell: (itemId: string) => void;
  undo: () => void;
  todayTotal: number;
  todayCups: number;
  money: (n: number) => string;
} | null>(null);

export function StandProvider({ children }: { children: ReactNode }) {
  const [stand, setStand] = useState<Stand>(emptyStand);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (!raw) return;
        const parsed = JSON.parse(raw) as Stand;
        setStand({ ...emptyStand(), ...parsed, menu: parsed.menu?.length ? parsed.menu : emptyStand().menu });
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
      todayTotal,
      todayCups: todaySales.length,
      money,
    }),
    [ready, save, sell, stand, todaySales.length, todayTotal, undo],
  );

  return <StandContext.Provider value={value}>{children}</StandContext.Provider>;
}

export function useStand() {
  const ctx = useContext(StandContext);
  if (!ctx) throw new Error("useStand must be inside StandProvider");
  return ctx;
}

export { money };
