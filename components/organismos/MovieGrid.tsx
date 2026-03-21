import MovieCard from "../moleculas/MovieCard";

type Movie = {
  id: number;
  title: string;
  image: string;
};

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div
      className="
        w-full
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        gap-3
      "
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          image={movie.image}
        />
      ))}
    </div>
  );
}