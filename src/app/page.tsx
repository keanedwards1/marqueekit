'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from '../components/Head';
import { ArrowRight, Compass, Lightbulb, XCircle, Code, Clock, Check, Zap } from 'lucide-react'; /*  Zap, Box, Smartphone, Code */

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
        keywords="MarqueeKit, Marquee Kit, marqueekit, marquee kit, how to make a marquee, how to make an infinite image scroller, infinite image, infinite carousel, infinite marquee, image marquee, seamless marquee, website marquee, responsive image scroll, smooth scrolling marquee, JavaScript marquee, CSS marquee, Next.js marquee, HTML marquee, developer tools for web design, front-end animation, minimal design marquee, customizable marquee, marquee component, lightweight marquee, website animation plugin"
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
          {/* Hero Section - Now with stronger value proposition */}
          <section className="px-4 pt-20 pb-16">
            <div className="container mx-auto max-w-5xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-500">
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
                  href="/pricing"
                  className="w-full sm:w-auto rounded-lg px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium text-lg"
                >
                  Start Building Now
                  <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                </Link>
                <span className="text-gray-500">or </span>
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
                  <span>Optimized & Robust</span>
                </div>
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


          {/* Product Hunt Badge */}
          <section className="px-4 py-4 -mt-6">
            <div className="container mx-auto text-center">
              <a href="https://www.producthunt.com/posts/marqueekit?embed=true&utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-marqueekit" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block">
                <img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=615119&theme=light&period=weekly&topic_id=93"
                  alt="MarqueeKit - Easy&#0032;Infinite&#0032;Scrolling&#0032;Marquees | Product Hunt"
                  style={{ width: '250px', height: '54px' }}
                  width="250" height="54" />
              </a>
              {/*               <a
                href="https://www.producthunt.com/posts/marqueekit?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-marqueekit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=615119&theme=light"
                  alt="MarqueeKit - Image Marquees With Ease | Product Hunt"
                  style={{ width: '250px', height: '54px' }}
                  width="250"
                  height="54"
                />
              </a> */}
            </div>
          </section>



          {/* Story Section */}
          <section className="px-4 py-16 text-white">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold text-center mb-4">
                The Story Behind <span className="text-blue-600">MarqueeKit </span>
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

          <section className="px-4 py-12 relative">
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  Simple Pricing for Powerful Results
                </h2>
                <p className="text-lg text-gray-600">
                  One-time payment. No subscriptions. Lifetime updates.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Basic License */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl -m-1 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <div className="relative bg-black rounded-xl border border-gray-800 p-8 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl text-white font-semibold">Basic</h3>
                        <p className="text-sm text-gray-400 mt-1">Essential features</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl text-white font-bold">$1.99</div>
                        <div className="text-sm text-gray-400">one-time</div>
                      </div>
                    </div>

                    <div className="space-y-5 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Code className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span className="text-gray-300">Core marquee features</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span className="text-gray-300">Basic documentation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span className="text-gray-300">Basic email support</span>
                      </div>
                    </div>

                    <Link
                      href="/pricing"
                      className="block w-full py-3 px-4 rounded-lg bg-white text-black text-center transition-colors hover:bg-blue-500 hover:text-white"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>

                {/* Standard License */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl -m-1 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <div className="relative bg-white rounded-xl border border-gray-200/60 p-8 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl text-gray-800 font-semibold">Standard</h3>
                        <p className="text-sm text-gray-500 mt-1">Complete package</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl text-gray-800 font-bold">$3.49</div>
                        <div className="text-sm text-gray-500">one-time</div>
                      </div>
                    </div>

                    <div className="space-y-5 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Code className="w-3.5 h-3.5 text-blue-500" />
                        </div>
                        <span className="text-gray-600">All core features + examples</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-blue-500" />
                        </div>
                        <span className="text-gray-600">Detailed documentation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-3.5 h-3.5 text-blue-500" />
                        </div>
                        <span className="text-gray-600">Priority email support</span>
                      </div>
                    </div>

                    <Link
                      href="/pricing"
                      className="block w-full py-3 px-4 rounded-lg bg-black text-white text-center transition-colors hover:bg-blue-600"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>

                {/* Pro License */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl -m-1 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <div className="relative bg-black rounded-xl border border-gray-800 p-8 backdrop-blur-sm text-white">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-semibold">Pro</h3>
                        <p className="text-sm text-gray-400 mt-1">Premium features</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">$4.95</div>
                        <div className="text-sm text-gray-400">one-time</div>
                      </div>
                    </div>

                    <div className="space-y-5 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Code className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span className="text-gray-300">All Standard features</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span className="text-gray-300">Load & fade animations</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span className="text-gray-300">Premium email support</span>
                      </div>
                    </div>

                    <Link
                      href="/pricing"
                      className="block w-full py-3 px-4 rounded-lg bg-white text-black text-center transition-colors hover:bg-blue-500 hover:text-white"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>

              {/*               <div className="text-center mt-10">
                <Link
                  href="/pricing"
                  className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  View complete pricing details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div> */}
            </div>
          </section>

          {/* Solution Section */}
          <section className="px-4 py-16 pb-40">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold text-center mb-12">
                The <span className="text-yellow-300">MarqueeKit</span> Difference
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
                    <feature.icon className="h-8 w-8 text-yellow-300 mb-4" />
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


          {/* CTA Section - Now with urgency and value */}
          <section className="px-4 py-16 bg-black text-white relative overflow-hidden">
            <div
              className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff11_1px,transparent_1px),linear-gradient(to_bottom,#ffffff11_1px,transparent_1px)] bg-[size:14px_24px]"
            />
            <div className="text-center mb-10 -mt-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-blue-500/10 border pr-4 border-blue-500/20">
                <Code className="h-4 w-4 text-blue-500" />
                <span className="font-medium">HTML/CSS/JS</span>
                {/*             <span className="text-gray-600">•</span>
            <span className="text-gray-600">React Version Coming Very Soon</span> */}
              </span>
            </div>
            <div className="container mx-auto max-w-5xl text-center relative z-10">
              <h2 className="text-4xl font-bold mb-6">
                Your visitors deserve silky smooth marquees
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                And you deserve to not waste your time reinventing the wheel.<br />
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link
                  href="/examples"
                  className="w-full sm:w-auto rounded-lg px-6 py-3 border border-gray-200 hover:border-gray-300 hover:bg-white hover:text-black transition-colors font-medium text-lg"
                >
                  Examples
                </Link>
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto rounded-lg px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium text-lg"
                >
                  Pricing
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}