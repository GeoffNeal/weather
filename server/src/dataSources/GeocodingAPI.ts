import { RESTDataSource } from '@apollo/datasource-rest';

export type CityData = {
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

export type CityResponse = {
  results: CityData[];
  generationtime_ms: number;
};

class GeocodingAPI extends RESTDataSource {
  override baseURL = 'https://geocoding-api.open-meteo.com/v1/';

  /**
   * Takes a city name and returns data for that city including it's coordinates
   * @param name The name of the city
   * @returns {Promise<CityResponse>} A promise that resolves to te city data
   */
  getCityData(name: string): Promise<CityResponse> {
    // Limiting to 5 results so as not to create too much load.
    // This could probably be optimised so that we are not making
    // so many requests at the same time in the resolver
    return this.get(`search?name=${encodeURIComponent(name)}&count=5&language=en&format=json`);
  }
}

export default GeocodingAPI;
