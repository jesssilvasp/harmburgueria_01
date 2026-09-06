"use client";

import AdminShell from "@/components/AdminShell";
import { currentStore } from "@/lib/store-config";

export default function AdminHorariosPage() {
  return (
    <AdminShell title="Horários de funcionamento">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Loja aberta agora</h3>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                Alterne para pausar novos pedidos
              </p>
            </div>
            <div className="h-6 w-11 rounded-full bg-emerald-500 relative">
              <div className="absolute top-0.5 left-[22px] h-5 w-5 rounded-full bg-white shadow" />
            </div>
          </div>

          <div className="space-y-2">
            {currentStore.openingHours.map((h) => (
              <div
                key={h.day}
                className="flex items-center justify-between p-3 bg-[#1c1c1f] rounded-lg border border-[#26262b]"
              >
                <span className="text-sm text-white font-medium">{h.day}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-neutral-400">{h.hours}</span>
                  <button className="text-xs text-orange-400 hover:underline">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="text-sm font-bold text-white mb-3">
              Pausar temporariamente
            </h3>
            <p className="text-xs text-neutral-400 mb-3">
              Deixe a loja indisponível por um período curto sem alterar os
              horários fixos.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {["30 min", "1 hora", "2 horas"].map((t) => (
                <button
                  key={t}
                  className="h-10 rounded-lg bg-[#1c1c1f] border border-[#26262b] text-sm text-white hover:border-orange-500 transition"
                >
                  {t}
                </button>
              ))}
            </div>
            <button className="mt-3 w-full bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg h-10 text-sm font-bold">
              Fechar loja agora
            </button>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-bold text-white mb-3">Feriados</h3>
            <p className="text-xs text-neutral-400 mb-3">
              Configure datas em que a loja permanecerá fechada.
            </p>
            <button className="w-full btn-ghost rounded-lg h-10 text-sm">
              + Adicionar feriado
            </button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
