// src/app/pricing/page.tsx

'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';
import { getStripe } from '@/lib/stripe';

export default function PricingPage() {

  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: 'standard' | 'pro') => {
    try {
      setLoading(priceId);
      
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) throw new Error(error);

      const stripe = await getStripe();
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId,
      });

      if (stripeError) throw stripeError;

    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };


  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Decorative grid background */}
      <div 
className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"
aria-hidden="true"
      />
      
      {/* Glow effect */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 max-w-5xl relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-600">
            One-time payment, lifetime updates, no subscription needed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard License */}
          <div className="rounded-xl border bg-white p-8 shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-black mb-4">Standard</h3>
              <div className="mb-6">
                <span className="text-4xl text-black font-bold">$49</span>
                <span className="text-gray-900 ml-2">one-time</span>
              </div>
              <ul className="space-y-4 mb-8 text-gray-900">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Single project use</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Core marquee functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Basic documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Email support</span>
                </li>
              </ul>
    <button 
      onClick={() => handleCheckout('standard')}
      disabled={loading === 'standard'}
      className="w-full py-3 px-4 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-75"
    >
      {loading === 'standard' ? 'Loading...' : 'Purchase Standard'}
    </button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent" aria-hidden="true" />
          </div>

          {/* Pro License */}
          <div className="rounded-xl border p-8 bg-black text-white shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff11_1px,transparent_1px),linear-gradient(to_bottom,#ffffff11_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$149</span>
                <span className="text-gray-300 ml-2">one-time</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Unlimited projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Source code access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Premium templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Commercial use</span>
                </li>
              </ul>
              <button 
      onClick={() => handleCheckout('pro')}
      disabled={loading === 'pro'}
      className="w-full py-3 px-4 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors disabled:opacity-75"
    >
      {loading === 'pro' ? 'Loading...' : 'Purchase Pro'}
    </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 relative z-10">
  <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
  <div className="grid md:grid-cols-2 gap-8">
    <div className="rounded-lg p-6 group">
      <h3 className="font-semibold mb-2">What&apos;s included in the price?</h3>
      <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">One-time payment includes the component, lifetime updates, and support based on your license type. No hidden fees or subscriptions.</p>
    </div>
    <div className="rounded-lg p-6 group">
      <h3 className="font-semibold mb-2">Can I use it in commercial projects?</h3>
      <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">The Pro license includes commercial use rights. Standard license is limited to one personal or commercial project.</p>
    </div>
    <div className="rounded-lg p-6 group">
      <h3 className="font-semibold mb-2">What if I need help?</h3>
      <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">Both licenses include email support. Pro license users get priority support with faster response times.</p>
    </div>
    <div className="rounded-lg p-6 group">
      <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
      <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">Yes, if you&apos;re not satisfied, we offer a 14-day money-back guarantee. No questions asked.</p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}