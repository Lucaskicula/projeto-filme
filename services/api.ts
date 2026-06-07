const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333/api";

type RequestOptions = RequestInit & {
  auth?: boolean;
};

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (options.auth !== false) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message ?? "Erro ao consultar API");
  }

  return data;
}

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
};

export type UserMovie = {
  id: string;
  tmdbId: number;
  title: string;
  image?: string;
  status: "WATCHLIST" | "WATCHED";
  rating?: number;
  notes?: string;
};

export type TmdbMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  overview: string;
  vote_average: number;
};

type TmdbListResponse = {
  results: TmdbMovie[];
};

export function loginUser(email: string, password: string) {
  return apiRequest<{ accessToken: string; user: AuthUser }>("/auth/login", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ email, password }),
  });
}

export function registerUser(name: string, email: string, password: string) {
  return apiRequest<{ accessToken: string; user: AuthUser }>("/auth/register", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ name, email, password }),
  });
}

export function getCurrentUser() {
  return apiRequest<AuthUser>("/auth/me");
}

export function updateCurrentUser(data: {
  name?: string;
  email?: string;
  password?: string;
}) {
  return apiRequest<AuthUser>("/auth/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function requestPasswordReset(email: string) {
  return apiRequest<{ message: string; resetToken?: string; expiresAt?: string }>(
    "/auth/forgot-password",
    {
      method: "POST",
      auth: false,
      body: JSON.stringify({ email }),
    },
  );
}

export function resetPassword(token: string, password: string) {
  return apiRequest<{ message: string }>("/auth/reset-password", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ token, password }),
  });
}

export function getUserMovies(status?: "WATCHLIST" | "WATCHED") {
  const query = status ? `?status=${status}` : "";
  return apiRequest<UserMovie[]>(`/movies${query}`);
}

export function saveUserMovie(movie: {
  tmdbId: number;
  title: string;
  image?: string;
  rating?: number;
}) {
  return apiRequest<UserMovie>("/movies", {
    method: "POST",
    body: JSON.stringify(movie),
  });
}

export function markUserMovieAsWatched(id: string) {
  return apiRequest<UserMovie>(`/movies/${id}/watched`, {
    method: "PATCH",
  });
}

export function updateUserMovie(id: string, data: Partial<UserMovie>) {
  return apiRequest<UserMovie>(`/movies/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteUserMovie(id: string) {
  return apiRequest<{ success: true }>(`/movies/${id}`, {
    method: "DELETE",
  });
}

export async function searchMovies(query: string) {
  return apiRequest<TmdbListResponse>(`/tmdb/search?query=${encodeURIComponent(query)}`, {
    auth: false,
  });
}

export async function getMovieDetails(id: string) {
  return apiRequest<TmdbMovie>(`/tmdb/movie/${id}`, {
    auth: false,
  });
}

export async function getPopularMovies() {
  return apiRequest<TmdbListResponse>("/tmdb/popular", {
    auth: false,
  });
}
