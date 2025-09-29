import { adjustRange, average, isOutOfRange } from '../src/utils';

describe('average', () => {
  test.each([
    [
      'test case 1',
      {
        input: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        expected: 5, // 45 / 9
      },
    ],
    [
      'test case 2',
      {
        input: [-1, -2, -3, -4, -5, -6, -7, -8, -9],
        expected: -5, // -45 / 9
      },
    ],
    [
      'test case 3',
      {
        input: [0, -2, -3, 0, -5, -6, 400, -8, -9],
        expected: 40.77777777777778, // 367 / 9
      },
    ],
  ])('Should return the average for %s', (_, { input, expected }) => {
    expect(average(input)).toBe(expected);
  });
});

describe('isOutOfRange', () => {
  test.each([
    [
      'return false if the number is in range',
      {
        input: { range: [1, 3], value: 2 },
        expected: false,
      },
    ],
    [
      'return true if the number is out of range',
      {
        input: { range: [1, 3], value: 4 },
        expected: true,
      },
    ],
  ])('Should %s', (_, { input, expected }) => {
    expect(isOutOfRange(input.range as [number, number], input.value)).toBe(expected);
  });
});

describe('adjustRange', () => {
  test.each([
    [
      'not adjust when the range starts from 0',
      {
        input: {
          range: [0, 9],
          optimumValue: 4,
          actualValue: 3,
        },
        expected: [[0, 9], 4, 3],
      },
    ],
    [
      'adjust when the range starts from a positive number',
      {
        input: {
          range: [5, 14],
          optimumValue: 9,
          actualValue: 8,
        },
        expected: [[0, 9], 4, 3],
      },
    ],
    [
      'adjust when the range starts from a negative number',
      {
        input: {
          range: [-5, 4],
          optimumValue: -1,
          actualValue: -2,
        },
        expected: [[0, 9], 4, 3],
      },
    ],
  ])('Should %s', (_, { input, expected }) => {
    expect(
      adjustRange(input.range as [number, number], input.optimumValue, input.actualValue)
    ).toStrictEqual(expected);
  });
});
