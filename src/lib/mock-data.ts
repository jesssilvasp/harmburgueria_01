import type { Category, Product, AddonOption, RemovableIngredient } from "./types";

export const categories: Category[] = [
  { id: "hamburgueres", name: "Hambúrgueres", emoji: "🍔" },
  { id: "combos", name: "Combos", emoji: "🍟" },
  { id: "porcoes", name: "Porções", emoji: "🥓" },
  { id: "bebidas", name: "Bebidas", emoji: "🥤" },
  { id: "sobremesas", name: "Sobremesas", emoji: "🍰" },
];

const defaultBurgerAddons: AddonOption[] = [
  { id: "add-bacon", name: "Bacon", price: 4 },
  { id: "add-carne", name: "Carne extra 150g", price: 8 },
  { id: "add-cheddar", name: "Cheddar", price: 3 },
  { id: "add-cebola-car", name: "Cebola caramelizada", price: 3 },
  { id: "add-ovo", name: "Ovo", price: 2.5 },
  { id: "add-catupiry", name: "Catupiry", price: 3.5 },
];

const defaultBurgerRemovables: RemovableIngredient[] = [
  { id: "rm-cebola", name: "Cebola" },
  { id: "rm-alface", name: "Alface" },
  { id: "rm-tomate", name: "Tomate" },
  { id: "rm-picles", name: "Picles" },
];

