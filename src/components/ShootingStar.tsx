import { FunctionComponent, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import NameTag from "./NameTag";
import PaperModal from "./PaperModal";
import { IShootingStarProps } from "../interface";
import { Button, TextField } from "@mui/material";

const ShootingStar: FunctionComponent<IShootingStarProps> = ({
  interactDistance,
  xCoordinate,
  setHandleKeyDownCallback,
  focusOnCanvas,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const image = <img src="shooting-star.png" />;
  const size = 150;
  const [isNear, setIsNear] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (
      0 > xCoordinate - interactDistance * 2 &&
      0 < xCoordinate + interactDistance * 2
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
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
            {isNear && <NameTag content="Sao băng" />}
            <div className="mb-[200px]">{image}</div>
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          title="Cầu nguyện gì đó i"
          handleCloseModal={handleCloseModal}
          content={
            <div className="flex flex-col gap-3">
              <TextField label="Điều ước" multiline minRows={3} />
              <Button
                variant="contained"
                onClick={() => {
                  handleCloseModal();
                  setShowMessage(true);
                }}
              >
                Ước
              </Button>
              <div className="text-center text-sm">
                <p>An tâm hong có lưu lại nha :")</p>
                <p>App này hỏng có backend</p>
              </div>
            </div>
          }
        />
      )}
      {showMessage && (
        <>
          <PaperModal
            title="Đã ước xong"
            content="Không biết sao nhưng chị có cảm giác sẽ thành sự thật á ✨"
            extraContent={
              <img
                className="w-[200px]"
                src="https://images.squarespace-cdn.com/content/v1/5953f2db37c58112898b2293/1601649592996-RXQOAJG8OPM0TZOUICAN/crystal-ball-flicker-WHITEBG-anneleedesigns.gif"
              />
            }
            handleCloseModal={() => setShowMessage(false)}
          />
        </>
      )}
    </>
  );
};

export default ShootingStar;
