// src/app/docs/examples/page.tsx
'use client';

import React from 'react';
import { Code, Puzzle, Lightbulb, Wrench } from 'lucide-react';
import { CopyableCode } from '@/components/ui/copyable-code';

export default function ExamplesPage() {
  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]" 
        aria-hidden="true" 
      />
      
      <div className="container mx-auto px-4 max-w-4xl relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Examples</h1>
          <p className="text-xl text-gray-400">
            Common patterns and implementation examples
          </p>
        </div>

        <div className="space-y-12">
          {/* Common Patterns */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <Puzzle className="h-6 w-6 text-blue-500" />
                    Common Patterns
                  </h2>
                  <p className="text-gray-400">Quick examples for common use cases</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Logo Wall</h3>
                  <CopyableCode
                    code={`new MarqueeKit("#logo-wall", {
  images: logos,
  height: 100,       // Short height for logos
  imageWidth: 150,   // Compact logo size
  speed: 40,        // Moderate speed
  gap: 40,          // More space between logos
  pauseOnHover: false,
  imageScale: 1,    // No hover effect
  borderRadius: 0   // No rounding for logos
});`} />
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Product Gallery</h3>
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
});`} />
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Photo Stream</h3>
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
});`} />
                </div>
              </div>
            </div>
          </section>

          {/* Implementation Patterns */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <Code className="h-6 w-6 text-blue-500" />
                    Implementation Patterns
                  </h2>
                  <p className="text-gray-400">Common implementation techniques</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Lazy Loading</h3>
                  <CopyableCode
                    code={`function initMarqueeWhenVisible(elementId, options) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        new MarqueeKit(elementId, options);
        observer.disconnect();
      }
    });
  });

  observer.observe(document.querySelector(elementId));
}`} />
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Responsive Adjustments</h3>
                  <CopyableCode
                    code={`const marquee = new MarqueeKit("#my-marquee", options);

// Adjust for screen size
function updateForScreenSize() {
  const width = window.innerWidth;
  
  if (width < 768) {  // Mobile
    marquee.setSpeed(30);
    marquee.setBorderRadius(4);
  } else {  // Desktop
    marquee.setSpeed(50);
    marquee.setBorderRadius(8);
  }
}

// Debounced resize handler
let timeout;
window.addEventListener('resize', () => {
  clearTimeout(timeout);
  timeout = setTimeout(updateForScreenSize, 250);
});`} />
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Touch Controls</h3>
                  <CopyableCode
                    code={`const marquee = new MarqueeKit("#my-marquee", options);
const element = document.querySelector("#my-marquee");
let touchStartX = 0;
let originalSpeed = 50;

element.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  marquee.pause();
});

element.addEventListener('touchmove', (e) => {
  const diff = touchStartX - e.touches[0].clientX;
  marquee.setSpeed(diff * 0.5);
});

element.addEventListener('touchend', () => {
  marquee.setSpeed(originalSpeed);
  marquee.play();
});`} />
                </div>
              </div>
            </div>
          </section>

          {/* Tips & Best Practices */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <Lightbulb className="h-6 w-6 text-blue-500" />
                    Tips & Best Practices
                  </h2>
                  <p className="text-gray-400">Recommendations for optimal use</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Image Optimization</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Use WebP format when possible</li>
                    <li>• Keep image dimensions consistent within each marquee</li>
                    <li>• Optimize file sizes (aim for &lt;200KB per image)</li>
                    <li>• Consider loading smaller images on mobile</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Performance</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Initialize marquees only when they come into view</li>
                    <li>• Use reasonable animation speeds (30-70 is optimal)</li>
                    <li>• Clean up instances when they&apos;re no longer needed</li>
                    <li>• Limit the number of simultaneous marquees</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Responsive Design</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Adjust speeds for different screen sizes</li>
                    <li>• Consider different image dimensions on mobile</li>
                    <li>• Use percentage-based container widths</li>
                    <li>• Test touch interactions on mobile devices</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                    <Wrench className="h-6 w-6 text-blue-500" />
                    Common Solutions
                  </h2>
                  <p className="text-gray-400">Quick fixes for common issues</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Images Not Loading</h3>
                  <CopyableCode
                    code={`// Wait for images to load before initializing
const images = ["/image1.jpg", "/image2.jpg"];
const preloadImages = images.map(src => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
});

Promise.all(preloadImages)
  .then(() => new MarqueeKit("#my-marquee", { images }))
  .catch(error => console.error("Failed to load images:", error));`} />
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Jerky Animation</h3>
                  <CopyableCode
                    code={`// Ensure container has explicit dimensions
const container = document.querySelector("#my-marquee");
container.style.width = "100%";
container.style.height = "300px";

// Use moderate speed and add hardware acceleration
new MarqueeKit("#my-marquee", {
  speed: 50,
  images: images,
  // Other options...
});`} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}