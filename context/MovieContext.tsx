"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  image: string;
  rating?: number;
};

type MovieContextType = {
  list: Movie[];
  watched: Movie[];
  addToList: (movie: Movie) => void;
  markAsWatched: (movie: Movie) => void;
  removeFromList: (id: number) => void;
  rateMovie: (id: number, rating: number) => void;
};

const MovieContext = createContext<MovieContextType | null>(null);

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);

  // Carregar do localStorage
  useEffect(() => {
    const savedList = localStorage.getItem("movies_list");
    const savedWatched = localStorage.getItem("movies_watched");

    if (savedList) setList(JSON.parse(savedList));
    if (savedWatched) setWatched(JSON.parse(savedWatched));
  }, []);

  // 💾 Salvar lista
  useEffect(() => {
    localStorage.setItem("movies_list", JSON.stringify(list));
  }, [list]);

  // 💾 Salvar assistidos
  useEffect(() => {
    localStorage.setItem("movies_watched", JSON.stringify(watched));
  }, [watched]);

  function addToList(movie: Movie) {
    setList((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }

  function removeFromList(id: number) {
    setList((prev) => prev.filter((m) => m.id !== id));
  }

  function markAsWatched(movie: Movie) {
    removeFromList(movie.id);

    setWatched((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }

  function rateMovie(id: number, rating: number) {
    setWatched((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, rating } : movie
      )
    );
  }

  return (
    <MovieContext.Provider
      value={{
        list,
        watched,
        addToList,
        markAsWatched,
        removeFromList,
        rateMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) throw new Error("Erro no contexto");
  return context;
}