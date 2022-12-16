import React, { useEffect, useState } from "react";

interface IGreetingProps {
  callback: () => void;
}

const Greeting: React.FunctionComponent<IGreetingProps> = ({ callback }) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(true);
  }, []);
  return (
    <div
      className={`${
        enabled ? "opacity-100" : "opacity-0"
      } transition-opacity ease-in duration-1000 absolute flex items-center justify-center w-full h-full z-[30`}
    >
      <div className="w-full md:w-3/4 p-5 flex flex-col items-center">
        <img className="z-40" src="logo.png" />
        <div className="w-1/2 rounded flex flex-col items-center py-3 gap-1 md:gap-3">
          <button
            onClick={() => {
              setEnabled(false);
              setTimeout(callback, 1000);
            }}
            className="text-xl sm:text-2xl lg:text-4xl w-fit px-4 py-2 font-semibold bg-green-700 text-white rounded-md shadow-sm hover:scale-125 ease-in-out duration-300"
          >
            START
          </button>
          <button className="text-xs sm:text-sm lg:text-lg w-fit px-4 py-2 font-semibold bg-white bg-opacity-80 text-black rounded-md shadow-sm hover:scale-125 ease-in-out duration-300">
            HƯỚNG DẪN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
