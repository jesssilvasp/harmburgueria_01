"use client";

import AdminShell from "@/components/AdminShell";
import { mockCoupons } from "@/lib/mock-data";
import { formatBRL } from "@/lib/store-config";

export default function AdminCuponsPage() {
  return (
    <AdminShell title="Cupons">
      <div className="flex items-center justify-end mb-4">
        <button className="btn-primary h-9 px-4 rounded-lg text-xs font-bold">
          + Novo cupom
        </button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#1c1c1f] text-neutral-400 text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Código</th>
              <th className="text-left px-4 py-3 font-medium">Desconto</th>
              <th className="text-left px-4 py-3 font-medium">Usos</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-right px-4 py-3 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {mockCoupons.map((c) => (
              <tr key={c.code} className="border-t border-[#26262b] hover:bg-white/5">
                <td className="px-4 py-3">
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-lg px-3 py-1 text-orange-400 font-mono font-bold text-sm">
                    🎟️ {c.code}
                  </div>
                </td>
                <td className="px-4 py-3 text-white font-semibold">
                  {c.type === "percent"
                    ? `${c.discount}%`
                    : formatBRL(c.discount)}
                </td>
                <td className="px-4 py-3 text-neutral-400">{c.uses}x</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                      c.active
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-neutral-700 text-neutral-400"
                    }`}
                  >
                    {c.active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-neutral-400 hover:text-orange-500 text-xs mr-2">
                    Editar
                  </button>
                  <button className="text-neutral-400 hover:text-red-400 text-xs">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
