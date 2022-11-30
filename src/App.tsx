import React, { useState } from "react";
import Canvas from "./components/Canvas";
import Snowfall from "react-snowfall";

function App() {
  return (
    <div>
      <div className="h-screen w-screen flex items-center justify-center">
        <Canvas />
      </div>
    </div>
  );
}

export default App;
