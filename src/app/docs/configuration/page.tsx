// src/app/docs/configuration/page.tsx

'use client';

import React from 'react';
import { CopyableCode } from '@/components/ui/copyable-code';
import { Settings, Zap, Gauge, Box } from 'lucide-react';

export default function ConfigurationPage() {
  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]" 
        aria-hidden="true" 
      />
      
      <div className="container mx-auto px-4 max-w-4xl relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Configuration</h1>
          <p className="text-xl text-gray-400">
          Tailor MarqueeKit to your needs. Configure your instance with<br/> precision and ease, unlocking a customized experience that&apos;s uniquely yours.
          </p>
        </div>

        <div className="space-y-12">
          {/* Quick Reference */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Zap className="h-6 w-6 text-blue-500" />
                Quick Reference
              </h2>
              
              <CopyableCode 
                code={`new MarqueeKit("#my-marquee", {
  // Required options
  images: ["/image1.jpg", "/image2.jpg"],  // Array of image paths
  height: 300,                             // Container height in pixels
  imageWidth: 250,                         // Width of each image
  
  // Optional settings with defaults
  speed: 50,                               // Scroll speed (pixels/second)
  gap: 20,                                 // Space between images
  pauseOnHover: false,                     // Pause on mouse hover
  reverse: false,                          // Reverse scroll direction
  imageScale: 1,                           // Hover zoom factor
  borderRadius: 8                          // Image corner radius
});`}
              />
            </div>
          </section>

          {/* Basic Options */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Settings className="h-6 w-6 text-blue-500" />
                Basic Options
              </h2>
              
              <div className="grid gap-6">
                {/* Images */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <code className="text-blue-400">images: string[]</code>
                  <p className="text-gray-300 mt-2">Array of image paths to display in the marquee.</p>
                  <ul className="mt-2 space-y-1 text-gray-400">
                    <li>• Required option</li>
                    <li>• Supports .jpg, .png, .webp formats</li>
                    <li>• Images are lazy loaded for performance</li>
                    <li>• Loading state is handled automatically</li>
                  </ul>
                  <CopyableCode 
                    className="mt-3"
                    code={`new MarqueeKit("#my-marquee", {
  images: [
    "/path/to/image1.jpg",
    "/path/to/image2.webp",  // WebP recommended for better performance
    "/path/to/image3.jpg"
  ]
});`}
                  />
                </div>

                {/* Dimensions */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="space-y-6">
                    <div>
                      <code className="text-blue-400">height: number</code>
                      <p className="text-gray-300 mt-2">Height of the marquee container in pixels.</p>
                      <ul className="mt-2 space-y-1 text-gray-400">
                        <li>• Required option</li>
                        <li>• Images scale proportionally to fit</li>
                        <li>• Affects memory usage</li>
                      </ul>
                    </div>
                    <div>
                      <code className="text-blue-400">imageWidth: number</code>
                      <p className="text-gray-300 mt-2">Width of each image in pixels.</p>
                      <ul className="mt-2 space-y-1 text-gray-400">
                        <li>• Required option</li>
                        <li>• Images maintain aspect ratio</li>
                        <li>• Affects performance and memory usage</li>
                      </ul>
                    </div>
                    <CopyableCode 
                      code={`new MarqueeKit("#my-marquee", {
  height: 300,      // Container height
  imageWidth: 250,  // Image width
  // Other options...
});`}
                    />
                  </div>
                </div>

                {/* Spacing */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <code className="text-blue-400">gap: number</code>
                  <p className="text-gray-300 mt-2">Space between images in pixels.</p>
                  <ul className="mt-2 space-y-1 text-gray-400">
                    <li>• Optional (defaults to 20)</li>
                    <li>• Affects overall scroll timing</li>
                  </ul>
                  <CopyableCode 
                    className="mt-3"
                    code={`new MarqueeKit("#my-marquee", {
  gap: 20,  // 20px space between images
  // Other options...
});`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Animation Options */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Gauge className="h-6 w-6 text-blue-500" />
                Animation Options
              </h2>

              <div className="grid gap-6">
                {/* Speed */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <code className="text-blue-400">speed: number</code>
                  <p className="text-gray-300 mt-2">Scroll speed in pixels per second.</p>
                  <ul className="mt-2 space-y-1 text-gray-400">
                    <li>• Optional (defaults to 50)</li>
                    <li>• Hardware accelerated for smooth animation</li>
                    <li>• Automatically pauses when not in viewport</li>
                    <li>• Can be changed dynamically with setSpeed()</li>
                  </ul>
                  <CopyableCode 
                    className="mt-3"
                    code={`new MarqueeKit("#my-marquee", {
  speed: 50,  // Balanced speed for smooth scrolling
  // Other options...
});`}
                  />
                </div>

                {/* Direction */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <code className="text-blue-400">reverse: boolean</code>
                  <p className="text-gray-300 mt-2">Reverse the scroll direction.</p>
                  <ul className="mt-2 space-y-1 text-gray-400">
                    <li>• Optional (defaults to false)</li>
                    <li>• false = left to right</li>
                    <li>• true = right to left</li>
                  </ul>
                  <CopyableCode 
                    className="mt-3"
                    code={`new MarqueeKit("#my-marquee", {
  reverse: true,  // Scroll right to left
  // Other options...
});`}
                  />
                </div>

                {/* Pause on Hover */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <code className="text-blue-400">pauseOnHover: boolean</code>
                  <p className="text-gray-300 mt-2">Pause animation when mouse hovers over the marquee.</p>
                  <ul className="mt-2 space-y-1 text-gray-400">
                    <li>• Optional (defaults to false)</li>
                    <li>• Smooth deceleration effect</li>
                    <li>• Works with imageScale option</li>
                  </ul>
                  <CopyableCode 
                    className="mt-3"
                    code={`new MarqueeKit("#my-marquee", {
  pauseOnHover: true,  // Enable pause on hover
  // Other options...
});`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Visual Options */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Box className="h-6 w-6 text-blue-500" />
                Visual Options
              </h2>

              <div className="grid gap-6">
                {/* Image Scale */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <code className="text-blue-400">imageScale: number</code>
                  <p className="text-gray-300 mt-2">Scale factor for image hover effect.</p>
                  <ul className="mt-2 space-y-1 text-gray-400">
                    <li>• Optional (defaults to 1)</li>
                    <li>• 1 = no scaling</li>
                    <li>• Hardware accelerated transform</li>
                    <li>• Smooth transition effect</li>
                  </ul>
                  <CopyableCode 
                    className="mt-3"
                    code={`new MarqueeKit("#my-marquee", {
  imageScale: 1.1,  // Grow images 10% on hover
  // Other options...
});`}
                  />
                </div>

                {/* Border Radius */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <code className="text-blue-400">borderRadius: number</code>
                  <p className="text-gray-300 mt-2">Border radius of images in pixels.</p>
                  <ul className="mt-2 space-y-1 text-gray-400">
                    <li>• Optional (defaults to 8)</li>
                    <li>• Can be updated with setBorderRadius()</li>
                    <li>• Set to 9999 for circular images</li>
                  </ul>
                  <CopyableCode 
                    className="mt-3"
                    code={`new MarqueeKit("#my-marquee", {
  borderRadius: 16,  // More rounded corners
  // Other options...
});`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Common Configurations */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6">Common Configurations</h2>
              
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Logo Wall</h3>
                  <CopyableCode 
                    code={`new MarqueeKit("#logo-wall", {
  images: logos,
  height: 100,       // Short height for logos
  imageWidth: 150,   // Compact logo size
  speed: 40,        // Moderate speed
  gap: 40,          // More space between logos
  pauseOnHover: false,
  imageScale: 1     // No hover effect
});`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Product Gallery</h3>
                  <CopyableCode 
                    code={`new MarqueeKit("#product-gallery", {
  images: products,
  height: 400,       // Taller for product images
  imageWidth: 300,   // Larger product images
  speed: 30,        // Slower for better viewing
  gap: 30,          // Moderate spacing
  pauseOnHover: true,
  imageScale: 1.1,  // Subtle hover effect
  borderRadius: 12  // Rounded corners
});`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Photo Stream</h3>
                  <CopyableCode 
                    code={`new MarqueeKit("#photo-stream", {
  images: photos,
  height: 250,      // Moderate height
  imageWidth: 250,  // Square images
  speed: 60,       // Faster scroll
  gap: 20,         // Tight spacing
  pauseOnHover: true,
  imageScale: 1.2, // Pronounced hover effect
  borderRadius: 8  // Slight rounding
});`}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}