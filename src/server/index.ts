import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Types and resolvers
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import WeatherAPI from './dataSources/WeatherAPI';

export interface ApolloContext {
  dataSources: {
    weatherAPI: WeatherAPI;
  };
}

const server = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    return {
      dataSources: {
        weatherAPI: new WeatherAPI(),
      },
    };
  },
});

// eslint-disable-next-line no-console
console.log(`🚀 Server ready at: ${url}`);
