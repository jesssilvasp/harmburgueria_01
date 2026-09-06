"use client";

import AdminShell from "@/components/AdminShell";
import { mockOrders, revenueLast7Days, topProducts } from "@/lib/mock-data";
import { formatBRL } from "@/lib/store-config";

const stats = [
  {
    label: "Pedidos hoje",
    value: "128",
    trend: "+18% vs ontem",
    trendUp: true,
    highlight: true,
  },
  {
    label: "Faturamento hoje",
    value: "R$ 3.245,80",
    trend: "+22% vs ontem",
    trendUp: true,
  },
  { label: "Ticket médio", value: "R$ 25,36", trend: "+8% vs ontem", trendUp: true },
  { label: "Clientes ativos", value: "856", trend: "+12% vs ontem", trendUp: true },
];

const statusCounts = [
  { label: "Novos", value: 8, color: "bg-blue-500" },
  { label: "Confirmados", value: 6, color: "bg-cyan-500" },
  { label: "Em preparo", value: 9, color: "bg-orange-500" },
  { label: "Prontos", value: 3, color: "bg-amber-500" },
  { label: "Entrega", value: 2, color: "bg-purple-500" },
];

const statusPillColor: Record<string, string> = {
  novo: "bg-blue-500/20 text-blue-400",
  confirmado: "bg-cyan-500/20 text-cyan-400",
  preparo: "bg-orange-500/20 text-orange-400",
  pronto: "bg-amber-500/20 text-amber-400",
  entrega: "bg-purple-500/20 text-purple-400",
  entregue: "bg-emerald-500/20 text-emerald-400",
};

const statusLabels: Record<string, string> = {
  novo: "Novo",
  confirmado: "Confirmado",
  preparo: "Em preparo",
  pronto: "Pronto",
  entrega: "Entrega",
  entregue: "Entregue",
};

export default function AdminDashboardPage() {
  const maxRevenue = Math.max(...revenueLast7Days.map((d) => d.value));
  const totalStatus = statusCounts.reduce((s, i) => s + i.value, 0);

  return (
    <AdminShell title="Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`card p-4 ${
              s.highlight
                ? "bg-gradient-to-br from-orange-500 to-amber-500 border-orange-500 text-black"
                : ""
            }`}
          >
            <div
              className={`text-xs uppercase tracking-wide ${
                s.highlight ? "text-black/70" : "text-neutral-400"
              }`}
            >
              {s.label}
            </div>
            <div
              className={`mt-2 text-2xl lg:text-3xl font-bold ${
                s.highlight ? "text-black" : "text-white"
              }`}
            >
              {s.value}
            </div>
            <div
              className={`mt-1 text-[11px] font-medium ${
                s.highlight
                  ? "text-black/80"
                  : s.trendUp
                    ? "text-emerald-400"
                    : "text-red-400"
              }`}
            >
              ↑ {s.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent orders */}
        <div className="card p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white">Pedidos recentes</h2>
            <a
              href="/admin/pedidos"
              className="text-xs text-orange-400 hover:underline"
            >
              Ver todos →
            </a>
          </div>
          <div className="space-y-2">
            {mockOrders.slice(0, 6).map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between p-3 bg-[#1c1c1f] rounded-lg border border-[#26262b] hover:border-orange-500/30 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-lg bg-[#26262b] flex items-center justify-center text-orange-500 font-bold text-xs">
                    #{o.number}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">
                      {o.customer}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      {o.time} • {formatBRL(o.total)}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${statusPillColor[o.status]}`}
                >
                  {statusLabels[o.status]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Status donut */}
        <div className="card p-4">
          <h2 className="text-sm font-bold text-white mb-3">Status dos pedidos</h2>
          <div className="flex items-center justify-center py-4">
            <DonutChart total={totalStatus} segments={statusCounts} />
          </div>
          <div className="space-y-2 mt-2">
            {statusCounts.map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-xs">
                <div className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
                <span className="text-neutral-400 flex-1">{s.label}</span>
                <span className="font-bold text-white">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top products */}
        <div className="card p-4">
          <h2 className="text-sm font-bold text-white mb-3">
            Produtos mais vendidos
          </h2>
          <div className="space-y-3">
            {topProducts.map((p, idx) => (
              <div key={p.name} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-[#1c1c1f] border border-[#26262b] flex items-center justify-center text-xs font-bold text-orange-500">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{p.name}</div>
                  <div className="h-1.5 bg-[#26262b] rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
                      style={{
                        width: `${(p.sales / topProducts[0].sales) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="text-sm font-bold text-white">{p.sales}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue chart */}
        <div className="card p-4">
          <h2 className="text-sm font-bold text-white mb-3">
            Faturamento • últimos 7 dias
          </h2>
          <div className="h-48 flex items-end gap-2 pb-6 pt-2 relative">
            {revenueLast7Days.map((d) => {
              const height = (d.value / maxRevenue) * 100;
              return (
                <div
                  key={d.day}
                  className="flex-1 flex flex-col items-center justify-end gap-2"
                >
                  <div className="text-[10px] text-neutral-500 font-medium">
                    {(d.value / 1000).toFixed(1)}k
                  </div>
                  <div
                    className="w-full bg-gradient-to-t from-orange-600 to-amber-400 rounded-t-md hover:from-orange-500 hover:to-amber-300 transition min-h-[4px]"
                    style={{ height: `${height}%` }}
                    title={formatBRL(d.value)}
                  />
                  <div className="text-[10px] text-neutral-400 font-medium absolute bottom-0">
                    {d.day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function DonutChart({
  total,
  segments,
}: {
  total: number;
  segments: { label: string; value: number; color: string }[];
}) {
  const size = 140;
  const stroke = 18;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  const colorMap: Record<string, string> = {
    "bg-blue-500": "#3b82f6",
    "bg-cyan-500": "#06b6d4",
    "bg-orange-500": "#f97316",
    "bg-amber-500": "#f59e0b",
    "bg-purple-500": "#a855f7",
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#26262b"
          strokeWidth={stroke}
        />
        {segments.map((s) => {
          const dash = (s.value / total) * circumference;
          const el = (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={colorMap[s.color] ?? "#f97316"}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${circumference}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-white">{total}</div>
        <div className="text-[10px] text-neutral-500 uppercase">Total</div>
      </div>
    </div>
  );
}
