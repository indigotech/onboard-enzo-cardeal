/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import React from 'react';
import App from './app.tsx';
import BlankScreen from './blank-screen.tsx';
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';
import { getBearer } from './async-token-storage';

const AppWithApollo = (props) => {
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
      <App componentId={props.componentId} rootTag={props.rootTag} />
    </ApolloProvider>
  );
};

Navigation.registerComponent('Home', () => AppWithApollo);
Navigation.registerComponent('BlankScreen', () => BlankScreen);
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