export const products: Product[] = [
  // ---------- Hambúrgueres ----------
  {
    id: "p-xbacon",
    name: "X-Bacon Especial",
    description:
      "Pão brioche, carne 150g, cheddar, bacon crocante, alface, tomate e molho especial.",
    price: 32.9,
    promoPrice: 29.9,
    category: "hamburgueres",
    emoji: "🍔",
    gradient: "from-amber-700 via-orange-600 to-red-700",
    featured: true,
    available: true,
    addons: defaultBurgerAddons,
    removables: defaultBurgerRemovables,
  },
  {
    id: "p-cheddar",
    name: "Cheddar Burger",
    description:
      "Pão australiano, carne 180g suculenta, cheddar cremoso duplo e cebola caramelizada.",
    price: 34.9,
    category: "hamburgueres",
    emoji: "🧀",
    gradient: "from-yellow-600 via-amber-600 to-orange-700",
    featured: true,
    available: true,
    addons: defaultBurgerAddons,
    removables: defaultBurgerRemovables,
  },
  {
    id: "p-smash",
    name: "Smash Duplo",
    description:
      "Dois smash de 90g, queijo prato derretido, picles, cebola e molho da casa.",
    price: 28.9,
    category: "hamburgueres",
    emoji: "🍔",
    gradient: "from-orange-600 via-red-600 to-rose-700",
    available: true,
    addons: defaultBurgerAddons,
    removables: defaultBurgerRemovables,
  },
  {
    id: "p-salada",
    name: "Salada Burger",
    description:
      "Pão integral, carne 150g grelhada, alface, tomate, cebola roxa e molho iogurte.",
    price: 26.9,
    category: "hamburgueres",
    emoji: "🥗",
    gradient: "from-lime-700 via-emerald-700 to-teal-800",
    available: true,
    addons: defaultBurgerAddons,
    removables: defaultBurgerRemovables,
  },
  {
    id: "p-frango",
    name: "Chicken Crispy",
    description:
      "Pão brioche, filé de frango crispy, cheddar, alface, bacon e molho barbecue.",
    price: 27.9,
    category: "hamburgueres",
    emoji: "🍗",
    gradient: "from-amber-600 via-orange-700 to-rose-800",
    available: true,
    addons: defaultBurgerAddons,
    removables: defaultBurgerRemovables,
  },
  {
    id: "p-veggie",
    name: "Veggie Burger",
    description:
      "Hambúrguer de grão-de-bico, queijo vegetal, rúcula, tomate seco e maionese verde.",
    price: 29.9,
    category: "hamburgueres",
    emoji: "🌱",
    gradient: "from-green-700 via-emerald-800 to-lime-900",
    available: false,
    addons: defaultBurgerAddons,
    removables: defaultBurgerRemovables,
  },

  // ---------- Combos ----------
  {
    id: "p-combo-turbo",
    name: "Combo Turbinado",
    description:
      "Burger clássico + batata frita crocante + refrigerante 350ml a sua escolha.",
    price: 42.9,
    promoPrice: 34.9,
    category: "combos",
    emoji: "🍔",
    gradient: "from-orange-600 via-amber-600 to-yellow-600",
    featured: true,
    available: true,
  },
  {
    id: "p-combo-classic",
    name: "Combo Clássico",
    description: "X-Bacon + batata média + refrigerante 350ml. O favorito da casa.",
    price: 44.9,
    category: "combos",
    emoji: "🍟",
    gradient: "from-red-700 via-orange-700 to-amber-700",
    available: true,
  },
  {
    id: "p-combo-duplo",
    name: "Combo Duplo",
    description: "Smash duplo + batata grande + 2 refrigerantes 350ml.",
    price: 58.9,
    category: "combos",
    emoji: "🍔",
    gradient: "from-rose-700 via-red-700 to-orange-800",
    available: true,
  },
  {
    id: "p-combo-familia",
    name: "Combo Família",
    description: "4 burgers + batata família + 4 refrigerantes 350ml.",
    price: 129.9,
    promoPrice: 109.9,
    category: "combos",
    emoji: "👨‍👩‍👧‍👦",
    gradient: "from-amber-700 via-orange-800 to-red-900",
    available: true,
  },

  // ---------- Porções ----------
  {
    id: "p-batata-p",
    name: "Batata Frita P",
    description: "Batata frita crocante e sequinha. Porção pequena.",
    price: 14.9,
    category: "porcoes",
    emoji: "🍟",
    gradient: "from-yellow-600 via-amber-600 to-orange-700",
    available: true,
  },
  {
    id: "p-batata-g",
    name: "Batata Frita G",
    description: "Batata frita porção grande, ideal para compartilhar.",
    price: 24.9,
    category: "porcoes",
    emoji: "🍟",
    gradient: "from-amber-500 via-yellow-600 to-orange-700",
    available: true,
  },
  {
    id: "p-onion",
    name: "Onion Rings",
    description: "Anéis de cebola empanados e crocantes. 10 unidades.",
    price: 22.9,
    category: "porcoes",
    emoji: "🧅",
    gradient: "from-amber-700 via-orange-800 to-red-800",
    available: true,
  },
  {
    id: "p-nuggets",
    name: "Chicken Nuggets",
    description: "12 nuggets de frango empanado com molho especial.",
    price: 26.9,
    category: "porcoes",
    emoji: "🍗",
    gradient: "from-orange-600 via-amber-700 to-yellow-700",
    available: true,
  },

  // ---------- Bebidas ----------
  {
    id: "p-coca",
    name: "Coca-Cola 350ml",
    description: "Coca-Cola lata gelada 350ml.",
    price: 7.9,
    category: "bebidas",
    emoji: "🥤",
    gradient: "from-red-800 via-red-900 to-neutral-900",
    available: true,
  },
  {
    id: "p-guarana",
    name: "Guaraná Antarctica 350ml",
    description: "Guaraná Antarctica lata 350ml.",
    price: 7.5,
    category: "bebidas",
    emoji: "🥫",
    gradient: "from-emerald-800 via-green-900 to-neutral-900",
    available: true,
  },
  {
    id: "p-suco",
    name: "Suco Natural 500ml",
    description: "Suco natural da fruta: laranja, maracujá ou abacaxi.",
    price: 12.9,
    category: "bebidas",
    emoji: "🍹",
    gradient: "from-amber-500 via-orange-600 to-yellow-700",
    available: true,
  },
  {
    id: "p-agua",
    name: "Água Mineral 500ml",
    description: "Água mineral sem gás 500ml.",
    price: 4.9,
    category: "bebidas",
    emoji: "💧",
    gradient: "from-sky-700 via-blue-800 to-cyan-900",
    available: true,
  },

  // ---------- Sobremesas ----------
  {
    id: "p-brownie",
    name: "Brownie com Sorvete",
    description: "Brownie de chocolate quente com sorvete de creme e calda.",
    price: 18.9,
    category: "sobremesas",
    emoji: "🍫",
    gradient: "from-amber-900 via-yellow-900 to-neutral-900",
    available: true,
  },
  {
    id: "p-milkshake",
    name: "Milkshake Ovomaltine",
    description: "Milkshake cremoso 400ml com pedaços de Ovomaltine.",
    price: 19.9,
    category: "sobremesas",
    emoji: "🥤",
    gradient: "from-amber-700 via-yellow-800 to-orange-900",
    available: true,
  },
  {
    id: "p-cheesecake",
    name: "Cheesecake de Frutas Vermelhas",
    description: "Cheesecake cremoso com calda artesanal de frutas vermelhas.",
    price: 16.9,
    category: "sobremesas",
    emoji: "🍰",
    gradient: "from-rose-700 via-pink-800 to-red-900",
    available: true,
  },
];

// Mock orders for admin panel
export type MockOrder = {
  id: string;
  number: number;
  customer: string;
  time: string;
  total: number;
  status:
    | "novo"
    | "confirmado"
    | "preparo"
    | "pronto"
    | "entrega"
    | "entregue";
  items: Array<{ name: string; qty: number }>;
  neighborhood: string;
  payment: string;
};

