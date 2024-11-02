'use client';

import { useState } from 'react';

const LOGOS = [
  '/api/placeholder/160/80',  // These would be actual logo images
  '/api/placeholder/160/80',
  '/api/placeholder/160/80',
  '/api/placeholder/160/80',
  '/api/placeholder/160/80',
  '/api/placeholder/160/80'
];

export function LogoMarquee() {
  const [pause, setPause] = useState(false);
  const [speed, setSpeed] = useState(1);

  return (
    <div className="w-full space-y-6">
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setPause(!pause)}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm"
        >
          {pause ? 'Resume' : 'Pause'}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Speed:</span>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-32"
          />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg bg-black/20">
        <div 
          className={`flex gap-8 p-8 whitespace-nowrap ${
            !pause ? 'animate-[slide_20s_linear_infinite]' : ''
          }`}
          style={{ animationDuration: `${20 / speed}s` }}
        >
          {[...LOGOS, ...LOGOS].map((src, i) => (
            <div 
              key={i} 
              className="flex-none w-40 h-20 rounded bg-white/5 backdrop-blur-sm p-4 hover:bg-white/10 transition-colors"
            >
              <img
                src={src}
                alt={`Company logo ${i + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}