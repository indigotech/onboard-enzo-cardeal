/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import React from 'react';
import App from './app.tsx';
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';
import { getBearer } from './async-token-storage';

const AppWithApollo = () => {
  // Initialize Apollo Client
  const client = new ApolloClient({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
    cache: new InMemoryCache(),
    headers: {
      authorization: getBearer() || '',
    },
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

Navigation.registerComponent('com.myApp.WelcomeScreen', () => AppWithApollo);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.myApp.WelcomeScreen',
            },
          },
        ],
      },
    },
  });
});
