// src/components/demo/logo-marquee.tsx

'use client';

import { useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';

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
  '/logo-marquee/dg.png',
  '/logo-marquee/eco.png',
  '/logo-marquee/enerleaf.png',
  '/logo-marquee/flyt.png',
  '/logo-marquee/la.png',
  '/logo-marquee/coco.png',
];

export function LogoMarquee({ settings }: LogoMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(settings.speed);
  const scrollPositionRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // Memoize the calculations that depend on settings
  const calculations = useMemo(() => ({
    itemWidth: settings.width + settings.gap,
    setWidth: LOGOS.length * (settings.width + settings.gap),
    // Increased base speed for more noticeable speed changes
    baseSpeed: 500 // Base speed in pixels per second
  }), [settings.width, settings.gap]);

  useEffect(() => {
    speedRef.current = settings.speed;
  }, [settings.speed]);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const { setWidth, baseSpeed } = calculations;

    const scroll = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      // Calculate time elapsed since last frame
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Calculate movement based on time elapsed and speed
      const effectiveSpeed = Math.max(speedRef.current, 0.1);
      const pixelsToMove = (deltaTime / 1000) * baseSpeed * effectiveSpeed;

      scrollPositionRef.current -= pixelsToMove;

      // Reset position with precise calculation
      if (Math.abs(scrollPositionRef.current) >= setWidth) {
        scrollPositionRef.current += setWidth;
      }

      // Use transform3d for hardware acceleration
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
  }, [calculations]);

  // Create three sets of logos with proper keys
  const logoSets = useMemo(() => (
    [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((src, index) => ({
      src,
      key: `${src}-${index}`
    }))
  ), []);

  return (
    <div 
      className="overflow-hidden bg-transparent rounded-lg will-change-transform"
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
        {logoSets.map(({ src, key }) => (
          <div
            key={key}
            className="flex-none overflow-hidden"
            style={{
              width: `${settings.width}px`,
              height: `${settings.height}px`,
              borderRadius: `${settings.borderRadius}px`,
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <div className="w-full h-full bg-white/10 hover:bg-white/15 transition-colors">
              <Image
                src={src}
                alt={`Logo ${(parseInt(key.split('-')[1]) % LOGOS.length) + 1}`}
                width={settings.width}
                height={settings.height}
                className="w-full h-full object-cover"
                priority
                style={{
                  willChange: 'transform',
                  transform: 'translate3d(0, 0, 0)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}