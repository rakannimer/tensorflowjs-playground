import * as React from "react";
import { render } from "react-dom";
import * as tf from "@tensorflow/tfjs";
import { generateData } from "./tf-utils/generate-data";
import { TensorsChart } from "./ui/TensorsChart";
import "./ui.css";

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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const train = async (
  xs: tf.Tensor,
  ys: tf.Tensor,
  numIterations = 75,
  onStep = async (stepCoeffs: {}) => {}
) => {
  const learningRate = 0.5;
  // xs.print();
  const optimizer = tf.train.sgd(learningRate);
  for (let i = 0; i < numIterations; i += 1) {
    optimizer.minimize(() => {
      const predsYs = predict(xs);
      return loss(predsYs, ys);
    });
    const [av, bv, cv] = await Promise.all([a.data(), b.data(), c.data()]);
    await onStep({
      a: av[0],
      b: bv[0],
      c: cv[0]
    });
    // await tf.nextFrame();
  }
};

class TrainingModel extends React.Component {
  state = {
    xs: tf.tensor1d([]),
    ys: tf.tensor1d([])
  };
  async componentDidMount() {
    await train(xsTraining, ysTraining, 500, async ({ a, b, c }) => {
      console.log("step", { a, b, c });
      const { xs, ys } = generateData(50, {
        a,
        b,
        c
      });
      this.setState({ xs, ys });
      await delay(200);
    });
  }

  render() {
    const { xs, ys } = this.state;
    return (
      <TensorsChart xs={xs} ys={ys} title="Learning" refresh={Date.now()} />
    );
  }
}

const colors = {
  pink: "#F67280",
  orange: "#FFD0B3",
  green: "#C8D9BF"
};
import { Header } from "./ui/Header";
import { InputDataGenerator } from "./ui/InputDataGenerator";
import { TrainingGym } from "./ui/TrainingGym";
import { observer } from "mobx-react";
const App = observer(() => {
  return (
    <div className="flex-container">
      <Header />
      {/* <InputDataGenerator /> */}
      <TrainingGym />
    </div>
  );
});

// const App = () => {
//   return (
//     <div className="flex-container">
//       <div className="flex-row">
//         <div className="card">
//           <h2>Charts</h2>
//           {/* <VictoryChart
//             style={
//               {
//                 parent: { background: "pink", border: "1px solid #ccc" }
//               } as any
//             }
//           > */}

//           <TensorsChart xs={xsTraining} ys={ysTraining} title="Training Data" />

//           {/* </VictoryChart> */}
//         </div>
//         <div className="horizontal-spacing" />
//         <div className="card">
//           <TrainingModel xs={xsInitial} ys={ysInitial} />
//           {/* <RenderPolynomial /> */}
//           {/* <TensorsChart
//             xs={xsInitial}
//             ys={ysInitial}
//             title="Initial Prediction"
//           /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

render(<App />, document.getElementById("root"));
