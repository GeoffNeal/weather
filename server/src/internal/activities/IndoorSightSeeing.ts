import { Recommendation, Activities } from '../../../generated/gql';
import { WeatherAPIResponse } from '../../dataSources/WeatherAPI';
import * as utils from '../../utils';
import Activity from '../abstract/Activity';
import Weather from '../Weather';

/**
 * Activity class for INDOOR_SIGHTSEEING
 *
 * Provides calculation of recommendations for indoor sightseeing
 * based on weater conditions.
 */
export class INDOOR_SIGHTSEEING extends Activity {
  temperature: number = 0;
  windspeed: number = 20;
  humidity: number = 50;

  /**
   * Generate recommendation
   *
   * @param weather The response from the weather API
   * @returns {Recommendation} The ranking for indoor sightseeing based on the weather
   */
  getRecommendation(weather: WeatherAPIResponse): Recommendation {
    const w = new Weather(weather);

    // I'm not aware of any formula to determine the optimum conditions
    // of a specific activity...
    // So basically this is a completely arbitrary calculation based on what
    // I think the values for these activities should `probably` be.
    // We're just taking the difference between the target and the actual, getting
    // the total difference by adding the results together, then taking
    // either the total differnce or 100 - whichever is smaller - from 100.

    const comparison = {
      temperature: { target: this.temperature, actual: w.getAverageTemperature() },
      windspeed: { target: this.windspeed, actual: w.getAverageWindSpeed() },
      humidity: { target: this.humidity, actual: w.getAverageHumidity() },
    };

    return {
      key: Activities.INDOOR_SIGHTSEEING,
      label: 'Indoor Sightseeing',
      ranking: utils.calculateScore(comparison),
    };
  }
}
