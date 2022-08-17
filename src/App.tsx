import React, {useState} from 'react';
import ReactHowler from 'react-howler';
import GuitarRoom from './components/rooms/GuitarRoom';

function App() {

  const [isMusicPlayed, setIsMusicPlayed] = useState<boolean>(false);

  return (
    <div>
      <div className='hidden'>
        <ReactHowler
          src='birthday.mp3'
          playing={isMusicPlayed}
          loop
        />
      </div>
      <GuitarRoom setIsMusicPlayed={setIsMusicPlayed}/>
    </div>
  );
}

export default App;
