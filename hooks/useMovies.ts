"use client";

import { useState } from "react";
import { searchMovies } from "@/services/api";
import { Movie } from "@/types/movie";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchMovies(query: string) {
    try {
      setLoading(true);
      setError("");

      const data = await searchMovies(query);
      setMovies(data.results);
    } catch {
      setError("Erro ao buscar filmes");
    } finally {
      setLoading(false);
    }
  }

  return {
    movies,
    loading,
    error,
    fetchMovies,
  };
}
