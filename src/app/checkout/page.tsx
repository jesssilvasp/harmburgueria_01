"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MobileShell from "@/components/MobileShell";
import { useCart } from "@/lib/cart-context";
import { currentStore, formatBRL } from "@/lib/store-config";
import type { Order, PaymentMethod } from "@/lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, coupon, addOrder, clear, hydrated } = useCart();

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState(
    currentStore.neighborhoods[0]?.name ?? "",
  );
  const [reference, setReference] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("pix");
  const [needsChange, setNeedsChange] = useState<"sim" | "nao">("nao");
  const [changeFor, setChangeFor] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (hydrated && items.length === 0) {
      router.replace("/");
    }
  }, [hydrated, items.length, router]);

  const selectedNeighborhood = currentStore.neighborhoods.find(
    (n) => n.name === neighborhood,
  );
  const deliveryFee = selectedNeighborhood?.fee ?? currentStore.deliveryFee;
  const discount = coupon?.discount ?? 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const canSubmit =
    name.trim() &&
    whatsapp.trim() &&
    cep.trim() &&
    street.trim() &&
    number.trim() &&
    neighborhood;

  const handleSubmit = () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);

    const order: Order = {
      id: `ord_${Date.now()}`,
      number: Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      status: "recebido",
      items,
      subtotal,
      discount,
      deliveryFee,
      total,
      customer: { name: name.trim(), whatsapp: whatsapp.trim() },
      address: {
        cep: cep.trim(),
        street: street.trim(),
        number: number.trim(),
        complement: complement.trim() || undefined,
        neighborhood,
        reference: reference.trim() || undefined,
      },
      payment: {
        method: payment,
        changeFor:
          payment === "dinheiro" && needsChange === "sim" && changeFor
            ? Number(changeFor.replace(",", "."))
            : undefined,
      },
      estimatedTime: `${currentStore.deliveryTimeMin}-${currentStore.deliveryTimeMax} min`,
    };

    addOrder(order);
    clear();
    router.push(`/pedido/${order.id}`);
  };

  return (
    <MobileShell>
      <header className="px-4 pt-6 pb-4 bg-gradient-to-b from-[#1c1c1f] to-[#0a0a0b] flex items-center gap-3">
        <Link
          href="/carrinho"
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
        <h1 className="text-xl font-bold text-white">Checkout</h1>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* Dados do cliente */}
        <Section title="1. Seus dados" icon="👤">
          <Field label="Nome completo">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como você quer ser chamado"
              className={inputCls}
            />
          </Field>
          <Field label="WhatsApp">
            <input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="(11) 98888-8888"
              className={inputCls}
              inputMode="tel"
            />
          </Field>
        </Section>

        {/* Endereço */}
        <Section title="2. Endereço de entrega" icon="📍">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <Field label="CEP">
                <input
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="00000-000"
                  className={inputCls}
                  inputMode="numeric"
                />
              </Field>
            </div>
            <div className="col-span-2">
              <Field label="Rua">
                <input
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Nome da rua"
                  className={inputCls}
                />
              </Field>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <Field label="Número">
                <input
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="123"
                  className={inputCls}
                />
              </Field>
            </div>
            <div className="col-span-2">
              <Field label="Complemento (opcional)">
                <input
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                  placeholder="Apto 42, bloco B"
                  className={inputCls}
                />
              </Field>
            </div>
          </div>
          <Field label="Bairro">
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className={inputCls}
            >
              {currentStore.neighborhoods.map((n) => (
                <option key={n.name} value={n.name}>
                  {n.name} — {formatBRL(n.fee)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Ponto de referência (opcional)">
            <input
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Próximo ao mercado, portão azul..."
              className={inputCls}
            />
          </Field>
        </Section>

        {/* Pagamento */}
        <Section title="3. Forma de pagamento" icon="💳">
          <div className="space-y-2">
            {(
              [
                { id: "pix", label: "PIX", emoji: "⚡", desc: "Aprovação instantânea" },
                { id: "dinheiro", label: "Dinheiro", emoji: "💵", desc: "Pagar na entrega" },
                { id: "cartao", label: "Cartão na entrega", emoji: "💳", desc: "Débito ou crédito" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPayment(opt.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition text-left ${
                  payment === opt.id
                    ? "bg-orange-500/10 border-orange-500/60"
                    : "bg-[#1c1c1f] border-[#26262b] hover:border-neutral-700"
                }`}
              >
                <div className="text-2xl">{opt.emoji}</div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-white">{opt.label}</div>
                  <div className="text-[11px] text-neutral-500">{opt.desc}</div>
                </div>
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${
                    payment === opt.id ? "border-orange-500" : "border-neutral-600"
                  }`}
                >
                  {payment === opt.id && (
                    <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {payment === "dinheiro" && (
            <div className="mt-4 space-y-3">
              <Field label="Precisa de troco?">
                <div className="flex gap-2">
                  {(["nao", "sim"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setNeedsChange(v)}
                      className={`flex-1 h-11 rounded-xl border transition text-sm font-semibold ${
                        needsChange === v
                          ? "bg-orange-500 text-black border-orange-500"
                          : "bg-[#1c1c1f] text-white border-[#26262b]"
                      }`}
                    >
                      {v === "sim" ? "Sim" : "Não"}
                    </button>
                  ))}
                </div>
              </Field>
              {needsChange === "sim" && (
                <Field label="Troco para quanto?">
                  <input
                    value={changeFor}
                    onChange={(e) => setChangeFor(e.target.value)}
                    placeholder="Ex.: 100,00"
                    className={inputCls}
                    inputMode="decimal"
                  />
                </Field>
              )}
            </div>
          )}
        </Section>

        {/* Summary */}
        <div className="card p-4 space-y-2 text-sm">
          <Row label="Subtotal" value={formatBRL(subtotal)} />
          {discount > 0 && (
            <Row
              label={`Desconto ${coupon?.code ? `(${coupon.code})` : ""}`}
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

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className="btn-primary w-full h-12 rounded-full text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Enviando..." : `Fazer pedido • ${formatBRL(total)}`}
        </button>
        {!canSubmit && (
          <p className="text-center text-[11px] text-neutral-500">
            Preencha todos os campos obrigatórios.
          </p>
        )}
      </div>
    </MobileShell>
  );
}

const inputCls =
  "w-full bg-[#1c1c1f] border border-[#26262b] rounded-xl px-3 h-11 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500 transition";

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h2 className="text-sm font-bold text-white uppercase tracking-wide">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] text-neutral-400 mb-1.5 font-medium">
        {label}
      </label>
      {children}
    </div>
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
