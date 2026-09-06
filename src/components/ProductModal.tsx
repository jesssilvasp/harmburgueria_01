"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product, CartItem, CartAddon } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { formatBRL } from "@/lib/store-config";
import ProductImage from "./ProductImage";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: Props) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});
  const [removed, setRemoved] = useState<Record<string, boolean>>({});
  const [note, setNote] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedAddons({});
      setRemoved({});
      setNote("");
      setJustAdded(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  const base = useMemo(() => {
    if (!product) return 0;
    return product.promoPrice ?? product.price;
  }, [product]);

  const addonsTotal = useMemo(() => {
    if (!product?.addons) return 0;
    return product.addons
      .filter((a) => selectedAddons[a.id])
      .reduce((s, a) => s + a.price, 0);
  }, [product, selectedAddons]);

  const unitPrice = base + addonsTotal;
  const total = unitPrice * quantity;

  if (!product) return null;

  const handleAdd = () => {
    const chosenAddons: CartAddon[] =
      product.addons?.filter((a) => selectedAddons[a.id]).map((a) => ({
        id: a.id,
        name: a.name,
        price: a.price,
      })) ?? [];

    const removedNames =
      product.removables?.filter((r) => removed[r.id]).map((r) => r.name) ?? [];

    const cartItem: CartItem = {
      id: `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      productId: product.id,
      name: product.name,
      emoji: product.emoji,
      gradient: product.gradient,
      basePrice: base,
      quantity,
      addons: chosenAddons,
      removed: removedNames,
      note: note.trim() || undefined,
      unitPrice,
      totalPrice: total,
    };

    addItem(cartItem);
    setJustAdded(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[92vh] overflow-y-auto bg-[#141416] rounded-t-3xl sm:rounded-3xl border border-[#26262b] animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative">
          <ProductImage
            emoji={product.emoji}
            gradient={product.gradient}
            size="xl"
            className="rounded-none rounded-t-3xl sm:rounded-t-3xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black/80 transition"
            aria-label="Fechar"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="absolute top-4 left-4 h-1 w-10 rounded-full bg-white/60 sm:hidden" />
        </div>

        <div className="p-5 space-y-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl font-bold text-white">{product.name}</h2>
              <div className="text-right">
                {product.promoPrice ? (
                  <>
                    <div className="text-xs text-neutral-500 line-through">
                      {formatBRL(product.price)}
                    </div>
                    <div className="text-xl font-bold text-orange-500">
                      {formatBRL(product.promoPrice)}
                    </div>
                  </>
                ) : (
                  <div className="text-xl font-bold text-orange-500">
                    {formatBRL(product.price)}
                  </div>
                )}
              </div>
            </div>
            <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.addons && product.addons.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                  Adicionais
                </h3>
                <span className="text-[10px] text-neutral-500">Opcional</span>
              </div>
              <div className="space-y-2">
                {product.addons.map((a) => {
                  const checked = !!selectedAddons[a.id];
                  return (
                    <label
                      key={a.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                        checked
                          ? "bg-orange-500/10 border-orange-500/60"
                          : "bg-[#1c1c1f] border-[#26262b] hover:border-neutral-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-5 w-5 rounded-md flex items-center justify-center border-2 transition ${
                            checked
                              ? "bg-orange-500 border-orange-500"
                              : "border-neutral-600"
                          }`}
                        >
                          {checked && (
                            <svg viewBox="0 0 24 24" className="h-3 w-3 text-black">
                              <path
                                d="M5 12l5 5 9-11"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-white">{a.name}</span>
                      </div>
                      <span className="text-sm font-medium text-orange-400">
                        + {formatBRL(a.price)}
                      </span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={(e) =>
                          setSelectedAddons((s) => ({
                            ...s,
                            [a.id]: e.target.checked,
                          }))
                        }
                      />
                    </label>
                  );
                })}
              </div>
            </section>
          )}

          {product.removables && product.removables.length > 0 && (
            <section>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-3">
                Remover ingredientes
              </h3>
              <div className="space-y-2">
                {product.removables.map((r) => {
                  const checked = !!removed[r.id];
                  return (
                    <label
                      key={r.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#1c1c1f] border border-[#26262b] cursor-pointer hover:border-neutral-700 transition"
                    >
                      <span className="text-sm text-white">{r.name}</span>
                      <div
                        className={`h-5 w-9 rounded-full transition relative ${
                          checked ? "bg-orange-500" : "bg-neutral-700"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                            checked ? "left-4" : "left-0.5"
                          }`}
                        />
                      </div>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={(e) =>
                          setRemoved((s) => ({ ...s, [r.id]: e.target.checked }))
                        }
                      />
                    </label>
                  );
                })}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-2">
              Observações
            </h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex.: sem cebola, ponto da carne bem passada..."
              rows={2}
              className="w-full bg-[#1c1c1f] border border-[#26262b] rounded-xl p-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 transition resize-none"
              maxLength={140}
            />
          </section>
        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 bg-[#141416] border-t border-[#26262b] p-4 flex items-center gap-3">
          <div className="flex items-center bg-[#1c1c1f] rounded-full border border-[#26262b]">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="h-11 w-11 flex items-center justify-center text-orange-500 text-xl font-bold hover:bg-white/5 rounded-l-full"
              aria-label="Diminuir"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-bold text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              className="h-11 w-11 flex items-center justify-center text-orange-500 text-xl font-bold hover:bg-white/5 rounded-r-full"
              aria-label="Aumentar"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAdd}
            disabled={justAdded}
            className="btn-primary flex-1 h-12 rounded-full text-sm font-bold flex items-center justify-center gap-2"
          >
            {justAdded ? (
              <>
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    d="M5 12l5 5 9-11"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Adicionado!
              </>
            ) : (
              <>
                Adicionar
                <span className="opacity-80">•</span>
                <span>{formatBRL(total)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
