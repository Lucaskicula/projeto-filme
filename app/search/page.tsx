"use client";

import { useState } from "react";
import { searchMovies, TmdbMovie } from "@/services/api";
import MovieGrid from "@/components/organismos/MovieGrid";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const data = await searchMovies(query);
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <main className="w-full px-4 md:px-8 space-y-8">

      {/* 🎬 Header */}
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">🔍 Buscar Filmes</h1>
        <p className="text-gray-400">
          Encontre seus filmes favoritos e adicione à sua lista
        </p>
      </section>

      {/* 🔎 Input */}
      <form onSubmit={handleSearch}>
        <div className="
          flex items-center gap-2
          bg-white/5 backdrop-blur-md
          border border-white/10
          rounded-xl px-4 py-2
        ">
          <input
            type="text"
            placeholder="Digite o nome do filme..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full bg-transparent outline-none
              text-white placeholder-gray-400
            "
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg"
          >
            Buscar
          </button>
        </div>
      </form>

      {/* ⏳ Loading */}
      {loading && (
        <p className="text-gray-400 animate-pulse">
          Buscando filmes...
        </p>
      )}

      {/* 💤 Estado inicial */}
      {!searched && !loading && (
        <div className="text-center text-gray-500 mt-10">
          <p>Comece digitando um filme para buscar</p>
        </div>
      )}

      {/* 😕 Nenhum resultado */}
      {searched && !loading && movies.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          <p>Nenhum filme encontrado 😢</p>
        </div>
      )}

      {/* 🎥 Resultados */}
      {movies.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">
            Resultados para &quot;{query}&quot;
          </h2>

          <MovieGrid
            movies={movies
              .filter((m) => m.poster_path)
              .map((m) => ({
                id: m.id,
                title: m.title,
                image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
              }))}
          />
        </section>
      )}

    </main>
  );
}
