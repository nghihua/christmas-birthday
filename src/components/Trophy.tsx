import {
  ReactNode,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import ReactHowler from "react-howler";
import { BsMusicNote } from "react-icons/bs";
import { TiCancel } from "react-icons/ti";
import PaperModal from "./PaperModal";

interface ITrophyProps {
  interactDistance: number;
  xCoordinate: number;
  setHandleKeyDownCallback: React.Dispatch<React.SetStateAction<() => void>>;
  focusOnCanvas: () => void;
}

const Trophy: FunctionComponent<ITrophyProps> = ({
  interactDistance,
  xCoordinate,
  setHandleKeyDownCallback,
  focusOnCanvas,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const image = <img src="trophy.png" />;
  const size = 150;
  const glowSize = 150;
  const [isNear, setIsNear] = useState(false);
  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    if (
      0 > xCoordinate - interactDistance &&
      0 < xCoordinate + interactDistance
    ) {
      setIsNear(true);
    } else {
      setIsNear(false);
    }
  }, [xCoordinate]);

  useEffect(() => {
    if (isNear) {
      itemRef.current?.focus();
      setHandleKeyDownCallback(
        (oldHandle: () => void) => handleKeyDownCallback
      );
    } else {
      itemRef.current?.blur();
      setHandleKeyDownCallback((oldHandle: () => void) => () => {});
    }
  }, [isNear]);

  const handleKeyDownCallback = () => {
    setShowGif(true);
  };

  const handleCloseModal = () => {
    setShowGif(false);
    focusOnCanvas();
  };
  return (
    <>
      <div>
        {xCoordinate + size > 0 && (
          <div
            ref={itemRef}
            className={`absolute bottom-10`}
            style={{
              left: `${xCoordinate}px`,
              width: `${size}px`,
            }}
          >
            {/* glow */}
            {isNear && (
              <div
                className="transition-all mx-auto mb-[-100%] bg-orange-200/70 rounded-full"
                style={{
                  width: glowSize + "px",
                  height: glowSize + "px",
                }}
              ></div>
            )}
            {/* actual Book */}
            <div className="width-[400px]">{image}</div>
          </div>
        )}
      </div>
      {showGif && (
        <>
          <PaperModal
            title="Notes"
            content={
              <div>
                <p className="text-2xl leading-10">
                  Chúc em tuổi mới học được nhiều điều hay, thành tích tốt, ngày
                  càng xuất sắc
                </p>
                <div className="my-5 flex justify-center items-center">
                  <img
                    className="w-[200px]"
                    src="https://stickershop.line-scdn.net/stickershop/v1/product/1242410/LINEStorePC/main.png"
                  />
                </div>
              </div>
            }
            handleCloseModal={() => setShowGif(false)}
          />
        </>
      )}
    </>
  );
};

export default Trophy;
