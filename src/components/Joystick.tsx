import * as React from "react";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsFillHandIndexFill,
} from "react-icons/bs";

interface IJoystickProps {}

const Joystick: React.FunctionComponent<IJoystickProps> = (props) => {
  return (
    <div className="fixed right-0 bottom-[30vh] flex flex-col items-center gap-2 z-20 bg-red-100 px-7 py-3 rounded-md">
      <div className="flex gap-3">
        <button>
          <BsFillArrowLeftSquareFill size={50} color="white" />
        </button>
        <button>
          <BsFillArrowRightSquareFill size={50} color="white" />
        </button>
      </div>

      <button className="">
        <BsFillHandIndexFill size={50} color="white" />
      </button>
    </div>
  );
};

export default Joystick;
