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
      <div className="w-screen md:w-3/4 p-5 flex flex-col items-center">
        <img className="z-40" src="greeting.png" />
        <div className="w-1/2 rounded flex flex-col items-center py-3 gap-1 md:gap-3">
          <button
            onClick={() => {
              setEnabled(false);
              setTimeout(callback, 1000);
            }}
            className="font-bungee text-3xl sm:text-5xl w-fit py-1 px-2 sm:px-4 sm:py-2 border border-white bg-[#6d9eeb] text-white rounded-md shadow-sm hover:scale-125 ease-in-out duration-300"
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
