// src/components/demo/photo-marquee.tsx

'use client';

import { useEffect, useRef } from 'react';

interface MarqueeSettings {
  speed: number;
  gap: number;
  borderRadius: number;
  width: number;
  height: number;
}

interface PhotoMarqueeProps {
  settings: MarqueeSettings;
}


const PHOTOS = [
  {
    id: 1,
    caption: 'Mountain Lake',
    image: '/home-marquee/image1.jpg',
    size: 'tall'
  },
  {
    id: 2,
    caption: 'Desert Sunset',
    image: '/home-marquee/image2.jpg',
    size: 'wide'
  },
  {
    id: 3,
    caption: 'Forest Path',
    image: '/home-marquee/image3.jpg',
    size: 'square'
  },
  {
    id: 4,
    caption: 'Ocean View',
    image: '/home-marquee/image4.jpg',
    size: 'tall'
  },
  {
    id: 5,
    caption: 'City Lights',
    image: '/home-marquee/image5.jpg',
    size: 'wide'
  }
];

export function PhotoMarquee({ settings }: PhotoMarqueeProps) {
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

  const getSizeStyles = (size: string) => {
    const baseStyles = {
      borderRadius: `${settings.borderRadius}px`,
    };

    switch(size) {
      case 'tall':
        return {
          ...baseStyles,
          width: `${settings.width * 0.8}px`,
          height: `${settings.height * 1.5}px`,
        };
      case 'wide':
        return {
          ...baseStyles,
          width: `${settings.width * 1.5}px`,
          height: `${settings.height * 0.8}px`,
        };
      default:
        return {
          ...baseStyles,
          width: `${settings.width}px`,
          height: `${settings.height}px`,
        };
    }
  };

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
        {[...PHOTOS, ...PHOTOS].map((photo, index) => (
          <div
            key={`${photo.id}-${index}`}
            className="flex-none group relative"
            style={getSizeStyles(photo.size)}
          >
            <img
              src={photo.image}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ willChange: 'transform' }}
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
  );
}