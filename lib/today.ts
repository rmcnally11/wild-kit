import type { Sale } from "@/lib/types";

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function isClosedToday(closedAt: string | null | undefined) {
  return Boolean(closedAt && closedAt === todayKey());
}

export function todaySalesOf(sales: Sale[] | undefined) {
  const key = todayKey();
  return (sales ?? []).filter((sale) => sale.at.slice(0, 10) === key);
}

export function todayTotalOf(sales: Sale[] | undefined) {
  return todaySalesOf(sales).reduce((sum, sale) => sum + sale.price, 0);
}
