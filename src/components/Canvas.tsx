import React, { useEffect, useRef, useState } from "react";
import { ICanvasProps } from "../interfaces/rooms.interface";
import ReactHowler from "react-howler";
import Guitar from "./Piano";
import Joystick from "./Joystick";
import Snowfall from "react-snowfall";
import Passport from "./Passport";

const Canvas: React.FunctionComponent<ICanvasProps> = ({}) => {
  const [catXCoordinate, setCatXCoordinate] = useState<number>(0);
  const [isFacedLeft, setIsFacedLeft] = useState<boolean>(true);
  const [handleKeyDownCallback, setHandleKeyDownCallback] = useState<
    () => void
  >(() => {});
  const catSize = 200;
  const interactDistance = 150;
  const [backgroundPositionX, setBackgroundPositionX] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const [guitarXCoordinate, setGuitarXCoordinate] = useState(400);
  const [passportXCoordinate, setPassportXCoordinate] = useState(600);
  useEffect(() => {
    return () => {
      console.log(canvasRef);
    };
  }, [canvasRef.current]);

  const focusOnCanvas = () => {
    canvasRef.current?.focus();
  };

  const handleLeft = () => {
    setIsFacedLeft(true);
    setGuitarXCoordinate((oldGuitarXCoordinate) => oldGuitarXCoordinate + 20);
    setPassportXCoordinate(
      (oldPassportXCoordinate) => oldPassportXCoordinate + 20
    );
    setBackgroundPositionX(
      (oldBackgroundPositionX) => oldBackgroundPositionX + 20
    );
  };

  const handleRight = () => {
    setIsFacedLeft(false);
    setGuitarXCoordinate((oldGuitarXCoordinate) => oldGuitarXCoordinate - 20);
    setPassportXCoordinate(
      (oldPassportXCoordinate) => oldPassportXCoordinate - 20
    );
    setBackgroundPositionX(
      (oldBackgroundPositionX) => oldBackgroundPositionX - 20
    );
  };

  const handleEnter = () => {
    if (handleKeyDownCallback) {
      handleKeyDownCallback();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!canvasRef.current) {
      return;
    }
    if (event.code === "ArrowLeft") {
      handleLeft();
    }
    if (event.code === "ArrowRight") {
      handleRight();
    }
    if (event.code === "Enter") {
      handleEnter();
    }
  };

  return (
    <div
      ref={canvasRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="overflow-hidden relative md:max-w-[700px] w-screen md:h-[70vh] h-screen sm:rounded-lg flex flex-col"
    >
      <div className="h-full relative">
        {/* backdrop */}
        <div
          className="absolute top-0 w-full h-full bg-cover bg-repeat-x"
          style={{
            backgroundImage:
              "url(https://i.ibb.co/F6yscH1/winter-background.jpg)",
            backgroundPositionX: `${backgroundPositionX}px`,
          }}
        >
          <Snowfall />
        </div>

        {/* floor */}
        {/* cat situated at the end of wall */}
        <div
          ref={catRef}
          className={`absolute bottom-10 z-10`}
          style={{
            left: `${catXCoordinate}px`,
            width: `${catSize}px`,
          }}
        >
          <img className={`${isFacedLeft ? "" : "flipped"}`} src="cat.png" />
        </div>
        {/* guitar situated at the center of the room */}
        <Guitar
          interactDistance={interactDistance}
          xCoordinate={guitarXCoordinate}
          setHandleKeyDownCallback={setHandleKeyDownCallback}
          focusOnCanvas={focusOnCanvas}
        />
        <Passport
          interactDistance={interactDistance}
          xCoordinate={passportXCoordinate}
          setHandleKeyDownCallback={setHandleKeyDownCallback}
          focusOnCanvas={focusOnCanvas}
        />
      </div>
      <Joystick
        handleClickLeft={handleLeft}
        handleClickRight={handleRight}
        handleClickSelect={handleEnter}
      />
    </div>
  );
};

export default Canvas;
