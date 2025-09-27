import { WeatherAPIResponse } from '../dataSources/WeatherAPI';

class Weather {
  data: WeatherAPIResponse;

  constructor(weather: WeatherAPIResponse) {
    this.data = weather;
  }

  getAverage(arr: number[]): number {
    const total = arr.reduce((acc, num) => acc + num, 0);

    return total / arr.length;
  }

  getAverageTemperature(): number {
    const { hourly } = this.data;
    return this.getAverage(hourly.temperature_2m);
  }

  getAverageWindSpeed(): number {
    const { hourly } = this.data;
    return this.getAverage(hourly.wind_speed_10m);
  }

  getAverageHumidity(): number {
    const { hourly } = this.data;
    return this.getAverage(hourly.relative_humidity_2m);
  }
}

export default Weather;
