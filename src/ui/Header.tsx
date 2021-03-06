import * as React from "react";
import { colors } from "./COLORS";

export const HeaderRow: React.ComponentType = ({ children }) => {
  return (
    <div
      className="flex-row"
      style={{
        textAlign: "center",
        background: colors.pink,
        color: "white",
        fontFamily: "Hind",
        fontWeight: "bolder",
        fontSize: "23px",
        height: 50,
        // borderBottomColor: "white",
        // borderBottomWidth: 0.1,
        // borderBottomStyle: "solid",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {children}
    </div>
  );
};

export const Header = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: 50,
        maxHeight: 50
      }}
    >
      <HeaderRow>TensorFlowJS Second Order Polynomial Curve Fitting</HeaderRow>
      {/* <HeaderRow /> */}
    </div>
  );
};
