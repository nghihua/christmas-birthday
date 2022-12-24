import { useState, useEffect } from "react";
import { resultColorCodes } from "../../const/colorCodes";
import useWordle from "../../hooks/useWordle";

interface IWordRowProps {
  word: string;
}

const WordRow: React.FunctionComponent<IWordRowProps> = ({ word }) => {
  const { checkAnswer, correctAnswer, answerLengthLimit } = useWordle();
  const [result, setResult] = useState<number[]>([]);
  useEffect(() => {
    if (!word) return;
    alert(checkAnswer(word));
    setResult(checkAnswer(word));
  }, [word]);
  return (
    <div className="w-full flex justify-around gap-2 p-2 text-5xl">
      {Array.from(Array(answerLengthLimit), (e, i) => (
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
