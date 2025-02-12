import { FC } from "react";

import AbooPeak from "./level9/AbooPeak";
import Angus from "./level9/Angus";
import OilPeak from "./level9/OilPeak";
import OrcChasm from "./level9/OrcChasm";
import TwinPeak from "./level9/TwinPeak";

const Level9: FC = () => {
  return (
    <>
      <OrcChasm />
      <Angus />
      <AbooPeak />
      <TwinPeak />
      <OilPeak />
    </>
  );
};

export default Level9;
