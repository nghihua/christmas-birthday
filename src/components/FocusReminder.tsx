import * as React from "react";
import { IReminderProps } from "../interface";

const FocusReminder: React.FunctionComponent<IReminderProps> = ({
  callback,
}) => {
  return (
    <div
      onClick={callback}
      className="hidden sm:flex cursor-pointer h-full w-full z-[30] bg-black/30 backdrop-blur-sm transition-all absolute top-0 left-0 justify-center items-center"
    >
      <div className="bg-white p-3 rounded-md">
        <div>Click vào đây để tiếp tục chơi nha</div>
      </div>
    </div>
  );
};

export default FocusReminder;
