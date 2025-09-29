import { Recommendation, Activities } from '../../../generated/gql';
import { WeatherAPIResponse } from '../../dataSources/WeatherAPI';
import Activity from '../abstract/Activity';

/**
 * Activity class for SKIING
 *
 * Provides calculation of recommendations for skiing
 * based on weater conditions.
 */
export class SKIING extends Activity {
  /**
   * Optimum conditions
   */
  temperature_2m: number = -10; // °C
  wind_speed_10m: number = 20; // km/h
  relative_humidity_2m: number = 60; // %
  snowfall: number = 1; // cm
  snow_depth: number = 1; // m
  soil_moisture_1_to_3cm: number = 0.1; // m³/m³
  precipitation: number = 0.3; // mm

  /**
   * Generate recommendation
   *
   * @param weather The response from the weather API
   * @returns {Recommendation} The ranking for skiing based on the weather
   */
  getRecommendation(weather: WeatherAPIResponse): Recommendation {
    return {
      key: Activities.SKIING,
      label: 'Skiing',
      ranking: this.calculateScore(weather),
    };
  }
}
