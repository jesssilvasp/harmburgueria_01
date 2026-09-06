"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatBRL } from "@/lib/store-config";

const items = [
  { href: "/", label: "Início", icon: HomeIcon },
  { href: "/buscar", label: "Buscar", icon: SearchIcon },
  { href: "/pedidos", label: "Pedidos", icon: OrdersIcon },
  { href: "/conta", label: "Conta", icon: AccountIcon },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalQuantity, subtotal } = useCart();

  const showCart = totalQuantity > 0;

  return (
    <>
      {showCart && (
        <Link
          href="/carrinho"
          className="fixed left-1/2 -translate-x-1/2 z-40 animate-fadeInUp"
          style={{ bottom: "calc(4.5rem + env(safe-area-inset-bottom, 0px))" }}
        >
          <div className="btn-primary flex items-center gap-3 rounded-full px-5 py-3 shadow-2xl">
            <div className="relative">
              <CartIcon className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 bg-neutral-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            </div>
            <span className="text-sm font-bold">Ver carrinho</span>
            <span className="text-sm font-bold">{formatBRL(subtotal)}</span>
          </div>
        </Link>
      )}

      <nav
        className="fixed bottom-0 left-0 right-0 z-30 bg-[#0a0a0b]/95 backdrop-blur border-t border-[#26262b]"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-4">
            {items.map((it) => {
              const active =
                it.href === "/" ? pathname === "/" : pathname.startsWith(it.href);
              const Icon = it.icon;
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`flex flex-col items-center gap-1 py-3 transition-colors ${
                    active ? "text-orange-500" : "text-neutral-500"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-[11px] font-medium">{it.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

function HomeIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m20 20-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OrdersIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 8h8M8 12h8M8 16h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AccountIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3 4h2l2.4 12.3a2 2 0 0 0 2 1.7h8.2a2 2 0 0 0 2-1.6L21 8H6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="21" r="1.5" fill="currentColor" />
      <circle cx="17" cy="21" r="1.5" fill="currentColor" />
    </svg>
  );
}
