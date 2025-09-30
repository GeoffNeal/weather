import { weatherStubArray } from '../../../stubs/weather';

const WeatherAPI = jest.fn(() => ({
  getWeatherOverDays: async () => weatherStubArray,
}));

export default WeatherAPI;
