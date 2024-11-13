'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowLeftRight } from 'lucide-react';

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
  const [direction, setDirection] = useState<'normal' | 'reverse'>('normal');
  const [showPopup, setShowPopup] = useState(false);
  const transitionStartTimeRef = useRef(0);
  const previousDirectionRef = useRef(direction);
  const [totalSets, setTotalSets] = useState(4); // Default value

  // Memoize the calculations that depend on settings
  const calculations = useMemo(() => ({
    itemWidth: settings.width + settings.gap,
    setWidth: LOGOS.length * (settings.width + settings.gap),
    baseSpeed: 50,
    transitionDuration: 1000, // 1 second transition
    totalSets
  }), [settings.width, settings.gap, totalSets]);

  // Calculate totalSets based on window width
  useEffect(() => {
    const calculateTotalSets = () => {
      return Math.ceil((window.innerWidth || 1200) / (LOGOS.length * (settings.width + settings.gap))) + 2;
    };
    
    setTotalSets(calculateTotalSets());

    const handleResize = () => {
      setTotalSets(calculateTotalSets());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [settings.width, settings.gap]);

  useEffect(() => {
    speedRef.current = settings.speed;
  }, [settings.speed]);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const { setWidth, baseSpeed, transitionDuration } = calculations;

    // Initialize position based on direction
    if (direction === 'reverse' && scrollPositionRef.current === 0) {
      scrollPositionRef.current = -setWidth;
    }

    const scroll = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      // Handle direction transition
      if (previousDirectionRef.current !== direction) {
        transitionStartTimeRef.current = timestamp;
        previousDirectionRef.current = direction;
      }

      const transitionTime = timestamp - transitionStartTimeRef.current;
      const transitionRatio = Math.min(transitionTime / transitionDuration, 1);
      
      const easeInOutCubic = (t: number) => 
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
      const progress = easeInOutCubic(transitionRatio);

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const effectiveSpeed = Math.max(speedRef.current, 0.1);
      let pixelsToMove = (deltaTime / 1000) * baseSpeed * effectiveSpeed;

      const directionMultiplier = direction === 'normal' ? -1 : 1;
      const previousDirectionMultiplier = direction === 'normal' ? 1 : -1;
      
      const interpolatedDirection = 
        previousDirectionMultiplier * (1 - progress) + directionMultiplier * progress;
      
      pixelsToMove *= interpolatedDirection;

      scrollPositionRef.current += pixelsToMove;

      // Reset position with direction-aware bounds
      if (direction === 'normal' && scrollPositionRef.current <= -setWidth) {
        scrollPositionRef.current += setWidth;
      } else if (direction === 'reverse' && scrollPositionRef.current >= 0) {
        scrollPositionRef.current -= setWidth;
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
  }, [calculations, direction]);

  // Create enough sets of logos to ensure smooth scrolling in both directions
  const logoSets = useMemo(() => {
    const baseSet = [...LOGOS];
    return Array.from({ length: calculations.totalSets }, (_, index) => 
      baseSet.map(src => ({
        src,
        key: `${src}-${index}`
      }))
    ).flat();
  }, [calculations.totalSets]);

  const handleDirectionToggle = () => {
    setDirection(prev => prev === 'normal' ? 'reverse' : 'normal');
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1000);
  };

  return (
    <div className="relative">
      {showPopup && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black/80 text-white px-6 py-4 rounded-lg backdrop-blur-sm shadow-lg max-w-xs text-center">
          <p className="mb-2">Direction: {direction === 'normal' ? 'Left' : 'Right'}</p>
          <p className="text-sm text-gray-300">Click to toggle scroll direction</p>
        </div>
      )}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleDirectionToggle}
          className="inline-flex items-center gap-2 text-white hover:text-blue-200 cursor-pointer font-medium px-6 py-3 rounded-full bg-black/50 hover:bg-black/60 transition duration-200 backdrop-blur-sm"
        >
          <ArrowLeftRight size={16} className="text-blue-300" />
          Toggle Direction
        </button>
      </div>
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
    </div>
  );
}