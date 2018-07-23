import * as React from "react";
import { render } from "react-dom";
import { observer } from "mobx-react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./ui.css";
import { Header } from "./ui/Header";
import { NavigationBar } from "./ui/NavigationBar";
import { Polynomial } from "./routes/Polynomial";
import { Recommender } from "./routes/Recommender";
import { About } from "./routes/About";

const App = observer(() => {
  return (
    <Router>
      <div className="flex-container">
        <Header />
        <div style={{ display: "flex", flex: 1 }}>
          <NavigationBar />
          <Switch>
            <Route path={"/"} exact>
              <Polynomial />
            </Route>
            <Route path={"/polynomial"}>
              <Polynomial />
            </Route>
            <Route path={"/recommender"}>
              <Recommender />
            </Route>
            <Route path={"/about"}>
              <About />
            </Route>
          </Switch>
        </div>
        <a
          target="blank"
          href="https://github.com/rakannimer/tensorflowjs-playground"
        >
          <img
            style={{ position: "absolute", top: 0, right: 0, border: 0 }}
            src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png"
            alt="Fork me on GitHub"
          />
        </a>
      </div>
    </Router>
  );
});

render(<App />, document.getElementById("root"));
