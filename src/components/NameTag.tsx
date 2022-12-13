import * as React from "react";
import { INameTagProps } from "../interface";

const NameTag: React.FunctionComponent<INameTagProps> = ({ content }) => {
  return (
    <div className="animate-pulse flex items-center justify-center">
      <div className="bg-[#f6ebde] p-3 rounded-lg text-xl font-patrick">
        {content}
      </div>
    </div>
  );
};

export default NameTag;
