import { Recommendation, Activities } from '../../../generated/gql';
import { WeatherAPIResponse } from '../../dataSources/WeatherAPI';
import Activity from '../abstract/Activity';

/**
 * Business logic for generating activity
 * recommendations from weather
 */
export class SURFING extends Activity {
  getRecommendation(weather: WeatherAPIResponse): Recommendation {
    // eslint-disable-next-line no-console
    console.log('GET_RECOMMENDATION_SURFING: ', weather.hourly.temperature_2m);

    return {
      key: Activities.SURFING,
      ranking: 456,
    };
  }
}
