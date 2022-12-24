import React, { useEffect, useState } from "react";
import { correctAnswerList } from "../const/word";

interface IuseWordleProps {}

const useWordle = () => {
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answerLengthLimit, setAnswerLengthLimit] = useState(0);
  const [alphabetMap, setAlphabetMap] = useState<Map<string, number>>(
    new Map<string, number>([])
  );
  const [correctAnswerSet, setCorrectAnswerSet] = useState<Set<string>>(
    new Set<string>([])
  );

  useEffect(() => {
    if (correctAnswer || answerLengthLimit) {
      return;
    }
    const index = Math.floor(Math.random() * correctAnswerList.length);
    setCorrectAnswer(correctAnswerList[index]);
    setAnswerLengthLimit(correctAnswerList[index].length);

    //init correctAnswerSet
    let newCorrectAnswerSet = correctAnswerSet;
    for (let i = 0; i < correctAnswer.length; i++) {
      correctAnswerSet.add(correctAnswer[i]);
    }
    setCorrectAnswerSet(new Set(newCorrectAnswerSet));

    // init alphabetMap
    for (let i = 0; i <= 25; i++) {
      let newAlphabetMap = alphabetMap;
      newAlphabetMap.set(String.fromCharCode(65 + i), 0);
      setAlphabetMap(new Map(newAlphabetMap));
    }
  }, []);

  useEffect(() => {
    alert(correctAnswer);
    alert(JSON.stringify(correctAnswerSet));
  }, [correctAnswer, correctAnswerSet]);

  // 0 is unused
  // 1 is wrong
  // 2 is half correct
  // 3 is correct

  const checkAnswer = (answer: string) => {
    let result = [];
    for (let i = 0; i < answer.length; i++) {
      if (correctAnswerSet.has(answer[i])) {
        result[i] = 2;
        setAlphabetMap(new Map(alphabetMap.set(answer[i], 2)));

        if (correctAnswer[i] === answer[i]) {
          result[i] = 3;
          setAlphabetMap(new Map(alphabetMap.set(answer[i], 3)));
        }
      } else {
        result[i] = 1;
        let newAlphabetMap = alphabetMap;
        newAlphabetMap.delete(answer[i]);
        setAlphabetMap(new Map(newAlphabetMap));
      }
    }
    return result;
  };

  const getAlphabet = () => {
    return alphabetMap;
  };

  return { correctAnswer, answerLengthLimit, getAlphabet, checkAnswer };
};

export default useWordle;
