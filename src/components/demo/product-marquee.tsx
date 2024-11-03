// src/components/demo/product-marquee.tsx

'use client';

import { useEffect, useRef } from 'react';

interface MarqueeSettings {
  speed: number;
  gap: number;
  borderRadius: number;
  width: number;
  height: number;
}

interface ProductMarqueeProps {
  settings: MarqueeSettings;
}

const PRODUCTS = [
  {
    id: 1,
    name: 'Modern Chair',
    price: '$299',
    image: '/home-marquee/image1.jpg'
  },
  {
    id: 2,
    name: 'Wooden Table',
    price: '$599',
    image: '/home-marquee/image2.jpg'
  },
  {
    id: 3,
    name: 'Pendant Light',
    price: '$199',
    image: '/home-marquee/image3.jpg'
  },
  {
    id: 4,
    name: 'Ceramic Vase',
    price: '$89',
    image: '/home-marquee/image4.jpg'
  },
  {
    id: 5,
    name: 'Wall Art',
    price: '$159',
    image: '/home-marquee/image5.jpg'
  }
];

export function ProductMarquee({ settings }: ProductMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      const effectiveSpeed = Math.max(settings.speed, 0.1); // Set a lower bound for speed
      scrollPosition -= effectiveSpeed;

      if (marquee.scrollWidth / 2 - Math.abs(scrollPosition) <= 0) {
        scrollPosition = 0;
      }

      marquee.style.transform = `translateX(${scrollPosition}px)`;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [settings.speed]);

  return (
    <div className="overflow-hidden rounded-lg">
      <div
        ref={marqueeRef}
        className="flex"
        style={{
          willChange: 'transform',
          gap: `${settings.gap}px`
        }}
      >
        {[...PRODUCTS, ...PRODUCTS].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex-none group"
            style={{
              width: `${settings.width}px`
            }}
          >
            <div 
              className="relative overflow-hidden mb-3"
              style={{
                height: `${settings.height}px`,
                borderRadius: `${settings.borderRadius}px`
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ willChange: 'transform' }}
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
  );
}