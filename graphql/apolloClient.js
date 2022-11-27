import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clazdhiyw1nmt01upd3f8dr8c/master',
  cache: new InMemoryCache(),
});
