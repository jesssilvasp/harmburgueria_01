"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MobileShell from "@/components/MobileShell";
import ProductImage from "@/components/ProductImage";
import ProductModal from "@/components/ProductModal";
import { categories, products } from "@/lib/mock-data";
import { currentStore, formatBRL } from "@/lib/store-config";
import type { CategoryId, Product } from "@/lib/types";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | "all">("all");
  const [search, setSearch] = useState("");
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCategory, search]);

  const featured = useMemo(() => products.filter((p) => p.featured), []);

  return (
    <MobileShell>
      {/* Header */}
      <header className="px-4 pt-6 pb-4 bg-gradient-to-b from-[#1c1c1f] to-[#0a0a0b]">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-2xl shadow-lg">
            {currentStore.logoEmoji}
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white leading-tight">
              {currentStore.name}
            </h1>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulseDot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-emerald-400">
                ABERTO
              </span>
            </div>
          </div>
          <Link
            href="/admin"
            className="h-9 px-3 rounded-full bg-[#1c1c1f] border border-[#26262b] text-[11px] text-neutral-400 hover:text-white flex items-center gap-1"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M12 2 3 7v6c0 5 4 8.5 9 9 5-.5 9-4 9-9V7l-9-5Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
            Admin
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <InfoPill label="Entrega" value={`${currentStore.deliveryTimeMin}-${currentStore.deliveryTimeMax} min`} />
          <InfoPill label="Taxa" value={formatBRL(currentStore.deliveryFee)} />
          <InfoPill label="Pedido mín." value={formatBRL(currentStore.minOrder)} />
        </div>

        {/* Search */}
        <div className="mt-4 relative">
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
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar no cardápio..."
            className="w-full bg-[#1c1c1f] border border-[#26262b] rounded-full pl-11 pr-4 h-12 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500 transition"
          />
        </div>
      </header>

      {/* Promo banner */}
      <section className="px-4 pt-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-5 shadow-lg">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5), transparent 50%)",
            }}
          />
          <div className="relative flex items-center gap-4">
            <div className="flex-1">
              <div className="inline-block bg-black/40 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                Promoção
              </div>
              <h2 className="mt-2 text-2xl font-black text-white leading-tight">
                COMBO<br />TURBINADO
              </h2>
              <p className="mt-1 text-xs text-white/90">
                Burger + Batata + Refrigerante
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">R$ 34,90</span>
                <span className="text-xs text-white/70 line-through">R$ 42,90</span>
              </div>
            </div>
            <div className="text-7xl drop-shadow-lg">🍔</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mt-6">
        <div className="px-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">
            Categorias
          </h3>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar px-4 pb-2">
          <CategoryChip
            emoji="✨"
            label="Todos"
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {categories.map((c) => (
            <CategoryChip
              key={c.id}
              emoji={c.emoji}
              label={c.name}
              active={activeCategory === c.id}
              onClick={() => setActiveCategory(c.id)}
            />
          ))}
        </div>
      </section>

      {/* Featured */}
      {activeCategory === "all" && !search && (
        <section className="mt-6">
          <div className="px-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              Destaques
            </h3>
            <span className="text-[10px] text-orange-400 font-semibold">
              🔥 Mais pedidos
            </span>
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
            {featured.map((p) => (
              <button
                key={p.id}
                onClick={() => setOpenProduct(p)}
                className="min-w-[180px] card p-3 text-left hover:border-orange-500/50 transition"
              >
                <ProductImage
                  emoji={p.emoji}
                  gradient={p.gradient}
                  size="md"
                  className="w-full h-32"
                />
                <div className="mt-3">
                  <h4 className="text-sm font-bold text-white line-clamp-1">
                    {p.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1 min-h-[28px]">
                    {p.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-base font-bold text-orange-500">
                      {formatBRL(p.promoPrice ?? p.price)}
                    </div>
                    <div className="h-8 w-8 rounded-full btn-primary flex items-center justify-center text-lg leading-none">
                      +
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Product list */}
      <section className="mt-6 px-4 pb-8">
        <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-3">
          {activeCategory === "all"
            ? "Cardápio"
            : categories.find((c) => c.id === activeCategory)?.name}
          <span className="ml-2 text-neutral-500 font-normal">
            {filtered.length} itens
          </span>
        </h3>

        {filtered.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-sm text-neutral-400">
              Nenhum produto encontrado.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => p.available && setOpenProduct(p)}
                disabled={!p.available}
                className={`w-full card p-3 flex gap-3 text-left transition ${
                  p.available
                    ? "hover:border-orange-500/50"
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                <ProductImage
                  emoji={p.emoji}
                  gradient={p.gradient}
                  size="sm"
                  className="flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white truncate">
                      {p.name}
                    </h4>
                    {!p.available && (
                      <span className="text-[9px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full uppercase">
                        Indisponível
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1">
                    {p.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      {p.promoPrice ? (
                        <>
                          <span className="text-base font-bold text-orange-500">
                            {formatBRL(p.promoPrice)}
                          </span>
                          <span className="text-[11px] text-neutral-600 line-through">
                            {formatBRL(p.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-base font-bold text-orange-500">
                          {formatBRL(p.price)}
                        </span>
                      )}
                    </div>
                    <div className="h-9 w-9 rounded-full btn-primary flex items-center justify-center text-xl leading-none">
                      +
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <ProductModal
        product={openProduct}
        onClose={() => setOpenProduct(null)}
      />
    </MobileShell>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1c1c1f] border border-[#26262b] rounded-xl py-2 px-2">
      <div className="text-[9px] uppercase text-neutral-500 tracking-wider">
        {label}
      </div>
      <div className="text-xs font-bold text-white">{value}</div>
    </div>
  );
}

function CategoryChip({
  emoji,
  label,
  active,
  onClick,
}: {
  emoji: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 flex items-center gap-2 h-11 px-4 rounded-full border transition ${
        active
          ? "bg-gradient-to-r from-orange-500 to-amber-500 border-orange-500 text-black"
          : "bg-[#1c1c1f] border-[#26262b] text-white hover:border-orange-500/50"
      }`}
    >
      <span className="text-lg">{emoji}</span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}
