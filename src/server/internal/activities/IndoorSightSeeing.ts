import { Recommendation, Activities } from '../../../generated/gql';
import { WeatherAPIResponse } from '../../dataSources/WeatherAPI';
import Activity from '../abstract/Activity';

/**
 * Business logic for generating activity
 * recommendations from weather
 */
export class INDOOR_SIGHTSEEING extends Activity {
  getRecommendation(weather: WeatherAPIResponse): Recommendation {
    // eslint-disable-next-line no-console
    console.log('GET_RECOMMENDATION_INDOOR_SIGHTSEEING: ', weather.hourly.temperature_2m);

    return {
      key: Activities.INDOOR_SIGHTSEEING,
      ranking: 789,
    };
  }
}
