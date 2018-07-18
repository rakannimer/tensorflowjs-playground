import * as React from "react";

export const Button: React.ComponentType<{ onClick: () => void }> = ({
  onClick = () => {},
  children
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        fontWeight: 600,
        color: "white",
        textAlign: "center",
        fontSize: "16px",
        background: "#4D3B3B",
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40
      }}
    >
      {children}
    </div>
  );
};
