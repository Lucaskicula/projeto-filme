"use client";

import { useMovieContext } from "@/context/MovieContext";
import Rating from "@/components/atomos/Rating";

export default function WatchedPage() {
  const { watched, rateMovie } = useMovieContext();

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">✅ Assistidos</h1>

      {watched.length === 0 && <p>Nenhum filme assistido.</p>}

      {watched.map((movie) => (
        <div key={movie.id} className="bg-zinc-900 p-3 rounded space-y-2">
          <p>{movie.title}</p>

          {/* ⭐ Avaliação */}
          <Rating
            rating={movie.rating}
            onRate={(value) => rateMovie(movie.id, value)}
          />
        </div>
      ))}
    </main>
  );
}