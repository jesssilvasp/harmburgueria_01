import type { ReactNode } from "react";
import BottomNav from "./BottomNav";

export default function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <div className="mx-auto min-h-screen w-full max-w-6xl bg-[#0a0a0b] pb-safe relative">
        {children}
        <BottomNav />
      </div>
    </div>
  );
}
