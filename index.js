/**
 * @format
 */

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import App from './src/app/app.tsx';
import Users from './src/users/users.tsx';
import { apolloClient } from './src/apollo/apollo-client';
import AddUser from './src/add-users/add-user';

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

Navigation.registerComponent(
  'Users',
  () => (props) =>
    (
      <ApolloProvider client={apolloClient}>
        <Users {...props} />
      </ApolloProvider>
    ),
  () => Users,
);

Navigation.registerComponent(
  'AddUser',
  () => (props) =>
    (
      <ApolloProvider client={apolloClient}>
        <AddUser {...props} />
      </ApolloProvider>
    ),
  () => AddUser,
);

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
