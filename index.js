/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider as PaperProvider } from 'react-native-paper';

const client = new ApolloClient({
  uri: 'https://whos-up-next.functionalstoic.dev',
});

const WrappedApp = () => {
  return (
    <PaperProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => WrappedApp);
