"use client";

import AdminShell from "@/components/AdminShell";
import ProductImage from "@/components/ProductImage";
import { products } from "@/lib/mock-data";
import { productImages } from "@/lib/product-images";
import { formatBRL } from "@/lib/store-config";

export default function AdminPromocoesPage() {
  const promo = products.filter((p) => p.promoPrice);

  return (
    <AdminShell title="Promoções">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-neutral-500">
          {promo.length} promoções ativas
        </p>
        <button className="btn-primary h-9 px-4 rounded-lg text-xs font-bold">
          + Nova promoção
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promo.map((p) => {
          const discount = Math.round(((p.price - (p.promoPrice ?? 0)) / p.price) * 100);
          return (
            <div key={p.id} className="card overflow-hidden">
              <div className="relative">
                <ProductImage
                  emoji={p.emoji}
                  gradient={p.gradient}
                  imageUrl={productImages[p.id]}
                  size="lg"
                  className="rounded-none h-40"
                />
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{discount}%
                </div>
                <div className="absolute top-3 right-3 bg-emerald-500 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                  Ativa
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-white">{p.name}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-orange-500">
                    {formatBRL(p.promoPrice ?? 0)}
                  </span>
                  <span className="text-xs text-neutral-500 line-through">
                    {formatBRL(p.price)}
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 btn-ghost rounded-lg py-1.5 text-xs">
                    Editar
                  </button>
                  <button className="flex-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg py-1.5 text-xs">
                    Pausar
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
