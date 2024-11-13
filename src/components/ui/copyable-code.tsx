import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyableCodeProps {
  code: string;
  className?: string;
}

export function CopyableCode({ code, className = "" }: CopyableCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className={`bg-[#131313] rounded-lg p-4 font-mono text-sm text-gray-200 overflow-auto ${className}`}>
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
        aria-label="Copy code"
        title="Copy code"
      >
        {copied ? (
          <Check className="h-5 w-5 text-blue-500" />
        ) : (
          <Copy className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}