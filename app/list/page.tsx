"use client";

import { useMovieContext } from "@/context/MovieContext";

export default function ListPage() {
  const { list, markAsWatched, removeFromList } = useMovieContext();

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 pb-12 md:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Minha Lista</h1>
        <p className="text-sm text-slate-400">
          Filmes salvos para assistir mais tarde.
        </p>
      </header>

      {list.length === 0 && (
        <div className="rounded-xl border border-sky-300/10 bg-white/5 p-6 text-slate-300">
          Nenhum filme salvo.
        </div>
      )}

      <section className="grid gap-4">
        {list.map((movie) => (
          <article
            key={movie.id}
            className="grid grid-cols-[92px_1fr] gap-4 rounded-xl border border-sky-300/10 bg-slate-950/60 p-3 shadow-lg shadow-black/20 sm:grid-cols-[120px_1fr]"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="h-36 w-full rounded-lg object-cover sm:h-44"
            />

            <div className="flex flex-col justify-between gap-4 py-1">
              <div>
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Pronto para sair da lista quando voce assistir.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => markAsWatched(movie)}
                  className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300"
                >
                  Marcar assistido
                </button>

                <button
                  onClick={() => removeFromList(movie.id)}
                  className="rounded-lg border border-red-300/20 bg-red-500/10 px-3 py-2 text-sm text-red-200 hover:bg-red-500/20"
                >
                  Remover
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
