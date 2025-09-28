import { Activities } from '../../generated/gql';
import { SKIING } from '../../src/internal/activities';
import { weatherStub } from '../../stubs/weather';

describe('SKIING Activity class', () => {
  test('getRecommendation', () => {
    const skiing = new SKIING();

    const result = skiing.getRecommendation(weatherStub);

    expect(result).toStrictEqual({
      key: Activities.SKIING,
      ranking: 45.69534313725489,
    });
  });
});
