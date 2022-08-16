import React, {useState} from 'react';

function App() {
  const [xCoordinate, setXCoordinate] = useState<number>(0);
  const [isFacedLeft, setIsFacedLeft] = useState<boolean>(true);
  const windowWidth = window.innerWidth;
  const catSize = 300;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(event);
    if (event.code==="ArrowLeft" && xCoordinate>0) {
      setXCoordinate(xCoordinate - 20);
      setIsFacedLeft(true);
    }
    if (event.code==="ArrowRight" && ((xCoordinate + catSize)<windowWidth)) {
      setXCoordinate(xCoordinate + 20);
      setIsFacedLeft(false);
    }
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className='bg-gray-200 w-screen h-screen'>
      <div className={`absolute`}
        style={{
          left: `${xCoordinate}px`,
          width: `${catSize}px`
        }}
      >
        <img className={`${isFacedLeft? "" : "flipped"}`} src='cat.png'/>
      </div>
    </div>
  );
}

export default App;
