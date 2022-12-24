import { ReactNode, useEffect, useState } from "react";
import { resultColorCodes } from "../../const/colorCodes";

interface IAlphabetProps {
  alphabetMap: Map<string, number>;
}

const Alphabet: React.FunctionComponent<IAlphabetProps> = ({ alphabetMap }) => {
  const [charElements, setCharElements] = useState<ReactNode[]>([]);
  const getCharElements = () => {
    console.log("inside getCharElements");
    console.log(alphabetMap);
    let elements: React.ReactNode[] = [];
    alphabetMap.forEach((value, key, map) => {
      elements.push(
        <div
          key={key}
          className="p-2"
          style={{
            backgroundColor: resultColorCodes[value],
          }}
        >
          {key}
        </div>
      );
    });
    setCharElements(elements);
  };
  useEffect(() => {
    console.log("alphabetMap has changed");
    getCharElements();
  }, [alphabetMap]);

  return (
    <div className="flex flex-wrap justify-center gap-2 w-full">
      {charElements}
    </div>
  );
};

export default Alphabet;
