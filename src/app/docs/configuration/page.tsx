// src/app/docs/configuration/page.tsx

'use client';

/* import { Settings } from 'lucide-react';
 */
export default function ConfigurationPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Configuration</h1>
        
        <div className="space-y-12">
          {/* Props Overview */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Available Props</h2>
            
            <div className="grid gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border">
                <h3 className="font-semibold mb-2">speed: number</h3>
                <p className="text-gray-600 mb-4">Controls the scrolling speed of the marquee.</p>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                  {`<MarqueeKit speed={1.5} /> // 1.5x default speed
<MarqueeKit speed={0.5} /> // Half speed`}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border">
                <h3 className="font-semibold mb-2">direction: &apos;left&apos; | &apos;right&apos;</h3>
                <p className="text-gray-600 mb-4">Sets the scrolling direction.</p>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                  {`<MarqueeKit direction="right" /> // Scroll right
<MarqueeKit direction="left" /> // Scroll left (default)`}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border">
                <h3 className="font-semibold mb-2">pauseOnHover: boolean</h3>
                <p className="text-gray-600 mb-4">Pauses the animation when mouse hovers over.</p>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                  {`<MarqueeKit pauseOnHover /> // Pause on hover
<MarqueeKit pauseOnHover={false} /> // Don't pause`}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border">
                <h3 className="font-semibold mb-2">className: string</h3>
                <p className="text-gray-600 mb-4">Additional CSS classes to apply to the container.</p>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                  {`<MarqueeKit className="my-8 bg-gray-100" />`}
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Configuration */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Advanced Configuration</h2>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border">
              <h3 className="font-semibold mb-4">Complete Example</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                {`<MarqueeKit
  speed={1.5}
  direction="left"
  pauseOnHover
  className="my-8"
  onPause={() => console.log('Paused')}
  onResume={() => console.log('Resumed')}
>
  {/* Your content */}
</MarqueeKit>`}
              </div>
            </div>
          </section>

          {/* Responsive Behavior */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Responsive Behavior</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border">
              <p className="text-gray-600 mb-4">
                MarqueeKit automatically adapts to its container width and adjusts the scrolling behavior accordingly. 
                You can customize the responsive behavior using CSS classes.
              </p>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                {`<MarqueeKit className="
  md:gap-8        // Larger gap on medium screens
  lg:gap-12       // Even larger gap on large screens
  xl:gap-16       // Maximum gap on extra large screens
" />`}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}