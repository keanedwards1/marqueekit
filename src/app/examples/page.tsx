'use client';

import React, { useState, useCallback } from "react";
import { LogoMarquee } from "@/components/demo/logo-marquee";
import { ProductMarquee } from "@/components/demo/product-marquee";
import { PhotoMarquee } from "@/components/demo/photo-marquee";
import { CodePreview } from "@/components/ui/code-preview";
import Link from 'next/link';
import { ArrowRight, Sliders, XCircle } from 'lucide-react';

interface MarqueeSettings {
  speed: number;
  gap: number;
  borderRadius: number;
  width: number;
  height: number;
  uniformSize?: boolean;
}

interface MarqueeControlsProps {
  settings: MarqueeSettings;
  onChange: (settings: MarqueeSettings) => void;
  showSizeMode?: boolean;
}

const MarqueeControls: React.FC<MarqueeControlsProps> = React.memo(({ settings, onChange, showSizeMode }) => (
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
          max="100"
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
          min="4"
          max="60"
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
          max="60"
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
          min="50"
          max="600"
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
          min="50"
          max="300"
          step="1"
          value={settings.height}
          onChange={(e) => onChange({ ...settings, height: Number(e.target.value) })}
          className="w-full cursor-pointer accent-blue-500 rounded-lg appearance-none h-2 bg-gray-200"
        />
        <div className="text-xs text-gray-500">{settings.height}px</div>
      </div>

      {/* Size Mode - Only shown for photo marquee */}
      {showSizeMode && (
      <div className="space-y-2 col-span-2 md:col-span-3 lg:col-span-5">
        <div className="flex items-center gap-3">
         <div className="relative cursor-pointer ">
            <div 
              className={` w-10 h-5 rounded-full transition-colors duration-200 ease-in-out ${
                settings.uniformSize ? 'bg-blue-500' : 'bg-white'
              }`}
              onClick={() => onChange({ ...settings, uniformSize: !settings.uniformSize })}
              role="switch"
              aria-checked={settings.uniformSize}
              tabIndex={0}
            >
              <div
                className={`absolute left-0.5 top-0.5 w-4 h-4  rounded-full  shadow transform transition-transform duration-200 ease-in-out ${
                  settings.uniformSize ? 'translate-x-5 bg-white' : 'translate-x-0 bg-gray-300'
                }`}
              />
            </div>
          </div>
          <span className="text-sm text-gray-600">
            {settings.uniformSize ? 'Uniform Sizes' : 'Mixed Sizes'}
          </span>
        </div>
      </div>
    )}
    </div>
  </div>
));

MarqueeControls.displayName = 'MarqueeControls';

export default function ExamplesPage() {
  const [showLogoCode, setShowLogoCode] = useState(false);
  const [showProductCode, setShowProductCode] = useState(false);
  const [showPhotoCode, setShowPhotoCode] = useState(false);

  const [logoSettings, setLogoSettings] = useState<MarqueeSettings>({
    speed: 1,
    gap: 20,
    borderRadius: 8,
    width: 200,
    height: 120,
    uniformSize: false,
  });

  const [productSettings, setProductSettings] = useState<MarqueeSettings>({
    speed: 1,
    gap: 20,
    borderRadius: 8,
    width: 300,
    height: 200,
    uniformSize: false,
  });

  const [photoSettings, setPhotoSettings] = useState<MarqueeSettings>({
    speed: 1,
    gap: 20,
    borderRadius: 8,
    width: 300,
    height: 200,
    uniformSize: false,
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

          <MarqueeControls 
            settings={logoSettings} 
            onChange={handleLogoSettingsChange}
          />

          <div className="space-y-6">
            <div className="bg-transparent rounded-xl p-8 backdrop-blur-sm">
              <LogoMarquee settings={logoSettings} />
            </div>
            {showLogoCode && (
              <CodePreview
                code={`<script>

    const images1 = [
        "images/image1.webp",
        "images/image2.webp", 
        "images/image3.webp",
        "images/image4.webp",
    ];

    new MarqueeKit("#logo-wall", {
                images: images1,
                height: ${logoSettings.height},   
                imageWidth: ${logoSettings.width},     
                speed: ${logoSettings.speed},        
                gap: ${logoSettings.gap}, 
                reverse: false,
                imageScale: 1,
                pauseOnHover: false,
                borderRadius: ${logoSettings.borderRadius}        
    });

</script>`}
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

          <MarqueeControls 
            settings={productSettings} 
            onChange={handleProductSettingsChange}
          />

          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
              <ProductMarquee settings={productSettings} />
            </div>
            {showProductCode && (
              <CodePreview
                code={`        
<script>

    const images1 = [
        "images/image1.webp",
        "images/image2.webp", 
        "images/image3.webp",
        "images/image4.webp",
    ];

    new MarqueeKit("#product-showcase", {
                images: images1,
                height: ${productSettings.height},   
                imageWidth: ${productSettings.width},     
                speed: ${productSettings.speed},        
                gap: ${productSettings.gap}, 
                reverse: false,
                imageScale: 1,
                pauseOnHover: false,
                borderRadius: ${productSettings.borderRadius}        
    });

</script>
`}
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

          <MarqueeControls 
            settings={photoSettings} 
            onChange={handlePhotoSettingsChange}
            showSizeMode={true}
          />

          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
              <PhotoMarquee settings={photoSettings} />
            </div>
            {showPhotoCode && (
              <CodePreview
                code={`<script>

    const images1 = [
        "images/image1.webp",
        "images/image2.webp", 
        "images/image3.webp",
        "images/image4.webp",
    ];

    new MarqueeKit("#photo-gallery", {
                images: images1,
                height: ${photoSettings.height},   
                imageWidth: ${photoSettings.width},     
                speed: ${photoSettings.speed},        
                gap: ${photoSettings.gap}, 
                reverse: false,
                imageScale: 1,
                pauseOnHover: false,
                borderRadius: ${photoSettings.borderRadius}        
    });

</script>`}
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
              rel="noopener noreferrer"
              className="inline-block rounded-lg px-6 py-3 bg-white text-black hover:bg-gray-100 transition-colors mr-4"
              >
               <XCircle className="-ml-2 mr-2 h-4 w-4 inline-block" />
                No
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