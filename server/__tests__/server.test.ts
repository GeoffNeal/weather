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
    name: 'Paris',
    activities: ['SKIING', 'SURFING'],
  },
};

const input2 = {
  input: {
    name: 'Paris',
    activities: ['INDOOR_SIGHTSEEING', 'OUTDOOR_SIGHTSEEING'],
    days: '10',
  },
};

const recommendationsQueryExpectedResponse1 = [
  {
    city: 'Paris',
    countryCode: 'FR',
    results: [
      { key: 'SKIING', label: 'Skiing', ranking: 401.0087009803922 },
      { key: 'SURFING', label: 'Surfing', ranking: 335.9675245098039 },
    ],
  },
];

const recommendationsQueryExpectedResponse2 = [
  {
    city: 'Paris',
    countryCode: 'FR',
    results: [
      { key: 'OUTDOOR_SIGHTSEEING', label: 'Outdoor Sightseeing', ranking: 388.395955882353 },
      { key: 'INDOOR_SIGHTSEEING', label: 'Indoor Sightseeing', ranking: 379.5420343137255 },
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
