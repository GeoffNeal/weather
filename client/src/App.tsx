import * as React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Providers
import { ApolloProvider } from '@apollo/client/react';

// Styles
import '../public/styles.global.css';

// Components
import Root from './components/Root';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://127.0.0.1:4000' }),
  cache: new InMemoryCache(),
});

/**
 * The client side app
 * @type {React.FC}
 * @returns {React.FunctionComponent} The root React component for the app
 */
const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Root />
      </ApolloProvider>
    </React.StrictMode>
  );
};

export default App;
