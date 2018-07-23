import * as React from "react";
import { observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

export const NavigationItem = observer(({ name, path, isSelected }) => {
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
      >
        <Link
          to={path}
          style={{
            textDecoration: "none",
            fontSize: isSelected ? "18px" : "17px",
            color: "inherit",
            fontFamily: "Titillium Web"
          }}
        >
          <div style={{ padding: 10 }}>{name}</div>
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
    path: "polynomial",
    name: "2nd degree polynomial"
  },
  {
    path: "recommendation",
    name: "Recommendation engine (WIP)"
  }
];

export const NavigationBar = withRouter(props => {
  return (
    <div
      style={{
        maxWidth: "10%",
        minWidth: "10%",
        background: "#EFEAC5"
      }}
    >
      <NavigationList>
        {routes.map(({ path, name }) => {
          return (
            <React.Fragment key={`${path}_${name}`}>
              <NavigationItem
                path={path}
                key={path}
                name={name}
                isSelected={props.location.pathname.replace("/", "") === path}
              />
            </React.Fragment>
          );
        })}
      </NavigationList>
    </div>
  );
});
