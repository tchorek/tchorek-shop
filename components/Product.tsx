import Link from 'next/link';
import { Rating } from './Rating';

interface ProductProps {
  data: {
    thumbnailUrl: string;
    thumbnailAlt: string;
    description: string;
    raiting: number;
  };
}

export const Product = ({ data }: ProductProps) => {
  return (
    <Link href="/">
      <a className="block overflow-hidden rounded-lg border border-gray-100 shadow-sm">
        <img
          alt={data.thumbnailAlt}
          src={data.thumbnailUrl}
          className="h-56 w-full object-cover"
        />
        <div className="p-6">
          <h5 className="text-xl font-bold">{data.thumbnailAlt}</h5>
          <p className="mt-2 text-sm text-gray-500">{data.description}</p>
          <Rating raiting={data.raiting} />
        </div>
      </a>
    </Link>
  );
};
