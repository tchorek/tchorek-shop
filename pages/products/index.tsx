import { Main } from '../../components/Main';
import { InferGetStaticPropsType } from 'next';
import { ProductListItem } from '../../components/Product';
import { Pagination } from '../../components/Pagination';
import { apolloClient } from '../../graphql/apolloClient';
import {
  GetProductsListDocument,
  GetProductsListQuery,
} from '../../generated/graphql';

const ProductsSSGPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Main>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.products.map((product) => {
          return (
            <ProductListItem
              key={product.slug}
              data={{
                id: product.slug,
                title: product.name,
                thumbnailUrl: product.images[0].url,
                thumbnailAlt: product.name,
                raiting: 5,
              }}
            />
          );
        })}
      </div>
      <Pagination activePage={1} length={10} />
    </Main>
  );
};

export const getStaticProps = async () => {
  const { data } = await apolloClient.query<GetProductsListQuery>({
    query: GetProductsListDocument,
  });

  return {
    props: {
      data,
    },
  };
};

export default ProductsSSGPage;
