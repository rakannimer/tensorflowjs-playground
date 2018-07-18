import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

// const opacity = observable.box(1);
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
class Button extends React.Component<{ onClick: () => void }> {
  opacity = observable.box(1);
  render() {
    const { onClick, children } = this.props;
    const opacity = this.opacity;
    return (
      <div
        onMouseOut={async () => {
          opacity.set(1);
        }}
        onMouseOver={async () => {
          opacity.set(0.8);
        }}
        onClick={async () => {
          onClick();
          opacity.set(0.8);
          await delay(100);
          opacity.set(1);
        }}
        style={{
          fontWeight: 600,
          color: "white",
          textAlign: "center",
          fontSize: "16px",
          background: "#4D3B3B",
          opacity: opacity.get(),
          padding: 10,
          paddingLeft: 40,
          paddingRight: 40,
          cursor: "pointer"
        }}
      >
        {children}
      </div>
    );
  }
}

export default observer(Button);
// export const Button: React.ComponentType<{ onClick: () => void }> = observer(
//   ({ onClick = () => {}, children }) => {
//     return (
//       <div
//         onClick={async () => {
//           onClick();
//           opacity.set(0.4);
//           await delay(100);
//           opacity.set(1);
//         }}
//         style={{
//           fontWeight: 600,
//           color: "white",
//           textAlign: "center",
//           fontSize: "16px",
//           background: "#4D3B3B",
//           opacity: opacity.get(),
//           padding: 10,
//           paddingLeft: 40,
//           paddingRight: 40,
//           cursor: "pointer"
//         }}
//       >
//         {children}
//       </div>
//     );
//   }
// );
