import type { DataPoint, IActivity, WeatherAPIResponse } from '../../../../types';
import type { Recommendation } from '../../../generated/gql';
import WeatherTypeFactory from '../factories/WeatherTypeFactory';

abstract class Activity implements IActivity {
  /**
   * Optimum temperature for this activity (°C)
   */
  abstract temperature_2m: number;
  /**
   * Optimum wind speed for this activity (km/h)
   */
  abstract wind_speed_10m: number;
  /**
   * Optimum humidity for this activity (%)
   */
  abstract relative_humidity_2m: number;
  /**
   * Optimum snowfall for this activity (cm)
   */
  abstract snowfall: number;
  /**
   * Optimum snow depth for this activity (m)
   */
  abstract snow_depth: number;
  /**
   * Optimum soil moisture for this activity (m³/m³)
   */
  abstract soil_moisture_1_to_3cm: number;
  /**
   * Optimum precipitation for this activity (mm)
   */
  abstract precipitation: number;

  /**
   * Get recommendation data for this activity
   *
   * @param weather
   * @returns {Recommendation} the recommendation data
   */
  abstract getRecommendation(weather: WeatherAPIResponse): Recommendation;

  /**
   * Calculate the score based on the weather for this activity
   *
   * @param weather
   * @returns {number} the score for the specified activity
   */
  calculateScore(weather: WeatherAPIResponse): number {
    const weatherTypes = Object.keys(weather.hourly)
      // We're not using time
      .filter((dataPoint) => dataPoint !== 'time')
      .map((key: DataPoint) => new WeatherTypeFactory(key).init());

    // Calculate for all data points, getting a list of numbers.
    // The sum of these numbers will be the total score.
    const scores = weatherTypes.map((weatherType) => {
      return weatherType.calculateScore(
        this[weatherType.dataPoint],
        weatherType.getAverage(weather)
      );
    });

    return scores.reduce((acc, score) => acc + score, 0);
  }
}

export default Activity;
