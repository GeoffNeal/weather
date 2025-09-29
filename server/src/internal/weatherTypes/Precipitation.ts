import WeatherType, { DataPoint } from '../abstract/WeatherType';

export class precipitation extends WeatherType {
  range: [number, number] = [0, 5]; // mm
  dataPoint: DataPoint = 'precipitation';
}
