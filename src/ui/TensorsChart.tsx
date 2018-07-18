import * as React from "react";
import { VictoryChart, VictoryScatter, VictoryLine } from "victory";
import { Tensor } from "@tensorflow/tfjs";

export type TensorsChartProps = {
  xs: Tensor;
  ys: Tensor;
  title?: string;
  refresh?: number;
  chartType?: "scatter" | "line";
};
export type TensorsChartState = {
  xs: number[];
  ys: number[];
};

class TensorsChart extends React.Component<
  TensorsChartProps,
  TensorsChartState
> {
  state = {
    xs: [],
    ys: []
  };
  componentDidUpdate(prevProps: TensorsChartProps) {
    if (prevProps.refresh !== this.props.refresh) {
      this.tensorPropsToArray();
    }
    // if (this.state.ys !== this.props)
  }
  componentDidMount() {
    this.tensorPropsToArray();
  }
  async tensorPropsToArray() {
    const { xs, ys } = this.props;
    const [xsArray, ysArray] = await Promise.all([xs.data(), ys.data()]);
    this.setState({ xs: Array.from(xsArray), ys: Array.from(ysArray) });
  }
  render() {
    const { xs, ys } = this.state;
    const data = xs.map((x, i) => ({ x, y: ys[i] }));
    console.warn(data);
    return this.props.chartType === "scatter" ? (
      <VictoryScatter
        data={data}
        style={{
          data: { stroke: "#c43a31" }
        }}
      />
    ) : (
      <VictoryChart
        style={
          {
            parent: { background: "pink", border: "1px solid #ccc" }
          } as any
        }
      >
        <VictoryLine
          data={data}
          style={{
            data: { stroke: "#c43a31" }
          }}
        />
      </VictoryChart>
    );
  }
}
export { TensorsChart };
