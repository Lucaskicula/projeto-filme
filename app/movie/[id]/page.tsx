"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { getMovieDetails, TmdbMovie } from "@/services/api";
import { useMovieContext } from "@/context/MovieContext";

export default function MovieDetails({
  params,
}: {
  params: Promise<{ id: string }>; 
}) {
  const { id } = use(params);
  
  console.log("ID:", id);

  const [movie, setMovie] = useState<TmdbMovie | null>(null);
  const { addToList } = useMovieContext();

  useEffect(() => {
    async function fetchMovie() {
      const data = await getMovieDetails(id);
      setMovie(data);
    }

    fetchMovie();
  }, [id]);

  if (!movie) return <p className="p-4">Carregando...</p>;

  return (
    <main className="p-4 space-y-4">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full max-w-md mx-auto rounded-lg"
      />

      <h1 className="text-2xl font-bold">{movie.title}</h1>

      <p className="text-yellow-400">
        ⭐ {movie.vote_average.toFixed(1)}
      </p>

      <p className="text-gray-300">{movie.overview}</p>

      <button
        onClick={() =>
          addToList({
            id: movie.id,
            title: movie.title,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          })
        }
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        + Minha Lista
      </button>
    </main>
  );
}
