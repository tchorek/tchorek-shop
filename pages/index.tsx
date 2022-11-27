import { useQuery, gql } from '@apollo/client';
import { Main } from '../components/Main';

const Home = () => {
  const { loading, error, data } = useQuery(gql`
    query GetProductsList {
      products {
        id
        name
        price
        slug
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Main>
  );
};

export default Home;
