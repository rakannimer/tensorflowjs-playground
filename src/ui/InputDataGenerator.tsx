import * as React from "react";
import { IObservableValue } from "mobx";
import { colors } from "./COLORS";
import { Separator } from "./Separator";
import Button from "./Button";
import { state, actions } from "../state";
import { observer } from "mobx-react";
import { generateData } from "../tf-utils/generate-data";

const NumberSelector: React.ComponentType<{
  value: IObservableValue<any>;
}> = observer(({ value }) => {
  const width = 47;
  const height = 32;
  return (
    <input
      onChange={ev => {
        if (ev.target.value === "") {
          return;
        }

        const valueAsNumber = parseFloat(ev.target.value);
        value.set(valueAsNumber);
      }}
      type="number"
      defaultValue={value.get()}
      style={{
        width,
        height,
        background: colors.pink,
        fontWeight: 600,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        fontSize: "18px",
        color: "white",
        textAlign: "center"
      }}
    />
  );
});

const CoefficientSelector: React.ComponentType<{
  name: string;
  value: IObservableValue<any>;
}> = observer(({ name, value }) => {
  const width = 47;
  const height = 32;
  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex"
      }}
    >
      <div
        style={{
          width,
          height,
          background: colors.palePink,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          fontFamily: "Roboto",
          fontSize: "18px",
          fontWeight: 900
        }}
      >
        {name}
      </div>
      <NumberSelector value={value} />
    </div>
  );
});

const coefficientValueStyle = {
  width: "60px",
  background: colors.palePink,
  textAlign: "center",
  alignItems: "center",
  fontFamily: "Roboto",
  fontSize: "16px",
  display: "flex",
  justifyContent: "center",
  fontWeight: 900
} as React.CSSProperties;

const titleStyle = {
  color: "white",
  fontFamily: "Hind",
  fontWeight: "bolder",
  fontSize: 25,
  minHeight: 60,
  maxHeight: 60,
  width: "100%",
  flexDirection: "column",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
} as React.CSSProperties;

const getCoefficientNameFromIndex = (i: number = 0) => {
  return String.fromCharCode(97 + i);
};

export const Formula: React.StatelessComponent<{
  coefficients: Array<IObservableValue<any>>;
}> = observer(({ coefficients }) => {
  const xToPower = coefficients.map((c: any, i: number) => {
    if (i > 1) {
      return (
        <React.Fragment key={i}>
          x<sup>{i}</sup>
        </React.Fragment>
      );
    }
    if (i === 1) {
      return "x";
    }
    if (i === 0) {
      return "";
    }
  });
  const precise = (x: string) => {
    return Number.parseFloat(`${x}`).toPrecision(2);
  };
  return (
    <div
      style={{
        fontSize: "24px",
        display: "flex"
      }}
    >
      {xToPower.reverse().map((el: JSX.Element, i: number) => (
        <React.Fragment key={i}>
          <div style={coefficientValueStyle}>
            {precise(coefficients[i].get())}
          </div>
          {el}
          {i < coefficients.length - 1 ? "+" : ""}
        </React.Fragment>
      ))}
    </div>
  );
});

export const CoefficientSelectorsContainer: React.ComponentType = ({
  children
}) => {
  return (
    <div
      style={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {children}
    </div>
  );
};

export const InputDataGenerator = observer(() => {
  const { a, b, c } = state.trainingCoefficients;
  const { a: guessedA, b: guessedB, c: guessedC } = state.guessedCoefficients;
  console.log(state.loss.get());
  return (
    // <React.Fragment>
    <div
      className="flex-row"
      style={{
        backgroundColor: colors.orange,
        alignItems: "center",
        // justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "column",
        minHeight: 350,
        width: "50%"
      }}
    >
      <div className="flex-row" style={titleStyle}>
        Coefficients to guess
      </div>
      <div
        className="flex-row"
        style={{
          minHeight: 200,
          maxHeight: 200
          // ,background: "pink"
        }}
      >
        <CoefficientSelectorsContainer>
          <CoefficientSelector
            name={getCoefficientNameFromIndex(0)}
            value={a}
          />
          <Separator vertical={20} />
          <CoefficientSelector
            name={getCoefficientNameFromIndex(1)}
            value={b}
          />
          <Separator vertical={20} />
          <CoefficientSelector
            name={getCoefficientNameFromIndex(2)}
            value={c}
          />
          <Separator vertical={20} />
          <span>Training Iteration Count</span>
          <Separator vertical={5} />
          <div
            style={{
              flexDirection: "row",
              display: "flex"
            }}
          >
            <NumberSelector value={state.trainingIterations} />
          </div>
        </CoefficientSelectorsContainer>
        <CoefficientSelectorsContainer>
          <span>Polynomial to guess</span>
          <Separator vertical={5} />
          <Formula coefficients={[a, b, c]} />
          <Separator vertical={20} />
          <span>Guessed polynomial</span>
          <Separator vertical={5} />
          <Formula coefficients={[guessedA, guessedB, guessedC]} />
          <Separator vertical={10} />
          <div>Loss : {state.loss.get() !== -1 && state.loss.get()}</div>
        </CoefficientSelectorsContainer>
      </div>
      <Separator vertical={20} />
    </div>
  );
});
