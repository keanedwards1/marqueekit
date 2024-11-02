'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';

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
              <p className="text-gray-600 mb-4">
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

          {/* Installation */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Installation</h2>
            <p className="text-gray-600 mb-4">
              After purchasing, you&apos;ll receive a download link with the component files and installation instructions.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
              {`// Add to your project
import { MarqueeKit } from './marqueekit'

// Use in your component
export default function App() {
  return (
    <MarqueeKit>
      {/* Your content here */}
    </MarqueeKit>
  )
}`}
            </div>
          </section>

          {/* Requirements */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <span>React 16.8+ (for hooks support)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Modern browser with CSS transforms support</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}