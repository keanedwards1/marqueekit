// src/app/docs/page.tsx

"use client";

import React, { useState } from "react";
import { Check, Terminal, Code, Copy, ArrowRight } from "lucide-react";
import Link from "next/link";
import Head from '../../components/Head';


interface CopyableCodeProps {
  code: string;
  className?: string;
}

function CopyableCode({ code, className = "" }: CopyableCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (

    <div className="relative">
      <pre
        className={`bg-[#282C34] rounded-lg p-4 font-mono text-sm text-gray-200 overflow-auto ${className}`}
      >
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
        aria-label="Copy code"
        title="Copy code"
      >
        {copied ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <Copy className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}

export default function DocsPage() {
  return (
    <>
      <Head
        title="MarqueeKit Documentation - Setup and Integration Guide"
        description="Get started with MarqueeKit using our comprehensive documentation. Find step-by-step guides, integration examples, and customization tips for creating seamless, responsive image marquees."
        url="https://marqueekit.com/docs"
        image="https://marqueekit.com/favicon-96x96.png"
        type="website"
        locale="en_US"
        author="Kean"
        keywords="MarqueeKit documentation, setup guide, image marquee integration, customizable marquee, developer documentation, web design tools, responsive marquee setup"
        themeColor="#ffffff"
        dateCreated="2024-01-01"
        dateModified="2024-01-15"
        siteName="MarqueeKit"
      />
      <div className="min-h-screen py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 max-w-4xl relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
            <p className="text-xl text-gray-400">
              Start building beautiful image marquees with MarqueeKit
            </p>
          </div>

          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 pr-4 rounded-full text-sm bg-blue-500/10 border border-blue-500/20">
              <Code className="h-4 w-4 text-blue-500" />
              <span className="font-medium">HTML/CSS/JS</span>
              {/*             <span className="text-gray-600">•</span>
            <span className="text-gray-600">React Version Coming Soon</span> */}
            </span>
          </div>

          <div className="space-y-12">
            {/* File Structure Setup */}
            <section className="space-y-6">
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black backdrop-blur-sm">
                <p className="text-gray-100 mb-4 text-xl">
                  Getting Started with MarqueeKit:
                </p>
                <p className="text-gray-300 mb-4">
                  Follow these steps after downloading MarqueeKit:
                </p>
                <ol className="list-decimal ml-6 text-gray-300">
                  <li>Unzip the marqueeKit.zip</li>
                  <li>Open the folder in your preferred code editor.</li>
                  <li>
                    Open <code>START_HERE.md</code>, and follow it&apos;s
                    Quick Start instructions.
                  </li>
                </ol>
              </div>
            </section>

            <section className="space-y-6">
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black backdrop-blur-sm">
                <p className="text-gray-300 mb-4">
                  First, organize your project files as follows:{" "}
                </p>
                <CopyableCode
                  code={`📂 your-project
 ┣ 📂 css
 ┃ ┗ 📜 marquee.css
 ┣ 📂 js
 ┃ ┗ 📜 marquee.js
 ┣ 📂 images
 ┃ ┣ 🖼️ image1.jpg
 ┃ ┣ 🖼️ image2.jpg
 ┃ ┗ 🖼️ image3.jpg
 ┗ 📜 index.html`}
                />
              </div>
            </section>

            {/* HTML Setup */}
            <section className="space-y-6">
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6">2. HTML Setup</h2>
                <p className="text-gray-300 mb-4">
                  Add these lines to your HTML file:
                </p>
                <CopyableCode
                  code={`<!-- In your <head> section -->
<link rel="stylesheet" href="/css/marquee.css">

<!-- In your <body> section -->
<div id="my-marquee"></div>

<!-- Before closing </body> -->
<script src="/js/marquee.js"></script>`}
                />
              </div>
            </section>

            {/* JavaScript Initialization */}
            <section className="space-y-6">
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/5 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6">
                  3. Initialize MarqueeKit
                </h2>
                <p className="text-gray-300 mb-4">
                  Add this script to initialize your marquee:
                </p>
                <CopyableCode
                  code={`<!-- After other scripts -->

<script>
  new MarqueeKit("#my-marquee", {
    images: [
      "/images/image1.jpg",
      "/images/image2.jpg",
      "/images/image3.jpg"
    ],
    height: 300,
    imageWidth: 250,
    speed: 50,
    gap: 20,
    reverse: false,
    pauseOnHover: true,
    imageScale: 1.05,
    borderRadius: 8
  });
</script>

`}
                />
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-200/20 rounded-lg">
                  <h3 className="font-semibold mb-2">💡 Pro Tip</h3>
                  <p className="text-gray-400">
                    Use a live server to preview your marquee in real-time. If
                    you&apos;re using VS Code, install the &quot;Live Server&quot;
                    extension for the best development experience.
                  </p>
                </div>
              </div>
            </section>

            {/* Configuration Overview */}
            <section className="space-y-6">
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6">
                  4. Basic Configuration Options
                </h2>
                <div className="grid gap-4">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Required Options</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        <code className="text-blue-400">images</code>: Array of
                        image paths
                      </li>
                      <li>
                        <code className="text-blue-400">height</code>: Marquee
                        height in pixels
                      </li>
                      <li>
                        <code className="text-blue-400">imageWidth</code>: Width
                        of each image in pixels
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Optional Settings</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        <code className="text-blue-400">speed</code>: Scroll speed
                        (default: 50)
                      </li>
                      <li>
                        <code className="text-blue-400">gap</code>: Space between
                        images (default: 20)
                      </li>
                      <li>
                        <code className="text-blue-400">reverse</code>: Scroll
                        direction (default: false)
                      </li>
                      <li>
                        <code className="text-blue-400">pauseOnHover</code>: Pause
                        on mouse hover (default: false)
                      </li>
                      <li>
                        <code className="text-blue-400">imageScale</code>: Hover
                        zoom factor (default: 1)
                      </li>
                      <li>
                        <code className="text-blue-400">borderRadius</code>: Image
                        corner radius (default: 8)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section className="grid md:grid-cols-2 gap-8">
              <Link
                href="/docs/configuration"
                className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-3">
                  <Code className="h-6 w-6 text-blue-500" />
                  Advanced Configuration
                </h3>
                <p className="text-gray-400 mb-4 group-hover:text-gray-300">
                  Explore all available options and customization possibilities.
                </p>
                <span className="text-blue-500 group-hover:text-blue-400 inline-flex items-center">
                  View Options <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>

              <Link
                href="/docs/examples"
                className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-3">
                  <Terminal className="h-6 w-6 text-blue-500" />
                  Examples
                </h3>
                <p className="text-gray-400 mb-4 group-hover:text-gray-300">
                  Browse through real-world examples and common use cases.
                </p>
                <span className="text-blue-500 group-hover:text-blue-400 inline-flex items-center">
                  View Examples <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
