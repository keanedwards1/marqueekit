
  // src/app/blog/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { Clock, Tag, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { SAMPLE_POSTS } from '@/data/blog-posts';
import { BlogContent } from '@/components/blog/blog-content';


async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return SAMPLE_POSTS.find(post => post.slug === slug) || null;
}

export default async function BlogPostPage({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"
          aria-hidden="true"
        />
        
        <div className="relative px-4 pt-20 pb-16">
          <div className="container mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
            {post.image && (
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="flex gap-4 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {post.title}
            </h1>
            
            <div className="flex gap-2 mb-8">
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
            
            <BlogContent content={post.content} />
          </div>
        </div>
      </div>
    </div>
  );
}