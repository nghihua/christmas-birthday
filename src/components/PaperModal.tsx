import * as React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import Typewriter from "typewriter-effect";

interface IPaperModalProps {
  title: string;
  content: string;
  extraContent: React.ReactNode;
  handleCloseModal: () => void;
}

const PaperModal: React.FunctionComponent<IPaperModalProps> = ({
  title,
  content,
  extraContent,
  handleCloseModal,
}) => {
  return (
    <div className="h-full w-full z-[30] bg-black/30 backdrop-blur-sm transition-all absolute top-0 left-0 flex justify-center items-center">
      <div className="w-[80vw] sm:max-w-[500px] relative p-7 flex justify-center items-center">
        <img
          className="absolute z-[-10] h-full w-full rotate-6"
          src="https://www.pngkit.com/png/full/21-219902_torn-paper-png.png"
        />
        <div className="p-3">
          <div className="flex justify-center items-center gap-2">
            <div className="text-2xl font-pangolin">{title}</div>
            <button onClick={handleCloseModal}>
              <AiFillCloseSquare color="#1f5b33" size={20} />
            </button>
          </div>
          <hr className="my-2" />
          <div className="font-pangolin text-gray-800">
            <div>
              <p className="text-xl leading-10">
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter.typeString(content);
                    typewriter.start();
                  }}
                  options={{
                    autoStart: true,
                    delay: 70,
                  }}
                />
              </p>
              <div className="my-5 flex justify-center items-center">
                {extraContent && extraContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperModal;
