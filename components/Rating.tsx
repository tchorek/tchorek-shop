interface RatingProps {
  raiting: number;
}

export const Rating = ({ raiting }: RatingProps) => {
  return (
    <span className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600">
      {raiting.toFixed(1)}
    </span>
  );
};
