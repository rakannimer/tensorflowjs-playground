import * as React from "react";
import { observer } from "mobx-react";
import { InputDataGenerator } from "../ui/InputDataGenerator";
import { TrainingGym } from "../ui/TrainingGym";
export const Polynomial = observer(() => {
  return (
    <>
      <InputDataGenerator />
      <TrainingGym />
    </>
  );
});
