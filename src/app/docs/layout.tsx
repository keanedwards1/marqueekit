// src/app/docs/layout.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

  const navItems = [
    {
      title: "Getting Started",
      links: [
        { 
          href: "/docs", 
          label: "Introduction",
          content: "Get started with MarqueeKit. Learn about installation, basic usage, and core concepts."
        },
        { 
          href: "/docs/installation", 
          label: "Installation",
          content: "Learn how to install and set up MarqueeKit in your project after purchase. Includes requirements and basic setup instructions."
        },
        { 
          href: "/docs/configuration", 
          label: "Configuration",
          content: "Explore all configuration options including speed, direction, pause behavior, and styling options."
        },
      ]
    },
    {
      title: "Guides",
      links: [
        { 
          href: "/docs/examples", 
          label: "Examples",
          content: "Real-world examples including logo walls, product galleries, and photo streams."
        },
        { 
          href: "/docs/api", 
          label: "API Reference",
          content: "Complete API documentation including all props, events, and TypeScript definitions."
        },
      ]
    }
  ];
  

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  // Simple search filter
  const filteredNavItems = navItems.map(section => ({
    ...section,
    links: section.links.filter(link => 
      link.label.toLowerCase().includes(search.toLowerCase()) ||
      link.content.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(section => section.links.length > 0);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 border-r min-h-screen p-6 hidden md:block">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search docs..."
              className="w-full pl-9 pr-4 py-2 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <nav className="space-y-6">
          {filteredNavItems.map((section, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-2 text-sm text-gray-400">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block py-1 px-2 rounded text-sm ${
                        pathname === link.href
                          ? "bg-blue-500/10 text-blue-500"
                          : "text-gray-600 hover:text-gray-300 transition duration-200"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}