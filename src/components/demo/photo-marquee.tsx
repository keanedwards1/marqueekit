// components/demo/photo-marquee.tsx

'use client';

import { useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';

interface MarqueeSettings {
  speed: number;
  gap: number;
  borderRadius: number;
  width: number;
  height: number;
  uniformSize?: boolean;
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

const SIZE_MULTIPLIERS = {
  tall: { width: 0.8, height: 1.5 },
  wide: { width: 1.5, height: 0.8 },
  square: { width: 1, height: 1 },
} as const;

export function PhotoMarquee({ settings }: PhotoMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(settings.speed);
  const scrollPositionRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // Calculate size based on whether uniform size is enabled
  const getSizeStyle = useMemo(() => {
    return (size: string) => {
      if (settings.uniformSize) {
        return {
          borderRadius: `${settings.borderRadius}px`,
          width: `${settings.width}px`,
          height: `${settings.height}px`,
        };
      }
      
      const multiplier = SIZE_MULTIPLIERS[size as keyof typeof SIZE_MULTIPLIERS] || SIZE_MULTIPLIERS.square;
      return {
        borderRadius: `${settings.borderRadius}px`,
        width: `${settings.width * multiplier.width}px`,
        height: `${settings.height * multiplier.height}px`,
      };
    };
  }, [settings.borderRadius, settings.width, settings.height, settings.uniformSize]);

  // Calculate total width of all photos
  const totalWidth = useMemo(() => {
    return PHOTOS.reduce((acc, photo) => {
      const style = getSizeStyle(photo.size);
      return acc + parseInt(style.width) + settings.gap;
    }, 0);
  }, [getSizeStyle, settings.gap]);

  // Create photo sets
  const photoSets = useMemo(() => (
    [...PHOTOS, ...PHOTOS, ...PHOTOS, ...PHOTOS, ...PHOTOS].map((photo, index) => ({
      ...photo,
      key: `${photo.id}-${index}`
    }))
  ), []);

  // Update speed reference
  useEffect(() => {
    speedRef.current = settings.speed;
  }, [settings.speed]);

  // Animation loop
  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const baseSpeed = 50;

    const scroll = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const effectiveSpeed = Math.max(speedRef.current, 0.1);
      const pixelsToMove = (deltaTime / 1000) * baseSpeed * effectiveSpeed;

      scrollPositionRef.current -= pixelsToMove;

      if (Math.abs(scrollPositionRef.current) >= totalWidth) {
        scrollPositionRef.current += totalWidth;
      }

      marquee.style.transform = `translate3d(${scrollPositionRef.current}px, 0, 0)`;
      animationFrameRef.current = requestAnimationFrame(scroll);
    };

    animationFrameRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      lastTimeRef.current = 0;
    };
  }, [totalWidth]);

  return (
    <div 
      className="overflow-hidden rounded-lg bg-transparent"
      style={{
        perspective: '1000px'
      }}
    >
      <div
        ref={marqueeRef}
        className="flex bg-transparent"
        style={{
          willChange: 'transform',
          gap: `${settings.gap}px`,
          paddingRight: `${settings.gap}px`,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        {photoSets.map((photo) => {
          const sizeStyle = getSizeStyle(photo.size);
          return (
            <div
              key={photo.key}
              className="flex-none group relative overflow-hidden"
              style={{
                ...sizeStyle,
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <div className="w-full h-full bg-white/10 hover:bg-white/15 transition-colors">
                <Image
                  src={photo.image}
                  alt={photo.caption}
                  width={parseInt(sizeStyle.width)}
                  height={parseInt(sizeStyle.height)}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105`}
                  priority
                  style={{
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium">{photo.caption}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}