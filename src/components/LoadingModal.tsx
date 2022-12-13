import React, { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";

interface IPaperModalProps {
  content: React.ReactNode;
  img: React.ReactNode;
  duration: number;
  callback: Function;
  toggleModal: Function;
}

const LoadingModal: React.FunctionComponent<IPaperModalProps> = ({
  content,
  duration,
  img,
  callback,
  toggleModal,
}) => {
  useEffect(() => {
    toggleModal(true);
    setTimeout(() => {
      toggleModal(false);
      callback();
    }, duration);
  }, []);
  return (
    <div
      className={`h-full w-full z-[30] bg-black/30 backdrop-blur-sm transition-all absolute top-0 left-0 flex justify-center items-center`}
    >
      <div className="max-w-[80vw] sm:max-w-[500px] relative p-7 flex justify-center items-center">
        <img
          className="absolute z-[-10] h-full w-full rotate-6"
          src="https://www.pngkit.com/png/full/21-219902_torn-paper-png.png"
        />
        <div className="p-3">
          <div className="flex justify-center items-center gap-2"></div>
          <hr className="my-2" />
          <div className="w-[200px]">{img}</div>

          <div className="text-center font-pangolin text-gray-800">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
