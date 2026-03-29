"use client";

import { useEffect, useState } from "react";
import { getPopularMovies, getMovieDetails } from "@/services/api";
import MovieGrid from "@/components/organismos/MovieGrid";
import { useRouter } from "next/navigation";


export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchMovies() {
      const data = await getPopularMovies();
      setMovies(data.results);
    }

    fetchMovies();
  }, []);

  const [featured, setFeatured] = useState<any>(null);

  useEffect(() => {
    async function fetchFeatured() {
      const data = await getMovieDetails("157336"); // Interstellar
      setFeatured(data);
    }

    fetchFeatured();
  }, []);

  return (
    <main className="w-full px-4 md:px-8 space-y-10">

      {/* 🎬 HERO */}
      {featured && (
        <section
          onClick={() => router.push(`/movie/${featured.id}`)}
          className="
    group relative h-[60vh] rounded-2xl overflow-hidden
    cursor-pointer
    hover:scale-[1.01]
    transition
  "
        >

          {/* imagem de fundo */}
          <img
            src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
            className="absolute w-full h-full object-cover transition duration-500 group-hover:scale-110"
          />

          {/* overlay escuro */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

          {/* conteúdo */}
          <div className="relative z-10 p-6 md:p-10 max-w-xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">
              {featured.title}
            </h1>

            <p className="text-gray-300 line-clamp-3">
              {featured.overview}
            </p>

            <div className="flex gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                ▶ Assistir
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="bg-white/10 px-5 py-2 rounded-lg backdrop-blur-md"
              >
                + Minha Lista
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 🔥 LISTA */}
      <section>
        <h2 className="text-xl font-semibold mb-4"> Filmes Recomendados</h2>

        <MovieGrid
          movies={movies.map((m) => ({
            id: m.id,
            title: m.title,
            image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
          }))}
        />
      </section>

    </main>
  );
}