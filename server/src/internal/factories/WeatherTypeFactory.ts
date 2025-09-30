import type { DataPoint } from '../../../../types';
import WeatherType from '../abstract/WeatherType';
import * as weatherTypes from '../weatherTypes';

class WeatherTypeFactory {
  factory: WeatherType;

  constructor(weatherType: DataPoint) {
    this.factory = new weatherTypes[weatherType]();
  }

  init() {
    return this.factory;
  }
}

export default WeatherTypeFactory;
