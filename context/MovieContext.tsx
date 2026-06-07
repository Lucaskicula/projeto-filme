"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  deleteUserMovie,
  getUserMovies,
  markUserMovieAsWatched,
  saveUserMovie,
  updateUserMovie,
  UserMovie,
} from "@/services/api";

type Movie = {
  id: number;
  backendId?: string;
  title: string;
  image: string;
  rating?: number;
  notes?: string;
};

type MovieContextType = {
  list: Movie[];
  watched: Movie[];
  addToList: (movie: Movie) => void;
  markAsWatched: (movie: Movie) => void;
  removeFromList: (id: number) => void;
  rateMovie: (id: number, rating: number) => void;
  updateNotes: (id: number, notes: string) => void;
};

const MovieContext = createContext<MovieContextType | null>(null);

function toMovie(movie: UserMovie): Movie {
  return {
    id: movie.tmdbId,
    backendId: movie.id,
    title: movie.title,
    image: movie.image ?? "",
    rating: movie.rating,
    notes: movie.notes,
  };
}

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const { token, user } = useAuth();
  const [list, setList] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadUserMovies() {
      if (!token || !user) {
        const savedList = localStorage.getItem("movies_list");
        const savedWatched = localStorage.getItem("movies_watched");

        setList(savedList ? JSON.parse(savedList) : []);
        setWatched(savedWatched ? JSON.parse(savedWatched) : []);
        return;
      }

      const [remoteList, remoteWatched] = await Promise.all([
        getUserMovies("WATCHLIST"),
        getUserMovies("WATCHED"),
      ]);

      setList(remoteList.map(toMovie));
      setWatched(remoteWatched.map(toMovie));
    }

    loadUserMovies().catch(() => {
      setList([]);
      setWatched([]);
    });
  }, [token, user]);

  useEffect(() => {
    if (!token) localStorage.setItem("movies_list", JSON.stringify(list));
  }, [list, token]);

  useEffect(() => {
    if (!token) localStorage.setItem("movies_watched", JSON.stringify(watched));
  }, [watched, token]);

  function addToList(movie: Movie) {
    setList((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });

    if (token) {
      saveUserMovie({
        tmdbId: movie.id,
        title: movie.title,
        image: movie.image,
      })
        .then((savedMovie) => {
          setList((prev) =>
            prev.map((item) => (item.id === movie.id ? toMovie(savedMovie) : item)),
          );
        })
        .catch(console.error);
    }
  }

  function removeFromListState(id: number) {
    setList((prev) => prev.filter((m) => m.id !== id));
  }

  function removeFromList(id: number) {
    const movie = list.find((item) => item.id === id);
    removeFromListState(id);

    if (token && movie?.backendId) {
      deleteUserMovie(movie.backendId).catch(console.error);
    }
  }

  function markAsWatched(movie: Movie) {
    removeFromListState(movie.id);

    setWatched((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });

    if (token && movie.backendId) {
      markUserMovieAsWatched(movie.backendId)
        .then((savedMovie) => {
          setWatched((prev) =>
            prev.map((item) => (item.id === movie.id ? toMovie(savedMovie) : item)),
          );
        })
        .catch(console.error);
    }
  }

  function rateMovie(id: number, rating: number) {
    const movie = watched.find((item) => item.id === id);

    setWatched((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rating } : item)),
    );

    if (token && movie?.backendId) {
      updateUserMovie(movie.backendId, { rating }).catch(console.error);
    }
  }

  function updateNotes(id: number, notes: string) {
    const movie = watched.find((item) => item.id === id);

    setWatched((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item)),
    );

    if (token && movie?.backendId) {
      updateUserMovie(movie.backendId, { notes }).catch(console.error);
    }
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
        updateNotes,
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
