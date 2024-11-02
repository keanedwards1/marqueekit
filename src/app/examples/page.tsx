"use client";

import { useState } from "react";
import { LogoMarquee } from "@/components/demo/logo-marquee";
import { ProductMarquee } from "@/components/demo/product-marquee";
import { PhotoMarquee } from "@/components/demo/photo-marquee";
import { CodePreview } from "@/components/ui/code-preview";

export default function ExamplesPage() {
  const [showLogoCode, setShowLogoCode] = useState(false);
  const [showProductCode, setShowProductCode] = useState(false);
  const [showPhotoCode, setShowPhotoCode] = useState(false);

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Examples</h1>
          <p className="text-xl text-gray-600">
            See MarqueeKit in action across different use cases
          </p>
        </div>

        {/* Logo Wall Example */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Logo Wall</h2>
              <p className="text-gray-600">
                Perfect for showcasing partners, clients, or brand associations.
              </p>
            </div>
            <button
              onClick={() => setShowLogoCode(!showLogoCode)}
              className="text-sm px-4 py-2 rounded-lg border hover:bg-white/5 transition-colors"
            >
              {showLogoCode ? "Hide Code" : "View Code"}
            </button>
          </div>
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
              <LogoMarquee />
            </div>
            {showLogoCode && (
              <CodePreview
                code={`import { MarqueeKit } from 'marqueekit'

// Basic logo wall
<MarqueeKit
  speed={1}
  pauseOnHover
  className="py-8"
>
  {logos.map((logo) => (
    <img
      key={logo.id}
      src={logo.src}
      alt={logo.alt}
      className="h-20 mx-8"
    />
  ))}
</MarqueeKit>

// With custom styling
<MarqueeKit
  speed={1.5}
  pauseOnHover
  className="bg-black/20 backdrop-blur-sm rounded-lg py-8"
>
  {logos.map((logo) => (
    <div
      key={logo.id}
      className="mx-8 p-4 rounded bg-white/5 hover:bg-white/10 transition-colors"
    >
      <img
        src={logo.src}
        alt={logo.alt}
        className="h-20"
      />
    </div>
  ))}
</MarqueeKit>`}
              />
            )}
          </div>
        </div>

        {/* Product Showcase */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Product Showcase</h2>
              <p className="text-gray-600">
                Ideal for featuring products in a dynamic, engaging way.
              </p>
            </div>
            <button
              onClick={() => setShowProductCode(!showProductCode)}
              className="text-sm px-4 py-2 rounded-lg border hover:bg-white/5 transition-colors"
            >
              {showProductCode ? "Hide Code" : "View Code"}
            </button>
          </div>
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
              <ProductMarquee />
            </div>
            {showProductCode && (
              <CodePreview
                code={`<MarqueeKit
  speed={1}
  pauseOnHover
  className="py-8"
>
  {products.map((product) => (
    <div key={product.id} className="w-60 group">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="absolute inset-0 flex items-center justify-center text-white">
            View Details
          </span>
        </div>
      </div>
      <h3 className="mt-2 font-medium">{product.name}</h3>
      <p className="text-blue-400">{product.price}</p>
    </div>
  ))}
</MarqueeKit>`}
              />
            )}
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Photo Gallery</h2>
              <p className="text-gray-600">
                Support for mixed aspect ratios with smooth transitions.
              </p>
            </div>
            <button
              onClick={() => setShowPhotoCode(!showPhotoCode)}
              className="text-sm px-4 py-2 rounded-lg border hover:bg-white/5 transition-colors"
            >
              {showPhotoCode ? "Hide Code" : "View Code"}
            </button>
          </div>
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
              <PhotoMarquee />
            </div>
            {showPhotoCode && (
              <CodePreview
                code={`<MarqueeKit
  speed={1}
  pauseOnHover
  className="py-8"
>
  {photos.map((photo) => (
    <div 
      key={photo.id} 
      className="relative group rounded-lg overflow-hidden"
      style={getSizeStyles(photo.size)}
    >
      <img
        src={photo.image}
        alt={photo.caption}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100">
        <p className="absolute bottom-4 left-4 text-white">
          {photo.caption}
        </p>
      </div>
    </div>
  ))}
</MarqueeKit>`}
              />
            )}
          </div>
        </div>

        {/* Implementation Tips */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          <div className="rounded-lg p-6 group">
            <h3 className="font-semibold mb-2">Best Practices</h3>
            <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">
              Keep image sizes consistent and optimize them for web. Use
              responsive sizing for different screen sizes.
            </p>
          </div>
          <div className="rounded-lg p-6 group">
            <h3 className="font-semibold mb-2">Customization</h3>
            <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">
              Adjust speed, direction, and spacing to match your design. Add
              hover effects for interactivity.
            </p>
          </div>
          <div className="rounded-lg p-6 group">
            <h3 className="font-semibold mb-2">Performance</h3>
            <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">
              MarqueeKit automatically handles image preloading and uses
              hardware acceleration for smooth scrolling.
            </p>
          </div>
          <div className="rounded-lg p-6 group">
            <h3 className="font-semibold mb-2">Accessibility</h3>
            <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">
              All examples include proper ARIA labels and can be paused for
              users who prefer reduced motion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
