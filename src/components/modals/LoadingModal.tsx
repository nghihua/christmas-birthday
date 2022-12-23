import React, { useEffect } from "react";
import { ILoadingModalProps } from "../../interface";

const LoadingModal: React.FunctionComponent<ILoadingModalProps> = ({
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
      <div className="w-full sm:w-1/2 h-fit relative p-7 flex justify-center items-center">
        <img
          className="absolute z-[-10] h-full w-full rotate-6"
          src="paper-min.png"
        />
        <div className="p-3">
          <div className="flex justify-center items-center gap-2"></div>
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
