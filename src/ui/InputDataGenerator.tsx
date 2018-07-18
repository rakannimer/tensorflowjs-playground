import * as React from "react";
import { IObservableValue } from "mobx";
import { colors } from "./COLORS";
import { Separator } from "./Separator";
import Button from "./Button";
import { state, actions } from "../state";
import { observer } from "mobx-react";

const CoefficientSelector: React.ComponentType<{
  name: string;
  value: IObservableValue<any>;
}> = observer(({ name, value }) => {
  const width = 47;
  const height = 32;
  return (
    <div style={{ flexDirection: "row", display: "flex" }}>
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
      <input
        onChange={ev => {
          value.set(ev.target.value);
        }}
        type="number"
        value={value.get()}
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
    </div>
  );
});

const coefficientValueStyle = {
  width: "30px",
  background: colors.palePink,
  textAlign: "center",
  alignItems: "center",
  fontFamily: "Roboto",
  fontSize: "25px",
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
  // const [a,b,c] = coefficients;
  // coefficients.map(())
  const xToPower = coefficients.map((c, i) => {
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
  return (
    <div
      style={{
        fontSize: "24px",
        display: "flex"
      }}
    >
      {xToPower.reverse().map((el: JSX.Element, i: number) => (
        <React.Fragment>
          <div style={coefficientValueStyle}>{coefficients[i].get()}</div>
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

export class InputDataGenerator extends React.Component {
  render() {
    const { a, b, c } = state.guessedCoefficients;

    return (
      <React.Fragment>
        <div
          className="flex-row"
          style={{
            backgroundColor: colors.orange,
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 10,
            flexDirection: "column",
            minHeight: 350,
            maxHeight: 350
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
            </CoefficientSelectorsContainer>
            <CoefficientSelectorsContainer>
              <Formula coefficients={[a, b, c]} />
            </CoefficientSelectorsContainer>
          </div>
          <div
            style={{
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button
              onClick={() => {
                actions.generateData();
              }}
            >
              Generate Data
            </Button>
          </div>
          <Separator vertical={20} />
        </div>
      </React.Fragment>
    );
  }
}
