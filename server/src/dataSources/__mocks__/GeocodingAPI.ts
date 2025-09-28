import { geocodeStub } from '../../../stubs/geocode';

const GeocodingAPI = jest.fn(() => ({
  getCityData: async () => geocodeStub,
}));

export default GeocodingAPI;
