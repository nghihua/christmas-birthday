import { useRef, useState } from "react";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsFillHandIndexFill,
} from "react-icons/bs";
import { IJoystickProps } from "../interface";

const Joystick: React.FunctionComponent<IJoystickProps> = ({
  handleClickLeft,
  handleClickRight,
  handleClickSelect,
}) => {
  const intervalRef = useRef<number | null>(null);
  const startInterval = (callback: () => void) => {
    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      callback();
    }, 150);
  };
  const stopInterval = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  return (
    <div className="pb-[120px] lg:hidden w-screen flex justify-between items-center gap-2 z-20 bg-[#3a50c1]/50 px-7 py-3">
      <div className="flex gap-3">
        <button
          onMouseDown={handleClickLeft}
          onTouchStart={() => startInterval(handleClickLeft)}
          onTouchEnd={stopInterval}
        >
          <BsFillArrowLeftSquareFill size={50} color="white" />
        </button>
        <button
          onMouseDown={handleClickRight}
          onTouchStart={() => startInterval(handleClickRight)}
          onTouchEnd={stopInterval}
        >
          <BsFillArrowRightSquareFill size={50} color="white" />
        </button>
      </div>

      <button onMouseDown={handleClickSelect} className="">
        <BsFillHandIndexFill size={50} color="white" />
      </button>
    </div>
  );
};

export default Joystick;
