// src/app/docs/page.tsx

'use client';

import Link from 'next/link';
import { ArrowRight, Terminal, Settings, Layout, Code } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-gray-600">
            Everything you need to build beautiful image marquees
          </p>
        </div>

        {/* Quick start section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">1. Install the package</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                npm install marqueekit
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">2. Import and use</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                {`import { MarqueeKit } from 'marqueekit'

const Gallery = () => (
  <MarqueeKit>
    <img src="/image1.jpg" alt="Image 1" />
    <img src="/image2.jpg" alt="Image 2" />
    <img src="/image3.jpg" alt="Image 3" />
  </MarqueeKit>
)`}
              </div>
            </div>
          </div>
        </div>

        {/* Documentation sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Link 
            href="/docs/installation" 
            className="group p-6 rounded-xl border hover:border-gray-300 transition-colors"
          >
            <Terminal className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Installation</h3>
            <p className="text-gray-600 mb-4 transition-colors duration-500 group-hover:text-gray-400">
              Step-by-step guide to installing MarqueeKit in your project.
            </p>
            <span className="text-blue-500 group-hover:text-blue-400 transition-colors inline-flex items-center">
              Learn more <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </Link>

          <Link 
            href="/docs/configuration" 
            className="group p-6 rounded-xl border hover:border-gray-300 transition-colors"
          >
            <Settings className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Configuration</h3>
            <p className="text-gray-600 mb-4 transition-colors duration-500 group-hover:text-gray-400">
              All configuration options and customization possibilities.
            </p>
            <span className="text-blue-500 group-hover:text-blue-400 transition-colors inline-flex items-center">
              Learn more <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </Link>

          <Link 
            href="/docs/examples" 
            className="group p-6 rounded-xl border hover:border-gray-300 transition-colors"
          >
            <Layout className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Examples</h3>
            <p className="text-gray-600 mb-4 transition-colors duration-500 group-hover:text-gray-400">
              Real-world examples and common use cases.
            </p>
            <span className="text-blue-500 group-hover:text-blue-400 transition-colors inline-flex items-center">
              Learn more <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </Link>

          <Link 
            href="/docs/api" 
            className="group p-6 rounded-xl border hover:border-gray-300 transition-colors"
          >
            <Code className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">API Reference</h3>
            <p className="text-gray-600 mb-4 transition-colors duration-500 group-hover:text-gray-400">
              Complete API documentation and type definitions.
            </p>
            <span className="text-blue-500 group-hover:text-blue-400 transition-colors inline-flex items-center">
              Learn more <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* Common use cases */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Common Use Cases</h2>
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border">
              <h3 className="font-semibold mb-4">Logo Wall</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                {`<MarqueeKit speed={1} pauseOnHover>
  {logos.map(logo => (
    <img key={logo.id} src={logo.src} alt={logo.alt} className="h-16" />
  ))}
</MarqueeKit>`}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border">
              <h3 className="font-semibold mb-4">Product Gallery</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                {`<MarqueeKit speed={0.5} direction="right">
  {products.map(product => (
    <div key={product.id} className="w-64">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  ))}
</MarqueeKit>`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}