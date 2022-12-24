import { FunctionComponent, useEffect, useRef, useState } from "react";
import Modal from "./modals/Modal";
import NameTag from "./NameTag";
import { IWordGameProps } from "../interface";
import LoadingModal from "./modals/LoadingModal";
import Alphabet from "./wordle/Alphabet";
import WordRow from "./wordle/WordRow";
import PaperModal from "./PaperModal";

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
  const [showWelcome, setShowWelcome] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showCondolences, setShowCondolences] = useState(false);
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
      setShowCondolences(true);
    }
    alert(currentAnswer);
    alert(correctAnswer);
    if (currentAnswer == correctAnswer) {
      setShowCongratulations(true);
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
    if (showModal) {
      setShowWelcome(true);
    }
  }, [showModal]);
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
          title="BIRTHDAY WORDLE"
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
      {showWelcome && (
        <div className="text-sm">
          <PaperModal
            title="Hướng dẫn chơi Wordle"
            content="Nhấn vào ô input, gõ rồi enter. Bảng chữ cái phía dưới giúp em keep track: chữ nào không đúng sẽ biến mất, đúng nhưng sai vị trí sẽ vàng, đúng thì xanh lá. Khung hiển thị những từ em đã enter phía trên có thể scroll lên scroll xuống để xem lại. Good luck 🍀"
            handleCloseModal={() => setShowWelcome(false)}
            typewriterEffect={false}
          />
        </div>
      )}
      {showCongratulations && (
        <div className="text-sm">
          <PaperModal
            title="Congratulations 🎉"
            content="Chúc em sẽ có được thứ mà từ này miêu tả nhá. Mỗi lần refresh trang sẽ là một từ khác nhau, ý nghĩa cái nào cũng tốt, xem như điềm lành em lấy vía khi chơi."
            handleCloseModal={() => {
              setShowCongratulations(false);
              handleCloseModal();
            }}
            typewriterEffect={false}
          />
        </div>
      )}
      {showCondolences && (
        <div className="text-sm">
          <PaperModal
            title="Hết lượt chơi rồi 😔"
            content="Refresh trang để chơi tiếp nha (nhưng mỗi lần refresh sẽ bị đổi từ)."
            handleCloseModal={() => {
              setShowCondolences(false);
              handleCloseModal();
            }}
            typewriterEffect={false}
          />
        </div>
      )}
    </>
  );
};

export default WordGame;
