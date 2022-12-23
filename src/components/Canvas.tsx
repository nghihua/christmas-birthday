import React, { useEffect, useRef, useState } from "react";
import { ICanvasProps } from "../interface";
import Guitar from "./Piano";
import Joystick from "./Joystick";
import Snowfall from "react-snowfall";
import Foodstall from "./Foodstall";
import Trophy from "./Trophy";
import Drinkstall from "./Drinkstall";
import ShootingStar from "./ShootingStar";
import FocusReminder from "./FocusReminder";
import Greeting from "./Greeting";
import PaperModal from "./PaperModal";
import WordGame from "./WordGame";

const Canvas: React.FunctionComponent<ICanvasProps> = ({}) => {
  const [showGreeting, setShowGreeting] = useState(false);
  const [showFarewell, setShowFarewell] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [catXCoordinate, setCatXCoordinate] = useState<number>(0);
  const [isFacedLeft, setIsFacedLeft] = useState<boolean>(true);
  const [handleKeyDownCallback, setHandleKeyDownCallback] = useState<
    () => void
  >(() => {});
  const catSize = 200;
  const interactDistance = 150;
  const speed = 40;
  const [backgroundPositionX, setBackgroundPositionX] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const [guitarXCoordinate, setGuitarXCoordinate] = useState(400);
  const [foodstallXCoordinate, setFoodstallXCoordinate] = useState(1000);
  const [drinkstallXCoordinate, setDrinkstallXCoordinate] = useState(1600);
  const [trophyXCoordinate, setTrophyXCoordinate] = useState(2800);
  const [wordGameXCoordinate, setWordGameXCoordinate] = useState(3400);
  const [shootingStarXCoordinate, setShootingStarXCoordinate] = useState(3800);
  const endCoordinate = 4000;

  const [showFocusReminder, setShowFocusReminder] = useState(false);

  useEffect(() => {
    const src = "https://i.ibb.co/F6yscH1/winter-background.jpg";
    let img = new Image();
    img.src = src;
    img.onload = () => {
      setBackgroundImage("url(" + src + ")");
      setShowGreeting(true);
    };
  }, []);

  useEffect(() => {
    if (backgroundPositionX <= -endCoordinate) {
      setShowFarewell(true);
    }
  }, [backgroundPositionX]);

  const focusOnCanvas = () => {
    canvasRef.current?.focus();
  };

  const handleLeft = () => {
    setIsFacedLeft(true);
    if (backgroundPositionX >= 0) {
      return;
    }
    setGuitarXCoordinate(
      (oldGuitarXCoordinate) => oldGuitarXCoordinate + speed
    );
    setTrophyXCoordinate(
      (oldTrophyXCoordinate) => oldTrophyXCoordinate + speed
    );
    setFoodstallXCoordinate(
      (oldFoodstallXCoordinate) => oldFoodstallXCoordinate + speed
    );
    setDrinkstallXCoordinate(
      (oldDrinkstallXCoordinate) => oldDrinkstallXCoordinate + speed
    );
    setShootingStarXCoordinate(
      (oldShootingStarXCoordinate) => oldShootingStarXCoordinate + speed
    );
    setWordGameXCoordinate(
      (oldWordGameXCoordinate) => oldWordGameXCoordinate + speed
    );
    setBackgroundPositionX(
      (oldBackgroundPositionX) => oldBackgroundPositionX + speed
    );
  };

  const handleRight = () => {
    setIsFacedLeft(false);
    setGuitarXCoordinate(
      (oldGuitarXCoordinate) => oldGuitarXCoordinate - speed
    );
    setTrophyXCoordinate(
      (oldTrophyXCoordinate) => oldTrophyXCoordinate - speed
    );
    setFoodstallXCoordinate(
      (oldFoodstallXCoordinate) => oldFoodstallXCoordinate - speed
    );
    setDrinkstallXCoordinate(
      (oldDrinkstallXCoordinate) => oldDrinkstallXCoordinate - speed
    );
    setShootingStarXCoordinate(
      (oldShootingStarXCoordinate) => oldShootingStarXCoordinate - speed
    );
    setWordGameXCoordinate(
      (oldWordGameXCoordinate) => oldWordGameXCoordinate - speed
    );
    setBackgroundPositionX(
      (oldBackgroundPositionX) => oldBackgroundPositionX - speed
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
      onKeyDown={showGreeting || showFarewell ? () => {} : handleKeyDown}
      tabIndex={0}
      onBlur={() => {
        setShowFocusReminder(true);
      }}
      onFocus={() => {
        setShowFocusReminder(false);
      }}
      className="overflow-hidden relative lg:max-w-[80vw] lg:h-auto lg:aspect-video w-screen h-screen sm:rounded-lg flex flex-col"
    >
      <div className="h-full relative">
        {/* backdrop */}
        <div
          className="absolute top-0 w-full h-full mb-20 bg-cover bg-repeat-x"
          style={{
            backgroundImage: backgroundImage,
            backgroundPositionX: `${backgroundPositionX}px`,
          }}
        >
          <Snowfall />
        </div>
        {backgroundImage && showGreeting ? (
          <Greeting
            callback={() => {
              setShowGreeting(false);
              focusOnCanvas();
            }}
          />
        ) : (
          <>
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
              <img
                className={`${isFacedLeft ? "" : "flipped"}`}
                src="cat.png"
              />
            </div>
            {/* guitar situated at the center of the room */}
            <Guitar
              interactDistance={interactDistance}
              xCoordinate={guitarXCoordinate}
              setHandleKeyDownCallback={setHandleKeyDownCallback}
              focusOnCanvas={focusOnCanvas}
            />
            <Trophy
              interactDistance={interactDistance}
              xCoordinate={trophyXCoordinate}
              setHandleKeyDownCallback={setHandleKeyDownCallback}
              focusOnCanvas={focusOnCanvas}
            />
            <Foodstall
              interactDistance={interactDistance}
              xCoordinate={foodstallXCoordinate}
              setHandleKeyDownCallback={setHandleKeyDownCallback}
              focusOnCanvas={focusOnCanvas}
            />
            <Drinkstall
              interactDistance={interactDistance}
              xCoordinate={drinkstallXCoordinate}
              setHandleKeyDownCallback={setHandleKeyDownCallback}
              focusOnCanvas={focusOnCanvas}
            />
            <WordGame
              interactDistance={interactDistance}
              xCoordinate={wordGameXCoordinate}
              setHandleKeyDownCallback={setHandleKeyDownCallback}
              focusOnCanvas={focusOnCanvas}
            />
            <ShootingStar
              interactDistance={interactDistance}
              xCoordinate={shootingStarXCoordinate}
              setHandleKeyDownCallback={setHandleKeyDownCallback}
              focusOnCanvas={focusOnCanvas}
            />
            {showFarewell && (
              <PaperModal
                title="🚦 Kết thúc hành trình"
                content="Tới đây là hết rồi. Hy vọng em thích món quà nho nhỏ này. Để phòng ngừa em không thích, chị có chuẩn bị một món quà khác ^^. Còn giờ thì chúc em ngủ ngon nha, để ngày mai còn đón trọn được một ngày sinh nhật thật vui. 🌼"
                handleCloseModal={() => {
                  setShowFarewell(false);
                  focusOnCanvas();
                }}
              ></PaperModal>
            )}
          </>
        )}
      </div>
      <Joystick
        handleClickLeft={handleLeft}
        handleClickRight={handleRight}
        handleClickSelect={handleEnter}
      />
      {showFocusReminder && <FocusReminder callback={focusOnCanvas} />}
    </div>
  );
};

export default Canvas;
