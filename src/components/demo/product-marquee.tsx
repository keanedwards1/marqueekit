// src/components/demo/product-marquee.tsx

'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

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
    image: '/product-marquee/modern-chair.jpg'
  },
  {
    id: 2,
    name: 'Wooden Table',
    price: '$599',
    image: '/product-marquee/table.jpg'
  },
  {
    id: 3,
    name: 'Pendant Lights',
    price: '$199',
    image: '/product-marquee/light.jpg'
  },
  {
    id: 4,
    name: 'Ceramic Vase',
    price: '$89',
    image: '/product-marquee/vase.jpg'
  },
  {
    id: 5,
    name: 'Wall Art',
    price: '$159',
    image: '/product-marquee/wall-art.jpg'
  }
];

export function ProductMarquee({ settings }: ProductMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(settings.speed);
  const scrollPositionRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const currentSpeedRef = useRef(settings.speed);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculations = useMemo(() => ({
    itemWidth: settings.width + settings.gap,
    setWidth: PRODUCTS.length * (settings.width + settings.gap),
    baseSpeed: 50
  }), [settings.width, settings.gap]);

  useEffect(() => {
    speedRef.current = settings.speed;
  }, [settings.speed]);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const { setWidth, baseSpeed } = calculations;

    let lastFrameTime = 0;

    const scroll = (timestamp: number) => {
      if (!lastFrameTime) {
        lastFrameTime = timestamp;
      }

      const deltaTime = timestamp - lastFrameTime;
      lastFrameTime = timestamp;

      const targetSpeed = isHovered ? 0 : speedRef.current;
      const speedDiff = targetSpeed - currentSpeedRef.current;
      const smoothingFactor = 0.02;

      currentSpeedRef.current += speedDiff * smoothingFactor;

      const effectiveSpeed = Math.max(currentSpeedRef.current, 0);
      const pixelsToMove = (deltaTime / 1000) * baseSpeed * effectiveSpeed;

      scrollPositionRef.current -= pixelsToMove;

      if (Math.abs(scrollPositionRef.current) >= setWidth) {
        scrollPositionRef.current += setWidth;
      }

      marquee.style.transform = `translate3d(${scrollPositionRef.current}px, 0, 0)`;
      
      animationFrameRef.current = requestAnimationFrame(scroll);
    };

    animationFrameRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [calculations, isHovered]);

  const productSets = useMemo(() => (
    [...PRODUCTS, ...PRODUCTS, ...PRODUCTS, ...PRODUCTS].map((product, index) => ({
      ...product,
      key: `${product.id}-${index}`
    }))
  ), []);

  const handleLinkClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const relatedTarget = e.relatedTarget as Element | null;
    
    // Check if we're still within the container
    if (containerRef.current && relatedTarget instanceof Node && !containerRef.current.contains(relatedTarget)) {
      setIsHovered(false);
    } else if (!relatedTarget) {
      // If there's no related target, we've left the container entirely
      setIsHovered(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showPopup && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black/80 text-white px-6 py-4 rounded-lg backdrop-blur-sm shadow-lg max-w-xs text-center">
          <p className="mb-2">Demo Feature</p>
          <p className="text-sm text-gray-300">You can use these links to go<br/>wherever you need on your site.</p>
        </div>
      )}
      <div 
        className="overflow-hidden rounded-lg"
        style={{
          perspective: '1000px'
        }}
      >
        <div
          ref={marqueeRef}
          className="flex"
          style={{
            willChange: 'transform',
            gap: `${settings.gap}px`,
            paddingRight: `${settings.gap}px`,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
        >
          {productSets.map((product) => (
            <div
              key={product.key}
              className="flex-none group relative"
              style={{
                width: `${settings.width}px`,
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <div 
                className="relative overflow-hidden mb-3"
                style={{
                  height: `${settings.height}px`,
                  borderRadius: `${settings.borderRadius}px`
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={settings.width}
                  height={settings.height}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform !duration-200"
                  priority
                  style={{ 
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                  }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-1000 flex items-center justify-center">
                  <div className="text-center">
                    <button
                      onClick={handleLinkClick}
                      className="inline-flex items-center gap-2 text-white hover:text-blue-100 cursor-pointer font-medium px-6 py-3 rounded-full bg-black/50 hover:bg-black/60 transition-all duration-500 backdrop-blur-sm"
                    >
                      Your Link
                      <ArrowRight size={16} className="text-blue-300" />
                    </button>
                  </div>
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

export default ProductMarquee;