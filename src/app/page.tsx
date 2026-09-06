"use client";

import { useMemo, useState } from "react";
import MobileShell from "@/components/MobileShell";
import ProductImage from "@/components/ProductImage";
import ProductModal from "@/components/ProductModal";
import { categories, products } from "@/lib/mock-data";
import { productImages } from "@/lib/product-images";
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

  const featured = useMemo(
    () => products.filter((p) => p.featured || p.id === "p-smash").slice(0, 4),
    [],
  );

  return (
    <MobileShell>
      {/* Header */}
      <header className="border-b border-[#292d31] bg-[#08090a] px-4 pb-5 pt-5 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl btn-primary flex items-center justify-center text-2xl shadow-lg">
            {currentStore.logoEmoji}
          </div>
          <div className="flex-1">
            <h1 className="brand-wordmark text-lg font-black text-white leading-tight">
              Burger <strong>SaaS</strong>
            </h1>
            <div className="text-[10px] text-neutral-500 font-medium">
              {currentStore.name} • DELIVERY
            </div>
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
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center lg:grid-cols-3 lg:max-w-2xl">
          <InfoPill label="Entrega" value={`${currentStore.deliveryTimeMin}-${currentStore.deliveryTimeMax} min`} />
          <InfoPill label="Taxa" value={formatBRL(currentStore.deliveryFee)} />
          <InfoPill label="Pedido mín." value={formatBRL(currentStore.minOrder)} />
        </div>

        {/* Search */}
        <div className="mt-5 relative">
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
            className="w-full bg-[#191c1f] border border-[#292d31] rounded-lg pl-11 pr-4 h-12 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500 transition"
          />
        </div>
      </header>

      <section className="relative mx-4 mt-4 min-h-[300px] overflow-hidden rounded-xl border border-[#4b3423] bg-[#1c1008] lg:mx-8 lg:min-h-[360px]">
        <img
          src={productImages["p-xbacon"]}
          alt="Hambúrguer artesanal da Burger House"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/80 to-transparent" />
        <div className="relative flex min-h-[300px] max-w-xl flex-col justify-center p-6 lg:min-h-[360px] lg:p-12">
          <span className="eyebrow">Hambúrguer de verdade</span>
          <h2 className="mt-3 max-w-md text-4xl font-black uppercase leading-[0.92] text-white lg:text-6xl">
            Mais sabor <span className="text-orange-400">no seu dia</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm text-neutral-300 lg:text-base">
            Ingredientes selecionados, preparados com muito mais que sabor.
          </p>
          <button
            onClick={() => setActiveCategory("all")}
            className="btn-primary mt-6 flex h-11 w-fit items-center gap-6 rounded-lg px-5 text-sm uppercase"
          >
            Fazer meu pedido <span className="text-lg">→</span>
          </button>
        </div>
      </section>

      {/* Promo banner */}
      <section className="px-4 pt-4 lg:px-8">
        <div className="relative overflow-hidden rounded-xl border border-[#5b3a1e] bg-gradient-to-r from-[#351708] via-[#8d360c] to-[#17110b] p-5 shadow-lg lg:p-7">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5), transparent 50%)",
            }}
          />
          <div className="relative flex items-center gap-4 lg:min-h-28">
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
                <span className="text-2xl font-black text-orange-300">R$ 34,90</span>
                <span className="text-xs text-white/70 line-through">R$ 42,90</span>
              </div>
            </div>
            <img
              src={productImages["p-combo-turbo"]}
              alt="Combo Turbinado"
              className="h-28 w-40 rounded-lg object-cover drop-shadow-lg lg:h-36 lg:w-56"
            />
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
        <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2 lg:px-8">
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
          <div className="mt-3 grid grid-cols-2 gap-3 px-4 pb-2 md:grid-cols-4 lg:px-8">
            {featured.map((p) => (
              <button
                key={p.id}
                onClick={() => setOpenProduct(p)}
                className="card p-3 text-left hover:border-orange-500/50 transition"
              >
                <ProductImage
                  emoji={p.emoji}
                  gradient={p.gradient}
                  imageUrl={productImages[p.id]}
                  size="md"
                  className="h-32 w-full"
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
          <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
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
                  imageUrl={productImages[p.id]}
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
          ? "bg-gradient-to-r from-orange-500 to-amber-500 border-orange-500 text-black shadow-lg shadow-orange-500/20"
          : "bg-[#191c1f] border-[#292d31] text-white hover:border-orange-500/50"
      }`}
    >
      <span className="text-lg">{emoji}</span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}
