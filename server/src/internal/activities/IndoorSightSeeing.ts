import { Recommendation, Activities } from '../../../generated/gql';
import { WeatherAPIResponse } from '../../dataSources/WeatherAPI';
import Activity from '../abstract/Activity';

/**
 * Activity class for INDOOR_SIGHTSEEING
 *
 * Provides calculation of recommendations for indoor sightseeing
 * based on weater conditions.
 */
export class INDOOR_SIGHTSEEING extends Activity {
  /**
   * Optimum conditions
   */
  temperature_2m: number = 0; // °C
  wind_speed_10m: number = 20; // km/h
  relative_humidity_2m: number = 50; // %
  snowfall: number = 0.5; // cm
  snow_depth: number = 0.5; // m
  soil_moisture_1_to_3cm: number = 0.292; // m³/m³
  precipitation: number = 2.5; // mm

  /**
   * Generate recommendation
   *
   * @param weather The response from the weather API
   * @returns {Recommendation} The ranking for indoor sightseeing based on the weather
   */
  getRecommendation(weather: WeatherAPIResponse): Recommendation {
    return {
      key: Activities.INDOOR_SIGHTSEEING,
      label: 'Indoor Sightseeing',
      ranking: this.calculateScore(weather),
    };
  }
}
