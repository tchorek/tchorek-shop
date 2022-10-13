interface RatingProps {
  raiting: number;
}

export const Rating = ({ raiting }: RatingProps) => {
  return (
    <div className="mt-4 inline-block border-b border-blue-500 pb-1 font-medium text-blue-600">
      {raiting}
    </div>
  );
};
