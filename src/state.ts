import { observable } from "mobx";
import { generateData } from "./tf-utils/generate-data";
export class State {
  correctGuess = {
    a: observable.box(1),
    b: observable.box(1),
    c: observable.box(1)
  };
  trainingData = {
    xs: observable.array(),
    ys: observable.array()
  };
  guessedData = {
    xs: observable.array(),
    ys: observable.array()
  };
  guessedCoefficients = {
    // Initialize coefficient as any random numbers
    a: observable.box(-3),
    b: observable.box(-1),
    c: observable.box(20)
  };
}

export class StateActions {
  state: State;
  constructor(state: State) {
    this.state = state;
  }
  generateData = () => {
    const { xs, ys } = generateData(25, { a: 0, b: 1, c: 0 });
    this.state.trainingData.xs.replace(xs);
    this.state.trainingData.ys.replace(ys);
    console.log(this.state.trainingData.xs.slice());
  };
}

export const state = new State();
export const actions = new StateActions(state);
