"use client";

import Link from "next/link";
import MobileShell from "@/components/MobileShell";
import { useCart } from "@/lib/cart-context";
import { currentStore, formatBRL } from "@/lib/store-config";

export default function ContaPage() {
  const { orders, clear } = useCart();

  return (
    <MobileShell>
      <header className="px-4 pt-6 pb-6 bg-gradient-to-b from-[#1c1c1f] to-[#0a0a0b]">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <div className="text-xs text-neutral-500">Bem-vindo(a)</div>
            <div className="text-lg font-bold text-white">Visitante</div>
          </div>
        </div>
      </header>

      <div className="px-4 py-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4">
            <div className="text-xs text-neutral-500">Pedidos</div>
            <div className="text-2xl font-bold text-white mt-1">
              {orders.length}
            </div>
          </div>
          <div className="card p-4">
            <div className="text-xs text-neutral-500">Total gasto</div>
            <div className="text-2xl font-bold text-white mt-1">
              {formatBRL(orders.reduce((s, o) => s + o.total, 0))}
            </div>
          </div>
        </div>

        <MenuItem icon="📋" label="Meus pedidos" href="/pedidos" />
        <MenuItem icon="📍" label="Endereços salvos" href="#" comingSoon />
        <MenuItem icon="💳" label="Formas de pagamento" href="#" comingSoon />
        <MenuItem icon="🎟️" label="Meus cupons" href="#" comingSoon />
        <MenuItem icon="❤️" label="Favoritos" href="#" comingSoon />
        <MenuItem icon="🔔" label="Notificações" href="#" comingSoon />

        <div className="card p-4 mt-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wide mb-2">
            Sobre a loja
          </h3>
          <div className="text-sm text-white font-semibold">
            {currentStore.name}
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            Entrega em {currentStore.deliveryTimeMin}-
            {currentStore.deliveryTimeMax} min • Pedido mínimo{" "}
            {formatBRL(currentStore.minOrder)}
          </div>
        </div>

        <button
          onClick={clear}
          className="w-full mt-4 text-xs text-neutral-500 hover:text-red-400 transition py-2"
        >
          Limpar dados locais da demonstração
        </button>
      </div>
    </MobileShell>
  );
}

function MenuItem({
  icon,
  label,
  href,
  comingSoon = false,
}: {
  icon: string;
  label: string;
  href: string;
  comingSoon?: boolean;
}) {
  const inner = (
    <div className="card p-4 flex items-center gap-3 hover:border-orange-500/50 transition">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1 text-sm font-semibold text-white">{label}</div>
      {comingSoon ? (
        <span className="text-[10px] bg-neutral-800 text-neutral-500 px-2 py-1 rounded-full uppercase">
          Em breve
        </span>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-neutral-600">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );

  if (comingSoon) return <div className="cursor-not-allowed">{inner}</div>;
  return <Link href={href}>{inner}</Link>;
}
