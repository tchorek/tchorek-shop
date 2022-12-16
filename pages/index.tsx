import { Main } from '../components/Main';
import { useCreateProductReviewMutation } from '../generated/graphql';

const Home = () => {
  const [createReview, createReviewResult] = useCreateProductReviewMutation();

  const addReview = () => {
    createReview({
      variables: {
        review: {
          headline: 'Super produkt z Apki',
          name: 'Michał',
          email: 'test@test.com',
          content: 'Bardzo fajny produkt',
          rating: 5,
        },
      },
    });
  };

  return (
    <Main>
      <button onClick={addReview} type="button">
        Dodaj komentarz
      </button>
    </Main>
  );
};

export default Home;
