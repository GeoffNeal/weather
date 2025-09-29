import { Recommendation } from '../../../generated/gql';
import { WeatherAPIResponse } from '../../dataSources/WeatherAPI';
import WeatherTypeFactory from '../factories/WeatherTypeFactory';
import { DataPoint } from './WeatherType';

abstract class Activity {
  /**
   * Optimum conditions
   */
  abstract temperature_2m: number; // °C
  abstract wind_speed_10m: number; // km/h
  abstract relative_humidity_2m: number; // %
  abstract snowfall: number; // cm
  abstract snow_depth: number; // m
  abstract soil_moisture_1_to_3cm: number; // m³/m³
  abstract precipitation: number; // mm

  abstract getRecommendation(weather: WeatherAPIResponse): Recommendation;

  calculateScore(weather: WeatherAPIResponse) {
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
