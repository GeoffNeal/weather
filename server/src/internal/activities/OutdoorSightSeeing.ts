import type { WeatherAPIResponse } from '../../../../types';
import { Recommendation, Activities } from '../../../generated/gql';
import Activity from '../abstract/Activity';

/**
 * Activity class for OUTDOOR_SIGHTSEEING
 *
 * Provides calculation of recommendations for outdoor sightseeing
 * based on weater conditions.
 */
export class OUTDOOR_SIGHTSEEING extends Activity {
  temperature_2m: number = 30; // °C
  wind_speed_10m: number = 0; // km/h
  relative_humidity_2m: number = 50; // %
  snowfall: number = 0; // cm
  snow_depth: number = 0; // m
  soil_moisture_1_to_3cm: number = 0; // m³/m³
  precipitation: number = 0; // mm

  /**
   * Generate recommendation
   *
   * @param weather The response from the weather API
   * @returns {Recommendation} The ranking for outdoor sightseeing based on the weather
   */
  getRecommendation(weather: WeatherAPIResponse): Recommendation {
    return {
      key: Activities.OUTDOOR_SIGHTSEEING,
      label: 'Outdoor Sightseeing',
      ranking: this.calculateScore(weather),
    };
  }
}
