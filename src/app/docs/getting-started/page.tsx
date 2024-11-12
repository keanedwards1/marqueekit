// src/app/docs/getting-started/page.tsx

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Check,
  Terminal,
  Package,
  ArrowRight,
  Code,
  Folder,
  Settings,
  Layout,
  Copy,
  Play,
  Server,
} from 'lucide-react';
import Link from 'next/link';

function GettingStartedContent() {
  const searchParams = useSearchParams();
  const [hasPurchased, setHasPurchased] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    'loading' | 'success' | 'error'
  >('loading');
  const sessionId = searchParams.get('session_id');

  const [instructionType, setInstructionType] = useState('Standard React JS');

  const instructionTypes = [
    'Standard React JS',
    'Standard HTML JS',
    'Standard React TS',
    'Pro React JS',
    'Pro HTML JS',
    'Pro React TS',
  ];

  useEffect(() => {
    const verifyPurchase = async (sid: string) => {
      try {
        const response = await fetch(`/api/stripe/verify?session_id=${sid}`);
        const data = await response.json();

        if (data.valid) {
          setHasPurchased(true);
          setVerificationStatus('success');
          localStorage.setItem(
            'marqueekit_session',
            JSON.stringify({
              id: sid,
              timestamp: Date.now(),
            })
          );
        } else {
          setVerificationStatus('error');
          localStorage.removeItem('marqueekit_session');
        }
      } catch (error) {
        console.error('Error verifying purchase:', error);
        setVerificationStatus('error');
      }
    };

    if (sessionId) {
      verifyPurchase(sessionId);
      return;
    }

    try {
      const storedData = localStorage.getItem('marqueekit_session');
      if (storedData) {
        const { id, timestamp } = JSON.parse(storedData);
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          verifyPurchase(id);
          return;
        } else {
          localStorage.removeItem('marqueekit_session');
        }
      }
    } catch (error) {
      console.error('Error checking stored session:', error);
    }

    setVerificationStatus('error');
  }, [sessionId]);

  const [copiedCode, setCopiedCode] = useState('');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => {
      setCopiedCode('');
    }, 2000);
  };

  function renderInstructions() {
    switch (instructionType) {
      case 'Standard React JS':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Getting Started with Standard React JS
            </h2>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Folder className="h-6 w-6 text-blue-500 mr-2" />
                  Step 1: Open the Project Folder
                </h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200">
                  Begin by navigating to the{' '}
                  <code className="bg-gray-800 px-1 rounded">React_With_Javascript</code>{' '}
                  folder in your preferred code editor (e.g., VS Code).
                </p>
              </div>
              {/* Step 2 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Terminal className="h-6 w-6 text-blue-500 mr-2" />
                  Step 2: Install Dependencies
                </h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200">
                  Open your terminal, navigate to the project directory, and run the following command:
                </p>
                <div className="relative">
                  <pre className="bg-[#282C34] rounded-lg p-4 font-mono text-sm text-gray-200 overflow-auto">
                    <code>npm install</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('npm install')}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    aria-label="Copy command"
                    title="Copy command"
                  >
                    {copiedCode === 'npm install' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Note: It&apos;s normal to see warnings during installation.
                </p>
              </div>
              {/* Step 3 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Play className="h-6 w-6 text-blue-500 mr-2" />
                  Step 3: Start the Development Server
                </h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200">
                  Run the following command to launch the development server:
                </p>
                <div className="relative">
                  <pre className="bg-[#282C34] rounded-lg p-4 font-mono text-sm text-gray-200 overflow-auto">
                    <code>npm start</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('npm start')}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    aria-label="Copy command"
                    title="Copy command"
                  >
                    {copiedCode === 'npm start' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-gray-300 mt-4 group-hover:text-gray-200">
                  This should automatically open the app in your browser. If it doesn&apos;t, or if you encounter any issues, please{' '}
                  <Link href="/contact" className="text-blue-400 underline">
                    contact us
                  </Link>{' '}
                  for assistance.
                </p>
              </div>
              {/* Step 4 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Code className="h-6 w-6 text-blue-500 mr-2" />
                  Step 4: Integrate the Code
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200">
                  Explore the working marquees in the project. You can now copy and integrate the relevant code into your own application to start using MarqueeKit.
                </p>
              </div>
            </div>
          </div>
        );
      case 'Standard HTML JS':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Getting Started with Standard HTML and JavaScript
            </h2>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Server className="h-6 w-6 text-blue-500 mr-2" />
                  Step 1: Set Up a Live Server
                </h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200">
                  To preview your marquees in real-time, you&apos;ll need a live server. If you&apos;re using VS Code, you can install the{' '}
                  <strong>Live Server</strong> extension. For other IDEs, please refer to their documentation on setting up a live server.
                </p>
              </div>
              {/* Step 2 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Folder className="h-6 w-6 text-blue-500 mr-2" />
                  Step 2: Open the Project Folder
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200">
                  Navigate to the{' '}
                  <code className="bg-gray-800 px-1 rounded">Html_With_Javascript</code>{' '}
                  folder in your code editor.
                </p>
              </div>
              {/* Step 3 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Play className="h-6 w-6 text-blue-500 mr-2" />
                  Step 3: Launch the Live Server
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200">
                  Start the live server to view the project in your browser. This allows you to see your changes in real-time as you modify the code.
                </p>
              </div>
              {/* Step 4 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Code className="h-6 w-6 text-blue-500 mr-2" />
                  Step 4: Integrate the Code
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200">
                  Once you have the marquees working, you can copy the HTML, CSS, and JavaScript code into your own project. Customize it as needed to fit your requirements.
                </p>
              </div>
            </div>
          </div>
        );
      case 'Standard React TS':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Getting Started with Standard React and TypeScript
            </h2>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Folder className="h-6 w-6 text-blue-500 mr-2" />
                  Step 1: Open the Project Folder
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200">
                  Navigate to the{' '}
                  <code className="bg-gray-800 px-1 rounded">react_with_typescript</code>{' '}
                  folder in your code editor.
                </p>
              </div>
              {/* Step 2 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Terminal className="h-6 w-6 text-blue-500 mr-2" />
                  Step 2: Install Dependencies
                </h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200">
                  Open your terminal, navigate to the project directory, and run the following command:
                </p>
                <div className="relative">
                  <pre className="bg-[#282C34] rounded-lg p-4 font-mono text-sm text-gray-200 overflow-auto">
                    <code>npm install</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('npm install')}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    aria-label="Copy command"
                    title="Copy command"
                  >
                    {copiedCode === 'npm install' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Note: It&apos;s normal to see warnings during installation.
                </p>
              </div>
              {/* Step 3 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Play className="h-6 w-6 text-blue-500 mr-2" />
                  Step 3: Start the Development Server
                </h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200">
                  Run the following command to launch the development server:
                </p>
                <div className="relative">
                  <pre className="bg-[#282C34] rounded-lg p-4 font-mono text-sm text-gray-200 overflow-auto">
                    <code>npm start</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('npm start')}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    aria-label="Copy command"
                    title="Copy command"
                  >
                    {copiedCode === 'npm start' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-gray-300 mt-4 group-hover:text-gray-200">
                  This should automatically open the app in your browser. If it doesn&apos;t, or if you encounter any issues, please{' '}
                  <Link href="/contact" className="text-blue-400 underline">
                    contact us
                  </Link>{' '}
                  for assistance.
                </p>
              </div>
              {/* Step 4 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Code className="h-6 w-6 text-blue-500 mr-2" />
                  Step 4: Integrate the Code
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200">
                  Explore the working marquees in the project. You can now copy and integrate the relevant code into your own TypeScript application to start using MarqueeKit.
                </p>
              </div>
            </div>
          </div>
        );
      case 'Pro React JS':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Getting Started with Pro React JS
            </h2>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Folder className="h-6 w-6 text-blue-500 mr-2" />
                  Step 1: Open the Project Folder
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200">
                  Navigate to the{' '}
                  <code className="bg-gray-800 px-1 rounded">Pro_React_JS</code>{' '}
                  folder in your code editor.
                </p>
              </div>
              {/* Step 2 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Terminal className="h-6 w-6 text-blue-500 mr-2" />
                  Step 2: Install Dependencies
                </h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200">
                  Open your terminal, navigate to the project directory, and run the following command:
                </p>
                <div className="relative">
                  <pre className="bg-[#282C34] rounded-lg p-4 font-mono text-sm text-gray-200 overflow-auto">
                    <code>npm install</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('npm install')}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    aria-label="Copy command"
                    title="Copy command"
                  >
                    {copiedCode === 'npm install' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {/* Step 3 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Play className="h-6 w-6 text-blue-500 mr-2" />
                  Step 3: Start the Development Server
                </h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200">
                  Run the following command to launch the development server:
                </p>
                <div className="relative">
                  <pre className="bg-[#282C34] rounded-lg p-4 font-mono text-sm text-gray-200 overflow-auto">
                    <code>npm start</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('npm start')}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    aria-label="Copy command"
                    title="Copy command"
                  >
                    {copiedCode === 'npm start' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-gray-300 mt-4 group-hover:text-gray-200">
                  This should automatically open the app in your browser. If it doesn&apos;t, or if you encounter any issues, please{' '}
                  <Link href="/contact" className="text-blue-400 underline">
                    contact us
                  </Link>{' '}
                  for assistance.
                </p>
              </div>
              {/* Step 4 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Code className="h-6 w-6 text-blue-500 mr-2" />
                  Step 4: Integrate the Code
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200">
                  Explore the advanced features of MarqueeKit in this project. You can now copy and integrate the relevant code into your own application to take advantage of the Pro features.
                </p>
              </div>
            </div>
          </div>
        );
      case 'Pro HTML JS':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Getting Started with Pro HTML and JavaScript
            </h2>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Server className="h-6 w-6 text-blue-500 mr-2" />
                  Step 1: Set Up a Live Server
                </h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200">
                  To preview your marquees in real-time, you&apos;ll need a live server. If you&apos;re using VS Code, you can install the{' '}
                  <strong>Live Server</strong> extension. For other IDEs, please refer to their documentation on setting up a live server.
                </p>
              </div>
              {/* Step 2 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Folder className="h-6 w-6 text-blue-500 mr-2" />
                  Step 2: Open the Project Folder
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200">
                  Navigate to the{' '}
                  <code className="bg-gray-800 px-1 rounded">Pro_Html_With_Javascript</code>{' '}
                  folder in your code editor.
                </p>
              </div>
              {/* Step 3 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Play className="h-6 w-6 text-blue-500 mr-2" />
                  Step 3: Launch the Live Server
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200">
                  Start the live server to view the project in your browser. This allows you to see your changes in real-time as you modify the code.
                </p>
              </div>
              {/* Step 4 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Code className="h-6 w-6 text-blue-500 mr-2" />
                  Step 4: Integrate the Code
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200">
                  Once you have the marquees working, you can copy the HTML, CSS, and JavaScript code into your own project. Leverage the Pro features to enhance your marquees.
                </p>
              </div>
            </div>
          </div>
        );
      case 'Pro React TS':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Getting Started with Pro React and TypeScript
            </h2>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Folder className="h-6 w-6 text-blue-500 mr-2" />
                  Step 1: Open the Project Folder
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200">
                  Navigate to the{' '}
                  <code className="bg-gray-800 px-1 rounded">Pro_React_TS</code>{' '}
                  folder in your code editor.
                </p>
              </div>
              {/* Step 2 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Terminal className="h-6 w-6 text-blue-500 mr-2" />
                  Step 2: Install Dependencies
                </h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200">
                  Open your terminal, navigate to the project directory, and run the following command:
                </p>
                <div className="relative">
                  <pre className="bg-[#282C34] rounded-lg p-4 font-mono text-sm text-gray-200 overflow-auto">
                    <code>npm install</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('npm install')}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    aria-label="Copy command"
                    title="Copy command"
                  >
                    {copiedCode === 'npm install' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {/* Step 3 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Play className="h-6 w-6 text-blue-500 mr-2" />
                  Step 3: Start the Development Server
                </h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200">
                  Run the following command to launch the development server:
                </p>
                <div className="relative">
                  <pre className="bg-[#282C34] rounded-lg p-4 font-mono text-sm text-gray-200 overflow-auto">
                    <code>npm start</code>
                  </pre>
                  <button
                    onClick={() => handleCopy('npm start')}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    aria-label="Copy command"
                    title="Copy command"
                  >
                    {copiedCode === 'npm start' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-gray-300 mt-4 group-hover:text-gray-200">
                  This should automatically open the app in your browser. If it doesn&apos;t, or if you encounter any issues, please{' '}
                  <Link href="/contact" className="text-blue-400 underline">
                    contact us
                  </Link>{' '}
                  for assistance.
                </p>
              </div>
              {/* Step 4 */}
              <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Code className="h-6 w-6 text-blue-500 mr-2" />
                  Step 4: Integrate the Code
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200">
                  Explore the advanced features of MarqueeKit in this project. You can now copy and integrate the relevant code into your own TypeScript application to leverage the Pro features.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }
  
  

  if (verificationStatus === 'loading') {
    return (
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Verifying Purchase...</h1>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
          <p className="text-xl text-gray-300">
            Start building beautiful image marquees with MarqueeKit
          </p>
        </div>

        {hasPurchased ? (
          <div className="space-y-16">
            {/* Instruction Type Selection */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-4 justify-center">
                {instructionTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setInstructionType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      instructionType === type
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Instructions for the selected type */}
            {renderInstructions()}

            {/* Next Steps */}
            <div className="grid md:grid-cols-2 gap-8">
              <Link
                href="/docs/configuration"
                className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm"
              >
                <Settings className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Configuration Options</h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200">
                  Learn about all available configuration options and customization
                  possibilities.
                </p>
                <span className="text-blue-500 group-hover:text-blue-400 inline-flex items-center">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>

              <Link
                href="/docs/examples"
                className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-white/5 backdrop-blur-sm"
              >
                <Layout className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Examples</h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200">
                  Explore real-world examples and common use cases.
                </p>
                <span className="text-blue-500 group-hover:text-blue-400 inline-flex items-center">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border">
              <h2 className="text-xl font-semibold mb-4">Purchase Required</h2>
              <p className="text-gray-300 mb-6">
                To access the full documentation and start using MarqueeKit, you&apos;ll
                need to purchase a license.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                View Pricing Options
              </Link>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold">What&apos;s Included</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 mt-1" />
                  <span className="text-gray-300">
                    Full access to MarqueeKit components
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Terminal className="h-6 w-6 text-green-500 mt-1" />
                  <span className="text-gray-300">
                    Complete documentation and examples
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Package className="h-6 w-6 text-green-500 mt-1" />
                  <span className="text-gray-300">
                    TypeScript support and type definitions
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main component wrapped with Suspense
export default function GettingStartedPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8">Loading...</h1>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      }
    >
      <GettingStartedContent />
    </Suspense>
  );
}
