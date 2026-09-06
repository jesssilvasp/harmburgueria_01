"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MobileShell from "@/components/MobileShell";
import ProductImage from "@/components/ProductImage";
import { useCart } from "@/lib/cart-context";
import { currentStore, formatBRL } from "@/lib/store-config";

export default function CarrinhoPage() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    coupon,
    applyCoupon,
    clearCoupon,
    hydrated,
  } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ ok: boolean; text: string } | null>(
    null,
  );

  const deliveryFee = subtotal > 0 ? currentStore.deliveryFee : 0;
  const discount = coupon?.discount ?? 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyCoupon = () => {
    const r = applyCoupon(couponInput);
    setCouponMsg({ ok: r.ok, text: r.message });
    if (r.ok) setCouponInput("");
  };

  if (!hydrated) {
    return (
      <MobileShell>
        <div className="pt-20 text-center text-neutral-500 text-sm">
          Carregando...
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <header className="px-4 pt-6 pb-4 bg-gradient-to-b from-[#1c1c1f] to-[#0a0a0b] flex items-center gap-3">
        <Link
          href="/"
          className="h-10 w-10 rounded-full bg-[#1c1c1f] border border-[#26262b] flex items-center justify-center"
          aria-label="Voltar"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-white">Meu Carrinho</h1>
      </header>

      {items.length === 0 ? (
        <div className="px-4 pt-20 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-lg font-bold text-white">Seu carrinho está vazio</h2>
          <p className="text-sm text-neutral-500 mt-2">
            Adicione produtos deliciosos do nosso cardápio.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block btn-primary rounded-full px-6 py-3 text-sm"
          >
            Ver cardápio
          </Link>
        </div>
      ) : (
        <>
          <div className="px-4 pt-4 space-y-3">
            {items.map((it) => (
              <div key={it.id} className="card p-3 flex gap-3">
                <ProductImage
                  emoji={it.emoji}
                  gradient={it.gradient}
                  size="sm"
                  className="h-20 w-20 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-white">{it.name}</h4>
                    <button
                      onClick={() => removeItem(it.id)}
                      className="text-neutral-500 hover:text-red-500 transition"
                      aria-label="Remover"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        <path
                          d="M6 6l12 12M18 6L6 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {it.addons.length > 0 && (
                    <div className="mt-1 text-[11px] text-orange-400">
                      + {it.addons.map((a) => a.name).join(", ")}
                    </div>
                  )}
                  {it.removed.length > 0 && (
                    <div className="mt-0.5 text-[11px] text-neutral-500">
                      Sem: {it.removed.join(", ")}
                    </div>
                  )}
                  {it.note && (
                    <div className="mt-1 text-[11px] text-neutral-400 italic">
                      &ldquo;{it.note}&rdquo;
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center bg-[#1c1c1f] rounded-full border border-[#26262b]">
                      <button
                        onClick={() => updateQuantity(it.id, it.quantity - 1)}
                        className="h-8 w-8 flex items-center justify-center text-orange-500 font-bold"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-white">
                        {it.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(it.id, it.quantity + 1)}
                        className="h-8 w-8 flex items-center justify-center text-orange-500 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-sm font-bold text-orange-500">
                      {formatBRL(it.totalPrice)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <div className="px-4 mt-4">
            <div className="card p-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wide mb-3">
                Possui cupom?
              </h3>
              {coupon ? (
                <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
                  <div>
                    <div className="text-sm font-bold text-emerald-400">
                      {coupon.code}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Desconto de {formatBRL(coupon.discount)}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      clearCoupon();
                      setCouponMsg(null);
                    }}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Digite seu cupom"
                      className="flex-1 bg-[#1c1c1f] border border-[#26262b] rounded-xl px-3 h-11 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500 transition"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="btn-ghost rounded-xl px-4 h-11 text-sm font-semibold"
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponMsg && (
                    <p
                      className={`mt-2 text-xs ${
                        couponMsg.ok ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {couponMsg.text}
                    </p>
                  )}
                  <p className="mt-2 text-[10px] text-neutral-600">
                    Experimente: BURGER10, PRIMEIRA20, FRETEGRATIS
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="px-4 mt-4">
            <div className="card p-4 space-y-2 text-sm">
              <Row label="Subtotal" value={formatBRL(subtotal)} />
              {discount > 0 && (
                <Row
                  label="Desconto"
                  value={`- ${formatBRL(discount)}`}
                  valueClass="text-emerald-400"
                />
              )}
              <Row label="Taxa de entrega" value={formatBRL(deliveryFee)} />
              <div className="border-t border-[#26262b] pt-2 mt-2 flex items-center justify-between">
                <span className="text-sm font-bold text-white">TOTAL</span>
                <span className="text-lg font-bold text-orange-500">
                  {formatBRL(total)}
                </span>
              </div>
            </div>
          </div>

          <div className="px-4 mt-6">
            <button
              onClick={() => router.push("/checkout")}
              className="btn-primary w-full h-12 rounded-full text-sm font-bold"
            >
              Continuar para entrega
            </button>
          </div>
        </>
      )}
    </MobileShell>
  );
}

function Row({
  label,
  value,
  valueClass = "text-white",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-neutral-400">{label}</span>
      <span className={`font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}
