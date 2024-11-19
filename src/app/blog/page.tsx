// src/app/blog/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Tag, User } from 'lucide-react';
import { SAMPLE_POSTS } from '@/data/blog-posts';

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <div className="relative">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"
          aria-hidden="true"
        />
        
        <div className="relative px-4 pt-20 pb-16">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Blog & Updates
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Insights, tutorials, and updates from the MarqueeKit team
            </p>
            
            <div className="grid gap-8 md:grid-cols-2">
              {SAMPLE_POSTS.map((post) => (
                <Link 
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group relative bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                >
                  {post.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readingTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 mb-4">
                      {post.description}
                    </p>
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-500/10 border border-blue-500/20"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}