import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Main } from '../../components/Main';
import { InferGetStaticPropsType } from 'next';
import { ProductDetails } from '../../components/Product';
import { InferGetStaticPaths } from '../../utils/inferGetStaticPaths';
import Link from 'next/link';

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <div>
      <Header />
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
            }}
          />
        </div>
      </Main>
      <Footer />
    </div>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/`);
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
    `https://fakestoreapi.com/products/${params.productId}`
  );
  const data: StoreApiResponse | null = await res.json();

  return {
    props: {
      data,
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
  rating: {
    rate: number;
    count: number;
  };
}
