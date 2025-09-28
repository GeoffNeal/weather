import * as React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

// Styles
import '../public/styles.global.css';

// Components
import Root from './components/Root';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://127.0.0.1:4000' }),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Root />
      </ApolloProvider>
    </React.StrictMode>
  );
}
