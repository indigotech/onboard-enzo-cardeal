/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import AppWithApollo from './app-with-apollo';
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

Navigation.registerComponent('Home', () => AppWithApollo);
Navigation.registerComponent('Usuários', () => Users);
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
