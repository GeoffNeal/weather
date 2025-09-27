import { distanceFromTarget } from '../utils';

describe('Utils', () => {
  test.each([
    ['Test 1', { target: -25, value: 7, expected: 32 }],
    ['Test 2', { target: 7, value: -25, expected: 32 }],
    ['Test 3', { target: 4, value: 5, expected: 1 }],
    ['Test 4', { target: 5, value: 4, expected: 1 }],
    ['Test 5', { target: 10000, value: 12345, expected: 2345 }],
    ['Test 6', { target: -12345, value: 10000, expected: 22345 }],
    ['Test 7', { target: -123.45, value: 3, expected: 126.45 }],
    ['Test 8', { target: 1.5, value: -55.7, expected: 57.2 }],
  ])('distanceFromTarget - %s', (_, { target, value, expected }) => {
    expect(distanceFromTarget(target, value)).toBe(expected);
  });
});
