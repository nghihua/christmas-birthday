import { useRef, useState } from "react";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsFillHandIndexFill,
} from "react-icons/bs";

interface IJoystickProps {
  handleClickLeft: () => void;
  handleClickRight: () => void;
  handleClickSelect: () => void;
}

const Joystick: React.FunctionComponent<IJoystickProps> = ({
  handleClickLeft,
  handleClickRight,
  handleClickSelect,
}) => {
  const intervalRef = useRef<number | null>(null);
  const [pressed, setPressed] = useState(false);
  const startInterval = (callback: () => void) => {
    setPressed(true);
    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      callback();
    }, 150);
    // intervalRef.current = window.setInterval(() => console.log("hehe"), 250);
  };
  const stopInterval = () => {
    setPressed(false);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  return (
    <div className="fixed right-0 bottom-[30vh] flex flex-col items-center gap-2 z-20 bg-red-100 px-7 py-3 rounded-md">
      <div className="flex gap-3">
        <button
          className={`${pressed ? "bg-white" : "bg-green-100"}`}
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
