'use client';

import { useEffect, useRef, useMemo } from 'react';
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
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef<number>();

  const calculations = useMemo(() => ({
    itemWidth: settings.width + settings.gap,
    setWidth: PRODUCTS.length * (settings.width + settings.gap),
    baseSpeed: 500
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

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const effectiveSpeed = Math.max(speedRef.current, 0.1);
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
      lastTimeRef.current = 0;
    };
  }, [calculations]);

  const productSets = useMemo(() => (
    [...PRODUCTS, ...PRODUCTS, ...PRODUCTS, ...PRODUCTS].map((product, index) => ({
      ...product,
      key: `${product.id}-${index}`
    }))
  ), []);

  return (
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
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                priority
                style={{ 
                  willChange: 'transform',
                  transform: 'translate3d(0, 0, 0)',
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 text-white hover:text-blue-200 cursor-pointer font-medium px-6 py-3 rounded-full bg-black/50 hover:bg-black/60 transition duration-200 backdrop-blur-sm">
                    Your Link
                    <ArrowRight size={16} className="text-blue-300" />
                  </span>
                </div>
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

export default ProductMarquee;