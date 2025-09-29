import WeatherType, { DataPoint } from '../abstract/WeatherType';

export class snowfall extends WeatherType {
  range: [number, number] = [0, 3]; // cm
  dataPoint: DataPoint = 'snowfall';
}
