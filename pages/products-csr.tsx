import { useQuery } from 'react-query';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';
import { ProductListItem } from '../components/Product';

const getProducts = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/`);
  const data: StoreApiResponse[] = await res.json();
  return data;
};

const ProductsCSRPage = () => {
  const { isLoading, data, error } = useQuery('products', getProducts);

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
      </Main>
      <Footer />
    </div>
  );
};

export default ProductsCSRPage;

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
