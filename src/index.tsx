import * as React from "react";
import { render } from "react-dom";
import { observer } from "mobx-react";

import "./ui.css";
import { Header } from "./ui/Header";
import { InputDataGenerator } from "./ui/InputDataGenerator";
import { TrainingGym } from "./ui/TrainingGym";

const App = observer(() => {
  return (
    <div className="flex-container">
      <Header />
      <InputDataGenerator />
      <TrainingGym />
    </div>
  );
});

render(<App />, document.getElementById("root"));
