import { Recommendation, Activities } from '../../../generated/gql';
import { WeatherAPIResponse } from '../../dataSources/WeatherAPI';
import Activity from '../abstract/Activity';

/**
 * Business logic for generating activity
 * recommendations from weather
 */
export class SKIING extends Activity {
  getRecommendation(weather: WeatherAPIResponse): Recommendation {
    // eslint-disable-next-line no-console
    console.log('GET_RECOMMENDATION_SKIING: ', weather.hourly.temperature_2m);

    return {
      key: Activities.SKIING,
      ranking: 123,
    };
  }
}
