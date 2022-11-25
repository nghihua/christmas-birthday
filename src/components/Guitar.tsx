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

interface IGuitarProps {
  interactDistance: number;
  xCoordinate: number;
  setHandleKeyDownCallback: React.Dispatch<
    React.SetStateAction<(keyCode: string) => void>
  >;
  focusOnCanvas: () => void;
}

const Guitar: FunctionComponent<IGuitarProps> = ({
  interactDistance,
  xCoordinate,
  setHandleKeyDownCallback,
  focusOnCanvas,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const image = <img src="guitar.png" />;
  const size = 200;
  const [isNear, setIsNear] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [music, setMusic] = useState<string | undefined>(undefined);

  const songList = [
    { title: "Happy Birthday", src: "birthday.mp3" },
    { title: "It's Your Day", src: "#" },
  ];

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
        (oldHandle: (keyCode: string) => void) => handleKeyDownCallback
      );
    } else {
      itemRef.current?.blur();
      setHandleKeyDownCallback(
        (oldHandle: (keyCode: string) => void) => (keyCode: string) => {}
      );
    }
  }, [isNear]);

  const handleKeyDownCallback = (keyCode: string) => {
    if (keyCode === "Enter") {
      setShowModal(true);
    }
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
            className={`absolute bottom-0`}
            style={{
              left: `${xCoordinate}px`,
              width: `${size}px`,
            }}
          >
            {/* glow */}
            {isNear && (
              <div className="mx-auto mb-[-100%] bg-orange-200/70 w-[200px] h-[200px] rounded-full"></div>
            )}
            {/* actual guitar */}
            <div className="width-[400px]">{image}</div>
          </div>
        )}
      </div>
      {showModal && (
        <div className="bg-white p-3 rounded-md absolute top-[50%] left-[50%]">
          <div className="flex justify-center items-center gap-2">
            <div className="">CHOOSE YOUR MUSIC</div>
            <button onClick={handleCloseModal}>
              <AiFillCloseSquare color="#1f5b33" size={20} />
            </button>
          </div>
          <hr className="my-2" />
          <div className="flex flex-col">
            {songList.map((song) => (
              <button
                className="hover:bg-[#d9e46c] px-2 flex gap-1 items-center"
                onClick={() => {
                  setMusic(song.src);
                  handleCloseModal();
                }}
              >
                <BsMusicNote size={20} color="#1f5b33" /> {song.title}
              </button>
            ))}
            <button
              className="hover:bg-[#d9e46c] px-2 flex gap-1 items-center"
              onClick={() => {
                setMusic(undefined);
                handleCloseModal();
              }}
            >
              <TiCancel size={20} color="red" />
              Turn off
            </button>
          </div>
        </div>
      )}
      <div className="hidden">
        <ReactHowler
          src={music ? music : "birthday.mp3"}
          playing={music !== undefined}
          loop
        />
      </div>
    </>
  );
};

export default Guitar;
