'use client';

import { useState } from 'react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Modern Chair',
    price: '$299',
    image: '/api/placeholder/240/320'
  },
  {
    id: 2,
    name: 'Wooden Table',
    price: '$599',
    image: '/api/placeholder/240/320'
  },
  {
    id: 3,
    name: 'Pendant Light',
    price: '$199',
    image: '/api/placeholder/240/320'
  },
  {
    id: 4,
    name: 'Ceramic Vase',
    price: '$89',
    image: '/api/placeholder/240/320'
  },
  {
    id: 5,
    name: 'Wall Art',
    price: '$159',
    image: '/api/placeholder/240/320'
  }
];

export function ProductMarquee() {
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
          className={`flex gap-6 p-8 whitespace-nowrap ${
            !pause ? 'animate-[slide_20s_linear_infinite]' : ''
          }`}
          style={{ animationDuration: `${20 / speed}s` }}
        >
          {[...PRODUCTS, ...PRODUCTS].map((product, i) => (
            <div 
              key={i} 
              className="flex-none w-60 group"
            >
              <div className="relative rounded-lg overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
                    View Details
                  </span>
                </div>
              </div>
              <h3 className="font-medium text-white">{product.name}</h3>
              <p className="text-blue-400">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}