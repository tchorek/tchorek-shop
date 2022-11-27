import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { Main } from '../../../components/Main';
import { Pagination } from '../../../components/Pagination';
import { ProductListItem } from '../../../components/Product';

const ProductsPage = ({
  products,
  pageNumber,
  productsQuantity,
  pagesQuantity,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Main>
      <p className="mx-16 mt-16 text-xl font-bold text-gray-500">
        {productsQuantity} products
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
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
      <Pagination activePage={pageNumber} length={pagesQuantity} />
    </Main>
  );
};

export default ProductsPage;

export interface StoreApiResponse {
  id: string;
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

const pagesPaths = (pagesQuantity: number) => {
  const pagesPaths = [];

  for (let i = 1; i <= pagesQuantity; i++) {
    pagesPaths.push({
      params: {
        pageNumber: i.toString(),
      },
    });
  }

  return pagesPaths;
};

export const getStaticPaths = async () => {
  const pagesQuantity = 5;

  return {
    paths: pagesPaths(pagesQuantity),
    fallback: true,
  };
};

const countProducts = () => {
  let count = 0;
  return new Promise<number>(async (resolve) => {
    const productsPerPage = 1000;
    let products = [];

    do {
      products = await getProducts(productsPerPage, count);
      count += products.length;
    } while (products.length == productsPerPage);

    resolve(count);
  });
};

const getProducts = async (productsPerPage: number, offset: number) => {
  const response = await fetch(
    `https://naszsklep-api.vercel.app/api/products/?take=${productsPerPage}&offset=${offset}`
  );
  const products: StoreApiResponse[] = await response.json();
  return products;
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ pageNumber: string }>) => {
  const productsPerPage = 24;
  const pageNumber = parseInt(params?.pageNumber || '1');
  const offset = productsPerPage * (pageNumber - 1);

  const products = await getProducts(productsPerPage, offset);
  const productsQuantity = await countProducts();
  const pagesQuantity = Math.ceil(productsQuantity / productsPerPage);

  return {
    props: {
      products,
      pageNumber,
      productsQuantity,
      pagesQuantity,
    },
  };
};
