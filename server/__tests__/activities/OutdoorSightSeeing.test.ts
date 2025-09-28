import { Activities } from '../../generated/gql';
import { OUTDOOR_SIGHTSEEING } from '../../src/internal/activities';
import { weatherStub } from '../../stubs/weather';

describe('OUTDOOR_SIGHTSEEING Activity class', () => {
  test('getRecommendation', () => {
    const outdoorSightSeeing = new OUTDOOR_SIGHTSEEING();

    const result = outdoorSightSeeing.getRecommendation(weatherStub);

    expect(result).toStrictEqual({
      key: Activities.OUTDOOR_SIGHTSEEING,
      label: 'Outdoor Sightseeing',
      ranking: 59.11348039215688,
    });
  });
});
