import { useQuery } from 'react-query';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';
import { ProductListItem } from '../components/Product';
import { Pagination } from '../components/Pagination';
import { useState } from 'react';

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

const ProductsCSRPage = () => {
  const [page, setPage] = useState(1);

  const getProducts = async (page: number) => {
    const numberOfProducts = 24;
    const offset = (page - 1) * numberOfProducts;
    const res = await fetch(
      `https://naszsklep-api.vercel.app/api/products?take=${numberOfProducts}&offset=${offset}`
    );
    const data: StoreApiResponse[] = await res.json();
    return data;
  };

  const { isLoading, data, error } = useQuery(['products', page], () =>
    getProducts(page)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || error) {
    return <div>Coś poszło nie tak</div>;
  }

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
        <Pagination activePage={page} setPage={setPage} length={10} />
      </Main>
      <Footer />
    </div>
  );
};

export default ProductsCSRPage;
