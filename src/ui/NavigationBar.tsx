import * as React from "react";
import { observer } from "mobx-react";
import { Separator } from "./Separator";
import Button from "./Button";

export const NavigationItem = observer(({ path }) => {
  return (
    <li>
      <div
      // onClick={() => {
      //   console.log("Oh hai");
      // }}
      >
        {path}
      </div>
    </li>
  );
});

export const NavigationList = observer(({ children }) => {
  return <ul>{children}</ul>;
});

const routes = [
  {
    path: "second-order-polynomial"
  },
  {
    path: "about"
  }
];

export const NavigationBar = () => {
  return (
    <div style={{ width: "15%", background: "skyblue" }}>
      <NavigationList>
        {routes.map(({ path }) => {
          return (
            <React.Fragment>
              <NavigationItem path={path} key={path} />
            </React.Fragment>
          );
        })}
      </NavigationList>
    </div>
  );
};
