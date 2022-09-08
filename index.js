/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import App from './app.tsx';
import { name as appName } from './app.json';
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';

const AppWithApollo = () => {
  // Initialize Apollo Client
  const client = new ApolloClient({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppWithApollo);
