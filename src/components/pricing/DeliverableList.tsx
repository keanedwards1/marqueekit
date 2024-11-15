import React, { useState, useEffect } from 'react';
import { FileText, Download, Mail } from 'lucide-react';

const DeliverablesList = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`max-w-3xl mx-auto my-20 p-8 rounded-lg shadow-lg border border-gray-700 transition-all duration-1000 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`}>
      <h2 className="text-2xl font-semibold mb-10 text-white">What You&apos;ll Receive</h2>
      
      <div className="space-y-12">
        {/* Download Link Section */}
        <div className={`flex flex-col items-start space-y-4 transition-all duration-1000 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <div className="flex items-center space-x-3">
            <Download className="w-6 h-6 text-teal-400" />
            <h3 className="text-lg font-medium text-white">Download Link</h3>
          </div>
          <div className="ml-9 text-gray-300">
            <p>File: <strong className="text-white">marqueeKit.zip</strong></p>
            <h4 className="font-medium text-white mt-2">Inside marqueeKit.zip you&apos;ll find:</h4>
            <ul className="ml-4 list-disc list-inside">
              <li>marquee.js - A high-performance marquee engine</li>
              <li>marquee.css - Pre-styled responsive layouts</li>
              <li>Sample images to get started quickly</li>
            </ul>
          </div>
        </div>

        {/* Documentation Section */}
        <div className={`flex flex-col items-start space-y-4 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-teal-400" />
            <h3 className="text-lg font-medium text-white">Complete Documentation</h3>
          </div>
          <div className="ml-9 text-gray-300">
            <h4 className="font-medium text-white">Documentation includes:</h4>
            <ul className="ml-4 list-disc list-inside">
              <li>Detailed documentation with all features explained</li>
              <li>Step-by-step installation guide</li>
              <li>Example code snippets for all features</li>
              <li>Performance optimization tips</li>
              <li>Troubleshooting guide</li>
            </ul>
          </div>
        </div>

        {/* Email and Support Section */}
        <div className={`flex flex-col items-start space-y-4 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <div className="flex items-center space-x-3">
            <Mail className="w-6 h-6 text-teal-400" />
            <h3 className="text-lg font-medium text-white">Lifetime Support</h3>
          </div>
          <div className="ml-9 text-gray-300">
            <h4 className="font-medium text-white">You&apos;ll receive:</h4>
            <ul className="ml-4 list-disc list-inside">
              <li>Purchase receipt</li>
              <li>Direct email support at <strong className="text-white">marqueekit1@gmail.com</strong></li>
              <li>Lifetime access to future updates</li>
              <li>24-hour response guarantee</li>
            </ul>
          </div>
        </div>
        
        {/* Additional Details Section */}
        <div className={`border-t border-gray-700 pt-6 transition-all duration-1000 delay-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <h4 className="font-medium text-teal-400 text-sm">Core Features:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>✓ Hardware-accelerated animations</li>
                <li>✓ Pause on hover effects</li>
                <li>✓ Image scaling animations</li>
                <li>✓ Customizable speeds</li>
              </ul>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="font-medium text-teal-400 text-sm">Performance:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>✓ Memory optimization</li>
                <li>✓ Intersection Observer</li>
                <li>✓ Dynamic image loading</li>
                <li>✓ Responsive layouts</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Files are delivered instantly after payment. Contact support if you need to restore access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliverablesList;