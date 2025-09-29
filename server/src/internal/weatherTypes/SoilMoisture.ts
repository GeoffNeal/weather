import WeatherType from '../abstract/WeatherType';

export class soil_moisture_1_to_3cm extends WeatherType {
  range: WeatherType['range'] = [0, 1]; // m³/m³
  dataPoint: WeatherType['dataPoint'] = 'soil_moisture_1_to_3cm';
}
