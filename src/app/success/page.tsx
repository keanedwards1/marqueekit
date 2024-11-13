// src/app/success/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, Download } from 'lucide-react';

interface PurchaseDetails {
  licenseType: 'standard' | 'pro';
  customerEmail: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetails | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  useEffect(() => {
    const verifyPurchase = async () => {
      try {
        const response = await fetch(`/api/stripe/verify?session_id=${sessionId}`);
        const data = await response.json();
        
        if (data.valid) {
          setPurchaseDetails(data.details);
        } else {
          console.error('Invalid session');
        }
      } catch (error) {
        console.error('Error verifying purchase:', error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      verifyPurchase();
    }
  }, [sessionId]);

  const handleDownload = async () => {
    if (!sessionId) return;
    
    setDownloading(true);
    try {
      // Get secure download URL from our API
      const response = await fetch(`/api/download?session_id=${sessionId}`);
      const data = await response.json();
      
      if (!data.downloadUrl) {
        throw new Error('No download URL provided');
      }

      // Trigger the download
      window.location.href = data.downloadUrl;
      setHasDownloaded(true);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading file. Please try again or contact support.');
    } finally {
      setDownloading(false);
    }
  };

  // Rest of your component remains the same
  const handleDocsClick = (e: React.MouseEvent) => {
    if (!hasDownloaded) {
      e.preventDefault();
      setShowWarningModal(true);
    }
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-8">No purchase found</h1>
          <Link 
            href="/pricing"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-8">Verifying your purchase...</h1>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"
        aria-hidden="true"
      />
      
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />

      {showWarningModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black border border-gray-600 rounded-lg p-8 max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Are you sure?</h3>
            <p className="text-gray-600 mb-6">
              If you navigate away without downloading, you&apos;ll need to contact support to regain access to your download.
            </p>
            <div className="flex justify-end gap-4">
              <Link
                href="/docs"
                className="px-4 py-2 bg-black border border-gray-500 text-white hover:bg-blue-600 transition-all rounded-lg duration-200"
                onClick={() => setShowWarningModal(false)}
              >
                Continue Anyway
              </Link>
              <button
                onClick={() => setShowWarningModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-gray-100 hover:text-gray-100 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-2xl relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-8">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Thank you for your purchase!</h1>
          <p className="text-xl text-gray-600">
            You now have access to MarqueeKit {purchaseDetails?.licenseType === 'pro' ? 'Pro' : 'Standard'}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8 border">
          <h2 className="text-2xl font-bold mb-6">Next Steps</h2>
          <div className="space-y-4">
            <button 
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              onClick={handleDownload}
              disabled={downloading}
            >
              <Download className="w-5 h-5" />
              {downloading ? 'Downloading...' : 'Download MarqueeKit'}
            </button>
            
            <Link 
              href="/docs"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border rounded-lg hover:bg-white/5 transition-colors"
              onClick={handleDocsClick}
            >
              View Documentation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="space-y-6 text-center">
          <p className="text-gray-600">
            We&apos;ve sent a confirmation email to {purchaseDetails?.customerEmail}.
          </p>
          <p className="text-sm text-gray-500">
            Having issues? Contact support at <a href="mailto:marqueekit1@gmail.com" className="text-blue-600 hover:text-blue-800">marqueekit1@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-20">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h1 className="text-4xl font-bold mb-8">Loading...</h1>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

{/*             <Link 
              href={`/docs/getting-started?session_id=${sessionId}`}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border rounded-lg hover:bg-white/5 transition-colors"
            > */}