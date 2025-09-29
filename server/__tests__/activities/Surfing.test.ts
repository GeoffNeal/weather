import { Activities } from '../../generated/gql';
import { SURFING } from '../../src/internal/activities';
import { weatherStub } from '../../stubs/weather';

describe('SURFING Activity class', () => {
  test('getRecommendation', () => {
    const surfing = new SURFING();

    const result = surfing.getRecommendation(weatherStub);

    expect(result).toStrictEqual({
      key: Activities.SURFING,
      label: 'Surfing',
      ranking: 335.9675245098039,
    });
  });
});
