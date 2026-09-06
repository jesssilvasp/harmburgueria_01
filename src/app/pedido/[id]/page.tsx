"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import MobileShell from "@/components/MobileShell";
import { useCart } from "@/lib/cart-context";
import { formatBRL } from "@/lib/store-config";
import type { OrderStatus } from "@/lib/types";

const statusSteps: { id: OrderStatus; label: string; icon: string }[] = [
  { id: "recebido", label: "Pedido recebido", icon: "📥" },
  { id: "confirmado", label: "Confirmado", icon: "✅" },
  { id: "preparo", label: "Em preparo", icon: "👨‍🍳" },
  { id: "pronto", label: "Pronto", icon: "🍔" },
  { id: "entrega", label: "Saiu para entrega", icon: "🛵" },
  { id: "entregue", label: "Entregue", icon: "🎉" },
];

const paymentLabels: Record<string, string> = {
  pix: "PIX",
  dinheiro: "Dinheiro",
  cartao: "Cartão na entrega",
};

export default function PedidoDetalhePage() {
  const params = useParams<{ id: string }>();
  const { orders, hydrated } = useCart();

  if (!hydrated) {
    return (
      <MobileShell>
        <div className="pt-20 text-center text-neutral-500 text-sm">
          Carregando...
        </div>
      </MobileShell>
    );
  }

  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    return (
      <MobileShell>
        <div className="px-4 pt-20 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-lg font-bold text-white">Pedido não encontrado</h2>
          <Link
            href="/"
            className="mt-6 inline-block btn-primary rounded-full px-6 py-3 text-sm"
          >
            Voltar ao cardápio
          </Link>
        </div>
      </MobileShell>
    );
  }

  const currentStepIndex = statusSteps.findIndex((s) => s.id === order.status);

  return (
    <MobileShell>
      {/* Success header */}
      <header className="px-4 pt-8 pb-6 bg-gradient-to-b from-orange-500/20 to-transparent text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-4xl shadow-2xl mb-3 animate-fadeInUp">
          🍔
        </div>
        <div className="text-xs text-neutral-400 uppercase tracking-wider">
          Pedido #{order.number}
        </div>
        <h1 className="mt-1 text-2xl font-bold text-white">
          Seu pedido foi recebido!
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          Previsão de entrega: {order.estimatedTime}
        </p>
      </header>

      <div className="px-4 space-y-4">
        {/* Timeline */}
        <div className="card p-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wide mb-4">
            Acompanhe seu pedido
          </h3>
          <div className="space-y-4">
            {statusSteps.map((step, idx) => {
              const done = idx < currentStepIndex;
              const active = idx === currentStepIndex;
              return (
                <div key={step.id} className="flex items-start gap-3">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center text-sm transition ${
                        done
                          ? "bg-emerald-500 text-black"
                          : active
                            ? "bg-gradient-to-br from-orange-500 to-amber-500 text-black"
                            : "bg-[#1c1c1f] border border-[#26262b] text-neutral-600"
                      }`}
                    >
                      {done ? (
                        <svg viewBox="0 0 24 24" className="h-4 w-4">
                          <path
                            d="M5 12l5 5 9-11"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <span>{step.icon}</span>
                      )}
                    </div>
                    {idx < statusSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-8 mt-1 ${
                          done ? "bg-emerald-500" : "bg-[#26262b]"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div
                      className={`text-sm font-semibold ${
                        done || active ? "text-white" : "text-neutral-500"
                      }`}
                    >
                      {step.label}
                    </div>
                    {active && (
                      <div className="text-[11px] text-orange-400 mt-0.5">
                        Em andamento...
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order info */}
        <div className="card p-4 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wide">
            Resumo do pedido
          </h3>
          <div className="space-y-2">
            {order.items.map((it) => (
              <div key={it.id} className="flex justify-between text-sm">
                <div className="flex-1">
                  <div className="text-white">
                    {it.quantity}x {it.name}
                  </div>
                  {it.addons.length > 0 && (
                    <div className="text-[11px] text-neutral-500">
                      + {it.addons.map((a) => a.name).join(", ")}
                    </div>
                  )}
                </div>
                <div className="text-white font-medium">
                  {formatBRL(it.totalPrice)}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#26262b] pt-3 space-y-1 text-sm">
            <Row label="Subtotal" value={formatBRL(order.subtotal)} />
            {order.discount > 0 && (
              <Row
                label="Desconto"
                value={`- ${formatBRL(order.discount)}`}
                valueClass="text-emerald-400"
              />
            )}
            <Row label="Taxa de entrega" value={formatBRL(order.deliveryFee)} />
            <div className="flex justify-between pt-1">
              <span className="font-bold text-white">Total</span>
              <span className="font-bold text-orange-500">
                {formatBRL(order.total)}
              </span>
            </div>
          </div>
        </div>

        <div className="card p-4 space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wide">
            Entrega
          </h3>
          <div className="text-sm text-neutral-300">
            {order.address.street}, {order.address.number}
            {order.address.complement ? ` — ${order.address.complement}` : ""}
          </div>
          <div className="text-xs text-neutral-500">
            {order.address.neighborhood} • CEP {order.address.cep}
          </div>
          {order.address.reference && (
            <div className="text-[11px] text-neutral-500 italic">
              Ref: {order.address.reference}
            </div>
          )}
        </div>

        <div className="card p-4 space-y-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wide">
            Pagamento
          </h3>
          <div className="text-sm text-white">
            {paymentLabels[order.payment.method]}
          </div>
          {order.payment.changeFor && (
            <div className="text-[11px] text-neutral-500">
              Troco para {formatBRL(order.payment.changeFor)}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/pedidos"
            className="btn-ghost h-12 rounded-full text-sm font-semibold flex items-center justify-center"
          >
            Meus pedidos
          </Link>
          <Link
            href="/"
            className="btn-primary h-12 rounded-full text-sm font-bold flex items-center justify-center"
          >
            Novo pedido
          </Link>
        </div>
      </div>
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
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-400">{label}</span>
      <span className={`font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}
