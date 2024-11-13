// src/components/ui/code-preview.tsx

'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Braces } from 'lucide-react';

interface CodePreviewProps {
  code: string;
  type?: 'html' | 'js' | 'css';
  fileName?: string;
}

export function CodePreview({ code, type = 'js', fileName }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getLanguageLabel = () => {
    switch (type) {
      case 'html':
        return 'HTML';
      case 'css':
        return 'CSS';
      case 'js':
        return 'JavaScript';
      default:
        return 'Code';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'html':
        return <Code2 size={14} className="text-orange-400" />;
      case 'css':
        return <Code2 size={14} className="text-blue-400" />;
      case 'js':
        return <Braces size={14} className="text-yellow-400" />;
      default:
        return <Code2 size={14} />;
    }
  };

  return (
    <div className="rounded-lg bg-[#1E1E1E] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#3E3E42]">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="text-sm text-gray-400">
            {fileName || getLanguageLabel()}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-sm px-2 py-1 rounded hover:bg-white/5 transition-colors text-gray-400 hover:text-gray-300"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm">
        <pre className="text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}