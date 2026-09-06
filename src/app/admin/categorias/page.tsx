"use client";

import AdminShell from "@/components/AdminShell";
import { categories, products } from "@/lib/mock-data";

export default function AdminCategoriasPage() {
  return (
    <AdminShell title="Categorias">
      <div className="flex items-center justify-end mb-4">
        <button className="btn-primary h-9 px-4 rounded-lg text-xs font-bold">
          + Nova categoria
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.id).length;
          return (
            <div key={c.id} className="card p-5 flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center text-3xl">
                {c.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-bold text-white">{c.name}</div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {count} produtos
                </div>
                <div className="mt-2 flex gap-2 text-[11px]">
                  <button className="text-orange-400 hover:underline">Editar</button>
                  <span className="text-neutral-700">•</span>
                  <button className="text-neutral-400 hover:text-red-400">
                    Remover
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AdminShell>
  );
}
