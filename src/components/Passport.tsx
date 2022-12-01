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

interface IPassportProps {
  interactDistance: number;
  xCoordinate: number;
  setHandleKeyDownCallback: React.Dispatch<React.SetStateAction<() => void>>;
  focusOnCanvas: () => void;
}

const Passport: FunctionComponent<IPassportProps> = ({
  interactDistance,
  xCoordinate,
  setHandleKeyDownCallback,
  focusOnCanvas,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const image = <img src="passport.png" />;
  const size = 100;
  const [isNear, setIsNear] = useState(false);
  const [showPlane, setShowPlane] = useState(false);

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
    setShowPlane(true);
  };

  const handleCloseModal = () => {
    setShowPlane(false);
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
              <div className="transition-all mx-auto mb-[-100%] bg-orange-200/70 w-[200px] h-[200px] rounded-full"></div>
            )}
            {/* actual Passport */}
            <div className="width-[400px]">{image}</div>
          </div>
        )}
      </div>
      {showPlane && (
        <img
          src="airplane.gif"
          className="absolute top-10 w-[1000px]"
          style={{
            left: "0px",
          }}
        />
      )}
    </>
  );
};

export default Passport;
