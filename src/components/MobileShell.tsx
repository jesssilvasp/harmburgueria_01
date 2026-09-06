import type { ReactNode } from "react";
import BottomNav from "./BottomNav";

export default function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#08090a]">
      <div className="storefront-shell relative min-h-screen w-full overflow-hidden bg-[#08090a] pb-safe">
        {children}
        <BottomNav />
      </div>
    </div>
  );
}
