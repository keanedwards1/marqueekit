'use client';

import React from 'react';
import { Check, FileCode, Globe, Zap } from 'lucide-react';
import Link from 'next/link';
import { CopyableCode } from '@/components/ui/copyable-code';

export default function InstallationPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Installation</h1>
        
        <div className="space-y-12">
          {/* Purchase Notice */}
          <section className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Purchase Required</h2>
              <p className="text-gray-400 mb-4">
                MarqueeKit is a commercial product. You&apos;ll need to purchase a license before installing.
              </p>
              <Link 
                href="/pricing" 
                className="inline-flex items-center text-blue-500 hover:text-blue-600"
              >
                View pricing and purchase options →
              </Link>
            </div>
          </section>

          {/* Quick Start */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Zap className="h-6 w-6 text-blue-500" />
                Quick Start
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">1. Include Required Files</h3>
                  <CopyableCode code={`<!-- Add to your HTML file -->
<link rel="stylesheet" href="marquee.css">
<script src="marquee.js"></script>`} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">2. Add Container Element</h3>
                  <CopyableCode code={`<div id="my-marquee"></div>`} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">3. Initialize MarqueeKit</h3>
                  <CopyableCode code={`new MarqueeKit("#my-marquee", {
  images: [
    "/path/to/image1.jpg",
    "/path/to/image2.jpg",
    "/path/to/image3.jpg"
  ],
  height: 300,
  imageWidth: 250,
  speed: 50
});`} />
                </div>
              </div>
            </div>
          </section>

          {/* Technical Requirements */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FileCode className="h-6 w-6 text-blue-500" />
                Technical Requirements
              </h2>
              
              <div className="grid gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Required Files</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>marquee.js - Core functionality</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>marquee.css - Required styles and animations</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Browser Features</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>IntersectionObserver API</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>CSS transforms and transitions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>requestAnimationFrame</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Browser Support */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Globe className="h-6 w-6 text-blue-500" />
                Browser Support
              </h2>
              
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
                  <h3 className="font-semibold mb-2">Performance Features</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Hardware acceleration</li>
                    <li>• Lazy image loading</li>
                    <li>• Automatic pause when hidden</li>
                    <li>• Memory optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Next Steps</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/docs/configuration"
                className="group p-4 rounded-lg border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm"
              >
                <h3 className="font-semibold mb-2">Configuration →</h3>
                <p className="text-gray-400 group-hover:text-gray-300">
                  Learn about all available options and customization
                </p>
              </Link>
              <Link 
                href="/docs/examples"
                className="group p-4 rounded-lg border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm"
              >
                <h3 className="font-semibold mb-2">Examples →</h3>
                <p className="text-gray-400 group-hover:text-gray-300">
                  View example implementations and use cases
                </p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}