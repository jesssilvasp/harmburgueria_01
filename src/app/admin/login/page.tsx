"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError("Usuário ou senha inválidos.");
        return;
      }

      router.replace(searchParams.get("next") || "/admin");
      router.refresh();
    } catch {
      setError("Não foi possível conectar ao painel. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login min-h-screen bg-[#08090a] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center lg:justify-between lg:gap-20">
        <section className="hidden max-w-lg lg:block">
          <div className="eyebrow">Burger SaaS • gestão inteligente</div>
          <h1 className="mt-5 text-6xl font-black uppercase leading-[0.92]">
            Seu negócio,
            <br />
            <span className="text-orange-400">no controle.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-neutral-400">
            Acompanhe pedidos, cardápio, clientes e resultados da sua hamburgueria em um só lugar.
          </p>
          <div className="mt-10 flex gap-3 text-xs text-neutral-500">
            <span className="rounded-lg border border-[#292d31] bg-[#111315] px-3 py-2">Pedidos em tempo real</span>
            <span className="rounded-lg border border-[#292d31] bg-[#111315] px-3 py-2">Operação simples</span>
          </div>
        </section>

        <section className="w-full max-w-md">
          <div className="mb-5 flex items-center gap-3 lg:hidden">
            <div className="btn-primary flex h-11 w-11 items-center justify-center rounded-lg text-2xl">🍔</div>
            <div className="brand-wordmark text-lg font-black">Burger <strong>SaaS</strong></div>
          </div>
          <div className="rounded-2xl border border-[#292d31] bg-[#111315] p-6 shadow-2xl sm:p-8">
            <div className="mb-8">
              <div className="eyebrow">Área restrita</div>
              <h2 className="mt-2 text-3xl font-black">Entrar no painel</h2>
              <p className="mt-2 text-sm text-neutral-500">Acesse a gestão da Burger House.</p>
            </div>

            {searchParams.get("error") === "setup" && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                O acesso administrativo ainda não foi configurado.
              </div>
            )}
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm font-semibold text-neutral-300">
                Usuário
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  type="email"
                  autoComplete="username"
                  placeholder="admin@burgerhouse.test"
                  required
                  className="mt-2 h-12 w-full rounded-lg border border-[#292d31] bg-[#191c1f] px-4 text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500"
                />
              </label>
              <label className="block text-sm font-semibold text-neutral-300">
                Senha
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  required
                  className="mt-2 h-12 w-full rounded-lg border border-[#292d31] bg-[#191c1f] px-4 text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500"
                />
              </label>
              <button disabled={loading} className="btn-primary h-12 w-full rounded-lg text-sm uppercase disabled:cursor-wait disabled:opacity-60">
                {loading ? "Verificando..." : "Entrar no painel"}
              </button>
            </form>
          </div>
          <Link href="/" className="mt-5 block text-center text-sm text-neutral-500 transition hover:text-orange-400">
            ← Voltar para o cardápio
          </Link>
        </section>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#08090a]" />}>
      <AdminLoginForm />
    </Suspense>
  );
}