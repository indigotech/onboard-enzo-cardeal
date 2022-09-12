import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getBearer } from './async-token-storage';

// const httpLink = createHttpLink({
//   uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
// });

// const authLink = setContext(async (_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = await getBearer();
//   console.log(`token: ${token}`);
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? token : '',
//     },
//   };
// });

export const apolloClient = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});
// export const apolloClient = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });
