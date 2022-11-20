import React, { useEffect, useRef, useState } from "react";
import { IGuitarRoomProps } from "../../interfaces/rooms.interface";
import ReactHowler from "react-howler";

const GuitarRoom: React.FunctionComponent<IGuitarRoomProps> = ({
  setIsMusicPlayed,
}) => {
  const [catXCoordinate, setCatXCoordinate] = useState<number>(0);
  const [isFacedLeft, setIsFacedLeft] = useState<boolean>(true);
  const [isNearGuitar, setIsNearGuitar] = useState<boolean>(false);
  const windowWidth = window.innerWidth;
  const catSize = 300;
  const guitarSize = 300;
  const guitarXCoordinate = 200;
  const interactDistance = 100;
  const canvasRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // (catRef.current?.offsetLeft as number) +
    //   (catRef.current?.offsetWidth as number);
    return () => {
      console.log(canvasRef);
    };
  }, [canvasRef.current]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!canvasRef.current) {
      return;
    }
    if (event.code === "ArrowLeft" && catXCoordinate > 0) {
      setCatXCoordinate(catXCoordinate - 20);
      setIsFacedLeft(true);
    }
    if (
      event.code === "ArrowRight" &&
      catXCoordinate + catSize < canvasRef.current.offsetWidth
    ) {
      setCatXCoordinate(catXCoordinate + 20);
      setIsFacedLeft(false);
    }
    if (
      catXCoordinate > guitarXCoordinate - interactDistance &&
      catXCoordinate < guitarXCoordinate + interactDistance
    ) {
      setIsNearGuitar(true);
      if (event.code === "Enter") {
        setIsMusicPlayed(true);
      }
    } else {
      setIsNearGuitar(false);
    }
  };

  return (
    <div
      ref={canvasRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative w-[700px] h-screen grid grid-rows-6"
    >
      {canvasRef.current?.offsetWidth}
      {"\n"}
      {(catRef.current?.offsetLeft as number) +
        (catRef.current?.offsetWidth as number)}
      {catXCoordinate + catSize}
      {/* wall */}
      <div className="relative bg-gray-200 row-span-5"></div>

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
        <div
          className={`absolute bottom-0`}
          style={{
            left: `${guitarXCoordinate}px`,
            width: `${guitarSize}px`,
          }}
        >
          {/* glow */}
          {isNearGuitar && (
            <div className="mx-auto mb-[-100%] bg-orange-200/70 w-[200px] h-[200px] rounded-full"></div>
          )}
          {/* actual guitar */}
          <div className="width-[400px]">
            <img src="guitar.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuitarRoom;
