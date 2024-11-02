'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight, Download } from 'lucide-react';

interface PurchaseDetails {
  licenseType: 'standard' | 'pro';
  customerEmail: string;
  downloadUrl: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetails | null>(null);
  const [downloading, setDownloading] = useState(false);

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
    if (!purchaseDetails?.downloadUrl) return;
    
    setDownloading(true);
    try {
      const response = await fetch(purchaseDetails.downloadUrl);
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'marqueekit.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading file. Please try again or contact support.');
    } finally {
      setDownloading(false);
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
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"
        aria-hidden="true"
      />
      
      {/* Glow effect */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />

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
              href="/docs/getting-started"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border rounded-lg hover:bg-white/5 transition-colors"
            >
              View Documentation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="space-y-6 text-center">
          <p className="text-gray-600">
            We&apos;ve sent a confirmation email to {purchaseDetails?.customerEmail} with your purchase details and download link.
          </p>
          <p className="text-sm text-gray-500">
            Having issues? Contact support at support@marqueekit.dev
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