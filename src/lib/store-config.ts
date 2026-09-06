// Store configuration - prepared for multi-tenant SaaS.
// In a future SaaS version, this would be fetched by tenant/store slug.

export type StoreConfig = {
  id: string;
  slug: string;
  name: string;
  logoEmoji: string;
  status: "open" | "closed";
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  deliveryFee: number;
  minOrder: number;
  neighborhoods: Array<{ name: string; fee: number }>;
  pickupAvailable: boolean;
  openingHours: Array<{ day: string; hours: string }>;
  theme: {
    primary: string;
    accent: string;
  };
};

export const currentStore: StoreConfig = {
  id: "store_burger_house",
  slug: "burger-house",
  name: "Burger House",
  logoEmoji: "🍔",
  status: "open",
  deliveryTimeMin: 30,
  deliveryTimeMax: 45,
  deliveryFee: 5.9,
  minOrder: 25,
  neighborhoods: [
    { name: "Centro", fee: 4.9 },
    { name: "Jardim América", fee: 5.9 },
    { name: "Vila Nova", fee: 6.9 },
    { name: "Boa Vista", fee: 7.9 },
    { name: "Alto da Serra", fee: 9.9 },
  ],
  pickupAvailable: true,
  openingHours: [
    { day: "Segunda", hours: "18:00 - 23:30" },
    { day: "Terça", hours: "18:00 - 23:30" },
    { day: "Quarta", hours: "18:00 - 23:30" },
    { day: "Quinta", hours: "18:00 - 23:30" },
    { day: "Sexta", hours: "18:00 - 00:30" },
    { day: "Sábado", hours: "18:00 - 00:30" },
    { day: "Domingo", hours: "18:00 - 23:00" },
  ],
  theme: {
    primary: "#ff6a00",
    accent: "#ffb800",
  },
};

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
