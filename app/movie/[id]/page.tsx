export default function MovieDetails({ params }: { params: { id: string } }) {
  return <div className="p-4">Filme ID: {params.id}</div>;
}