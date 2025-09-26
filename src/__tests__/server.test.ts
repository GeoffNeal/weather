import { ApolloServer } from '@apollo/server';
import assert from 'assert';

// Graphql - server
import typeDefs from '../server/typeDefs';
import resolvers from '../server/resolvers';

const getRecommendations = `#graphql
  query GetRecommendations($activities: [Activities]!) {
    recommendations(activities: $activities) {
      key
      ranking
    }
  }
`;

const recommendationsQueryExpectedResponse1 = [
  { key: 'SKIING', ranking: 10.0 },
  { key: 'SURFING', ranking: 90.0 },
];

const recommendationsQueryExpectedResponse2 = [
  { key: 'OUTDOOR_SIGHTSEEING', ranking: 90.0 },
  { key: 'INDOOR_SIGHTSEEING', ranking: 10.0 },
];

describe('Server', () => {
  test.each([
    [
      'skiing and surfing',
      {
        variables: { activities: ['SKIING', 'SURFING'] },
        expected: recommendationsQueryExpectedResponse1,
      },
    ],
    [
      'outdoor and indoor activities',
      {
        variables: { activities: ['OUTDOOR_SIGHTSEEING', 'INDOOR_SIGHTSEEING'] },
        expected: recommendationsQueryExpectedResponse2,
      },
    ],
  ])('Get recommendations for %s', async (_, { variables, expected }) => {
    const testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const response = await testServer.executeOperation({
      query: getRecommendations,
      variables,
    });

    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.recommendations).toEqual(expected);
  });
});
