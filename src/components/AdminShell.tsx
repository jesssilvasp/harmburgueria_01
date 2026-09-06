"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { currentStore } from "@/lib/store-config";

const menu = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/pedidos", label: "Pedidos", icon: "📥" },
  { href: "/admin/cardapio", label: "Cardápio", icon: "🍔" },
  { href: "/admin/categorias", label: "Categorias", icon: "🗂️" },
  { href: "/admin/adicionais", label: "Adicionais", icon: "➕" },
  { href: "/admin/promocoes", label: "Promoções", icon: "🔥" },
  { href: "/admin/cupons", label: "Cupons", icon: "🎟️" },
  { href: "/admin/clientes", label: "Clientes", icon: "👥" },
  { href: "/admin/delivery", label: "Delivery", icon: "🛵" },
  { href: "/admin/horarios", label: "Horários", icon: "⏰" },
  { href: "/admin/financeiro", label: "Financeiro", icon: "💰" },
  { href: "/admin/configuracoes", label: "Configurações", icon: "⚙️" },
];

export default function AdminShell({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#08090a] flex text-white">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-[#111315] border-r border-[#292d31] flex flex-col transition-transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-[#26262b] flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg btn-primary flex items-center justify-center text-xl">
            {currentStore.logoEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="brand-wordmark text-sm font-black truncate">
              Burger <strong>SaaS</strong>
            </div>
            <div className="text-[10px] text-neutral-500 truncate">
              {currentStore.name} delivery
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold">
              ● Aberto
            </div>
          </div>
          <button
            className="lg:hidden text-neutral-400"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          {menu.map((m) => {
            const active =
              m.href === "/admin" ? pathname === "/admin" : pathname.startsWith(m.href);
            return (
              <Link
                key={m.href}
                href={m.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  active
                    ? "bg-orange-500/15 text-orange-400 border border-orange-500/30"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <span className="text-lg">{m.icon}</span>
                <span className="font-medium">{m.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#26262b]">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white px-2 py-1"
          >
            <span>←</span> Voltar para o app
          </Link>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 bg-[#08090a]/95 backdrop-blur border-b border-[#292d31] px-4 lg:px-6 h-16 flex items-center gap-3">
          <button
            className="lg:hidden h-9 w-9 rounded-lg bg-[#1c1c1f] border border-[#26262b] flex items-center justify-center"
            onClick={() => setMobileOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold">{title}</h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
            <span>Hoje</span>
            <span className="h-4 w-px bg-[#26262b]" />
            <span>{new Date().toLocaleDateString("pt-BR")}</span>
          </div>
          <div className="h-9 w-9 rounded-full btn-primary flex items-center justify-center text-sm font-bold text-black">
            A
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
