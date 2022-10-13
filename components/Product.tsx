import Link from 'next/link';
import { Rating } from './Rating';

interface ProductDetails {
  id: number;
  title: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  description: string;
  raiting: number;
}

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <div className="relative block overflow-hidden rounded-lg border border-gray-100 shadow-sm">
      <img
        alt={data.thumbnailAlt}
        src={data.thumbnailUrl}
        className="h-56 w-full object-cover"
      />
      <div className="p-6">
        <h5 className="text-xl font-bold">{data.title}</h5>
        <p className="mt-2 text-sm text-gray-500">{data.description}</p>
        <Rating raiting={data.raiting} />
      </div>
    </div>
  );
};

type ProductListItem = Pick<
  ProductDetails,
  'id' | 'title' | 'thumbnailUrl' | 'thumbnailAlt' | 'raiting'
>;

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  return (
    <Link href={`/products/${data.id}`}>
      <a className="relative block overflow-hidden rounded-lg border border-gray-100 shadow-sm">
        <img
          alt={data.thumbnailAlt}
          src={data.thumbnailUrl}
          className="h-56 w-full object-cover"
        />
        <div className="p-6">
          <h5 className="text-xl font-bold">{data.title}</h5>
          <Rating raiting={data.raiting} />
        </div>
      </a>
    </Link>
  );
};
