import React from 'react';
import App from './app';
import { ApolloProvider } from '@apollo/client';

import { NavigationComponentProps } from 'react-native-navigation';
import { apolloClient } from './apollo-client';

const AppWithApollo = (props: NavigationComponentProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <App componentId={props.componentId} /*rootTag={props.rootTag}*/ />
    </ApolloProvider>
  );
};

export default AppWithApollo;
