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

// Example response

/**
   * {
  "results": [
    {
      "id": 2988507,
      "name": "Paris",
      "latitude": 48.85341,
      "longitude": 2.3488,
      "elevation": 42,
      "feature_code": "PPLC",
      "country_code": "FR",
      "admin1_id": 3012874,
      "admin2_id": 2968815,
      "admin3_id": 2988506,
      "admin4_id": 6455259,
      "timezone": "Europe/Paris",
      "population": 2138551,
      "postcodes": [
        "75001",
        "75020",
        "75002",
        "75003",
        "75004",
        "75005",
        "75006",
        "75007",
        "75008",
        "75009",
        "75010",
        "75011",
        "75012",
        "75013",
        "75014",
        "75015",
        "75016",
        "75017",
        "75018",
        "75019"
      ],
      "country_id": 3017382,
      "country": "France",
      "admin1": "Île-de-France",
      "admin2": "Paris",
      "admin3": "Paris",
      "admin4": "Paris"
    }
  ],
  "generationtime_ms": 0.77688694
}
   */

class GeocodingAPI extends RESTDataSource {
  override baseURL = 'https://geocoding-api.open-meteo.com/v1/';

  getCityData(name: string): Promise<CityResponse> {
    // Limiting to 5 results so as not to create too much load.
    // This could probably be optimised so that we are not making
    // so many requests at the same time in the resolver
    return this.get(`search?name=${encodeURIComponent(name)}&count=5&language=en&format=json`);
  }
}

export default GeocodingAPI;
