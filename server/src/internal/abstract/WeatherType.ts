import type { DataPoint, IWeatherType, WeatherAPIResponse } from '../../../../types';
import { adjustRange, average, isOutOfRange } from '../../utils';

abstract class WeatherType implements IWeatherType {
  /**
   * The range within which we would expect to find the data point
   */
  abstract range: [number, number];
  /**
   * The name of the data point accosiated with this weather type
   */
  abstract dataPoint: DataPoint;

  /**
   * For the specified weather type, return the average from the
   * API response.
   *
   * @param weather
   * @returns {number} the computed average from the specified weather data point
   */
  getAverage(weather: WeatherAPIResponse): number {
    const { hourly } = weather;
    return average(hourly[this.dataPoint]);
  }

  /**
   * Perform the actual calculation of the ranking score
   *
   * @param optimal the number that best represents "good" conditions for the specified activity
   * @param actual the number that is seen in reality
   * @returns {number} the score based on the difference between the optimal and the actual
   */
  calculateScore(optimal: number, actual: number): number {
    // I'm not aware of any formula to determine the optimum conditions
    // of a specific activity...
    // So basically this is a completely arbitrary calculation based on what
    // I think the values for these activities should `probably` be.

    // Establish a range that is relevant for each measurement
    // For example snow_depth is measured in meters, so we're unlikely to find a scenario
    // where we'd want 3m of snow. Therefore the range should be something like 0 - 2.
    // From here, we'd select a target within the range that we consider optimal for this activity.
    // In the case of skiing for example we'd perhaps want something like 0.75.
    // Now we express this as a percentage. In this case we'd do 0.75/2 = 0.375 (or 37.5%)
    // So now we have the target, we need to see where the actual number falls. If the average snow_depth
    // ends up being 0.5m then we know (using the same calculation) that this is equal to 25%.
    // With this we can calculate the difference: Math.abs(0.25 - 0.375) = 0.125
    // The lower this number the better, as it means we are less distance from the target.
    // Because we want a score where a higher value is better than a lower one (better from a user's
    // perspective) we invert the score using 1 - 0.125 = 0.875, which we can then
    // multiply by 100 to give 87.5, which will be our score for this data point.

    // Double check the given value is actually within the range
    // If it's not, it's unlikely to score very high, so we'll just return 0
    if (isOutOfRange(this.range, actual)) return 0;

    // Offset the range and the chosen value so that we're starting the range from 0.
    const [adjustedRange, adjustedOptimumValue, adjustedActualValue] = adjustRange(
      this.range,
      optimal,
      actual
    );
    // Now we have a 0 based value, we can find the location of the optimum in the range as a percentage
    const optimumPosition = adjustedOptimumValue / adjustedRange[1];
    // Do the same thing with the actual
    const actualPosition = adjustedActualValue / adjustedRange[1];
    // Calculate the distance between the optimum and the actual
    const diff = Math.abs(actualPosition - optimumPosition);
    // Invert to get a more user friendly score
    return (1 - diff) * 100;
  }
}

export default WeatherType;
