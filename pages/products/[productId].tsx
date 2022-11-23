import { Main } from '../../components/Main';
import { InferGetStaticPropsType } from 'next';
import { ProductDetails } from '../../components/Product';
import { InferGetStaticPaths } from '../../utils/inferGetStaticPaths';
import Link from 'next/link';
import { serialize } from 'next-mdx-remote/serialize';

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <Main>
      <div>
        <Link href="/products">Wróć do strony produktów</Link>
        <ProductDetails
          data={{
            id: data.id,
            title: data.title,
            thumbnailUrl: data.image,
            thumbnailAlt: data.title,
            description: data.description,
            raiting: data.rating.rate,
            longDescription: data.longDescription,
          }}
        />
      </div>
    </Main>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products/`);
  const data: StoreApiResponse[] = await res.json();

  return {
    paths: data.map((product) => {
      return {
        params: {
          productId: product.id.toString(),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${params.productId}`
  );
  const data: StoreApiResponse | null = await res.json();

  if (!data) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data,
        longDescription: await serialize(data.longDescription),
      },
    },
  };
};

export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  longDescription: string;
  rating: {
    rate: number;
    count: number;
  };
}
