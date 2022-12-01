import * as React from "react";
import { AiFillCloseSquare } from "react-icons/ai";

interface IModalProps {
  title: string;
  content: React.ReactNode;
  handleCloseModal: () => void;
}

const Modal: React.FunctionComponent<IModalProps> = ({
  title,
  content,
  handleCloseModal,
}) => {
  return (
    <div className="h-full w-full z-[30] bg-black/30 absolute top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-3 rounded-md">
        <div className="flex justify-center items-center gap-2">
          <div className="">{title}</div>
          <button onClick={handleCloseModal}>
            <AiFillCloseSquare color="#1f5b33" size={20} />
          </button>
        </div>
        <hr className="my-2" />
        {content}
      </div>
    </div>
  );
};

export default Modal;
