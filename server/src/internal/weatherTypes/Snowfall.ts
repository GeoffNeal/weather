import WeatherType from '../abstract/WeatherType';

export class snowfall extends WeatherType {
  range: WeatherType['range'] = [0, 3]; // cm
  dataPoint: WeatherType['dataPoint'] = 'snowfall';
}
