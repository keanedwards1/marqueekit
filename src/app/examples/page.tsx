// src/app/examples/page.tsx

'use client';

import React, { useState, useCallback } from "react";
import { LogoMarquee } from "@/components/demo/logo-marquee";
import { ProductMarquee } from "@/components/demo/product-marquee";
import { PhotoMarquee } from "@/components/demo/photo-marquee";
import { CodePreview } from "@/components/ui/code-preview";
import Link from 'next/link';
import { ArrowRight, Sliders, ArrowUpRight } from 'lucide-react'; /* ArrowLeft */

interface MarqueeSettings {
  speed: number;
  gap: number;
  borderRadius: number;
  width: number;
  height: number;
}

interface MarqueeControlsProps {
  settings: MarqueeSettings;
  onChange: (settings: MarqueeSettings) => void;
}

const MarqueeControls: React.FC<MarqueeControlsProps> = React.memo(({ settings, onChange }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border mb-6">
    <div className="flex items-center gap-2 mb-4">
      <Sliders className="w-4 h-4" />
      <h3 className="text-sm font-semibold">Customize</h3>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* Speed Slider */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Speed</label>
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={settings.speed}
          onChange={(e) => onChange({ ...settings, speed: Number(e.target.value) })}
          className="w-full cursor-pointer accent-blue-500 rounded-lg appearance-none h-2 bg-gray-200"
        />
        <div className="text-xs text-gray-500">{settings.speed}x</div>
      </div>

      {/* Gap Slider */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Gap</label>
        <input
          type="range"
          min="0"
          max="40"
          step="1"
          value={settings.gap}
          onChange={(e) => onChange({ ...settings, gap: Number(e.target.value) })}
          className="w-full cursor-pointer accent-blue-500 rounded-lg appearance-none h-2 bg-gray-200"
        />
        <div className="text-xs text-gray-500">{settings.gap}px</div>
      </div>

      {/* Border Radius Slider */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Border Radius</label>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={settings.borderRadius}
          onChange={(e) => onChange({ ...settings, borderRadius: Number(e.target.value) })}
          className="w-full cursor-pointer accent-blue-500 rounded-lg appearance-none h-2 bg-gray-200"
        />
        <div className="text-xs text-gray-500">{settings.borderRadius}px</div>
      </div>

      {/* Width Slider */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Width</label>
        <input
          type="range"
          min="200"
          max="400"
          step="1"
          value={settings.width}
          onChange={(e) => onChange({ ...settings, width: Number(e.target.value) })}
          className="w-full cursor-pointer accent-blue-500 rounded-lg appearance-none h-2 bg-gray-200"
        />
        <div className="text-xs text-gray-500">{settings.width}px</div>
      </div>

      {/* Height Slider */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Height</label>
        <input
          type="range"
          min="150"
          max="300"
          step="1"
          value={settings.height}
          onChange={(e) => onChange({ ...settings, height: Number(e.target.value) })}
          className="w-full cursor-pointer accent-blue-500 rounded-lg appearance-none h-2 bg-gray-200"
        />
        <div className="text-xs text-gray-500">{settings.height}px</div>
      </div>
    </div>
  </div>
));

MarqueeControls.displayName = 'MarqueeControls';

export default function ExamplesPage() {
  const [showLogoCode, setShowLogoCode] = useState(false);
  const [showProductCode, setShowProductCode] = useState(false);
  const [showPhotoCode, setShowPhotoCode] = useState(false);

  const [logoSettings, setLogoSettings] = useState<MarqueeSettings>({
    speed: 0.2,
    gap: 20,
    borderRadius: 8,
    width: 300,
    height: 200,
  });

  const [productSettings, setProductSettings] = useState<MarqueeSettings>({
    speed: 0.2,
    gap: 20,
    borderRadius: 8,
    width: 300,
    height: 200,
  });

  const [photoSettings, setPhotoSettings] = useState<MarqueeSettings>({
    speed: 0.2,
    gap: 20,
    borderRadius: 8,
    width: 300,
    height: 200,
  });

  const handleLogoSettingsChange = useCallback(
    (newSettings: MarqueeSettings) => setLogoSettings(newSettings),
    []
  );

  const handleProductSettingsChange = useCallback(
    (newSettings: MarqueeSettings) => setProductSettings(newSettings),
    []
  );

  const handlePhotoSettingsChange = useCallback(
    (newSettings: MarqueeSettings) => setPhotoSettings(newSettings),
    []
  );

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 max-w-6xl relative">
        {/* Header */}
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

          <MarqueeControls settings={logoSettings} onChange={handleLogoSettingsChange} />

          <div className="space-y-6">
            <div className="bg-transarent rounded-xl p-8 backdrop-blur-sm">
              <LogoMarquee settings={logoSettings} />
            </div>
            {showLogoCode && (
              <CodePreview
                code={`<MarqueeKit
  speed={${logoSettings.speed}}
  gap={${logoSettings.gap}}
  imageWidth={${logoSettings.width}}
  imageHeight={${logoSettings.height}}
  borderRadius={${logoSettings.borderRadius}}
>
  {logos.map((logo) => (
    <img
      key={logo.id}
      src={logo.src}
      alt={logo.alt}
    />
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

          <MarqueeControls settings={productSettings} onChange={handleProductSettingsChange} />

          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
              <ProductMarquee settings={productSettings} />
            </div>
            {showProductCode && (
              <CodePreview
                code={`<MarqueeKit
  speed={${productSettings.speed}}
  gap={${productSettings.gap}}
  imageWidth={${productSettings.width}}
  imageHeight={${productSettings.height}}
  borderRadius={${productSettings.borderRadius}}
>
  {products.map((product) => (
    <div key={product.id}>
      <img
        src={product.image}
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
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

          <MarqueeControls settings={photoSettings} onChange={handlePhotoSettingsChange} />

          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
              <PhotoMarquee settings={photoSettings} />
            </div>
            {showPhotoCode && (
              <CodePreview
                code={`<MarqueeKit
  speed={${photoSettings.speed}}
  gap={${photoSettings.gap}}
  imageWidth={${photoSettings.width}}
  imageHeight={${photoSettings.height}}
  borderRadius={${photoSettings.borderRadius}}
>
  {photos.map((photo) => (
    <div key={photo.id}>
      <img
        src={photo.image}
        alt={photo.caption}
      />
      <p>{photo.caption}</p>
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
              Keep image sizes consistent and optimize them for web. Use responsive sizing for
              different screen sizes.
            </p>
          </div>
          <div className="rounded-lg p-6 group">
            <h3 className="font-semibold mb-2">Customization</h3>
            <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">
              Adjust speed, direction, and spacing to match your design. Add hover effects for
              interactivity.
            </p>
          </div>
          <div className="rounded-lg p-6 group">
            <h3 className="font-semibold mb-2">Performance</h3>
            <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">
              MarqueeKit automatically handles image preloading and uses hardware acceleration for
              smooth scrolling.
            </p>
          </div>
          <div className="rounded-lg p-6 group">
            <h3 className="font-semibold mb-2">Accessibility</h3>
            <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">
              All examples include proper ARIA labels and can be paused for users who prefer reduced
              motion.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <section className="px-4 py-16 text-white relative overflow-hidden">
          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <h2 className="text-3xl font-bold mb-6">Want to add one to your site?</h2>
            <Link
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg px-6 py-3 bg-white text-black hover:bg-gray-100 transition-colors mr-4"
            >
              No
              <ArrowUpRight className="ml-2 h-4 w-4 inline-block" />
            </Link>
            <Link
              href="/pricing"
              className="inline-block rounded-lg px-6 py-3 bg-white text-black hover:bg-gray-100 transition-colors"
            >
              Yes
              <ArrowRight className="ml-2 h-4 w-4 inline-block" />
            </Link>
          </div>
        </section>


      </div>
    </div>
  );
}
