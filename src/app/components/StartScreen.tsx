import { Droplets } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
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

        {/* Start Button */}
        <button
          onClick={onStart}
          className="bg-[#FFC907] hover:bg-[#e6b406] text-[#333333] font-bold text-lg px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          Start Game
        </button>

        {/* Stat */}
        <p className="text-sm text-[#333333]/60 italic mt-8">
          "771 million people lack clean water"
        </p>
      </div>
    </div>
  );
}
