import { weatherStub } from '../../../stubs/weather';

const WeatherAPI = jest.fn(() => ({
  getWeatherOverDays: async () => weatherStub,
}));

export default WeatherAPI;
