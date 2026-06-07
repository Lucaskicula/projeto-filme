"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, router, user]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      await updateProfile({
        name,
        email,
        password: password || undefined,
      });
      setPassword("");
      setMessage("Perfil atualizado com sucesso.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar perfil");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !user) {
    return <main className="px-4 text-slate-300">Carregando perfil...</main>;
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 pb-12 md:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Perfil</h1>
        <p className="text-sm text-slate-400">
          Atualize suas informacoes de acesso quando precisar.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-sky-300/10 bg-slate-950/60 p-5 shadow-xl shadow-black/20"
      >
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300">Nome</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-sky-300/10 bg-white/10 px-4 py-3 outline-none focus:border-sky-300/50"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300">E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-sky-300/10 bg-white/10 px-4 py-3 outline-none focus:border-sky-300/50"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300">Nova senha</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Deixe em branco para manter a senha atual"
            className="w-full rounded-lg border border-sky-300/10 bg-white/10 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-sky-300/50"
            minLength={6}
          />
        </label>

        {message && <p className="text-sm text-emerald-300">{message}</p>}
        {error && <p className="text-sm text-red-300">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-sky-500 px-5 py-3 font-semibold text-slate-950 hover:bg-sky-300 disabled:opacity-60"
        >
          {saving ? "Salvando..." : "Salvar alteracoes"}
        </button>
      </form>
    </main>
  );
}
