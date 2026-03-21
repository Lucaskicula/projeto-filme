type Props = {
  title: string;
  image: string;
};

export default function MovieCard({ title, image }: Props) {
  return (
    <div className="
      bg-zinc-900 
      rounded-xl 
      overflow-hidden 
      hover:scale-105 
      hover:shadow-lg 
      transition 
      cursor-pointer
    ">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover"
      />

      <div className="p-2">
        <h2 className="text-sm font-semibold text-white truncate">
          {title}
        </h2>
      </div>
    </div>
  );
}