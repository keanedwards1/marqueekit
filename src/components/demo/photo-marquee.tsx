'use client';

import { useState } from 'react';

const PHOTOS = [
  {
    id: 1,
    caption: 'Mountain Lake',
    image: '/api/placeholder/400/600',
    size: 'tall'
  },
  {
    id: 2,
    caption: 'Desert Sunset',
    image: '/api/placeholder/600/400',
    size: 'wide'
  },
  {
    id: 3,
    caption: 'Forest Path',
    image: '/api/placeholder/400/400',
    size: 'square'
  },
  {
    id: 4,
    caption: 'Ocean View',
    image: '/api/placeholder/400/600',
    size: 'tall'
  },
  {
    id: 5,
    caption: 'City Lights',
    image: '/api/placeholder/600/400',
    size: 'wide'
  }
];

export function PhotoMarquee() {
  const [pause, setPause] = useState(false);
  const [speed, setSpeed] = useState(1);

  const getSizeClasses = (size: string) => {
    switch(size) {
      case 'tall':
        return 'w-[300px] h-[450px]';
      case 'wide':
        return 'w-[450px] h-[300px]';
      default:
        return 'w-[350px] h-[350px]';
    }
  };

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
          className={`flex gap-6 p-8 whitespace-nowrap ${
            !pause ? 'animate-[slide_20s_linear_infinite]' : ''
          }`}
          style={{ animationDuration: `${20 / speed}s` }}
        >
          {[...PHOTOS, ...PHOTOS].map((photo, i) => (
            <div 
              key={i} 
              className={`flex-none ${getSizeClasses(photo.size)} group relative rounded-lg overflow-hidden`}
            >
              <img
                src={photo.image}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium">{photo.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}