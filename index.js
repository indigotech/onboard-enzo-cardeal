/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import React from 'react';
import App from './src/app/app.tsx';
import Users from './src/users/users.tsx';
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';

const AppWithApollo = (props) => {
  const client = new ApolloClient({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <App componentId={props.componentId} rootTag={props.rootTag} />
    </ApolloProvider>
  );
};

Navigation.registerComponent('Home', () => AppWithApollo);
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
