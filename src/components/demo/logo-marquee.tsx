// src/components/demo/logo-marquee.tsx

'use client';

import { useEffect, useRef } from 'react';

interface MarqueeSettings {
  speed: number;
  gap: number;
  borderRadius: number;
  width: number;
  height: number;
}

interface LogoMarqueeProps {
  settings: MarqueeSettings;
}

const LOGOS = [
  '/home-marquee/image1.jpg',
  '/home-marquee/image2.jpg',
  '/home-marquee/image3.jpg',
  '/home-marquee/image4.jpg',
  '/home-marquee/image5.jpg',
];

export function LogoMarquee({ settings }: LogoMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      const effectiveSpeed = Math.max(settings.speed, 0.1); // Set a lower bound for speed
      scrollPosition -= effectiveSpeed;

      // Reset scroll position to create a seamless loop
      if (marquee.scrollWidth / 2 - Math.abs(scrollPosition) <= 0) {
        scrollPosition = 0;
      }

      marquee.style.transform = `translateX(${scrollPosition}px)`;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [settings.speed]); // Added settings.speed as dependency

  return (
    <div className="overflow-hidden bg-transparent rounded-lg">
      <div
        ref={marqueeRef}
        className="flex bg-transparent"
        style={{
          willChange: 'transform',
          gap: `${settings.gap}px`
        }}
      >
        {[...LOGOS, ...LOGOS].map((src, index) => (
          <div
            key={index}
            className="flex-none overflow-hidden"
            style={{
              width: `${settings.width}px`,
              height: `${settings.height}px`,
              borderRadius: `${settings.borderRadius}px`,
            }}
          >
            <img
              src={src}
              alt={`Logo ${index + 1}`}
              className="w-full h-full object-cover bg-white/5 p-4 hover:bg-white/10 transition-colors"
              style={{ willChange: 'transform' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}