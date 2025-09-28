import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Types and resolvers
import typeDefs from './src/typeDefs';
import resolvers from './src/resolvers';

// Datasources
import WeatherAPI from './src/dataSources/WeatherAPI';
import GeocodingAPI from './src/dataSources/GeocodingAPI';

export interface ApolloContext {
  dataSources: {
    weatherAPI: WeatherAPI;
    geocodingAPI: GeocodingAPI;
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
        geocodingAPI: new GeocodingAPI(),
      },
    };
  },
});

// eslint-disable-next-line no-console
console.log(`🚀 Server ready at: ${url}`);
