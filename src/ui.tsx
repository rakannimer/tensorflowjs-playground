import * as React from "react";
import { render } from "react-dom";
import * as tf from "@tensorflow/tfjs";
import { generateData } from "./tf-utils/generate-data";
import { TensorsChart } from "./ui/TensorsChart";
import "./ui.css";
import { Tensor } from "@tensorflow/tfjs";

const { xs: xsTraining, ys: ysTraining } = generateData(75, {
  a: 1,
  b: 0,
  c: 0
});

const initialCoefficients = {
  a: -5,
  b: 1,
  c: 1
};
const { xs: xsInitial, ys: ysInitial } = generateData(75, initialCoefficients);
const a = tf.variable(tf.scalar(initialCoefficients.a));
const b = tf.variable(tf.scalar(initialCoefficients.b));
const c = tf.variable(tf.scalar(initialCoefficients.c));
// const generateInitialCoefficients = () => {

//   return { a, b, c };
// };

// const { a, b, c } = generateInitialCoefficients();
// const polynomial = a.mul();
// const predict = x => {
//   return tf.tidy(() => {
//     const ax2 = a.mul(x.squared());
//     const bx = a.mul(x);
//     const polynomial = ax2.add(bx).add(c);
//     return polynomial;
//   });
// };

const predict = (x: tf.Tensor): tf.Tensor => {
  return tf.tidy(() => {
    return a
      .mul(x.square())
      .add(b.mul(x))
      .add(c);
  });
};
const loss = (predictions, labels) => {
  const meanSquareError = predictions
    .sub(labels)
    .square()
    .mean();
  return meanSquareError;
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const train = async (
  xs: Tensor,
  ys: Tensor,
  numIterations = 75,
  onStep = async (step: number) => {}
) => {
  const learningRate = 0.5;
  // xs.print();
  const optimizer = tf.train.sgd(learningRate);
  for (let i = 0; i < numIterations; i += 1) {
    optimizer.minimize(() => {
      const predsYs = predict(xs);
      return loss(predsYs, ys);
    });
    // console.log();
    await onStep({
      a: a.dataSync()[0],
      b: b.dataSync()[0],
      c: c.dataSync()[0]
    });
    // await tf.nextFrame();
  }
};

class TrainingModel extends React.Component {
  state = {
    xs: tf.tensor1d([]),
    ys: tf.tensor1d([])
  };
  // state = {
  //   a: tf.scalar(initialCoefficients.a),
  //   b: tf.scalar(initialCoefficients.b),
  //   c: tf.scalar(initialCoefficients.c)
  // };
  async componentDidMount() {
    train(xsTraining, ysTraining, 500, async ({ a, b, c }) => {
      console.log("step", { a, b, c });
      const { xs, ys } = generateData(50, {
        a,
        b,
        c
      });
      this.setState({ xs, ys });
      await delay(200);
    }).then(() => {
      // a.print();
    });
    // for (let i = 0; i < 500; i++) {
    //   const learningRate = 0.5;
    //   const optimizer = tf.train.sgd(learningRate);
    //   optimizer.minimize(() => {
    //     const predsYs = predict(this.props.xs);
    //     return loss(predsYs, this.props.ys);
    //   });
    //   //
    //   if (i === 498) {
    //     console.log("dsaads", a.dataSync()[0]);
    //     const { xs, ys } = generateData(50, {
    //       a: a.dataSync()[0],
    //       b: b.dataSync()[0],
    //       c: c.dataSync()[0]
    //     });
    //     this.setState({ xs, ys });
    //   }
    //   // await tf.nextFrame();
    //   // this.setState({ xs: this.props.xs, ys: this.props.ys });
    // }
  }

  render() {
    const { xs, ys } = this.state;
    return (
      <TensorsChart xs={xs} ys={ys} title="Learning" refresh={Date.now()} />
    );
  }
}

const App = () => {
  return (
    <div className="flex-container">
      <div className="flex-row">
        <div className="card">
          <TensorsChart xs={xsTraining} ys={ysTraining} title="Training Data" />
        </div>
        <div className="horizontal-spacing" />
        <div className="card">
          <TrainingModel xs={xsInitial} ys={ysInitial} />
          {/* <RenderPolynomial /> */}
          {/* <TensorsChart
            xs={xsInitial}
            ys={ysInitial}
            title="Initial Prediction"
          /> */}
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
