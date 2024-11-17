// src/components/blog/blog-content.tsx
'use client';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { CodePreview } from '@/components/ui/code-preview';

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!contentRef.current) return;

    const container = contentRef.current;
    
    // Process all code blocks
    const codeBlocks = container.getElementsByTagName('pre');
    Array.from(codeBlocks).forEach((preElement) => {
      const codeElement = preElement.querySelector('code');
      if (codeElement) {
        const code = codeElement.textContent || '';
        
        let language = 'js';
        if (code.includes('<!DOCTYPE html') || code.includes('<html') || code.match(/<\w+>/)) {
          language = 'html';
        } else if (code.includes('{') && code.includes('}') && !code.includes('import')) {
          language = 'css';
        }
        
        const wrapper = document.createElement('div');
        wrapper.className = 'my-8'; // Increased margin for better spacing
        const root = createRoot(wrapper);
        root.render(
          <CodePreview 
            code={code.trim()} 
            type={language as 'html' | 'js' | 'css'} 
          />
        );
        
        preElement.parentNode?.replaceChild(wrapper, preElement);
      }
    });
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className="
        prose prose-invert max-w-none
        
        /* Headings */
        prose-headings:font-semibold
        prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
        prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
        
        /* Paragraphs */
        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
        
        /* Lists */
        prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
        prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
        prose-li:text-gray-300 prose-li:mb-2
        prose-li:marker:text-blue-400
        
        /* Blockquotes */
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500/50
        prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:my-6
        prose-blockquote:text-gray-300 prose-blockquote:italic
        
        /* Links */
        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        
        /* Inline Code */
        prose-code:text-blue-300 prose-code:bg-blue-500/10
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
        prose-code:before:content-[''] prose-code:after:content-['']
        
        /* Strong/Bold */
        prose-strong:text-gray-200 prose-strong:font-semibold
        
        /* Tables */
        prose-table:my-8
        prose-th:text-gray-300 prose-th:font-semibold prose-th:p-3 prose-th:bg-white/5
        prose-td:text-gray-400 prose-td:p-3
        prose-tr:border-b prose-tr:border-white/10
        
        /* Images */
        prose-img:rounded-lg prose-img:my-8 prose-img:shadow-lg
        
        /* Custom spacing for different elements */
        [&>*:first-child]:mt-0
        [&>*:last-child]:mb-0
      "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}