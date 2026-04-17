import { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { StartScreen } from './components/StartScreen';

export type Difficulty = 'easy' | 'normal' | 'hard';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');

  const handleStart = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
  };

  const handleBackToMenu = () => {
    setGameStarted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-blue-100">
      {!gameStarted ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <GameBoard difficulty={difficulty} onBackToMenu={handleBackToMenu} />
      )}
    </div>
  );
}