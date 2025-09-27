export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
};

export const distanceFromTarget = (target: number, value: number): number => {
  return Math.abs(target - value);
};
