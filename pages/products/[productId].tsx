import { Main } from '../../components/Main';
import { InferGetStaticPropsType } from 'next';
import { ProductDetails } from '../../components/Product';
import { InferGetStaticPaths } from '../../utils/inferGetStaticPaths';
import Link from 'next/link';
import { serialize } from 'next-mdx-remote/serialize';
import { apolloClient } from '../../graphql/apolloClient';
import {
  GetProductDetailsBySlugDocument,
  GetProductDetailsBySlugQuery,
  GetProductDetailsBySlugQueryVariables,
  GetProductsSlugsDocument,
  GetProductsSlugsQuery,
} from '../../generated/graphql';
import { ReviewtForm } from '../../components/ReviewForm';

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
            id: data.slug,
            title: data.name,
            thumbnailUrl: data.images[0].url,
            thumbnailAlt: data.name,
            description: data.description,
            raiting: 5,
            longDescription: data.longDescription,
          }}
        />
        <ReviewtForm slug={data.slug} />
      </div>
    </Main>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetProductsSlugsQuery>({
    query: GetProductsSlugsDocument,
  });

  return {
    paths: data.products.map((product) => {
      return {
        params: {
          productId: product.slug,
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

  const { data } = await apolloClient.query<
    GetProductDetailsBySlugQuery,
    GetProductDetailsBySlugQueryVariables
  >({
    variables: { slug: params.productId },
    query: GetProductDetailsBySlugDocument,
  });

  if (!data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data.product,
        longDescription: await serialize(data.product.description),
      },
    },
  };
};
