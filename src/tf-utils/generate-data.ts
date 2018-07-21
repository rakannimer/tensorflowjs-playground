import * as tf from "@tensorflow/tfjs";
import memoize from "lodash.memoize";
import { normalizeYs } from "./normalize-ys";

const times = memoize((n: number, resultReducer = (i: number) => i) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(resultReducer(i));
  }
  return result;
}, n => n);

export const generatePolynomialData = (numPoints = 75, degree = 1) => {
  const polynomialCoefficients = times(degree);
};

export const generateXs = memoize(
  (numPoints = 50, range = [-1, 1]) => {
    const [lower, upper] = range;
    const xs = tf.randomUniform([numPoints], lower, upper);
    return xs;
  },
  (numPoints: number, range: [number, number]) => {
    return `${numPoints}_${range[0]}_${range[1]}`;
  }
);

export const generateData = memoize(
  (
    numPoints = 75,
    coeffs: { a: number; b: number; c: number },
    xRange = [-1, 1]
  ) => {
    let xs = [];
    let ys = [];
    const increment = (xRange[1] - xRange[0]) / numPoints;
    for (let i = xRange[0]; i < xRange[1]; i += increment) {
      const x = i;
      const y = coeffs.a * i ** 2 + coeffs.b * i + coeffs.c;
      // console.log(y);
      xs.push(x);
      ys.push(y);
    }
    return {
      xs,
      ys
    };
  },
  (numPoints: number, coeffs: { a: number; b: number; c: number }, range) => {
    return `${numPoints}_${coeffs.a}_${coeffs.b}_${coeffs.c}_${JSON.stringify(
      range
    )}`;
  }
);
export const generateTensors = (
  numPoints = 75,
  coeffs: { a: number; b: number; c: number },
  xRange = [-1, 1]
) => {
  const xs = generateXs(numPoints, xRange);
  const a = tf.scalar(coeffs.a);
  const b = tf.scalar(coeffs.b);
  const c = tf.scalar(coeffs.c);
  const axSquared = a.mul(xs.square());
  const bx = b.mul(xs);
  const ys = axSquared.add(bx).add(c);
  return { xs, ys };
};
