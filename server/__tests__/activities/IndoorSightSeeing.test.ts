import { Activities } from '../../generated/gql';
import { INDOOR_SIGHTSEEING } from '../../src/internal/activities';
import { weatherStub } from '../../stubs/weather';

describe('INDOOR_SIGHTSEEING Activity class', () => {
  test('getRecommendation', () => {
    const indoorSightSeeing = new INDOOR_SIGHTSEEING();

    const result = indoorSightSeeing.getRecommendation(weatherStub);

    expect(result).toStrictEqual({
      key: Activities.INDOOR_SIGHTSEEING,
      label: 'Indoor Sightseeing',
      ranking: 379.5420343137255,
    });
  });
});
