type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-purple-600 px-4 py-2 rounded-lg"
    >
      {children}
    </button>
  );
}