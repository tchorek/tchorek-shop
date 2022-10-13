import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';
import { Product } from '../components/Product';

const DATA = {
  thumbnailUrl: 'https://www.fillmurray.com/640/360',
  thumbnailAlt: 'Człowiek',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut neque sapiente optio enim pariatur, consequuntur delectus nulla iusto unde consectetur suscipit adipisci nisi voluptas corporis! Aperiam laboriosam nisi delectus fuga.',
  raiting: 4.5,
};

const Home = () => {
  return (
    <div>
      <Header />
      <Main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Product data={DATA} />
          <Product data={DATA} />
          <Product data={DATA} />
          <Product data={DATA} />
          <Product data={DATA} />
          <Product data={DATA} />
        </div>
      </Main>
      <Footer />
    </div>
  );
};

export default Home;
