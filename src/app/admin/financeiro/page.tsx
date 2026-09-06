"use client";

import AdminShell from "@/components/AdminShell";
import { revenueLast7Days } from "@/lib/mock-data";
import { formatBRL } from "@/lib/store-config";

const paymentBreakdown = [
  { label: "PIX", value: 1854.3, pct: 57, color: "bg-emerald-500" },
  { label: "Cartão", value: 892.5, pct: 27, color: "bg-blue-500" },
  { label: "Dinheiro", value: 499.0, pct: 16, color: "bg-amber-500" },
];

export default function AdminFinanceiroPage() {
  const total7d = revenueLast7Days.reduce((s, d) => s + d.value, 0);
  const max = Math.max(...revenueLast7Days.map((d) => d.value));

  return (
    <AdminShell title="Financeiro">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard label="Hoje" value={formatBRL(3245.8)} trend="+22%" highlight />
        <StatCard label="Semana" value={formatBRL(total7d)} trend="+15%" />
        <StatCard label="Mês" value={formatBRL(58420.5)} trend="+31%" />
        <StatCard label="Ticket médio" value={formatBRL(25.36)} trend="+8%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-4 lg:col-span-2">
          <h3 className="text-sm font-bold text-white mb-4">
            Faturamento • últimos 7 dias
          </h3>
          <div className="h-56 flex items-end gap-3 pb-6 relative">
            {revenueLast7Days.map((d) => {
              const h = (d.value / max) * 100;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 justify-end">
                  <div className="text-[10px] text-neutral-500 font-medium">
                    {(d.value / 1000).toFixed(1)}k
                  </div>
                  <div
                    className="w-full bg-gradient-to-t from-orange-600 to-amber-400 rounded-t-md min-h-[4px]"
                    style={{ height: `${h}%` }}
                  />
                  <div className="text-[10px] text-neutral-400 font-medium absolute bottom-0">
                    {d.day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-4">
          <h3 className="text-sm font-bold text-white mb-4">
            Formas de pagamento
          </h3>
          <div className="space-y-3">
            {paymentBreakdown.map((p) => (
              <div key={p.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white">{p.label}</span>
                  <span className="text-sm font-bold text-white">
                    {formatBRL(p.value)}
                  </span>
                </div>
                <div className="h-2 bg-[#26262b] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${p.color}`}
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
                <div className="text-[10px] text-neutral-500 mt-0.5">{p.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function StatCard({
  label,
  value,
  trend,
  highlight,
}: {
  label: string;
  value: string;
  trend?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`card p-4 ${
        highlight ? "bg-gradient-to-br from-orange-500 to-amber-500 border-orange-500" : ""
      }`}
    >
      <div className={`text-xs ${highlight ? "text-black/70" : "text-neutral-400"}`}>
        {label}
      </div>
      <div className={`text-xl font-bold mt-1 ${highlight ? "text-black" : "text-white"}`}>
        {value}
      </div>
      {trend && (
        <div className={`text-[11px] mt-1 ${highlight ? "text-black/80" : "text-emerald-400"}`}>
          ↑ {trend}
        </div>
      )}
    </div>
  );
}
