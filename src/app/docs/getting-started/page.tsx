'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, Terminal, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function GettingStartedContent() {
  const searchParams = useSearchParams();
  const [hasPurchased, setHasPurchased] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPurchase = async (sid: string) => {
      console.log('Verifying session:', sid);
      try {
        const response = await fetch(`/api/stripe/verify?session_id=${sid}`);
        const data = await response.json();
        
        console.log('Verification response:', data);
        
        if (data.valid) {
          setHasPurchased(true);
          setVerificationStatus('success');
          localStorage.setItem('marqueekit_session', JSON.stringify({
            id: sid,
            timestamp: Date.now()
          }));
        } else {
          setVerificationStatus('error');
          localStorage.removeItem('marqueekit_session');
        }
      } catch (error) {
        console.error('Error verifying purchase:', error);
        setVerificationStatus('error');
      }
    };

    if (sessionId) {
      verifyPurchase(sessionId);
      return;
    }

    try {
      const storedData = localStorage.getItem('marqueekit_session');
      if (storedData) {
        const { id, timestamp } = JSON.parse(storedData);
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          verifyPurchase(id);
          return;
        } else {
          localStorage.removeItem('marqueekit_session');
        }
      }
    } catch (error) {
      console.error('Error checking stored session:', error);
    }

    setVerificationStatus('error');
  }, [sessionId]);

  if (verificationStatus === 'loading') {
    return (
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Verifying Purchase...</h1>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200/20 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200/20 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Getting Started with MarqueeKit</h1>
        
        {hasPurchased ? (
          <div className="space-y-12">
            {/* Quick Installation */}
            <section className="space-y-6">
              <div className="bg-green-500/10 border border-green-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Installation</h2>
                <div className="space-y-4">
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                    npm install marqueekit
                  </div>
                  <p className="text-gray-600">
                    After installing, you can import and start using MarqueeKit in your project.
                  </p>
                </div>
              </div>
            </section>

            {/* Basic Usage */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Basic Usage</h2>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                {`import { MarqueeKit } from 'marqueekit'

export default function App() {
  return (
    <MarqueeKit>
      <img src="/image1.jpg" alt="Image 1" />
      <img src="/image2.jpg" alt="Image 2" />
      <img src="/image3.jpg" alt="Image 3" />
    </MarqueeKit>
  )
}`}
              </div>
            </section>

            {/* Next Steps */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Next Steps</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link 
                  href="/docs/configuration"
                  className="block p-6 rounded-xl border hover:border-gray-300 transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-2">Configuration Options</h3>
                  <p className="text-gray-600 mb-4">
                    Learn about all available configuration options and customization possibilities.
                  </p>
                  <span className="text-blue-500 inline-flex items-center">
                    View configuration <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>

                <Link 
                  href="/docs/examples"
                  className="block p-6 rounded-xl border hover:border-gray-300 transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-2">Examples</h3>
                  <p className="text-gray-600 mb-4">
                    Explore real-world examples and common use cases.
                  </p>
                  <span className="text-blue-500 inline-flex items-center">
                    View examples <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              </div>
            </section>

            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold mb-2">Development Mode Notice</h3>
                <p className="text-sm text-gray-600">
                  Session ID: {sessionId}<br />
                  Verification Status: {verificationStatus}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <section className="bg-blue-500/10 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Purchase Required</h2>
              <p className="text-gray-600 mb-6">
                To access the full documentation and start using MarqueeKit, you&apos;ll need to purchase a license.
              </p>
              <Link 
                href="/pricing"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Pricing Options
              </Link>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">What&apos;s Included</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Package className="h-5 w-5 text-blue-500 mt-0.5" />
                  <span>Full access to MarqueeKit component</span>
                </li>
                <li className="flex items-start gap-2">
                  <Terminal className="h-5 w-5 text-blue-500 mt-0.5" />
                  <span>Complete documentation and examples</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-blue-500 mt-0.5" />
                  <span>TypeScript support and type definitions</span>
                </li>
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

// Main component wrapped with Suspense
export default function GettingStartedPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8">Loading...</h1>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200/20 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200/20 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      }
    >
      <GettingStartedContent />
    </Suspense>
  );
}