"use client";

import { useEffect, useState } from "react";
import { getPopularMovies, TmdbMovie } from "@/services/api";
import MovieGrid from "@/components/organismos/MovieGrid";
import { useRouter } from "next/navigation";
import { useMovieContext } from "@/context/MovieContext";

export default function Home() {
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [featured, setFeatured] = useState<TmdbMovie | null>(null);
  const router = useRouter();
  const { addToList } = useMovieContext();

  useEffect(() => {
    async function fetchMovies() {
      const data = await getPopularMovies();
      const moviesWithPoster = data.results.filter((movie) => movie.poster_path);
      const heroOptions = moviesWithPoster.filter((movie) => movie.backdrop_path);
      const randomHero = heroOptions[Math.floor(Math.random() * heroOptions.length)];

      setMovies(moviesWithPoster);
      setFeatured(randomHero ?? moviesWithPoster[0] ?? null);
    }

    fetchMovies();
  }, []);

  return (
    <main className="w-full space-y-12 px-4 pb-10 md:px-8">
      {featured && (
        <section
          onClick={() => router.push(`/movie/${featured.id}`)}
          className="group relative h-[62vh] min-h-[420px] cursor-pointer overflow-hidden rounded-xl border border-sky-300/10 shadow-2xl shadow-black/30 transition hover:scale-[1.005]"
        >
          <img
            src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
            alt={featured.title}
            className="absolute h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-blue-950/20" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

          <div className="relative z-10 flex h-full max-w-2xl flex-col justify-end space-y-4 p-6 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
              Destaque do momento
            </p>
            <h1 className="text-3xl font-bold md:text-5xl">{featured.title}</h1>

            <p className="line-clamp-3 text-slate-300">{featured.overview}</p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/movie/${featured.id}`);
                }}
                className="rounded-lg bg-sky-500 px-5 py-2 font-semibold text-slate-950 hover:bg-sky-300"
              >
                Ver detalhes
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToList({
                    id: featured.id,
                    title: featured.title,
                    image: `https://image.tmdb.org/t/p/w500${featured.poster_path}`,
                  });
                }}
                className="rounded-lg border border-white/10 bg-white/10 px-5 py-2 backdrop-blur-md hover:bg-white/15"
              >
                + Minha Lista
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="pb-8">
        <h2 className="mb-4 text-xl font-semibold">Filmes Recomendados</h2>

        <MovieGrid
          movies={movies.map((movie) => ({
            id: movie.id,
            title: movie.title,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }))}
        />
      </section>
    </main>
  );
}
