import { Recommendation } from '../../../generated/gql';
import { WeatherAPIResponse } from '../../dataSources/WeatherAPI';

abstract class Activity {
  abstract getRecommendation(weather: WeatherAPIResponse): Recommendation;
  abstract calculateScore(weather: WeatherAPIResponse): number;
}

export default Activity;
