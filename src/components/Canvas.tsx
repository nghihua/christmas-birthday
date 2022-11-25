import React, { useEffect, useRef, useState } from "react";
import { ICanvasProps } from "../interfaces/rooms.interface";
import ReactHowler from "react-howler";
import Guitar from "./Guitar";
import Joystick from "./Joystick";

const Canvas: React.FunctionComponent<ICanvasProps> = ({}) => {
  const [catXCoordinate, setCatXCoordinate] = useState<number>(0);
  const [isFacedLeft, setIsFacedLeft] = useState<boolean>(true);
  const [handleKeyDownCallback, setHandleKeyDownCallback] = useState<
    (keyCode: string) => void
  >((keyCode: string) => {});
  const catSize = 200;
  const interactDistance = 150;
  const [backgroundPositionX, setBackgroundPositionX] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const [guitarXCoordinate, setGuitarXCoordinate] = useState(400);

  useEffect(() => {
    return () => {
      console.log(canvasRef);
    };
  }, [canvasRef.current]);

  const focusOnCanvas = () => {
    canvasRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!canvasRef.current) {
      return;
    }
    if (event.code === "ArrowLeft") {
      setIsFacedLeft(true);
      setGuitarXCoordinate(guitarXCoordinate + 20);
      setBackgroundPositionX(backgroundPositionX + 20);
    }
    if (event.code === "ArrowRight") {
      setGuitarXCoordinate(guitarXCoordinate - 20);
      setBackgroundPositionX(backgroundPositionX - 20);
      setIsFacedLeft(false);
    }
    if (handleKeyDownCallback) {
      handleKeyDownCallback(event.code);
    }
  };

  return (
    <div
      ref={canvasRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="overflow-hidden relative w-screen max-w-[700px] h-[50vh] grid grid-rows-6"
    >
      {/* wall */}
      <div
        className="relative row-span-5 h-full bg-cover bg-repeat-x"
        style={{
          backgroundImage:
            "url(https://t3.ftcdn.net/jpg/03/57/11/70/240_F_357117060_yV3A2INxBDKlab5KSEHFUEtzokb5IiJ6.jpg)",
          backgroundPositionX: `${backgroundPositionX}px`,
        }}
      ></div>
      {/* <img
        src="https://t3.ftcdn.net/jpg/03/57/11/70/240_F_357117060_yV3A2INxBDKlab5KSEHFUEtzokb5IiJ6.jpg"
        className="relative row-span-5 h-full object-cover"
      /> */}

      {/* floor */}
      <div className="bg-gray-100">
        {/* cat situated at the end of wall */}
        <div
          ref={catRef}
          className={`absolute bottom-0 z-10`}
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
      </div>
      <Joystick />
    </div>
  );
};

export default Canvas;
