"use client";

import { useState } from "react";
import AdminShell from "@/components/AdminShell";
import ProductImage from "@/components/ProductImage";
import { categories, products as initialProducts } from "@/lib/mock-data";
import { productImages } from "@/lib/product-images";
import { formatBRL } from "@/lib/store-config";
import type { Product } from "@/lib/types";

export default function AdminCardapioPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState<string>("all");

  const toggleAvailable = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, available: !p.available } : p)),
    );
  };

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <AdminShell title="Cardápio">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`h-9 px-3 rounded-lg text-xs font-semibold transition ${
              filter === "all"
                ? "bg-orange-500 text-black"
                : "bg-[#1c1c1f] text-neutral-400 border border-[#26262b] hover:text-white"
            }`}
          >
            Todos ({products.length})
          </button>
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`h-9 px-3 rounded-lg text-xs font-semibold transition ${
                  filter === c.id
                    ? "bg-orange-500 text-black"
                    : "bg-[#1c1c1f] text-neutral-400 border border-[#26262b] hover:text-white"
                }`}
              >
                {c.emoji} {c.name} ({count})
              </button>
            );
          })}
        </div>
        <button className="btn-primary h-9 px-4 rounded-lg text-xs font-bold">
          + Novo produto
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1c1c1f] text-neutral-400 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Produto</th>
                <th className="text-left px-4 py-3 font-medium">Categoria</th>
                <th className="text-right px-4 py-3 font-medium">Preço</th>
                <th className="text-center px-4 py-3 font-medium">Disponível</th>
                <th className="text-right px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-[#26262b] hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <ProductImage
                        emoji={p.emoji}
                        gradient={p.gradient}
                        imageUrl={productImages[p.id]}
                        size="sm"
                        className="h-12 w-12"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-white truncate max-w-[240px]">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-neutral-500 truncate max-w-[240px]">
                          {p.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-400 text-xs">
                    {categories.find((c) => c.id === p.category)?.name}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {p.promoPrice ? (
                      <div>
                        <div className="text-orange-500 font-bold">
                          {formatBRL(p.promoPrice)}
                        </div>
                        <div className="text-[10px] text-neutral-500 line-through">
                          {formatBRL(p.price)}
                        </div>
                      </div>
                    ) : (
                      <div className="text-white font-medium">
                        {formatBRL(p.price)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleAvailable(p.id)}
                      className={`h-6 w-11 rounded-full relative transition ${
                        p.available ? "bg-emerald-500" : "bg-neutral-700"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all shadow ${
                          p.available ? "left-[22px]" : "left-0.5"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-neutral-400 hover:text-orange-500 text-xs mr-2">
                      Editar
                    </button>
                    <button className="text-neutral-400 hover:text-red-400 text-xs">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
