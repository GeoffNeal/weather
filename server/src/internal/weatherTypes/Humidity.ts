import WeatherType, { DataPoint } from '../abstract/WeatherType';

export class relative_humidity_2m extends WeatherType {
  range: [number, number] = [0, 100]; // %
  dataPoint: DataPoint = 'relative_humidity_2m';
}
