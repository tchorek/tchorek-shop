import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clavlpwto32wi01um0bmof1b7/master',
  cache: new InMemoryCache(),
});