/**
 * @format
 */

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { apolloClient } from './apollo-client';
import App from './app';
import Users from './users';

// const AppWithApollo = (props) => {
//   // Initialize Apollo Client
//   const client = new ApolloClient({
//     uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
//     cache: new InMemoryCache(),
//     headers: {
//       authorization: getBearer() || '',
//     },
//   });

//   return (
//     <ApolloProvider client={client}>
//       <App componentId={props.componentId} /*rootTag={props.rootTag}*/ />
//     </ApolloProvider>
//   );
// };

Navigation.registerComponent(
  'Home',
  () => (props) =>
    (
      <ApolloProvider client={apolloClient}>
        <App {...props} />
      </ApolloProvider>
    ),
  () => App,
);
Navigation.registerComponent('Users', () => Users);
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
              options: {
                topBar: {
                  title: {
                    text: 'Home',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
});
