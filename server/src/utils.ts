export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  // TODO: Handle other scenarios
  return 'Something went wrong';
};

export const average = (arr: number[]): number => {
  const total = arr.reduce((acc, num) => acc + num, 0);
  return total / arr.length;
};

export const isOutOfRange = (range: [number, number], num: number): boolean => {
  const isLowerThanMin = Math.min(range[0], num) === num;
  const isHigherThanMax = Math.max(range[1], num) === num;
  return isLowerThanMin || isHigherThanMax;
};

export const adjustRange = (
  range: [number, number],
  optimumValue: number,
  actualValue: number
): [[number, number], number, number] => {
  // Offset the range and the chosen value so that we're starting the range from 0. So for example
  // if the range is [-25, 100] and the chosen value is 50 we'd need to add 25 to everything so that
  // We're starting from a base of 0, i.e: the range will be [0, 125] and the chosen value will be 75.
  // This also applies in reverse, so if the range is [40, 90] and the chosen value is 85 we'd need
  // to take 40 from each, so we'd end up with a range of [0, 50] and a chosen value of 45.

  // Get the difference between the lower end of the range and 0 (this will just be the literal
  // value as we are comparing it to 0).
  const diff = range[0];

  if (diff >= 0) {
    // If the difference is 0 or more, then we need to take that number from each
    const adjustedRange = range.map((num) => num - diff) as [number, number];
    const adjustedOptimumValue = optimumValue - diff;
    const adjustedActualValue = actualValue - diff;
    return [adjustedRange, adjustedOptimumValue, adjustedActualValue];
  } else {
    // If the difference is less than 0, then we need to add the number to each
    const absDiff = Math.abs(diff);
    const adjustedRange = range.map((num) => num + absDiff) as [number, number];
    const adjustedOptimumValue = optimumValue + absDiff;
    const adjustedActualValue = actualValue + absDiff;
    return [adjustedRange, adjustedOptimumValue, adjustedActualValue];
  }
};
