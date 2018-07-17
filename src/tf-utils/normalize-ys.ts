import * as tf from "@tensorflow/tfjs";

export const normalizeYs = (ys: tf.Tensor) => {
  const ymin = ys.min();
  const ymax = ys.max();
  const yrange = ymax.sub(ymin);
  const ysNormalized = ys.sub(ymin).div(yrange);
  return ysNormalized;
};
