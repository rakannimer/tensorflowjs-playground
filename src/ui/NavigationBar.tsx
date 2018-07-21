import * as React from "react";
import { observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";
import { Separator } from "./Separator";
import Button from "./Button";
import { slice } from "../../node_modules/@tensorflow/tfjs";

export const NavigationItem = observer(({ path, isSelected }) => {
  return (
    <li>
      <div
        className="hoverable"
        style={{
          textAlign: "center",
          borderBottomColor: "#DEDEDE",
          borderBottomWidth: 1,
          borderBottomStyle: "solid"
        }}
        // onClick={() => {
        //   console.log("Oh hai");
        // }}
      >
        <Link
          to={path}
          style={{
            textDecoration: "none",
            fontSize: isSelected ? "18px" : "17px",
            color: "inherit",

            // fontWeight: "bold",
            fontFamily: "Titillium Web"
          }}
        >
          <div style={{ padding: 10 }}>{path}</div>
        </Link>
      </div>
    </li>
  );
});

export const NavigationList = observer(({ children }) => {
  return <ul>{children}</ul>;
});

const routes = [
  {
    path: "polynomial"
  },
  {
    path: "recommender"
  }
];

export const NavigationBar = withRouter(props => {
  // console.log(Object.keys(props));
  // console.log(props.match.path.slice(1, props.match.path.length));
  console.log(props);
  return (
    <div
      style={{
        maxWidth: "10%",
        minWidth: "10%",
        background: "#EFEAC5"
      }}
    >
      <NavigationList>
        {routes.map(({ path }) => {
          return (
            <React.Fragment>
              <NavigationItem
                path={path}
                key={path}
                isSelected={props.location.pathname.replace("/", "") === path}
              />
            </React.Fragment>
          );
        })}
      </NavigationList>
    </div>
  );
});
