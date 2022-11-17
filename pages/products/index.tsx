import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Main } from '../../components/Main';
import { InferGetStaticPropsType } from 'next';
import { ProductListItem } from '../../components/Product';
import { Pagination } from '../../components/Pagination';

const ProductsSSGPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Header />
      <Main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((product) => {
            return (
              <ProductListItem
                key={product.id}
                data={{
                  id: product.id,
                  title: product.title,
                  thumbnailUrl: product.image,
                  thumbnailAlt: product.title,
                  raiting: product.rating.rate,
                }}
              />
            );
          })}
        </div>
        <Pagination activePage={1} length={10} />
      </Main>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=24&offset=0`
  );
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default ProductsSSGPage;

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
