import WeatherType, { DataPoint } from '../abstract/WeatherType';

export class snow_depth extends WeatherType {
  range: [number, number] = [0, 3]; // m
  dataPoint: DataPoint = 'snow_depth';
}
