'use client';

import Link from 'next/link';
import { Github } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          MarqueeKit
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/docs" className="text-sm hover:text-gray-600">
            Docs
          </Link>
          <Link href="/examples" className="text-sm hover:text-gray-600">
            Examples
          </Link>
          <Link 
            href="/pricing" 
            className="text-sm text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Purchase
          </Link>
          <Link
            href="https://github.com/yourusername/marqueekit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            <Github size={20} />
          </Link>
        </nav>
      </div>
    </header>
  );
}