import MovieGrid from "@/components/organismos/MovieGrid";

const mockMovies = [
  {
    id: 1,
    title: "Interstellar",
    image: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  },
  {
    id: 2,
    title: "Batman",
    image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 3,
    title: "Avatar",
    image: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
  },
  {
    id: 4,
    title: "Joker",
    image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
  {
    id: 5,
    title: "Inception",
    image: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
  },
];

export default function Home() {
  return (
    <main className="w-full px-4 space-y-8">
      
      {/* Título */}
      <header>
        <h1 className="text-2xl font-bold">🎬 CineManager</h1>
        <p className="text-gray-400 text-md">
          Descubra e gerencie seus filmes favoritos
        </p>
      </header>

      {/* Populares */}
      <section>
        <h2 className="text-lg font-semibold mb-3">🔥 Populares</h2>
        <MovieGrid movies={mockMovies} />
      </section>

      {/* Recomendados */}
      <section>
        <h2 className="text-lg font-semibold mb-3">⭐ Recomendados</h2>
        <MovieGrid movies={mockMovies} />
      </section>

    </main>
  );
}