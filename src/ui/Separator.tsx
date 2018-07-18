import * as React from "react";
export const Separator = ({ vertical = 0, horizontal = 0 }) => {
  return <div style={{ width: horizontal, height: vertical }} />;
};
