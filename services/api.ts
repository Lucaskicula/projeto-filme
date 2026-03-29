const API_KEY = "20b942113c4c4ee662bbcce8d2c3c78d";

export async function searchMovies(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar filmes");
  }

  return res.json();
}

export async function getMovieDetails(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar detalhes");
  }

  return res.json();
}

export async function getPopularMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar filmes populares");
  }

  return res.json();
}