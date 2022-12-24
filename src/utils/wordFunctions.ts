export const correctAnswer = "HAPPY";
export const numGuesses = 5;

let correctAnswerSet = new Set<string>([]);
for (let i = 0; i < correctAnswer.length; i++) {
  correctAnswerSet.add(correctAnswer[i]);
}

let alphabetMap = new Map<string, number>([]);
for (let i = 0; i <= 25; i++) {
  alphabetMap.set(String.fromCharCode(65 + i), 0);
}

// 0 is unused
// 1 is wrong
// 2 is half correct
// 3 is correct

export const checkAnswer = (answer: string) => {
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

export const getAlphabet = () => {
  return alphabetMap;
};
