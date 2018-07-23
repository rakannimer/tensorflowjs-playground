import { observable, reaction, computed } from "mobx";
import * as tf from "@tensorflow/tfjs";

import { generateData, generateTensors } from "./tf-utils/generate-data";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class State {
  trainingCoefficients = {
    a: observable.box(1),
    b: observable.box(0),
    c: observable.box(1)
  };
  trainingData = computed(() => {
    const { a, b, c } = this.trainingCoefficients;
    return generateData(100, {
      a: a.get(),
      b: b.get(),
      c: c.get()
    });
  });
  trainingIterations = observable.box(50);
  predictedData = computed(() => {
    const { a, b, c } = this.predictedCoefficients;
    return generateData(100, {
      a: a.get(),
      b: b.get(),
      c: c.get()
    });
  });
  // <Initial Values for our model>
  a = tf.variable(tf.scalar(-3));
  b = tf.variable(tf.scalar(2));
  c = tf.variable(tf.scalar(1));
  loss = observable.box(-1);
  td = generateTensors(50, {
    a: 1,
    b: 0,
    c: 1
  });
  // </Initial Values for our model>
  reset = () => {
    this.a.assign(tf.variable(tf.scalar(-3)));
    this.b.assign(tf.variable(tf.scalar(2)));
    this.c.assign(tf.variable(tf.scalar(1)));
    this.predictedCoefficients.a.set(-3);
    this.predictedCoefficients.b.set(2);
    this.predictedCoefficients.c.set(1);
    this.ys = this.a
      .mul(this.xs.square())
      .add(this.b.mul(this.xs))
      .add(this.c);
    this.td = generateTensors(50, {
      a: this.trainingCoefficients.a.get(),
      b: this.trainingCoefficients.b.get(),
      c: this.trainingCoefficients.c.get()
    });
    // this.td.ys.print();
  };
  xs = tf.randomUniform([75], -1, 1);
  // xs = tf.randomUniform([25], -1, 1);
  ys = this.a
    .mul(this.xs.square())
    .add(this.b.mul(this.xs))
    .add(this.c);
  predictedCoefficients = {
    a: observable.box(this.a.dataSync()[0]),
    b: observable.box(this.b.dataSync()[0]),
    c: observable.box(this.c.dataSync()[0])
  };
  constructor() {
    reaction(
      () =>
        `${this.trainingCoefficients.a.get()}${this.trainingCoefficients.b.get()}${this.trainingCoefficients.c.get()}`,
      () => {
        this.reset();
      }
    );
  }
}

export class StateActions {
  state: State;
  constructor(state: State) {
    this.state = state;
  }

  private getLoss = (
    predictions: tf.Tensor<tf.Rank.R0>,
    labels: tf.Tensor<tf.Rank>
  ) => {
    // predictions.print();
    const meanSquareError = predictions
      .sub(labels)
      .square()
      .mean();
    return meanSquareError as tf.Tensor<tf.Rank.R0>;
  };

  public predict = (x: tf.Tensor) => {
    return tf.tidy(() => {
      return this.state.a
        .mul(x.square())
        .add(this.state.b.mul(x))
        .add(this.state.c);
    }) as tf.Tensor<tf.Rank.R0>;
  };

  public train = async () => {
    const learningRate = 0.5;
    const optimizer = tf.train.sgd(learningRate);
    // this.state.ys.print();
    for (let i = 0; i < this.state.trainingIterations.get(); i += 1) {
      optimizer.minimize(() => {
        const predsYs = this.predict(this.state.td.xs);
        const loss = this.getLoss(predsYs, this.state.td.ys);
        // console.log(loss.dataSync()[0]);
        this.state.loss.set(loss.dataSync()[0]);
        return loss;
      });

      await tf.nextFrame();
      const currentPredictedCoefficients = {
        a: this.state.a.dataSync()[0],
        b: this.state.b.dataSync()[0],
        c: this.state.c.dataSync()[0]
      };
      this.state.predictedCoefficients.a.set(currentPredictedCoefficients.a);
      this.state.predictedCoefficients.b.set(currentPredictedCoefficients.b);
      this.state.predictedCoefficients.c.set(currentPredictedCoefficients.c);
      await delay(10);
    }
    console.log("done");
  };

  public reset = () => {
    this.state.reset();
  };
}

export const state = new State();
export const actions = new StateActions(state);
