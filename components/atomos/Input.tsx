type Props = {
  placeholder?: string;
};

export default function Input({ placeholder }: Props) {
  return (
    <input
      placeholder={placeholder}
      className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none"
    />
  );
}