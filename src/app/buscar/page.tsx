"use client";

import { useMemo, useState } from "react";
import MobileShell from "@/components/MobileShell";
import ProductImage from "@/components/ProductImage";
import ProductModal from "@/components/ProductModal";
import { products } from "@/lib/mock-data";
import { productImages } from "@/lib/product-images";
import { formatBRL } from "@/lib/store-config";
import type { Product } from "@/lib/types";

const suggestions = ["Bacon", "Combo", "Batata", "Milkshake", "Smash", "Chicken"];

export default function BuscarPage() {
  const [query, setQuery] = useState("");
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <MobileShell>
      <header className="px-4 pt-6 pb-4 bg-gradient-to-b from-[#1c1c1f] to-[#0a0a0b]">
        <h1 className="text-xl font-bold text-white mb-4">Buscar</h1>
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="m20 20-3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O que você quer comer?"
            className="w-full bg-[#1c1c1f] border border-[#26262b] rounded-full pl-11 pr-4 h-12 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500 transition"
          />
        </div>
      </header>

      <div className="px-4 py-4">
        {!query.trim() ? (
          <div>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wide mb-3">
              Sugestões
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-3 h-9 rounded-full bg-[#1c1c1f] border border-[#26262b] text-sm text-white hover:border-orange-500/50 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="card p-8 text-center mt-6">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-sm text-neutral-400">
              Nenhum produto encontrado para &ldquo;{query}&rdquo;.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-neutral-500">
              {results.length} resultado(s)
            </p>
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => setOpenProduct(p)}
                className="w-full card p-3 flex gap-3 text-left hover:border-orange-500/50 transition"
              >
                <ProductImage
                  emoji={p.emoji}
                  gradient={p.gradient}
                  imageUrl={productImages[p.id]}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">
                    {p.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1">
                    {p.description}
                  </p>
                  <div className="mt-2 text-base font-bold text-orange-500">
                    {formatBRL(p.promoPrice ?? p.price)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <ProductModal product={openProduct} onClose={() => setOpenProduct(null)} />
    </MobileShell>
  );
}
