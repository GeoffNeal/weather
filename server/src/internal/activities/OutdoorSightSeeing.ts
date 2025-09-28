import { Recommendation, Activities } from '../../../generated/gql';
import { distanceFromTarget } from '../../utils';
import { WeatherAPIResponse } from '../../dataSources/WeatherAPI';
import Activity from '../abstract/Activity';
import Weather from '../Weather';

/**
 * Business logic for generating activity
 * recommendations from weather
 */
export class OUTDOOR_SIGHTSEEING extends Activity {
  getRecommendation(weather: WeatherAPIResponse): Recommendation {
    return {
      key: Activities.OUTDOOR_SIGHTSEEING,
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
      windspeed: { target: 0, actual: w.getAverageWindSpeed() },
      humidity: { target: 50, actual: w.getAverageHumidity() },
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
