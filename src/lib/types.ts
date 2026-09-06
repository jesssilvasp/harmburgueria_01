export type CategoryId =
  | "hamburgueres"
  | "combos"
  | "porcoes"
  | "bebidas"
  | "sobremesas";

export type Category = {
  id: CategoryId;
  name: string;
  emoji: string;
};

export type AddonOption = {
  id: string;
  name: string;
  price: number;
};

export type RemovableIngredient = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  category: CategoryId;
  emoji: string;
  gradient: string; // tailwind bg gradient classes
  featured?: boolean;
  available: boolean;
  addons?: AddonOption[];
  removables?: RemovableIngredient[];
};

export type CartAddon = {
  id: string;
  name: string;
  price: number;
};

export type CartItem = {
  id: string; // uuid of the cart line
  productId: string;
  name: string;
  emoji: string;
  gradient: string;
  basePrice: number;
  quantity: number;
  addons: CartAddon[];
  removed: string[]; // ingredient names
  note?: string;
  unitPrice: number; // base + addons
  totalPrice: number; // unitPrice * quantity
};

export type PaymentMethod = "pix" | "dinheiro" | "cartao";

export type OrderStatus =
  | "recebido"
  | "confirmado"
  | "preparo"
  | "pronto"
  | "entrega"
  | "entregue";

export type Order = {
  id: string;
  number: number;
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  customer: {
    name: string;
    whatsapp: string;
  };
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    reference?: string;
  };
  payment: {
    method: PaymentMethod;
    changeFor?: number;
  };
  estimatedTime: string;
};
