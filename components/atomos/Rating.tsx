"use client";

type Props = {
  rating?: number;
  onRate?: (value: number) => void;
};

export default function Rating({ rating = 0, onRate }: Props) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate && onRate(star)}
        >
          <span className={star <= rating ? "text-yellow-400" : "text-gray-500"}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}