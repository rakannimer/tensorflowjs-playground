import * as React from "react";
import { Chart } from "react-google-charts";
import { observer } from "mobx-react";

import { colors } from "./COLORS";
import Button from "./Button";
import { Separator } from "./Separator";
import { state, actions } from "../state";

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

export const TrainingGym = observer(
  ({
    training = {
      xs: [],
      ys: []
    },
    predicted = {
      xs: [],
      ys: []
    },
    loss = {}
  }) => {
    const trainingData = state.trainingData.get();
    const predictedData = state.predictedData.get();
    const columns = [
      { type: "number", label: "x" },
      { type: "number", label: "Predicted Data" },
      { type: "number", label: "Training Data" }
    ];
    const rows = predictedData.xs.map((x, i) => {
      return [x, predictedData.ys[i], trainingData.ys[i]];
    });
    return (
      <React.Fragment>
        <div
          style={{
            background: colors.green,
            width: "50%"
            // justifyContent: "center"
          }}
        >
          <div className="flex-row" style={titleStyle}>
            Gym
          </div>
          <div className="flex-row">
            <Chart
              legendToggle
              width={"100%"}
              height={400}
              chartType="ScatterChart"
              data={[columns, ...rows]}
              options={{
                backgroundColor: "transparent",
                title: "Training Data vs Predicted Data",
                legend: {
                  position: "bottom"
                },
                hAxis: {
                  title: "x",
                  viewWindow: { max: 1, min: -1 }
                },
                vAxis: {
                  title: "y",
                  viewWindow: { max: 5, min: -5 }
                }
              }}
            />
          </div>
          <Separator vertical={20} />
          <div
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              display: "flex"
            }}
          >
            <Button
              onClick={() => {
                actions.train();
              }}
            >
              Train
            </Button>
            <Button
              onClick={() => {
                actions.reset();
              }}
            >
              Reset
            </Button>
          </div>
          <Separator vertical={20} />
        </div>
      </React.Fragment>
    );
  }
);
