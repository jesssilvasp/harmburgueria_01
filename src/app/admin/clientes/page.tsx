"use client";

import AdminShell from "@/components/AdminShell";
import { mockCustomers } from "@/lib/mock-data";
import { formatBRL } from "@/lib/store-config";

export default function AdminClientesPage() {
  return (
    <AdminShell title="Clientes">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard label="Total de clientes" value="856" />
        <StatCard label="Novos este mês" value="128" trend="+18%" />
        <StatCard label="Recorrentes" value="612" trend="72%" />
        <StatCard label="Ticket médio" value={formatBRL(25.36)} />
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-[#26262b] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Clientes recentes</h3>
          <input
            placeholder="Buscar cliente..."
            className="bg-[#1c1c1f] border border-[#26262b] rounded-lg h-9 px-3 text-xs w-56 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1c1c1f] text-neutral-400 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Cliente</th>
                <th className="text-left px-4 py-3 font-medium">WhatsApp</th>
                <th className="text-right px-4 py-3 font-medium">Pedidos</th>
                <th className="text-right px-4 py-3 font-medium">Total gasto</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-[#26262b] hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-black text-xs font-bold">
                        {c.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div className="font-semibold text-white">{c.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-400 text-xs">
                    {c.whatsapp}
                  </td>
                  <td className="px-4 py-3 text-right text-white font-medium">
                    {c.orders}
                  </td>
                  <td className="px-4 py-3 text-right text-orange-500 font-bold">
                    {formatBRL(c.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

function StatCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: string;
}) {
  return (
    <div className="card p-4">
      <div className="text-xs text-neutral-400">{label}</div>
      <div className="text-xl font-bold text-white mt-1">{value}</div>
      {trend && (
        <div className="text-[11px] text-emerald-400 mt-1">↑ {trend}</div>
      )}
    </div>
  );
}
