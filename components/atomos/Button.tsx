type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 bg-blue-600 transition px-4 py-2 rounded-lg"
    >
      {children}
    </button>
  );
}