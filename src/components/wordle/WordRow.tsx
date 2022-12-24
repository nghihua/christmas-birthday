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
    <div className="flex justify-around min-w-[300px] w-[40vw] text-5xl">
      {Array.from(Array(wordLengthLimit), (e, i) => (
        <div
          key={i}
          className="border border-black p-2 flex items-center justify-center w-[15%] aspect-square"
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
