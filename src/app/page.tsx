// src/app/page.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, XCircle, Lightbulb, Code, Check, Clock, Zap } from 'lucide-react';

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
    <div className="flex flex-col min-h-screen relative">
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"
        aria-hidden="true"
      />

      <div className="relative">
        {/* Hero Section - Now with stronger value proposition */}
        <section className="px-4 pt-20 pb-16">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Setup in under 5 minutes</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6">
              Seamless <span className="text-blue-600">Marquees</span>
            </h1>

            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              The fastest way to add a stunning image marquee—no clunky CSS or JavaScript. Just plug and play.
            </p>



            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/examples"
                className="w-full sm:w-auto rounded-lg px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium text-lg"
              >
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5 inline-block" />
              </Link>
              <span className="text-gray-500">or</span>
              <Link
                href="/examples"
                className="w-full sm:w-auto rounded-lg px-8 py-4 border border-gray-200 hover:border-gray-300 hover:bg-white hover:text-black transition-colors font-medium text-lg"
              >
                See It In Action
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>4kb minified</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Zero dependencies</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>60fps performance</span>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section - Now with social proof */}
        <section className="px-4 pb-16 pt-10">
          <div className="container mx-auto max-w-6xl">
            {/*  <div className="text-center mb-8">
              <p className="text-sm font-medium text-gray-600 mb-2">TRUSTED BY DEVELOPERS AT</p>
              <div className="flex justify-center gap-8 opacity-50 ">
              </div>
            </div> */}

            <div
              style={{ overflowX: 'hidden', maxWidth: '100vw' }} // Prevents overflow
            >
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

          </div>
        </section>

        {/* Pain Points Section */}
        <section className="px-4 py-16 bg-gray-100">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-700">
              Why Most Marquees <span className="text-blue-600">Kill Conversions</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white hover:scale-101 transition duration-500 ease-in-out p-6 rounded-lg shadow-sm">
                <XCircle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Stuttering Motion</h3>
                <p className="text-gray-600">
                  Jerky animations make your site look unprofessional and drive visitors away before they even read your content.
                </p>
              </div>
              <div className="bg-white hover:scale-101 transition duration-500 ease-in-out p-6 rounded-lg shadow-sm">
                <Clock className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Slow Loading</h3>
                <p className="text-gray-600">
                  Poor image optimization causes layout shifts and ruins your site&apos;s first impression.
                </p>
              </div>
              <div className="bg-white hover:scale-101 transition duration-500 ease-in-out p-6 rounded-lg shadow-sm">
                <Zap className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Performance Issues</h3>
                <p className="text-gray-600">
                  Heavy libraries drain your site&apos;s resources and hurt your Core Web Vitals scores.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              The <span className="text-blue-600">MarqueeKit</span> Difference
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning-Fast Performance",
                  description: "Butter-smooth animations that maintain 60fps, even with dozens of high-resolution images."
                },
                {
                  icon: Code,
                  title: "Drop-in Installation",
                  description: "Copy, paste, and you're done. No configuration needed."
                },
                {
                  icon: Compass,
                  title: "Smart Image Loading",
                  description: "Intelligent preloading ensures your marquee starts smoothly every time."
                },
                {
                  icon: Lightbulb,
                  title: "Future-Proof",
                  description: "Built on modern web standards, ready for whatever comes next."
                }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-lg border border-gray-100 hover:border-blue-100 transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Now with urgency and value */}
        <section className="px-4 py-16 bg-black text-white relative overflow-hidden">
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff11_1px,transparent_1px),linear-gradient(to_bottom,#ffffff11_1px,transparent_1px)] bg-[size:14px_24px]"
          />
          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Your visitors deserve better than janky marquees
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join a wave of developers upgrading their sites.<br/>
              Installation takes less than 5 minutes.
            </p>
            <Link
              href="/examples"
              className="inline-block rounded-lg px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5 inline-block" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}