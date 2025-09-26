import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Types and resolvers
import typeDefs from './typeDefs';
import resolvers from './resolvers';

// Export for testing
export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

// eslint-disable-next-line no-console
console.log(`🚀 Server ready at: ${url}`);
