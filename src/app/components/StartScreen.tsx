import { Droplets, Zap, Target, Flame } from 'lucide-react';
import { Difficulty } from '../App';

interface StartScreenProps {
  onStart: (difficulty: Difficulty) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 opacity-20">
        <svg viewBox="0 0 1200 120" className="w-full">
          <path
            d="M0,60 Q300,90 600,60 T1200,60 L1200,120 L0,120 Z"
            fill="#2E9DF7"
          />
        </svg>
      </div>

      <div className="max-w-lg w-full space-y-8 text-center relative z-10">
        {/* Logo */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Droplets className="w-10 h-10 text-[#2E9DF7]" />
            <h2 className="text-xl text-[#333333]">charity: water</h2>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-[#333333] tracking-tight">
            FLOW FOR GOOD
          </h1>
          <p className="text-xl text-[#333333]/80">
            Help guide clean water to a village
          </p>
        </div>

        {/* Difficulty Selection */}
        <div className="space-y-4 pt-4">
          <p className="text-lg font-semibold text-[#333333]">Select Difficulty</p>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => onStart('easy')}
              className="bg-white hover:bg-gray-50 text-[#333333] font-bold px-6 py-4 rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95 border-2 border-[#2E9DF7]/20 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-[#2E9DF7]" />
                <div className="text-left">
                  <div className="font-bold">Easy</div>
                  <div className="text-sm font-normal text-[#333333]/70">40 moves • 180 seconds</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => onStart('normal')}
              className="bg-[#FFC907] hover:bg-[#e6b406] text-[#333333] font-bold px-6 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-95 border-2 border-[#FFC907] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-[#333333]" />
                <div className="text-left">
                  <div className="font-bold">Normal</div>
                  <div className="text-sm font-normal text-[#333333]/80">25 moves • 120 seconds</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => onStart('hard')}
              className="bg-white hover:bg-gray-50 text-[#333333] font-bold px-6 py-4 rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95 border-2 border-red-500/30 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Flame className="w-6 h-6 text-red-500" />
                <div className="text-left">
                  <div className="font-bold">Hard</div>
                  <div className="text-sm font-normal text-[#333333]/70">15 moves • 60 seconds</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Stat */}
        <p className="text-sm text-[#333333]/60 italic mt-8">
          "771 million people lack clean water"
        </p>
      </div>
    </div>
  );
}
