import { Recommendation, Recommendations } from './server/generated/gql';

export type Coordinates = {
  lat: string;
  lon: string;
};

type Units = {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  wind_speed_10m: string;
  snowfall: string;
  snow_depth: string;
  soil_moisture_1_to_3cm: string;
  precipitation: string;
};

type Values = {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  wind_speed_10m: number[];
  snowfall: number[];
  snow_depth: number[];
  soil_moisture_1_to_3cm: number[];
  precipitation: number[];
};

type CityData = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
};

/**
 * Response from the recommendations resolver
 * Used on the FE
 */
export type RecommendationsReponse = {
  recommendations: Recommendations[];
};

/**
 * Response from the weather API
 *
 * @see https://open-meteo.com/
 */
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

export type WeatherAPIResponseList = WeatherAPIResponse[];

/**
 * Response from the geocoding API
 *
 * @see https://open-meteo.com/
 */
export type GeocodingAPIResponse = {
  results: CityData[];
  generationtime_ms: number;
};

/**
 * List of data points from the weather API used to calculate scores
 */
export type DataPoint = keyof Omit<Values, 'time'>;

export interface IActivity extends Record<DataPoint, number> {
  getRecommendation(weather: WeatherAPIResponse): Recommendation;
  calculateScore(weather: WeatherAPIResponse): number;
}

export interface IWeatherType {
  range: [number, number];
  dataPoint: DataPoint;
  getAverage(weather: WeatherAPIResponse): number;
  calculateScore(optimal: number, actual: number): number;
}
