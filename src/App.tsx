import React, {useState} from 'react';

function App() {
  const [catXCoordinate, setCatXCoordinate] = useState<number>(0);
  const [isFacedLeft, setIsFacedLeft] = useState<boolean>(true);
  const [isNearGuitar, setIsNearGuitar] = useState<boolean>(false);
  const windowWidth = window.innerWidth;
  const catSize = 300;
  const guitarXCoordinate = (windowWidth)/2 - 200;
  const interactDistance = 250;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(event);
    if (event.code==="ArrowLeft" && catXCoordinate>0) {
      setCatXCoordinate(catXCoordinate - 20);
      setIsFacedLeft(true);
    }
    if (event.code==="ArrowRight" && ((catXCoordinate + catSize)<windowWidth)) {
      setCatXCoordinate(catXCoordinate + 20);
      setIsFacedLeft(false);
    }
    if ((catXCoordinate>(guitarXCoordinate-interactDistance) && (catXCoordinate<(guitarXCoordinate+interactDistance)))) {
      setIsNearGuitar(true);
    }
    else {
      setIsNearGuitar(false);
    }
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className='w-screen h-screen grid grid-rows-6'>

        {/* wall */}
        <div className='relative bg-gray-200 row-span-5'>
        </div>

        {/* floor */}
        <div className='bg-gray-100'>
          {/* cat situated at the end of wall */}
          <div className={`absolute bottom-0 z-10`}
            style={{
              left: `${catXCoordinate}px`,
              width: `${catSize}px`
            }}
          >
            <img className={`${isFacedLeft? "" : "flipped"}`} src='cat.png'/>
          </div>
          {/* guitar situated at the center of the room */}
          <div className={`absolute bottom-0`}
            style={{
              left: `${guitarXCoordinate}px`,
              width: `500px`
            }}
          >
            {/* glow */}
            {isNearGuitar && 
              <div className='mx-auto mb-[-100%] bg-orange-200/70 w-[300px] h-[300px] rounded-full'></div>
            }
            {/* actual guitar */}
            <div className='width-[400px]'>
              <img src='guitar.png'/>
            </div>
          </div>
        </div>

    </div>
  );
}

export default App;
