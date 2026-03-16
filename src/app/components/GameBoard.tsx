import { useState, useEffect } from 'react';
import { Droplets, Home, RotateCcw } from 'lucide-react';

type CellType = 'empty' | 'dirt' | 'rock' | 'water-source' | 'village' | 'water';

interface Cell {
  type: CellType;
  removable: boolean;
}

type GameState = 'playing' | 'won' | 'lost';

const GRID_SIZE = 10;

export function GameBoard() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    initializeGame();
  }, [level]);

  const initializeGame = () => {
    const newGrid: Cell[][] = [];

    for (let row = 0; row < GRID_SIZE; row++) {
      newGrid[row] = [];
      for (let col = 0; col < GRID_SIZE; col++) {
        if (row === 0 && col === GRID_SIZE / 2) {
          // Water source at top center
          newGrid[row][col] = { type: 'water-source', removable: false };
        } else if (row === GRID_SIZE - 1 && col === GRID_SIZE / 2) {
          // Village at bottom center
          newGrid[row][col] = { type: 'village', removable: false };
        } else {
          // Randomly place dirt and rocks
          const rand = Math.random();
          if (rand < 0.4) {
            newGrid[row][col] = { type: 'dirt', removable: true };
          } else if (rand < 0.5) {
            newGrid[row][col] = { type: 'rock', removable: false };
          } else {
            newGrid[row][col] = { type: 'empty', removable: false };
          }
        }
      }
    }

    setGrid(newGrid);
    setGameState('playing');
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameState !== 'playing') return;
    
    const cell = grid[row][col];
    if (cell.removable && cell.type === 'dirt') {
      const newGrid = grid.map((r, rIdx) =>
        r.map((c, cIdx) => {
          if (rIdx === row && cIdx === col) {
            return { type: 'empty' as CellType, removable: false };
          }
          return c;
        })
      );
      setGrid(newGrid);
    }
  };

  const floodFill = (testGrid: Cell[][]): boolean => {
    const visited = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false));
    const queue: [number, number][] = [];

    // Start from water source
    const sourceCol = Math.floor(GRID_SIZE / 2);
    queue.push([0, sourceCol]);
    visited[0][sourceCol] = true;

    while (queue.length > 0) {
      const [row, col] = queue.shift()!;

      // Check if we reached the village
      if (testGrid[row][col].type === 'village') {
        return true;
      }

      // Check all 4 directions (up, down, left, right)
      const directions = [
        [-1, 0], // up
        [1, 0],  // down
        [0, -1], // left
        [0, 1]   // right
      ];

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 &&
          newRow < GRID_SIZE &&
          newCol >= 0 &&
          newCol < GRID_SIZE &&
          !visited[newRow][newCol]
        ) {
          const cell = testGrid[newRow][newCol];
          // Water can flow through empty cells, water-source, and village
          if (cell.type === 'empty' || cell.type === 'water-source' || cell.type === 'village') {
            visited[newRow][newCol] = true;
            queue.push([newRow, newCol]);
          }
        }
      }
    }

    return false;
  };

  const releaseWater = () => {
    if (gameState !== 'playing') return;

    const hasPath = floodFill(grid);

    if (hasPath) {
      // Animate water flow
      animateWaterFlow();
      setGameState('won');
      setScore(score + 5);
    } else {
      setGameState('lost');
    }
  };

  const animateWaterFlow = () => {
    const visited = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false));
    const queue: [number, number][] = [];
    const sourceCol = Math.floor(GRID_SIZE / 2);
    queue.push([0, sourceCol]);
    visited[0][sourceCol] = true;

    const fillSequence: [number, number][] = [];

    while (queue.length > 0) {
      const [row, col] = queue.shift()!;
      if (grid[row][col].type !== 'water-source' && grid[row][col].type !== 'village') {
        fillSequence.push([row, col]);
      }

      const directions = [
        [1, 0],  // down (prioritize downward flow)
        [0, -1], // left
        [0, 1],  // right
        [-1, 0]  // up
      ];

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 &&
          newRow < GRID_SIZE &&
          newCol >= 0 &&
          newCol < GRID_SIZE &&
          !visited[newRow][newCol]
        ) {
          const cell = grid[newRow][newCol];
          if (cell.type === 'empty' || cell.type === 'village') {
            visited[newRow][newCol] = true;
            queue.push([newRow, newCol]);
          }
        }
      }
    }

    // Animate water filling
    fillSequence.forEach(([row, col], index) => {
      setTimeout(() => {
        setGrid((prevGrid) =>
          prevGrid.map((r, rIdx) =>
            r.map((c, cIdx) => {
              if (rIdx === row && cIdx === col) {
                return { type: 'water' as CellType, removable: false };
              }
              return c;
            })
          )
        );
      }, index * 100);
    });
  };

  const resetGame = () => {
    initializeGame();
  };

  const nextLevel = () => {
    setLevel(level + 1);
  };

  const getCellColor = (cell: Cell): string => {
    switch (cell.type) {
      case 'water-source':
        return 'bg-[#2E9DF7] border-[#2E9DF7] shadow-[0_0_10px_rgba(46,157,247,0.5)]';
      case 'village':
        return 'bg-[#FFC907] border-[#FFC907] shadow-[0_0_15px_rgba(255,201,7,0.6)]';
      case 'dirt':
        return 'bg-[#E6C79C] border-[#d4b589] cursor-pointer hover:bg-[#d4b589] hover:scale-105 active:scale-95';
      case 'rock':
        return 'bg-[#555] border-[#444]';
      case 'water':
        return 'bg-[#2E9DF7] border-[#2E9DF7] animate-pulse';
      case 'empty':
        return 'bg-white/50 border-blue-100';
      default:
        return 'bg-white border-gray-300';
    }
  };

  const getCellIcon = (cell: Cell) => {
    if (cell.type === 'water-source') {
      return <Droplets className="w-5 h-5 text-white animate-pulse" />;
    }
    if (cell.type === 'village') {
      return <Home className="w-5 h-5 text-[#333333]" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Droplets className="w-6 h-6 text-[#2E9DF7]" />
          <span className="font-semibold text-[#333333]">charity: water</span>
        </div>
        <div className="flex items-center gap-2 text-[#333333] font-bold">
          <span>Score: {score}</span>
          <Droplets className="w-5 h-5 text-[#2E9DF7]" />
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[650px] bg-[#EAF6FF] rounded-2xl shadow-xl p-8 space-y-6">
          {/* Level Indicator */}
          <div className="text-center">
            <p className="text-lg font-bold text-[#333333]">Level {level}</p>
          </div>

          {/* Game Grid */}
          <div className="flex justify-center">
            <div className="inline-block p-4 bg-white/30 rounded-xl">
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
                {grid.map((row, rowIdx) =>
                  row.map((cell, colIdx) => (
                    <button
                      key={`${rowIdx}-${colIdx}`}
                      onClick={() => handleCellClick(rowIdx, colIdx)}
                      disabled={!cell.removable || gameState !== 'playing'}
                      className={`
                        w-12 h-12 rounded border-2 flex items-center justify-center transition-all
                        ${getCellColor(cell)}
                      `}
                    >
                      {getCellIcon(cell)}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-3 text-sm px-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E6C79C] border-2 border-[#d4b589] rounded"></div>
              <span className="text-[#333333]">Dirt (click)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#555] border-2 border-[#444] rounded"></div>
              <span className="text-[#333333]">Rock</span>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3 px-4">
            <button
              onClick={releaseWater}
              disabled={gameState !== 'playing'}
              className="w-full bg-[#FFC907] hover:bg-[#e6b406] disabled:bg-gray-300 disabled:text-gray-500 text-[#333333] font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95 text-lg"
            >
              Release Water
            </button>

            <button
              onClick={resetGame}
              className="w-full bg-white hover:bg-gray-50 text-[#333333] font-semibold py-3 px-6 rounded-full transition-all border-2 border-gray-200 active:scale-95 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Level
            </button>
          </div>
        </div>
      </main>

      {/* Game Status Modal */}
      {gameState !== 'playing' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
            {gameState === 'won' ? (
              <>
                <div className="text-6xl">🎉</div>
                <h2 className="text-3xl font-bold text-[#2E9DF7]">
                  Water Reached the Village!
                </h2>
                <p className="text-lg text-[#333333]">
                  You helped provide clean water to <strong>5 people</strong> today{' '}
                  <Droplets className="inline w-5 h-5 text-[#2E9DF7]" />
                </p>
                <div className="space-y-3 pt-4">
                  <button
                    onClick={nextLevel}
                    className="w-full bg-[#FFC907] hover:bg-[#e6b406] text-[#333333] font-bold py-4 px-6 rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95"
                  >
                    Play Again
                  </button>
                  <a
                    href="https://www.charitywater.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white hover:bg-gray-50 text-[#333333] font-semibold py-4 px-6 rounded-full transition-all border-2 border-gray-200 active:scale-95"
                  >
                    Learn How You Can Help
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="text-6xl">💧</div>
                <h2 className="text-3xl font-bold text-[#333333]">
                  The water couldn't reach the village
                </h2>
                <p className="text-lg text-[#333333]/80">
                  Remove more dirt blocks to create a path for the water to flow.
                </p>
                <button
                  onClick={resetGame}
                  className="w-full bg-[#FFC907] hover:bg-[#e6b406] text-[#333333] font-bold py-4 px-6 rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95 mt-4"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
