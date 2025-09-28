import { RESTDataSource } from '@apollo/datasource-rest';
import { Coordinates } from '../../generated/gql';

export type Units = {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  wind_speed_10m: string;
};

export type Values = {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  wind_speed_10m: number[];
};

export type WeatherAPIResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: Units;
  hourly: Values;
};

class WeatherAPI extends RESTDataSource {
  override baseURL = 'https://api.open-meteo.com/v1/';

  /**
   * Takes a number of days and returns the data for weather conditions
   * over that number of days
   *
   * @param days The number of days you want to get the weather conditions for
   * @param coordinates The location of the weather conditions
   * @returns {Promise<WeatherAPIResponse>} A promise that resolves to the weather data
   */
  getWeatherOverDays(days: string, coordinates: Coordinates): Promise<WeatherAPIResponse> {
    if (isNaN(parseInt(days, 10))) {
      throw new Error(`\`days\` must be a number but got: ${days}`);
    }

    const { lat, lon } = coordinates;

    return this.get(
      `forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&past_days=${encodeURIComponent(days)}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    );
  }
}

export default WeatherAPI;
