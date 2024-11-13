// src/app/pricing/page.tsx

"use client";

import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import { getStripe } from "@/lib/stripe";

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCheckout = async (priceId: "standard" | "pro") => {
    try {
      setLoading(priceId);
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });
      const { sessionId, error } = await response.json();
      if (error) throw new Error(error);
      const stripe = await getStripe();
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId,
      });
      if (stripeError) throw stripeError;
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Decorative grid background */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)] transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Glow effect */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-blue-500/10 blur-3xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 max-w-5xl relative">
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}>
          <h1 className="text-4xl font-bold mb-4">Simple Pricing</h1>
          <p className="text-xl text-gray-600">
            One-time payment, lifetime updates, no subscription needed.
          </p>
        </div>

        {/* Pricing Cards Container */}
        <div className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto transition-all duration-1000 ease-int-out delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}>
          {/* Standard License */}
          <div className="rounded-xl border bg-white backdrop-blur-sm p-8 shadow-sm relative overflow-hidden flex flex-col transition-all duration-500 hover:shadow-md group">
            <div className="absolute inset-0 bg-white" />
            <div className="relative z-10 flex-grow">
              <h3 className="text-2xl font-bold text-black mb-4 transition-transform duration-500 ease-in-out">Standard</h3>
              <div className="mb-6 transition-transform duration-500 ease-in-out">
                <span className="text-4xl text-black font-bold">$49</span>
                <span className="text-gray-900 ml-2">one-time</span>
              </div>
              {/* Standard plan content... */}
              <ul className="space-y-4 mb-8 text-gray-900">
                <li className="flex items-start gap-2 transition-transform duration-500 ease-out">
                  <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Single project use</span>
                </li>
                <li className="flex items-start gap-2 transition-transform duration-500 ease-out">
                  <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Core marquee functionality</span>
                </li>
                <li className="flex items-start gap-2 transition-transform duration-500 ease-out">
                  <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Basic documentation</span>
                </li>
                <li className="flex items-start gap-2 transition-transform duration-500 ease-out">
                  <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Email support</span>
                </li>
                <li className="flex items-start gap-2 transition-transform duration-500 ease-out">
                  <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Full Refund</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleCheckout("standard")}
              disabled={loading === "standard"}
              className="w-full py-3 px-4 rounded-lg bg-black text-white group-hover:text-black transition-all duration-500 ease-out disabled:opacity-75 mt-auto relative overflow-hidden group/button"
            >
              <span className="relative z-10">
                {loading === "standard" ? "Loading..." : "Purchase Standard"}
              </span>
              <div className="absolute inset-0 bg-black group-hover:bg-white duration-300 border-2 rounded-lg border-gray-900" /> 
              </button>
          </div>

          {/* Pro License */}
          <div className="rounded-xl border p-8 bg-transparent text-white shadow-sm relative overflow-hidden group transition-all duration-500 hover:shadow-md">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 transition-transform duration-500 ease-out">Pro</h3>
              <div className="mb-6 transition-transform duration-500 ease-out">
                <span className="text-4xl font-bold">$149</span>
                <span className="text-gray-300 ml-2">one-time</span>
              </div>
              {/* Pro plan content... */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-2 transition-transform duration-500 ease-out">
                  <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Unlimited projects</span>
                </li>
                <li className="flex items-start gap-2 transition-transform duration-500 ease-out">
                  <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Source code access</span>
                </li>
                <li className="flex items-start gap-2 transition-transform duration-500 ease-out">
                  <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Premium templates</span>
                </li>
                <li className="flex items-start gap-2 transition-transform duration-500 ease-out">
                  <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2 transition-transform duration-500 ease-out">
                  <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Commercial use</span>
                </li>
              </ul>
{/*               <button
                onClick={() => handleCheckout("pro")}
                disabled={loading === "pro"} 
                className="w-full py-3 px-4 rounded-lg bg-white text-white group-hover:text-black transition-all duration-500 ease-out disabled:opacity-75 relative overflow-hidden group/button"
              >
                <span className="relative z-10">
                  {loading === "pro" ? "Loading..." : "Purchase Pro"}
                </span>
                <div className="absolute inset-0 bg-black group-hover:bg-white duration-300 border rounded-lg border-gray-200" />              
              </button> */}
              <button
                disabled
                className="w-full py-3 px-4 rounded-lg bg-white text-white group-hover:text-black transition-all duration-500 ease-out disabled:opacity-75 relative overflow-hidden group/button cursor-pointer"
              >
                <span className="relative z-10">Coming Soon</span>
                <div className="absolute inset-0 bg-black group-hover:bg-white duration-300 border rounded-lg border-gray-200" />              
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={`mt-20 relative z-10 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* FAQ content... */}
            <div className="rounded-lg p-6 group">
              <h3 className="font-semibold mb-2">
                What&apos;s included in the price?
              </h3>
              <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">
                One-time payment includes the component, lifetime updates, and
                support based on your license type. No hidden fees or
                subscriptions.
              </p>
            </div>
            <div className="rounded-lg p-6 group">
              <h3 className="font-semibold mb-2">
                Can I use it in commercial projects?
              </h3>
              <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">
                The Pro license includes commercial use rights. Standard license
                is limited to one personal or commercial project.
              </p>
            </div>
            <div className="rounded-lg p-6 group">
              <h3 className="font-semibold mb-2">What if I need help?</h3>
              <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">
                Both licenses include email support. Pro license users get
                priority support with faster response times.
              </p>
            </div>
            <div className="rounded-lg p-6 group">
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-400">
                Yes, if you&apos;re not satisfied, we offer a 14-day money-back
                guarantee. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}