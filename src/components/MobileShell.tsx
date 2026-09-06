import type { ReactNode } from "react";
import BottomNav from "./BottomNav";

export default function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#08090a] lg:px-6 lg:py-6">
      <div className="storefront-shell mx-auto min-h-screen w-full max-w-6xl overflow-hidden bg-[#08090a] pb-safe relative lg:border lg:border-[#292d31] lg:shadow-2xl">
        {children}
        <BottomNav />
      </div>
    </div>
  );
}
