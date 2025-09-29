import WeatherType from '../abstract/WeatherType';

export class snow_depth extends WeatherType {
  range: WeatherType['range'] = [0, 3]; // m
  dataPoint: WeatherType['dataPoint'] = 'snow_depth';
}
