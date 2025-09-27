import { Recommendation, Activities } from '../../../generated/gql';
import { distanceFromTarget } from '../../../utils';
import { WeatherAPIResponse } from '../../dataSources/WeatherAPI';
import Activity from '../abstract/Activity';
import Weather from '../Weather';

/* {
  "latitude": 52.52,
  "longitude": 13.419998,
  "generationtime_ms": 3.40819358825684,
  "utc_offset_seconds": 0,
  "timezone": "GMT",
  "timezone_abbreviation": "GMT",
  "elevation": 38,
  "hourly_units": {
    "time": "iso8601",
    "temperature_2m": "°C",
    "relative_humidity_2m": "%",
    "wind_speed_10m": "km/h"
  },
  "hourly": {
    "time": [
      "2025-09-17T00:00",
      "2025-09-17T01:00",
      "2025-09-17T02:00",
      "2025-09-17T03:00",
      "2025-09-17T04:00",
      "2025-09-17T05:00",
      "2025-09-17T06:00",
    ],
    "temperature_2m": [13.7, 13.4, 12.9, 13, 12.7, 12.7, 13],
    "relative_humidity_2m": [83, 81, 83, 82, 85, 85, 82],
    "wind_speed_10m": [16.2, 15.9, 15, 13.9, 14.7, 11.3, 13.8]
  }
} */

/**
 * Business logic for generating activity
 * recommendations from weather
 */
export class SURFING extends Activity {
  getRecommendation(weather: WeatherAPIResponse): Recommendation {
    return {
      key: Activities.SURFING,
      ranking: this.calculateScore(weather),
    };
  }

  calculateScore(weather: WeatherAPIResponse): number {
    const w = new Weather(weather);

    // I'm not aware of any formula to determine the optimum conditions
    // of a specific activity...
    // So basically this is a completely arbitrary calculation based on what
    // I think the values for these activities should `probably` be.
    // We're just taking the difference between the target and the actual, getting
    // the total difference by adding the results together, then taking
    // either the total differnce or 100 - whichever is smaller - from 100.

    const comparison = {
      temperature: { target: 30, actual: w.getAverageTemperature() },
      windspeed: { target: 35, actual: w.getAverageWindSpeed() },
      humidity: { target: 70, actual: w.getAverageHumidity() },
    };

    const distances = Object.keys(comparison).map((key) => {
      return distanceFromTarget(comparison[key].target, comparison[key].actual);
    });

    const totalDistanceFromTarget = Math.min(
      distances.reduce((acc, num) => acc + num, 0),
      100
    );

    return 100 - totalDistanceFromTarget;
  }
}
