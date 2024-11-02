/* /src/components/demo/marquee-demo.tsx */

'use client';

import { useState } from 'react';

const DEMO_IMAGES = [
  '/api/placeholder/300/200',
  '/api/placeholder/300/200',
  '/api/placeholder/300/200',
  '/api/placeholder/300/200',
  '/api/placeholder/300/200',
  '/api/placeholder/300/200'
];

export function MarqueeDemo() {
  const [speed, setSpeed] = useState(1);
  const [pause, setPause] = useState(false);
  const [reverse, setReverse] = useState(false);

  return (
    <div className="w-full space-y-8">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => setPause(!pause)}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          {pause ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={() => setReverse(!reverse)}
          className="px-4 py-2 rounded border border-gray-300 hover:border-gray-400 transition-colors"
        >
          {reverse ? '← Direction' : 'Direction →'}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm">Speed:</span>
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

      {/* Marquee */}
      <div className="relative overflow-hidden rounded-lg bg-gray-50 border">
        <div 
          className={`flex gap-4 p-4 whitespace-nowrap ${
            !pause ? 'animate-[slide_20s_linear_infinite]' : ''
          } ${reverse ? 'flex-row-reverse' : ''}`}
          style={{ 
            animationDuration: `${20 / speed}s`,
            animationDirection: reverse ? 'reverse' : 'normal'
          }}
        >
          {[...DEMO_IMAGES, ...DEMO_IMAGES].map((src, i) => (
            <div 
              key={i} 
              className="flex-none w-[300px] h-[200px] rounded-lg overflow-hidden bg-white"
            >
              <img
                src={src}
                alt={`Demo image ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}