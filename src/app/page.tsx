'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from '../components/Head';
import { ArrowRight, Compass, XCircle, Lightbulb, Code } from 'lucide-react'; /*  Zap, Box, Smartphone, Code */

const images = [
  '/home-marquee/image1.jpg',
  '/home-marquee/image2.jpg',
  '/home-marquee/image3.jpg',
  '/home-marquee/image4.jpg',
];

export default function Home() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const imageWidth = 300;
  const imageHeight = 200;
  const imageGap = 20;
  const imageBorderRadius = 8;

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.2;

    const scroll = () => {
      scrollPosition -= scrollSpeed;
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
    <>
      <Head
        title="MarqueeKit - Seamless, High-Performance Image Marquees for Modern Websites"
        description="MarqueeKit offers a minimalist, pixel-perfect solution for creating smooth, customizable image marquees. Ideal for developers, designers, and site builders."
        url="https://marqueekit.com"
        image="https://marqueekit.com/favicon-96x96.png"
        type="website"
        locale="en_US"
        author="Kean"
        keywords="MarqueeKit, image marquee, seamless marquee, website marquee, responsive image scroll, smooth scrolling marquee, JavaScript marquee, CSS marquee, Next.js marquee, HTML marquee, developer tools for web design, front-end animation, minimal design marquee, customizable marquee, marquee component, lightweight marquee, website animation plugin"
        themeColor="#ffffff"
        dateCreated="2024-01-01"
        dateModified="2024-01-15"
        siteName="MarqueeKit"
      />
      <div className="flex flex-col min-h-screen relative">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"
          aria-hidden="true"
        />

        <div className="relative">
          {/* Hero Section */}
          <section className="px-4 pt-20 pb-16">
            <div className="container mx-auto max-w-5xl text-center">
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                Seamless <span className="text-blue-600">Marquees</span>  {/* Beautiful */}
              </h1>
              <h2 className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
                A minimal marquee that maintains pixel-perfect smoothness.
                No stutters, no jank, just pure flowing motion.
              </h2>

              <div className="mt-4 flex items-center justify-center gap-4">
                <Link
                  href="/examples"
                  className="rounded-lg px-6 py-3 border border-gray-200 hover:border-gray-300 hover:bg-white hover:text-black transition-colors"
                  aria-label="See MarqueeKit in action"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                </Link>
                <Link
                  href="/docs"
                  className="rounded-lg px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                  aria-label="See MarqueeKit's documentation"
                >
                  Documentation
                </Link>
              </div>
            </div>

          </section>

          {/* Demo Section */}
          <section className="px-4 pb-16 pt-10">
            <div className="container mx-auto max-w-6xl overflow-hidden">
              <div
                className="flex"
                ref={marqueeRef}
                style={{
                  willChange: 'transform',
                  gap: `${imageGap}px`
                }}
              >
                {images.concat(images).map((src, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 overflow-hidden relative"
                    style={{
                      width: `${imageWidth}px`,
                      height: `${imageHeight}px`,
                      borderRadius: `${imageBorderRadius}px`,
                    }}
                  >
                    <Image
                      src={src}
                      alt={`Image ${index}`}
                      fill
                      className="object-cover"
                      priority={index < 5}
                      loading={index >= 5 ? "lazy" : "eager"}
                      sizes={`${imageWidth}px`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="text-center mb-6 mt-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-blue-500/10 border border-blue-500/20">
              <Code className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Supports HTML/CSS/JS</span>
              {/*             <span className="text-gray-600">•</span>
            <span className="text-gray-600">React Version Coming Very Soon</span> */}
            </span>
          </div>

          {/* Story Section */}
          <section className="px-4 py-16 text-white">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold text-center mb-4">
                The Story Behind <span className="text-blue-600">MarqueeKit </span> {/* The Journey Behind */}
              </h2>
              <h3 className="text-lg font-normal text-center mb-12">A few years ago, I decided to learn how to make websites.
                <br /> It was a lot of fun, but one thing, everytime I ran into it, was so frustrating.
                <br /> <span className="text-xl font-bold">Image Marquees.</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <Compass className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Exploration</h3>
                  <p className="text-gray-300">
                    I tried a lot of ways to create a functional image marquee, but I struggled to make even one work.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <XCircle className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Frustration</h3>
                  <p className="text-gray-300">
                    Each attempt led to roadblocks—performance issues, clunky animations, and lack of resources.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Lightbulb className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Creation</h3>
                  <p className="text-gray-300">
                    Determined, I perservered, and built my own. That&apos;s how MarqueeKit came to be— it&apos;s a tool forged of necessity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          {/*         <section className="px-4 py-16">
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
        </section> */}

          {/* CTA Section */}
          <section className="px-4 py-16 bg-black text-white relative overflow-hidden">
            <div
              className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff11_1px,transparent_1px),linear-gradient(to_bottom,#ffffff11_1px,transparent_1px)] bg-[size:14px_24px]"
            />
            <div className="container mx-auto max-w-5xl text-center relative z-10">
              <h2 className="text-3xl font-bold mb-6">
                Copy, paste, and you’re all set
              </h2>
              <Link
                href="/examples"
                className="inline-block rounded-lg px-6 py-3 bg-white text-black hover:bg-gray-100 transition-colors"
                aria-label="Get Started with MarqueeKit"
              >
                See it in action
                <ArrowRight className="ml-2 h-4 w-4 inline-block" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
