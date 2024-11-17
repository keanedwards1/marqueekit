'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-800 bg-black/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - pushed to the left */}
          <Link href="/" className="font-bold text-2xl text-white tracking-tight">
            MarqueeKit
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-400 hover:text-gray-200 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
                <Menu size={24} />
              </span>
              <span className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
                <X size={24} />
              </span>
            </div>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center space-x-6 ml-12">
              <Link 
                href="/docs" 
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-300"
              >
                Docs
              </Link>
              <Link
                href="/blog"
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-300"
              >
                Blogs
              </Link>
              <Link 
                href="/examples" 
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-300"
              >
                Examples
              </Link>
              <Link 
                href="/pricing" 
                className="rounded-lg px-5 py-2.5 border text-sm border-gray-200 hover:border-gray-300 hover:bg-white hover:text-black transition-all duration-300"
              >
                Pricing
              </Link>
            </div>
          </nav>
        </div>

        {/* Mobile navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/docs" 
                className="text-sm text-gray-400 hover:text-gray-200 transition-all duration-300 transform hover:translate-x-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Docs
              </Link>
              <Link 
                href="/blog" 
                className="text-sm text-gray-400 hover:text-gray-200 transition-all duration-300 transform hover:translate-x-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link 
                href="/examples" 
                className="text-sm text-gray-400 hover:text-gray-200 transition-all duration-300 transform hover:translate-x-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Examples
              </Link>
              <div className="flex">
                <Link 
                  href="/pricing" 
                  className="text-sm text-gray-400 hover:text-gray-200 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="rounded-lg px-5 py-2.5 border border-gray-200 hover:border-gray-300 hover:bg-white hover:text-black transition-all duration-300 inline-block transform hover:translate-x-1">
                    Pricing
                  </span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}