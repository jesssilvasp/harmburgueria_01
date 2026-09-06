"use client";

import AdminShell from "@/components/AdminShell";
import { currentStore } from "@/lib/store-config";

export default function AdminConfiguracoesPage() {
  return (
    <AdminShell title="Configurações">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5 space-y-4">
          <h3 className="text-sm font-bold text-white">
            Identidade da hamburgueria
          </h3>
          <Field label="Nome do estabelecimento" value={currentStore.name} />
          <Field label="Slug (URL única)" value={currentStore.slug} />
          <Field label="Descrição" value="A melhor hamburgueria da região" />
          <Field label="Telefone" value="(11) 3333-4444" />
        </div>

        <div className="card p-5 space-y-4">
          <h3 className="text-sm font-bold text-white">Personalização</h3>
          <div>
            <label className="block text-[11px] text-neutral-400 mb-2">Logo</label>
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-3xl">
                {currentStore.logoEmoji}
              </div>
              <button className="btn-ghost h-9 px-3 rounded-lg text-xs">
                Alterar
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[11px] text-neutral-400 mb-2">
              Cor primária
            </label>
            <div className="flex items-center gap-2">
              {["#ff6a00", "#ffb800", "#ef4444", "#10b981", "#3b82f6", "#a855f7"].map(
                (c) => (
                  <button
                    key={c}
                    className={`h-9 w-9 rounded-lg border-2 ${
                      c === currentStore.theme.primary
                        ? "border-white"
                        : "border-transparent"
                    }`}
                    style={{ background: c }}
                  />
                ),
              )}
            </div>
          </div>
        </div>

        <div className="card p-5 space-y-3 lg:col-span-2">
          <h3 className="text-sm font-bold text-white">Integrações</h3>
          <Integration icon="💬" name="WhatsApp Business" status="Conectado" positive />
          <Integration icon="⚡" name="PIX Automático" status="Conectado" positive />
          <Integration icon="🖨️" name="Impressora térmica" status="Não configurado" />
          <Integration icon="🛵" name="iFood Marketplace" status="Não conectado" />
        </div>

        <div className="card p-5 lg:col-span-2 border-red-500/30">
          <h3 className="text-sm font-bold text-red-400 mb-2">Zona de perigo</h3>
          <p className="text-xs text-neutral-400 mb-3">
            Ações abaixo são permanentes.
          </p>
          <button className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg h-10 px-4 text-sm font-bold hover:bg-red-500/20 transition">
            Excluir estabelecimento
          </button>
        </div>
      </div>
    </AdminShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-[11px] text-neutral-400 mb-1.5">{label}</label>
      <input
        defaultValue={value}
        className="w-full bg-[#1c1c1f] border border-[#26262b] rounded-lg h-10 px-3 text-sm text-white focus:outline-none focus:border-orange-500"
      />
    </div>
  );
}

function Integration({
  icon,
  name,
  status,
  positive,
}: {
  icon: string;
  name: string;
  status: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#1c1c1f] rounded-lg border border-[#26262b]">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-white">{name}</div>
        <div
          className={`text-[11px] ${
            positive ? "text-emerald-400" : "text-neutral-500"
          }`}
        >
          {positive ? "● " : "○ "}
          {status}
        </div>
      </div>
      <button className="text-xs text-orange-400 hover:underline">
        {positive ? "Gerenciar" : "Conectar"}
      </button>
    </div>
  );
}
