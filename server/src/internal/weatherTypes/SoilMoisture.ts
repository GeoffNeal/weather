import WeatherType, { DataPoint } from '../abstract/WeatherType';

export class soil_moisture_1_to_3cm extends WeatherType {
  range: [number, number] = [0, 1]; // m³/m³
  dataPoint: DataPoint = 'soil_moisture_1_to_3cm';
}
