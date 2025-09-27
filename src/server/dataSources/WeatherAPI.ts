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

// Example response

/* {
  "latitude": 52.52,
  "longitude": 13.419998,
  "generationtime_ms": 3.40819358825684,
  "utc_offset_seconds": 0,
  "timezone": "GMT",
  "timezone_abbreviation": "GMT",
  "elevation": 38,
  "hourly_units": {
    "time": "iso8601",
    "temperature_2m": "°C",
    "relative_humidity_2m": "%",
    "wind_speed_10m": "km/h"
  },
  "hourly": {
    "time": [
      "2025-09-17T00:00",
      "2025-09-17T01:00",
      "2025-09-17T02:00",
      "2025-09-17T03:00",
      "2025-09-17T04:00",
      "2025-09-17T05:00",
      "2025-09-17T06:00",
    ],
    "temperature_2m": [13.7, 13.4, 12.9, 13, 12.7, 12.7, 13],
    "relative_humidity_2m": [83, 81, 83, 82, 85, 85, 82],
    "wind_speed_10m": [16.2, 15.9, 15, 13.9, 14.7, 11.3, 13.8]
  }
} */

class WeatherAPI extends RESTDataSource {
  override baseURL = 'https://api.open-meteo.com/v1/';

  getWeatherOverDays(days: string, coordinates: Coordinates): Promise<WeatherAPIResponse> {
    if (isNaN(parseInt(days, 10))) {
      throw new Error(`\`days\` must be a number but got: ${days}`);
    }

    const { lat, lon } = coordinates;

    return this.get(
      `forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&past_days=${encodeURIComponent(days)}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    ) as Promise<WeatherAPIResponse>;
  }
}

export default WeatherAPI;
