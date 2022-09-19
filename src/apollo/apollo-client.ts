import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAuthenticationToken } from '../utils/async-token-storage';

const httpLink = createHttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getAuthenticationToken();

  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
