import WeatherType, { DataPoint } from '../abstract/WeatherType';

export class wind_speed_10m extends WeatherType {
  range: [number, number] = [0, 25]; // km/h
  dataPoint: DataPoint = 'wind_speed_10m';
}
