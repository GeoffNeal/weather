import { Activities } from '../../generated/gql';
import { SURFING } from '../../server/internal/activities';
import { weatherStub } from '../../stubs/weather';

describe('SURFING Activity class', () => {
  test('getRecommendation', () => {
    const surfing = new SURFING();

    const result = surfing.getRecommendation(weatherStub);

    expect(result).toStrictEqual({
      key: Activities.SURFING,
      ranking: 53.64975490196078,
    });
  });
});
