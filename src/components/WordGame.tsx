import { FunctionComponent, useEffect, useRef, useState } from "react";
import ReactHowler from "react-howler";
import Modal from "./modals/Modal";
import NameTag from "./NameTag";
import { IWordGameProps } from "../interface";
import LoadingModal from "./modals/LoadingModal";
import { getAlphabet } from "../utils/wordFunctions";
import Alphabet from "./wordle/Alphabet";
import WordRow from "./wordle/WordRow";

const WordGame: FunctionComponent<IWordGameProps> = ({
  interactDistance,
  xCoordinate,
  setHandleKeyDownCallback,
  focusOnCanvas,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const image = <img src="word-game.png" />;
  const size = 200;
  const [isNear, setIsNear] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [music, setMusic] = useState<string | undefined>(undefined);
  const [showLoading, setShowLoading] = useState(false);

  // wordle
  const [alphabetMap, setAlphabetMap] = useState<Map<string, number>>(
    new Map()
  );
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const numGuesses = 5;
  const answerLengthLimit = 5;
  const correctAnswer = "happy";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (answers.length >= numGuesses) {
      alert("Hết lượt đoán");
    }
    setAnswers((answers) => [currentAnswer, ...answers]);
    setCurrentAnswer("");
  };

  useEffect(() => {
    console.log("inside getAlphabet useEffect");
    console.log(getAlphabet());
    setAlphabetMap(new Map(getAlphabet()));
  }, [answers]);

  // end wordle stuff

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
            {isNear && <NameTag content="Wordle" />}
            {/* actual WordGame */}
            <div className="width-[400px]">{image}</div>
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          title="CHOOSE YOUR MUSIC"
          handleCloseModal={handleCloseModal}
          content={
            <div className="flex flex-col gap-10 items-center">
              <div className="flex flex-col-reverse gap-5 h-[100px] overflow-y-scroll">
                {Array.from(Array(numGuesses), (e, index) => {
                  if (answers[index])
                    return (
                      <WordRow
                        key={index}
                        word={answers[index]}
                        wordLengthLimit={answerLengthLimit}
                        correctAnswer={correctAnswer}
                      />
                    );
                  else
                    return (
                      <WordRow
                        key={index}
                        word=""
                        wordLengthLimit={answerLengthLimit}
                        correctAnswer={correctAnswer}
                      />
                    );
                })}
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  value={currentAnswer}
                  onChange={(e) =>
                    setCurrentAnswer(e.target.value.toUpperCase())
                  }
                  className="border border-gray-500 text-center"
                  type="text"
                  maxLength={answerLengthLimit}
                />
              </form>
              <Alphabet alphabetMap={alphabetMap} />
            </div>
          }
        />
      )}
      {showLoading && (
        <LoadingModal
          content="Đợi xíu nhạc lên liền nha"
          duration={3000}
          img={
            <img src="https://media.baamboozle.com/uploads/images/428107/1652094753_50744_gif-url.gif" />
          }
          callback={() => {}}
          toggleModal={setShowLoading}
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

export default WordGame;
