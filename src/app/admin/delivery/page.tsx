"use client";

import AdminShell from "@/components/AdminShell";
import { currentStore, formatBRL } from "@/lib/store-config";

export default function AdminDeliveryPage() {
  return (
    <AdminShell title="Delivery">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bairros atendidos */}
        <div className="card p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">
              Bairros atendidos e taxas
            </h3>
            <button className="btn-primary h-8 px-3 rounded-lg text-xs font-bold">
              + Adicionar
            </button>
          </div>
          <div className="space-y-2">
            {currentStore.neighborhoods.map((n) => (
              <div
                key={n.name}
                className="flex items-center justify-between p-3 bg-[#1c1c1f] rounded-lg border border-[#26262b]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-lg">
                    📍
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {n.name}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      Ativo • Entrega em 30-45 min
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-bold text-orange-500">
                    {formatBRL(n.fee)}
                  </div>
                  <button className="text-xs text-neutral-400 hover:text-white">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Config */}
        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="text-sm font-bold text-white mb-3">Configurações</h3>
            <ConfigRow label="Pedido mínimo" value={formatBRL(currentStore.minOrder)} />
            <ConfigRow
              label="Tempo estimado"
              value={`${currentStore.deliveryTimeMin}-${currentStore.deliveryTimeMax} min`}
            />
            <ConfigRow
              label="Retirada no local"
              value={currentStore.pickupAvailable ? "Ativo" : "Desativado"}
              positive={currentStore.pickupAvailable}
            />
          </div>

          <div className="card p-4">
            <h3 className="text-sm font-bold text-white mb-3">
              Opções disponíveis
            </h3>
            <ToggleRow label="Entrega própria" enabled />
            <ToggleRow label="Retirada no balcão" enabled />
            <ToggleRow label="Consumo local (mesa)" />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function ConfigRow({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#26262b] last:border-0">
      <span className="text-xs text-neutral-400">{label}</span>
      <span
        className={`text-sm font-bold ${
          positive ? "text-emerald-400" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function ToggleRow({ label, enabled = false }: { label: string; enabled?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#26262b] last:border-0">
      <span className="text-sm text-white">{label}</span>
      <div
        className={`h-6 w-11 rounded-full relative ${
          enabled ? "bg-emerald-500" : "bg-neutral-700"
        }`}
      >
        <div
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow ${
            enabled ? "left-[22px]" : "left-0.5"
          }`}
        />
      </div>
    </div>
  );
}
