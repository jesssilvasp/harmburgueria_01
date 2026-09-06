"use client";

import AdminShell from "@/components/AdminShell";
import { formatBRL } from "@/lib/store-config";

const groups = [
  {
    id: "carnes",
    name: "Carnes extras",
    items: [
      { name: "Carne extra 150g", price: 8 },
      { name: "Carne extra 90g", price: 5 },
      { name: "Bacon fatiado", price: 4 },
    ],
  },
  {
    id: "queijos",
    name: "Queijos",
    items: [
      { name: "Cheddar", price: 3 },
      { name: "Mussarela", price: 3 },
      { name: "Catupiry", price: 3.5 },
      { name: "Provolone", price: 4 },
    ],
  },
  {
    id: "extras",
    name: "Extras",
    items: [
      { name: "Ovo", price: 2.5 },
      { name: "Cebola caramelizada", price: 3 },
      { name: "Molho especial", price: 2 },
      { name: "Rúcula", price: 2 },
    ],
  },
];

export default function AdminAdicionaisPage() {
  return (
    <AdminShell title="Adicionais">
      <div className="flex items-center justify-end mb-4">
        <button className="btn-primary h-9 px-4 rounded-lg text-xs font-bold">
          + Novo grupo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((g) => (
          <div key={g.id} className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white">{g.name}</h3>
              <span className="text-[10px] text-neutral-500">
                {g.items.length} itens
              </span>
            </div>
            <div className="space-y-2">
              {g.items.map((it) => (
                <div
                  key={it.name}
                  className="flex items-center justify-between p-2 bg-[#1c1c1f] rounded-lg border border-[#26262b]"
                >
                  <span className="text-sm text-white">{it.name}</span>
                  <span className="text-sm font-semibold text-orange-500">
                    + {formatBRL(it.price)}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full text-xs text-orange-400 hover:underline">
              + Adicionar item
            </button>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
