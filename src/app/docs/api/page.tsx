'use client';

export default function ApiReferencePage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">API Reference</h1>
        
        <div className="space-y-12">
          {/* Core Component API */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">MarqueeKit Component</h2>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border">
              <h3 className="font-semibold mb-4">Props</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Prop</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Default</th>
                    <th className="pb-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 font-mono text-sm">speed</td>
                    <td className="py-2 font-mono text-sm">number</td>
                    <td className="py-2 font-mono text-sm">1</td>
                    <td className="py-2 text-gray-600">Animation speed multiplier</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-sm">direction</td>
                    <td className="py-2 font-mono text-sm">&apos;left&apos; | &apos;right&apos;</td>
                    <td className="py-2 font-mono text-sm">&apos;left&apos;</td>
                    <td className="py-2 text-gray-600">Scroll direction</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-sm">pauseOnHover</td>
                    <td className="py-2 font-mono text-sm">boolean</td>
                    <td className="py-2 font-mono text-sm">false</td>
                    <td className="py-2 text-gray-600">Pause on mouse hover</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-sm">className</td>
                    <td className="py-2 font-mono text-sm">string</td>
                    <td className="py-2 font-mono text-sm">undefined</td>
                    <td className="py-2 text-gray-600">Additional CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Event Handlers */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Event Handlers</h2>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Event</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 font-mono text-sm">onPause</td>
                    <td className="py-2 font-mono text-sm">() =&gt; void</td>
                    <td className="py-2 text-gray-600">Called when animation pauses</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-sm">onResume</td>
                    <td className="py-2 font-mono text-sm">() =&gt; void</td>
                    <td className="py-2 text-gray-600">Called when animation resumes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}