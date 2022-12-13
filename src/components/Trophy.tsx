import {
  ReactNode,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import PaperModal from "./PaperModal";
import NameTag from "./NameTag";
import { ITrophyProps } from "../interface";

const Trophy: FunctionComponent<ITrophyProps> = ({
  interactDistance,
  xCoordinate,
  setHandleKeyDownCallback,
  focusOnCanvas,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const image = <img src="trophy.png" />;
  const size = 150;
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
            {isNear && <NameTag content="Cúp" />}
            {/* actual Book */}
            <div className="width-[400px]">{image}</div>
          </div>
        )}
      </div>
      {showGif && (
        <>
          <PaperModal
            title="Notes"
            content="Chúc em tuổi mới học được nhiều điều hay, thành tích tốt, ngày càng xuất sắc"
            extraContent={
              <img
                className="w-[200px]"
                src="https://stickershop.line-scdn.net/stickershop/v1/product/1242410/LINEStorePC/main.png"
              />
            }
            handleCloseModal={() => setShowGif(false)}
          />
        </>
      )}
    </>
  );
};

export default Trophy;
