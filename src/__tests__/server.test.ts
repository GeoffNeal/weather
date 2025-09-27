import { ApolloServer } from '@apollo/server';
import assert from 'assert';

// Graphql - server
import typeDefs from '../server/typeDefs';
import resolvers from '../server/resolvers';

// Data sources
import WeatherAPI from '../server/dataSources/WeatherAPI';

jest.mock('../server/dataSources/WeatherAPI');

const getRecommendations = `#graphql
  query GetRecommendations($input: RecommendationsInput!) {
    recommendations(input: $input) {
      key
      ranking
    }
  }
`;

const input1 = {
  input: {
    coordinates: {
      lat: 52.52,
      lon: 13.41,
    },
    activities: ['SKIING', 'SURFING'],
  },
};

const input2 = {
  input: {
    coordinates: {
      lat: 52.52,
      lon: 13.41,
    },
    activities: ['INDOOR_SIGHTSEEING', 'OUTDOOR_SIGHTSEEING'],
    days: '10',
  },
};

const recommendationsQueryExpectedResponse1 = [
  { key: 'SURFING', ranking: 53.64975490196078 },
  { key: 'SKIING', ranking: 45.69534313725489 },
];

const recommendationsQueryExpectedResponse2 = [
  { key: 'INDOOR_SIGHTSEEING', ranking: 60.695343137254895 },
  { key: 'OUTDOOR_SIGHTSEEING', ranking: 59.11348039215688 },
];

describe('Server', () => {
  const weatherAPI = new WeatherAPI();

  test.each([
    [
      'skiing and surfing',
      {
        variables: input1,
        expected: recommendationsQueryExpectedResponse1,
      },
    ],
    [
      'outdoor and indoor activities',
      {
        variables: input2,
        expected: recommendationsQueryExpectedResponse2,
      },
    ],
  ])('Get recommendations for %s', async (_, { variables, expected }) => {
    const testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const response = await testServer.executeOperation(
      {
        query: getRecommendations,
        variables,
      },
      {
        contextValue: {
          dataSources: {
            weatherAPI,
          },
        },
      }
    );

    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.recommendations).toEqual(expected);
  });
});
