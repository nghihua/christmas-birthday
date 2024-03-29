import * as React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { IModalProps } from "../../interface";

const Modal: React.FunctionComponent<IModalProps> = ({
  title,
  content,
  handleCloseModal,
}) => {
  return (
    <div className="h-full w-full z-[30] bg-black/30 backdrop-blur-sm transition-all absolute top-0 left-0 flex justify-center items-center">
      <div className="md:w-1/2 w-3/4 h-fit bg-white p-3 rounded-md">
        <div className="flex justify-center items-center gap-2">
          <div className="font-bungee text-gray-600 text-lg lg:text-2xl">
            {title}
          </div>
          <button onClick={handleCloseModal}>
            <AiFillCloseSquare color="#1f5b33" size={20} />
          </button>
        </div>
        <hr className="my-2" />
        <div className="h-full text-gray-800 font-pangolin text-md lg:text-2xl">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
