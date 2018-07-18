import * as React from "react";
import {
  VictoryChart,
  VictoryScatter,
  VictoryLine,
  VictoryLabel,
  VictoryLegend
} from "victory";
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
    const trainingDataAsPoints = trainingData.xs.map((x, i) => {
      // console.log(x, i);
      return {
        x: x,
        y: trainingData.ys[i]
      };
    });

    const guessedData = state.guessedData.get();
    const guessedDataAsPoints = guessedData.xs.map((x, i) => {
      return {
        x,
        y: guessedData.ys[i]
      };
    });
    return (
      <React.Fragment>
        <div style={{ background: colors.green, width: "100%" }}>
          <div className="flex-row" style={titleStyle}>
            Gym
          </div>
          <div className="flex-row">
            <VictoryChart
              style={
                {
                  parent: { height: 300 }
                } as any
              }
            >
              <VictoryLegend
                x={430}
                y={0}
                //@ts-ignore
                title="Legend"
                centerTitle
                orientation="horizontal"
                gutter={20}
                style={
                  {
                    border: { stroke: colors.palePink },
                    title: { fontSize: 20 }
                  } as any
                }
                data={[
                  {
                    name: "Training Data",
                    symbol: { fill: "beige", type: "star" }
                  },
                  {
                    name: "Predicted Shape",
                    symbol: { fill: "tomato", type: "square" }
                  }
                  // { name: "Loss", symbol: { fill: "gold" } }
                ]}
              />
              <VictoryScatter
                symbol={() => "star"}
                size={6}
                style={{ data: { fill: "beige" } }}
                data={trainingDataAsPoints}
              />
              <VictoryScatter
                symbol={() => "square"}
                style={{ data: { fill: "tomato" } }}
                data={guessedDataAsPoints}
              />
              {/* <VictoryScatter
                style={{ data: { fill: "gold" } }}
                data={[{ x: -3, y: 1 }, { x: 3, y: 2 }]}
              /> */}
            </VictoryChart>
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
