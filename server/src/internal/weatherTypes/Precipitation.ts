import WeatherType from '../abstract/WeatherType';

export class precipitation extends WeatherType {
  range: WeatherType['range'] = [0, 5]; // mm
  dataPoint: WeatherType['dataPoint'] = 'precipitation';
}
