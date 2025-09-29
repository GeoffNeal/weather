import WeatherType from '../abstract/WeatherType';

export class relative_humidity_2m extends WeatherType {
  range: WeatherType['range'] = [0, 100]; // %
  dataPoint: WeatherType['dataPoint'] = 'relative_humidity_2m';
}
