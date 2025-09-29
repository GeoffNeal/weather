import WeatherType from '../abstract/WeatherType';

export class wind_speed_10m extends WeatherType {
  range: WeatherType['range'] = [0, 25]; // km/h
  dataPoint: WeatherType['dataPoint'] = 'wind_speed_10m';
}
