import { ApolloServer } from '@apollo/server';
import assert from 'assert';

// Graphql - server
import typeDefs from '../src/graphql/typeDefs';
import resolvers from '../src/graphql/resolvers';

// Data sources
import WeatherAPI from '../src/dataSources/WeatherAPI';
import GeocodingAPI from '../src/dataSources/GeocodingAPI';

jest.mock('../src/dataSources/WeatherAPI');
jest.mock('../src/dataSources/GeocodingAPI');

const getRecommendations = `#graphql
  query GetRecommendations($input: RecommendationsInput!) {
    recommendations(input: $input) {
      city
      countryCode
      results {
        key
        label
        ranking
      }
    }
  }
`;

const input1 = {
  input: {
    name: 'Paris', // Berlin is returned in the response because it's in the stub
    activities: ['SKIING', 'SURFING'],
  },
};

const input2 = {
  input: {
    name: 'Paris', // Berlin is returned in the response because it's in the stub
    activities: ['INDOOR_SIGHTSEEING', 'OUTDOOR_SIGHTSEEING'],
    days: '10',
  },
};

const recommendationsQueryExpectedResponse1 = [
  {
    city: 'Paris',
    countryCode: 'FR',
    results: [
      { key: 'SKIING', label: 'Skiing', ranking: 56.27735260770975 },
      { key: 'SURFING', label: 'Surfing', ranking: 47.20751133786848 },
    ],
  },
  {
    city: 'Berlin',
    countryCode: 'DE',
    results: [
      { key: 'SURFING', label: 'Surfing', ranking: 36.18849206349206 },
      { key: 'SKIING', label: 'Skiing', ranking: 34.35062358276644 },
    ],
  },
];

const recommendationsQueryExpectedResponse2 = [
  {
    city: 'Paris',
    countryCode: 'FR',
    results: [
      { key: 'OUTDOOR_SIGHTSEEING', label: 'Outdoor Sightseeing', ranking: 53.71975623582767 },
      { key: 'INDOOR_SIGHTSEEING', label: 'Indoor Sightseeing', ranking: 53.21068594104309 },
    ],
  },
  {
    city: 'Berlin',
    countryCode: 'DE',
    results: [
      { key: 'OUTDOOR_SIGHTSEEING', label: 'Outdoor Sightseeing', ranking: 33.33134920634921 },
      { key: 'INDOOR_SIGHTSEEING', label: 'Indoor Sightseeing', ranking: 28.585317460317462 },
    ],
  },
];

describe('Server', () => {
  const weatherAPI = new WeatherAPI();
  const geocodingAPI = new GeocodingAPI();

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
            geocodingAPI,
          },
        },
      }
    );

    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.recommendations).toEqual(expected);
  });
});
