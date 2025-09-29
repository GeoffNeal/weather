import WeatherType, { DataPoint } from '../abstract/WeatherType';

export class temperature_2m extends WeatherType {
  range: [number, number] = [-25, 50]; // °C
  dataPoint: DataPoint = 'temperature_2m';
}
