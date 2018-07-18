import * as React from "react";
import { colors } from "./COLORS";
import { Separator } from "./Separator";
import { Button } from "./Button";

const CoefficientSelector: React.ComponentType<{
  name: string;
  value: any;
}> = ({ name, value }) => {
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
        type="number"
        defaultValue={value}
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
};

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
  coefficients: number[];
}> = ({ coefficients = [1, 1, 1] }) => {
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
      {xToPower.reverse().map((el, i) => (
        <React.Fragment>
          <div style={coefficientValueStyle}>{coefficients[i]}</div>
          {el}
          {i < coefficients.length - 1 ? "+" : ""}
        </React.Fragment>
      ))}
    </div>
  );
};

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
            // minHeight: 500,
            // maxHeight: 500
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
                value={1}
              />
              <Separator vertical={20} />
              <CoefficientSelector
                name={getCoefficientNameFromIndex(1)}
                value={2}
              />
              <Separator vertical={20} />
              <CoefficientSelector
                name={getCoefficientNameFromIndex(2)}
                value={2}
              />
            </CoefficientSelectorsContainer>
            <CoefficientSelectorsContainer>
              <Formula coefficients={[1, 1, 2]} />
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
                console.log("Oh hai");
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
