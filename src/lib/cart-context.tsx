"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Order } from "./types";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  subtotal: number;
  totalQuantity: number;
  coupon: { code: string; discount: number } | null;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  clearCoupon: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "burger_house_cart_v1";
const ORDERS_KEY = "burger_house_orders_v1";
const COUPON_KEY = "burger_house_coupon_v1";

const validCoupons: Record<string, { discount: number; type: "percent" | "fixed" }> = {
  BURGER10: { discount: 10, type: "percent" },
  PRIMEIRA20: { discount: 20, type: "percent" },
  FRETEGRATIS: { discount: 5.9, type: "fixed" },
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(
    null,
  );
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const rawItems = localStorage.getItem(STORAGE_KEY);
      if (rawItems) setItems(JSON.parse(rawItems));
      const rawOrders = localStorage.getItem(ORDERS_KEY);
      if (rawOrders) setOrders(JSON.parse(rawOrders));
      const rawCoupon = localStorage.getItem(COUPON_KEY);
      if (rawCoupon) setCoupon(JSON.parse(rawCoupon));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (coupon) localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
    else localStorage.removeItem(COUPON_KEY);
  }, [coupon, hydrated]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((it) =>
          it.id === id
            ? {
                ...it,
                quantity,
                totalPrice: it.unitPrice * quantity,
              }
            : it,
        )
        .filter((it) => it.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setCoupon(null);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.totalPrice, 0),
    [items],
  );

  const totalQuantity = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items],
  );

  const applyCoupon = useCallback(
    (code: string) => {
      const key = code.trim().toUpperCase();
      if (!key) return { ok: false, message: "Digite um cupom" };
      const found = validCoupons[key];
      if (!found) return { ok: false, message: "Cupom inválido" };
      const discountValue =
        found.type === "percent"
          ? (subtotal * found.discount) / 100
          : found.discount;
      setCoupon({ code: key, discount: discountValue });
      return { ok: true, message: `Cupom ${key} aplicado!` };
    },
    [subtotal],
  );

  const clearCoupon = useCallback(() => setCoupon(null), []);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const updateOrderStatus = useCallback(
    (id: string, status: Order["status"]) => {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o)),
      );
    },
    [],
  );

  const value: CartContextValue = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    subtotal,
    totalQuantity,
    coupon,
    applyCoupon,
    clearCoupon,
    orders,
    addOrder,
    updateOrderStatus,
    hydrated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
