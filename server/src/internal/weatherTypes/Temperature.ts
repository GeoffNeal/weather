import WeatherType from '../abstract/WeatherType';

export class temperature_2m extends WeatherType {
  range: WeatherType['range'] = [-25, 50]; // °C
  dataPoint: WeatherType['dataPoint'] = 'temperature_2m';
}
