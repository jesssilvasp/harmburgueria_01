"use client";

import { useState } from "react";
import AdminShell from "@/components/AdminShell";
import { mockOrders, type MockOrder } from "@/lib/mock-data";
import { formatBRL } from "@/lib/store-config";

type Status = MockOrder["status"];

const columns: { id: Status; title: string; color: string }[] = [
  { id: "novo", title: "Novos", color: "border-blue-500" },
  { id: "confirmado", title: "Confirmados", color: "border-cyan-500" },
  { id: "preparo", title: "Em preparo", color: "border-orange-500" },
  { id: "pronto", title: "Prontos", color: "border-amber-500" },
  { id: "entrega", title: "Saíram p/ entrega", color: "border-purple-500" },
  { id: "entregue", title: "Entregues", color: "border-emerald-500" },
];

const nextStatus: Record<Status, Status | null> = {
  novo: "confirmado",
  confirmado: "preparo",
  preparo: "pronto",
  pronto: "entrega",
  entrega: "entregue",
  entregue: null,
};

export default function AdminPedidosPage() {
  const [orders, setOrders] = useState<MockOrder[]>(mockOrders);

  const advance = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = nextStatus[o.status];
        return next ? { ...o, status: next } : o;
      }),
    );
  };

  const grouped = columns.map((c) => ({
    ...c,
    orders: orders.filter((o) => o.status === c.id),
  }));

  return (
    <AdminShell title="Gestão de Pedidos">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-neutral-400">Total ativos:</span>
          <span className="text-sm font-bold text-white">
            {orders.filter((o) => o.status !== "entregue").length}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulseDot" />
          <span className="text-neutral-400">Atualização em tempo real</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-3">
        {grouped.map((col) => (
          <div key={col.id} className="min-w-0">
            <div
              className={`bg-[#141416] border-t-2 ${col.color} border-x border-b border-[#26262b] rounded-lg`}
            >
              <div className="px-3 py-2 border-b border-[#26262b] flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wide">
                  {col.title}
                </span>
                <span className="text-xs font-bold bg-[#1c1c1f] px-2 py-0.5 rounded-full text-neutral-400">
                  {col.orders.length}
                </span>
              </div>
              <div className="p-2 space-y-2 min-h-[200px] max-h-[calc(100vh-220px)] overflow-y-auto">
                {col.orders.length === 0 ? (
                  <div className="text-center text-[11px] text-neutral-600 py-6">
                    Nenhum pedido
                  </div>
                ) : (
                  col.orders.map((o) => (
                    <div
                      key={o.id}
                      className="bg-[#1c1c1f] border border-[#26262b] rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-orange-500">
                          #{o.number}
                        </span>
                        <span className="text-[10px] text-neutral-500">
                          {o.time}
                        </span>
                      </div>
                      <div className="mt-1 text-sm font-semibold text-white truncate">
                        {o.customer}
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {o.items.map((it, idx) => (
                          <div key={idx} className="text-[11px] text-neutral-400">
                            {it.qty}x {it.name}
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] text-neutral-500">
                          {o.neighborhood} • {o.payment}
                        </span>
                        <span className="text-sm font-bold text-white">
                          {formatBRL(o.total)}
                        </span>
                      </div>
                      {nextStatus[o.status] && (
                        <button
                          onClick={() => advance(o.id)}
                          className="mt-2 w-full btn-primary rounded-md py-1.5 text-[11px] font-bold"
                        >
                          Avançar →
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
