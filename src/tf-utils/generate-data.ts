import * as tf from "@tensorflow/tfjs";
import { normalizeYs } from "./normalize-ys";

const times = (n: number, resultReducer = (i: number) => i) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(resultReducer(i));
  }
  return result;
};

export const generatePolynomialData = (numPoints = 75, degree = 1) => {
  const polynomialCoefficients = times(degree);
};

export const generateData = (
  numPoints = 75,
  coeffs: { a: number; b: number; c: number }
) => {
  const xs = tf.randomUniform([numPoints], -1, 1);
  const a = tf.scalar(coeffs.a);
  const b = tf.scalar(coeffs.b);
  const c = tf.scalar(coeffs.c);
  const axSquared = a.mul(xs.square());
  const bx = b.mul(xs);
  const ys = axSquared.add(bx).add(c);
  return {
    xs,
    ys: normalizeYs(ys)
  };
};
