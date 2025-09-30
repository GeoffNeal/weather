import { RESTDataSource } from '@apollo/datasource-rest';
import { GeocodingAPIResponse } from '../../../types';

class GeocodingAPI extends RESTDataSource {
  override baseURL = 'https://geocoding-api.open-meteo.com/v1/';

  /**
   * Takes a city name and returns data for that city including it's coordinates
   * @param name The name of the city
   * @returns {Promise<GeocodingAPIResponse>} A promise that resolves to the city data
   */
  getCityData(name: string): Promise<GeocodingAPIResponse> {
    // Limiting to 5 results so as not to create too much load.
    // This could probably be optimised so that we are not making
    // so many requests at the same time in the resolver
    return this.get(`search?name=${encodeURIComponent(name)}&count=5&language=en&format=json`);
  }
}

export default GeocodingAPI;
