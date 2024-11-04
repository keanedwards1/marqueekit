'use client';

import Link from 'next/link';
// import { Github } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-black/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold text-2xl text-white tracking-tight">
          MarqueeKit
        </Link>

        <nav className="flex items-center gap-8">
          <Link href="/docs" className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200">
            Docs
          </Link>
          <Link href="/examples" className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200">
            Examples
          </Link>
          <Link 
            href="/pricing" 
            className="rounded-lg px-6 py-3 border text-sm border-gray-200 hover:border-gray-300 hover:bg-white hover:text-black transition-colors"
          >
            Purchase
          </Link>
          {/* Uncomment the following section to re-enable the GitHub link */}
          {/* <Link
            href="https://github.com/yourusername/marqueekit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
          >
            <Github size={20} />
          </Link> */}
        </nav>
      </div>
    </header>
  );
}
