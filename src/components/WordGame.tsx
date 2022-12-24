import { FunctionComponent, useEffect, useRef, useState } from "react";
import Modal from "./modals/Modal";
import NameTag from "./NameTag";
import { IWordGameProps } from "../interface";
import LoadingModal from "./modals/LoadingModal";
import Alphabet from "./wordle/Alphabet";
import WordRow from "./wordle/WordRow";

const WordGame: FunctionComponent<IWordGameProps> = ({
  interactDistance,
  xCoordinate,
  setHandleKeyDownCallback,
  focusOnCanvas,
}) => {
  const wordList = ["HAPPY", "BEAUTY", "SUCCESS", "MONEY", "CLEVER"];
  const itemRef = useRef<HTMLDivElement>(null);
  const image = <img src="word-game.png" />;
  const size = 200;
  const [isNear, setIsNear] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  // wordle
  const [correctAnswer, setCorrectAnswer] = useState("WONDER");
  const numGuesses = 5;
  const [alphabetMap, setAlphabetMap] = useState<Map<string, number>>(
    new Map()
  );
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (answers.length >= numGuesses) {
      alert("Hết lượt đoán");
    }
    setAnswers((answers) => [currentAnswer, ...answers]);
    setCurrentAnswer("");
  };

  useEffect(() => {
    // init correct answer
    const index = Math.floor(Math.random() * wordList.length);
    setCorrectAnswer(wordList[index]);
    // init alphabet map
    for (let i = 0; i <= 25; i++) {
      alphabetMap.set(String.fromCharCode(65 + i), 0);
    }
  }, []);

  useEffect(() => {
    setAlphabetMap(new Map(getAlphabet()));
  }, [answers]);

  const checkAnswer = (correctAnswer: string, answer: string) => {
    let correctAnswerSet = new Set<string>([]);
    for (let i = 0; i < correctAnswer.length; i++) {
      correctAnswerSet.add(correctAnswer[i]);
    }
    let result = [];
    for (let i = 0; i < answer.length; i++) {
      if (correctAnswerSet.has(answer[i])) {
        result[i] = 2;
        alphabetMap.set(answer[i], 2);
        if (correctAnswer[i] === answer[i]) {
          result[i] = 3;
          alphabetMap.set(answer[i], 3);
        }
      } else {
        result[i] = 1;
        alphabetMap.delete(answer[i]);
      }
    }
    return result;
  };

  const getAlphabet = () => {
    return alphabetMap;
  };

  // end wordle stuff

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
              <div className="w-full flex flex-col-reverse gap-5 h-[100px] overflow-y-scroll">
                {Array.from(Array(numGuesses), (e, index) => {
                  if (answers[index])
                    return (
                      <WordRow
                        key={index}
                        word={answers[index]}
                        wordLengthLimit={correctAnswer.length}
                        correctAnswer={correctAnswer}
                        checkAnswer={checkAnswer}
                      />
                    );
                  else
                    return (
                      <WordRow
                        key={index}
                        word=""
                        wordLengthLimit={correctAnswer.length}
                        correctAnswer={correctAnswer}
                        checkAnswer={checkAnswer}
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
                  className="border border-gray-500 text-center text-xl"
                  type="text"
                  placeholder="Gõ vô đây rồi Enter"
                  maxLength={correctAnswer.length}
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
    </>
  );
};

export default WordGame;
