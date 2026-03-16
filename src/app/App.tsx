import { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { StartScreen } from './components/StartScreen';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-blue-100">
      {!gameStarted ? (
        <StartScreen onStart={() => setGameStarted(true)} />
      ) : (
        <GameBoard />
      )}
    </div>
  );
}