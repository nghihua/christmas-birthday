import React, { useState } from "react";
import ReactHowler from "react-howler";
import GuitarRoom from "./components/rooms/GuitarRoom";

function App() {
  const [isMusicPlayed, setIsMusicPlayed] = useState<boolean>(false);

  return (
    <div>
      <div className="hidden">
        <ReactHowler src="birthday.mp3" playing={isMusicPlayed} loop />
      </div>
      <div className="flex items-center justify-center">
        <GuitarRoom setIsMusicPlayed={setIsMusicPlayed} />
      </div>
    </div>
  );
}

export default App;
