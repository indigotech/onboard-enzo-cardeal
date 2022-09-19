/**
 * @format
 */

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import Login from './src/login/login.tsx';
import Users from './src/users/users.tsx';
import AddUser from './src/add-user/add-user';
import UserDetails from './src/user-details/user-details';
import { apolloClient } from './src/apollo/apollo-client';

Navigation.registerComponent(
  'Login',
  () => (props) =>
    (
      <ApolloProvider client={apolloClient}>
        <Login {...props} />
      </ApolloProvider>
    ),
  () => Login,
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

Navigation.registerComponent(
  'UserDetails',
  () => (props) =>
    (
      <ApolloProvider client={apolloClient}>
        <UserDetails {...props} />
      </ApolloProvider>
    ),
  () => UserDetails,
);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login',
              options: {
                topBar: {
                  title: {
                    text: 'Login',
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
