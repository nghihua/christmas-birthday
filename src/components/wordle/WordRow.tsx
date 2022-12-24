import { useState, useEffect } from "react";
import { resultColorCodes } from "../../const/colorCodes";

interface IWordRowProps {
  word: string;
  wordLengthLimit: number;
  checkAnswer: Function;
  correctAnswer: string;
}

const WordRow: React.FunctionComponent<IWordRowProps> = ({
  word,
  wordLengthLimit,
  checkAnswer,
  correctAnswer,
}) => {
  const [result, setResult] = useState<number[]>([]);
  useEffect(() => {
    if (!word) return;
    setResult(checkAnswer(correctAnswer, word));
  }, [word]);
  return (
    <div className="w-full flex justify-around gap-2 p-2 text-5xl">
      {Array.from(Array(wordLengthLimit), (e, i) => (
        <div
          key={i}
          className="w-full h-full text-[3vw] border border-black flex items-center justify-center aspect-square"
          style={{
            backgroundColor: resultColorCodes[result[i]],
          }}
        >
          {word[i]}
        </div>
      ))}
    </div>
  );
};

export default WordRow;
