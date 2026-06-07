"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword, requestPasswordReset } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

type Mode = "login" | "register" | "forgot" | "reset";

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [generatedToken, setGeneratedToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (mode === "login") {
        await login(email, password);
        router.push("/list");
      }

      if (mode === "register") {
        await register(name, email, password);
        router.push("/list");
      }

      if (mode === "forgot") {
        const data = await requestPasswordReset(email);
        setMessage(data.message);
        if (data.resetToken) {
          setGeneratedToken(data.resetToken);
          setToken(data.resetToken);
          setMode("reset");
        }
      }

      if (mode === "reset") {
        const data = await resetPassword(token, password);
        setMessage(data.message);
        setPassword("");
        setToken("");
        setGeneratedToken("");
        setMode("login");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <section className="w-full max-w-md space-y-5 rounded-xl border border-sky-300/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/30">
        <div>
          <h1 className="text-2xl font-bold">
            {mode === "login" && "Entrar"}
            {mode === "register" && "Criar conta"}
            {mode === "forgot" && "Recuperar senha"}
            {mode === "reset" && "Nova senha"}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Salve sua lista, marque assistidos e avalie seus filmes.
          </p>
        </div>

        <div className="grid grid-cols-2 rounded-lg bg-black/30 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded-md py-2 text-sm ${mode === "login" ? "bg-sky-500 text-slate-950" : "text-slate-400"}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`rounded-md py-2 text-sm ${mode === "register" ? "bg-sky-500 text-slate-950" : "text-slate-400"}`}
          >
            Cadastro
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-sky-300/10 bg-white/10 px-4 py-3 outline-none focus:border-sky-300/50"
              required
            />
          )}

          {mode !== "reset" && (
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-sky-300/10 bg-white/10 px-4 py-3 outline-none focus:border-sky-300/50"
              required
            />
          )}

          {mode === "reset" && (
            <input
              type="text"
              placeholder="Token de recuperacao"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full rounded-lg border border-sky-300/10 bg-white/10 px-4 py-3 outline-none focus:border-sky-300/50"
              required
            />
          )}

          {mode !== "forgot" && (
            <input
              type="password"
              placeholder={mode === "reset" ? "Nova senha" : "Senha"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-sky-300/10 bg-white/10 px-4 py-3 outline-none focus:border-sky-300/50"
              minLength={6}
              required
            />
          )}

          {generatedToken && (
            <div className="rounded-lg border border-sky-300/20 bg-sky-500/10 p-3 text-xs text-sky-100">
              <p className="font-semibold">Token local de recuperacao:</p>
              <p className="mt-1 break-all">{generatedToken}</p>
            </div>
          )}

          {message && <p className="text-sm text-emerald-300">{message}</p>}
          {error && <p className="text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sky-500 py-3 font-semibold text-slate-950 hover:bg-sky-300 disabled:opacity-60"
          >
            {loading && "Enviando..."}
            {!loading && mode === "login" && "Entrar"}
            {!loading && mode === "register" && "Criar conta"}
            {!loading && mode === "forgot" && "Gerar token"}
            {!loading && mode === "reset" && "Atualizar senha"}
          </button>
        </form>

        <div className="flex flex-wrap justify-between gap-3 text-sm">
          <button
            type="button"
            onClick={() => setMode("forgot")}
            className="text-sky-300 hover:text-sky-100"
          >
            Esqueci minha senha
          </button>
          {mode !== "login" && (
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-slate-400 hover:text-white"
            >
              Voltar ao login
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