export const mockOrders: MockOrder[] = [
  {
    id: "o1029",
    number: 1029,
    customer: "João Silva",
    time: "19:30",
    total: 68.7,
    status: "preparo",
    items: [
      { name: "X-Bacon Especial", qty: 2 },
      { name: "Coca-Cola 350ml", qty: 2 },
    ],
    neighborhood: "Centro",
    payment: "PIX",
  },
  {
    id: "o1028",
    number: 1028,
    customer: "Maria Santos",
    time: "19:28",
    total: 44.9,
    status: "confirmado",
    items: [{ name: "Combo Clássico", qty: 1 }],
    neighborhood: "Jardim América",
    payment: "Cartão",
  },
  {
    id: "o1027",
    number: 1027,
    customer: "Pedro Almeida",
    time: "19:26",
    total: 34.9,
    status: "novo",
    items: [{ name: "Combo Turbinado", qty: 1 }],
    neighborhood: "Vila Nova",
    payment: "Dinheiro",
  },
  {
    id: "o1026",
    number: 1026,
    customer: "Ana Oliveira",
    time: "19:24",
    total: 89.6,
    status: "preparo",
    items: [
      { name: "Smash Duplo", qty: 2 },
      { name: "Batata Frita G", qty: 1 },
    ],
    neighborhood: "Boa Vista",
    payment: "PIX",
  },
  {
    id: "o1025",
    number: 1025,
    customer: "Carlos Souza",
    time: "19:15",
    total: 52.8,
    status: "pronto",
    items: [
      { name: "Chicken Crispy", qty: 1 },
      { name: "Onion Rings", qty: 1 },
    ],
    neighborhood: "Centro",
    payment: "PIX",
  },
  {
    id: "o1024",
    number: 1024,
    customer: "Fernanda Lima",
    time: "19:05",
    total: 109.9,
    status: "entrega",
    items: [{ name: "Combo Família", qty: 1 }],
    neighborhood: "Jardim América",
    payment: "Cartão",
  },
  {
    id: "o1023",
    number: 1023,
    customer: "Ricardo Gomes",
    time: "18:52",
    total: 27.9,
    status: "entregue",
    items: [{ name: "Chicken Crispy", qty: 1 }],
    neighborhood: "Centro",
    payment: "PIX",
  },
  {
    id: "o1022",
    number: 1022,
    customer: "Beatriz Costa",
    time: "18:40",
    total: 62.5,
    status: "entregue",
    items: [
      { name: "Cheddar Burger", qty: 1 },
      { name: "Milkshake Ovomaltine", qty: 1 },
    ],
    neighborhood: "Vila Nova",
    payment: "Dinheiro",
  },
];

export const topProducts = [
  { name: "X-Bacon Especial", sales: 63 },
  { name: "Combo Clássico", sales: 48 },
  { name: "Cheddar Burger", sales: 38 },
  { name: "Batata Frita G", sales: 32 },
  { name: "Coca-Cola 350ml", sales: 28 },
];

export const revenueLast7Days = [
  { day: "Sex", value: 1850 },
  { day: "Sáb", value: 2680 },
  { day: "Dom", value: 2340 },
  { day: "Seg", value: 1420 },
  { day: "Ter", value: 1780 },
  { day: "Qua", value: 2560 },
  { day: "Qui", value: 3245 },
];

export const mockCustomers = [
  { id: "c1", name: "João Silva", whatsapp: "(11) 98765-4321", orders: 12, total: 645.9 },
  { id: "c2", name: "Maria Santos", whatsapp: "(11) 97654-3210", orders: 8, total: 412.5 },
  { id: "c3", name: "Pedro Almeida", whatsapp: "(11) 96543-2109", orders: 15, total: 892.3 },
  { id: "c4", name: "Ana Oliveira", whatsapp: "(11) 95432-1098", orders: 6, total: 298.4 },
  { id: "c5", name: "Carlos Souza", whatsapp: "(11) 94321-0987", orders: 22, total: 1245.6 },
  { id: "c6", name: "Fernanda Lima", whatsapp: "(11) 93210-9876", orders: 4, total: 198.7 },
];

export const mockCoupons = [
  { code: "BURGER10", discount: 10, type: "percent" as const, uses: 47, active: true },
  { code: "PRIMEIRA20", discount: 20, type: "percent" as const, uses: 128, active: true },
  { code: "FRETEGRATIS", discount: 5.9, type: "fixed" as const, uses: 89, active: true },
  { code: "COMBO5", discount: 5, type: "fixed" as const, uses: 34, active: false },
];
