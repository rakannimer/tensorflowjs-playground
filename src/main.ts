import  * as tf from '@tensorflow/tfjs';

// const shape = [2, 3]; // 2 rows, 3 columns
// const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
// a.print(); // print Tensor values
// // console.log(tf.sequential())
// const b = tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
// b.print();

// const twoD = tf.tensor2d([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]])
// twoD.print()

const a = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
const c = tf.variable(tf.scalar(Math.random()));
const d = tf.variable(tf.scalar(Math.random()));


const predict = (x:tf.Tensor):tf.Tensor => {
  return tf.tidy(() => {
    return a.mul(x.pow(tf.scalar(3))).add(b.mul(x.square())).add(c.mul(x)).add(d)
  })
}

const loss = (predictions, labels) => {
  const meanSquareError = predictions.sub(labels).square().mean();
  return meanSquareError
}


const train = (xs, ys, numIterations = 75) => {
  const learningRate = 0.5;
  const optimizer = tf.train.sgd(learningRate)
  for (let i = 0; i <numIterations; i += 1) {
    optimizer.minimize(() => {
      const predsYs = predict(xs);
      return loss(predsYs, ys);
    })
  }
}

// train()

predict(tf.variable(tf.scalar(1))).print()


const drawChart = () => {

}

// drawChart()
// pr
// predict(tf.scala)