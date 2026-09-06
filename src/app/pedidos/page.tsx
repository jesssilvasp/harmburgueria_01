"use client";

import Link from "next/link";
import MobileShell from "@/components/MobileShell";
import { useCart } from "@/lib/cart-context";
import { formatBRL } from "@/lib/store-config";
import type { OrderStatus } from "@/lib/types";

const statusMeta: Record<
  OrderStatus,
  { label: string; color: string; emoji: string }
> = {
  recebido: { label: "Recebido", color: "bg-blue-500/20 text-blue-400", emoji: "📥" },
  confirmado: {
    label: "Confirmado",
    color: "bg-cyan-500/20 text-cyan-400",
    emoji: "✅",
  },
  preparo: {
    label: "Em preparo",
    color: "bg-orange-500/20 text-orange-400",
    emoji: "👨‍🍳",
  },
  pronto: {
    label: "Pronto",
    color: "bg-amber-500/20 text-amber-400",
    emoji: "🍔",
  },
  entrega: {
    label: "Saiu p/ entrega",
    color: "bg-purple-500/20 text-purple-400",
    emoji: "🛵",
  },
  entregue: {
    label: "Entregue",
    color: "bg-emerald-500/20 text-emerald-400",
    emoji: "🎉",
  },
};

export default function PedidosPage() {
  const { orders, hydrated } = useCart();

  return (
    <MobileShell>
      <header className="px-4 pt-6 pb-4 bg-gradient-to-b from-[#1c1c1f] to-[#0a0a0b]">
        <h1 className="text-xl font-bold text-white">Meus Pedidos</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Acompanhe seus pedidos aqui.
        </p>
      </header>

      <div className="px-4 py-4">
        {!hydrated ? (
          <div className="text-center text-sm text-neutral-500 pt-10">
            Carregando...
          </div>
        ) : orders.length === 0 ? (
          <div className="pt-16 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-lg font-bold text-white">Nenhum pedido ainda</h2>
            <p className="text-sm text-neutral-500 mt-2">
              Faça seu primeiro pedido no cardápio!
            </p>
            <Link
              href="/"
              className="mt-6 inline-block btn-primary rounded-full px-6 py-3 text-sm"
            >
              Ver cardápio
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => {
              const meta = statusMeta[o.status];
              return (
                <Link
                  key={o.id}
                  href={`/pedido/${o.id}`}
                  className="block card p-4 hover:border-orange-500/50 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs text-neutral-500">
                        Pedido #{o.number}
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        {o.items.length} item{o.items.length > 1 ? "s" : ""} •{" "}
                        {formatBRL(o.total)}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-1">
                        {new Date(o.createdAt).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${meta.color}`}
                    >
                      {meta.emoji} {meta.label}
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-neutral-400 line-clamp-1">
                    {o.items.map((it) => `${it.quantity}x ${it.name}`).join(" • ")}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </MobileShell>
  );
}
