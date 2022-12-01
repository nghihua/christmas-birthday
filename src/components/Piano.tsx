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
import Modal from "./Modal";

interface IPianoProps {
  interactDistance: number;
  xCoordinate: number;
  setHandleKeyDownCallback: React.Dispatch<React.SetStateAction<() => void>>;
  focusOnCanvas: () => void;
}

const Piano: FunctionComponent<IPianoProps> = ({
  interactDistance,
  xCoordinate,
  setHandleKeyDownCallback,
  focusOnCanvas,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const image = <img src="grand-piano.png" />;
  const size = 200;
  const [isNear, setIsNear] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [music, setMusic] = useState<string | undefined>(undefined);

  const songList = [
    { title: "Happy Birthday - Miranda Wong", src: "birthday-mirandawong.mp3" },
    { title: "Silent Night, Holy Night", src: "silentnightholynight.webm" },
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
            {isNear && (
              <div className="transition-all mx-auto mb-[-100%] bg-orange-200/70 w-[200px] h-[200px] rounded-full"></div>
            )}
            {/* actual Piano */}
            <div className="width-[400px]">{image}</div>
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          title="CHOOSE YOUR MUSIC"
          handleCloseModal={handleCloseModal}
          content={
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
          }
        />
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

export default Piano;
