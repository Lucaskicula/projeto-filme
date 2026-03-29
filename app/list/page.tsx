"use client";

import { useMovieContext } from "@/context/MovieContext";

export default function ListPage() {
  const { list, markAsWatched, removeFromList } = useMovieContext();

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">📂 Minha Lista</h1>

      {list.length === 0 && <p>Nenhum filme salvo.</p>}

      {list.map((movie) => (
        <div key={movie.id} className="bg-zinc-900 p-3 rounded">
          <p>{movie.title}</p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => markAsWatched(movie)}
              className="bg-green-600 px-3 py-1 rounded"
            >
              ✔ Assistido
            </button>

            <button
              onClick={() => removeFromList(movie.id)}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}