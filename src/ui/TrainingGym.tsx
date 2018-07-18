import * as React from "react";
import {
  VictoryChart,
  VictoryScatter,
  VictoryLine,
  VictoryLabel,
  VictoryLegend
} from "victory";
import { colors } from "./COLORS";
import Button from "./Button";
import { Separator } from "./Separator";

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

export const TrainingGym = ({
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
                  symbol: { fill: "tomato", type: "star" }
                },
                { name: "Predicted Shape", symbol: { fill: "orange" } },
                { name: "Loss", symbol: { fill: "gold" } }
              ]}
            />
            <VictoryScatter
              symbol={() => "star"}
              style={{ data: { fill: "tomato" } }}
              data={[{ x: 1, y: 2 }, { x: 2, y: 4 }]}
            />
            <VictoryScatter
              style={{ data: { fill: "orange" } }}
              data={[{ x: -1, y: 2 }, { x: -2, y: 4 }]}
            />
            <VictoryScatter
              style={{ data: { fill: "gold" } }}
              data={[{ x: -3, y: 1 }, { x: 3, y: 2 }]}
            />
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
          <Button onClick={() => {}}>Train</Button>
          <Button onClick={() => {}}>Reset</Button>
        </div>
        <Separator vertical={20} />
      </div>
    </React.Fragment>
  );
};
