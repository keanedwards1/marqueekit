'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Box, Smartphone, Code } from 'lucide-react';

const images = [
  '/home-marquee/image1.jpg',
  '/home-marquee/image2.jpg',
  '/home-marquee/image3.jpg',
  '/home-marquee/image4.jpg',
  '/home-marquee/image5.jpg',
  // Add more images as needed
];

export default function Home() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Variables for image dimensions, gap, and border radius
  const imageWidth = 300; // Width of each image container
  const imageHeight = 200; // Height of each image container
  const imageGap = 20; // Gap between images
  const imageBorderRadius = 8; // Border radius for each image

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    let animationFrameId: number;
    let scrollPosition = 0;

    const scrollSpeed = 0.2; // Adjust scroll speed as needed

    const scroll = () => {
      scrollPosition -= scrollSpeed;

      // Reset scroll position to create a seamless loop
      if (marquee.scrollWidth / 2 - Math.abs(scrollPosition) <= 0) {
        scrollPosition = 0;
      }

      marquee.style.transform = `translateX(${scrollPosition}px)`;

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="px-4 pt-20 pb-16">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              Pretty good image{' '}
              <span className="text-blue-600">marquees</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              A beautifully minimal marquee that maintains pixel-perfect smoothness. 
              No stutters, no jank, just pure flowing motion.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link 
                href="/pricing"
                className="rounded-lg px-6 py-3 border border-gray-200 hover:border-gray-300 hover:bg-white hover:text-black transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 inline-block" />
              </Link>
              <Link 
                href="/docs"
                className="rounded-lg px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Documentation
              </Link>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="px-4 py-16 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl overflow-hidden">
            <div
              className="flex"
              ref={marqueeRef}
              style={{
                willChange: 'transform',
                gap: `${imageGap}px` // Set the gap between images
              }}
            >
              {images.concat(images).map((src, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 overflow-hidden relative"
                  style={{
                    width: `${imageWidth}px`,
                    height: `${imageHeight}px`,
                    borderRadius: `${imageBorderRadius}px`, // Border radius for each image
                  }}
                >
                <Image
                  src={src}
                  alt={`Image ${index}`}
                  fill
                  className="object-cover"
                  priority={index < 5}
                  loading={index >= 5 ? "lazy" : "eager" }
                  sizes={`${imageWidth}px`} 
                />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why choose MarqueeKit?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast Performance",
                  description: "4kb minified with zero dependencies. Runs at 60fps even with dozens of images."
                },
                {
                  icon: Box,
                  title: "Smart Preloading",
                  description: "Images load intelligently to prevent rhythm-breaking load delays."
                },
                {
                  icon: Smartphone,
                  title: "Touch Optimized",
                  description: "Smooth touch interactions that feel natural on any device."
                },
                {
                  icon: Code,
                  title: "Developer Friendly",
                  description: "Thoughtful defaults with easy overrides when you need them."
                }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-lg border group hover:border-gray-300 transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16 bg-black text-white relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff11_1px,transparent_1px),linear-gradient(to_bottom,#ffffff11_1px,transparent_1px)] bg-[size:14px_24px]"
          />
          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <h2 className="text-3xl font-bold mb-6">
              Need to add smooth scrolling to your site?
            </h2>
            <Link 
              href="/pricing"
              className="inline-block rounded-lg px-6 py-3 bg-white text-black hover:bg-gray-100 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 inline-block" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
