'use client';

import React from 'react';
import { CopyableCode } from '@/components/ui/copyable-code';
import { AlertCircle, FileWarning, Zap, Globe, } from 'lucide-react';

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]" 
        aria-hidden="true" 
      />
      
      <div className="container mx-auto px-4 max-w-4xl relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Troubleshooting & FAQ</h1>
          <p className="text-xl text-gray-400">
            Common issues, solutions, and best practices
          </p>
        </div>

        <div className="space-y-12">
          {/* Common Issues */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-blue-500" />
                Common Issues
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Images not loading or displaying correctly</h3>
                  <div className="space-y-3 text-gray-300">
                    <p>Check the following:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Verify image paths are correct and images exist</li>
                      <li>Ensure images are fully downloaded before initialization</li>
                      <li>Check browser console for any 404 errors</li>
                    </ul>
                    <div className="mt-4">
                      <p className="text-sm text-gray-400 mb-2">Solution:</p>
                      <CopyableCode 
                        code={`// Wait for images to load before initializing
window.addEventListener('load', () => {
  new MarqueeKit("#my-marquee", {
    images: images,
    // ... other options
  });
});`}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Marquee not animating</h3>
                  <div className="space-y-3 text-gray-300">
                    <p>Common causes:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Container has zero width or height</li>
                      <li>Speed setting is too low</li>
                      <li>JavaScript errors preventing initialization</li>
                    </ul>
                    <div className="mt-4">
                      <p className="text-sm text-gray-400 mb-2">Solution:</p>
                      <CopyableCode 
                        code={`// Ensure container has explicit dimensions
const container = document.querySelector("#my-marquee");
container.style.height = "300px";  // Set explicit height
container.style.width = "100%";    // Set explicit width

new MarqueeKit("#my-marquee", {
  speed: 50,  // Try increasing speed if animation is too slow
  // ... other options
});`}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Performance issues</h3>
                  <div className="space-y-3 text-gray-300">
                    <p>If experiencing lag or stuttering:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Optimize image sizes</li>
                      <li>Reduce number of simultaneous marquees</li>
                      <li>Use appropriate image dimensions</li>
                    </ul>
                    <div className="mt-4">
                      <p className="text-sm text-gray-400 mb-2">Recommended image settings:</p>
                      <CopyableCode 
                        code={`// Optimize for performance
new MarqueeKit("#my-marquee", {
  imageWidth: 250,    // Keep reasonable dimensions
  height: 300,       // Avoid excessive sizes
  gap: 20,          // Maintain reasonable gaps
  // Use optimized images (WebP if possible)
  images: [
    "/images/optimized1.webp",
    "/images/optimized2.webp"
  ]
});`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Zap className="h-6 w-6 text-blue-500" />
                Best Practices
              </h2>
              
              <div className="grid gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Image Optimization</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Use WebP format when possible</li>
                    <li>• Optimize images for their display size</li>
                    <li>• Keep file sizes under 200KB per image</li>
                    <li>• Use consistent image dimensions</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Performance Tips</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Lazy load images for marquees below the fold</li>
                    <li>• Use reasonable animation speeds (30-70)</li>
                    <li>• Limit the number of simultaneous marquees</li>
                    <li>• Clean up instances when no longer needed</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Responsive Design</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Use percentage-based widths for containers</li>
                    <li>• Adjust image sizes for different viewports</li>
                    <li>• Consider mobile performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Browser Compatibility */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Globe className="h-6 w-6 text-blue-500" />
                Browser Compatibility
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-300">MarqueeKit is compatible with:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Supported Browsers</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>✓ Chrome 60+</li>
                      <li>✓ Firefox 54+</li>
                      <li>✓ Safari 11+</li>
                      <li>✓ Edge 79+</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Required Features</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• requestAnimationFrame</li>
                      <li>• CSS transforms</li>
                      <li>• Intersection Observer</li>
                      <li>• ES6 support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FileWarning className="h-6 w-6 text-blue-500" />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Can I use custom HTML instead of images?</h3>
                  <p className="text-gray-300">Currently, MarqueeKit is designed specifically for image marquees. For custom HTML content, consider using a different solution.</p>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">How can I pause/resume the marquee programmatically?</h3>
                  <p className="text-gray-300 mb-3">Use the built-in pause and play methods:</p>
                  <CopyableCode 
                    code={`const marquee = new MarqueeKit("#my-marquee", options);

// Pause the marquee
marquee.pause();

// Resume the marquee
marquee.play();`}
                  />
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Can I change settings after initialization?</h3>
                  <p className="text-gray-300 mb-3">Yes, use the appropriate setter methods:</p>
                  <CopyableCode 
                    code={`const marquee = new MarqueeKit("#my-marquee", options);

// Update settings
marquee.setSpeed(100);
marquee.setBorderRadius(16);`}
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