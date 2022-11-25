import Image from 'next/image';
import Link from 'next/link';
import { Rating } from './Rating';
import { NextSeo } from 'next-seo';
import { Markdown } from './Markdown';
import { MarkdownResult } from '../utils';
import { useCartState } from './Cart/CartContext';

interface ProductDetails {
  id: number;
  title: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  description: string;
  longDescription: MarkdownResult;
  raiting: number;
}

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <NextSeo
        title={data.title}
        description={data.description}
        canonical={`https://naszsklep-api.vercel.app/api/products/${data.id}`}
        openGraph={{
          url: `https://naszsklep-api.vercel.app/api/products/${data.id}`,
          title: data.title,
          description: data.description,
          images: [
            {
              url: data.thumbnailUrl,
              alt: data.thumbnailAlt,
              type: 'image/jpeg',
            },
          ],
          siteName: 'Tchorek Shop',
        }}
      />
      <div className="relative block overflow-hidden rounded-lg border border-gray-100 shadow-sm">
        <Image
          alt={data.thumbnailAlt}
          src={data.thumbnailUrl}
          className="h-56 w-full object-cover"
          layout="responsive"
          width={16}
          height={9}
          objectFit={'contain'}
        />
        <div className="p-6">
          <h5 className="text-xl font-bold">{data.title}</h5>
          <p className="mt-2 text-sm text-gray-500">{data.description}</p>
          <article className="prose lg:prose-xl">
            <Markdown>{data.longDescription}</Markdown>
          </article>
          <Rating raiting={data.raiting} />
        </div>
      </div>
    </>
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
  const cartState = useCartState();

  return (
    <div className="relative block overflow-hidden rounded-lg border border-gray-100 shadow-sm">
      <Link href={`/products/${data.id}`}>
        <a>
          <Image
            alt={data.thumbnailAlt}
            src={data.thumbnailUrl}
            className="h-56 w-full object-cover"
            layout="responsive"
            width={16}
            height={9}
            objectFit={'contain'}
          />
          <div className="p-6">
            <h5 className="text-xl font-bold">{data.title}</h5>
            <Rating raiting={data.raiting} />
          </div>
        </a>
      </Link>
      <button
        onClick={() =>
          cartState.addItemToCart({
            id: data.id,
            price: 21.37,
            title: data.title,
            count: 1,
          })
        }
        className="ml-3 mb-3 block rounded bg-gray-900 px-5 py-3 text-xs font-medium text-teal-300 hover:bg-gray-700"
      >
        Dodaj do koszyka
      </button>
    </div>
  );
};
