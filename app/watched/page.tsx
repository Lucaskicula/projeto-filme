"use client";

import Rating from "@/components/atomos/Rating";
import { useMovieContext } from "@/context/MovieContext";

export default function WatchedPage() {
  const { watched, rateMovie, updateNotes } = useMovieContext();

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 pb-12 md:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Assistidos</h1>
        <p className="text-sm text-slate-400">
          Avalie seus filmes e guarde observacoes pessoais sobre cada um.
        </p>
      </header>

      {watched.length === 0 && (
        <div className="rounded-xl border border-sky-300/10 bg-white/5 p-6 text-slate-300">
          Nenhum filme assistido.
        </div>
      )}

      <section className="grid gap-4">
        {watched.map((movie) => (
          <article
            key={movie.id}
            className="grid gap-4 rounded-xl border border-sky-300/10 bg-slate-950/60 p-3 shadow-lg shadow-black/20 sm:grid-cols-[120px_1fr]"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="h-52 w-full rounded-lg object-cover sm:h-44"
            />

            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <div className="mt-2">
                  <Rating
                    rating={movie.rating}
                    onRate={(value) => rateMovie(movie.id, value)}
                  />
                </div>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-300">
                  Observações:
                </span>
                <textarea
                  value={movie.notes ?? ""}
                  onChange={(e) => updateNotes(movie.id, e.target.value)}
                  placeholder="Anote o que achou, cenas favoritas ou qualquer detalhe para lembrar depois..."
                  className="min-h-28 w-full resize-y rounded-lg border border-sky-300/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-300/50"
                />
              </label>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
