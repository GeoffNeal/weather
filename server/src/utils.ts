export type Comparison = {
  [key: string]: { target: number; actual: number };
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
};

export const calculateScore = (comparison: Comparison) => {
  const distances = Object.keys(comparison).map((key) => {
    return Math.abs(comparison[key].target - comparison[key].actual);
  });

  const totalDistanceFromTarget = Math.min(
    distances.reduce((acc, num) => acc + num, 0),
    100
  );

  return 100 - totalDistanceFromTarget;
};
