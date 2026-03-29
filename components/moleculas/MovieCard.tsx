"use client";

import { useRouter } from "next/navigation";
import { useMovieContext } from "@/context/MovieContext";
import { useState } from "react";

type Props = {
  id: number;
  title: string;
  image: string;
};

export default function MovieCard({ id, title, image }: Props) {
  const router = useRouter();
  const { addToList } = useMovieContext();

  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();

    addToList({ id, title, image });

    setAdded(true);

    // volta ao normal depois de 2s
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return (
    <div
      onClick={() => router.push(`/movie/${id}`)}
      className="
        group relative rounded-xl overflow-hidden cursor-pointer
        transition hover:scale-105
      "
    >
      <img src={image} className="w-full h-64 object-cover" />

      {/* overlay */}
      <div className="
        absolute inset-0 bg-black/60 opacity-0 
        group-hover:opacity-100 transition
        flex flex-col justify-end p-3
      ">
        <h2 className="text-sm font-semibold">{title}</h2>

        <button
          onClick={handleAdd}
          className={`
            mt-2 text-xs py-1 rounded transition
            ${added 
              ? "bg-green-600 scale-105" 
              : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {added ? "✔ Adicionado" : "+ Minha Lista"}
        </button>
      </div>
    </div>
  );
}