import React, { useState, useEffect } from 'react';
import { Check, Minus } from 'lucide-react';

interface BooleanFeature {
  name: string;
  basic: boolean;
  standard: boolean;
  pro: boolean;
  tooltip?: string;
  type: 'boolean';
}

interface StringFeature {
  name: string;
  basic: string;
  standard: string;
  pro: string;
  type: 'string';
}

type Feature = BooleanFeature | StringFeature;

interface FeatureSection {
  category: string;
  items: Feature[];
}

const DeliverablesList = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features: FeatureSection[] = [
    {
      category: "Core Marquee Features",
      items: [
        {
          name: "Basic Configuration (height, width, speed, gap)",
          basic: true,
          standard: true,
          pro: true,
          tooltip: "Configure basic marquee properties",
          type: 'boolean'
        },
        {
          name: "Reverse Direction",
          basic: true,
          standard: true,
          pro: true,
          type: 'boolean'
        },
        {
          name: "Border Radius Control",
          basic: true,
          standard: true,
          pro: true,
          type: 'boolean'
        },
        {
          name: "Pause on Hover",
          basic: true,
          standard: true,
          pro: true,
          type: 'boolean'
        },
        {
          name: "Image Scale Control",
          basic: true,
          standard: true,
          pro: true,
          type: 'boolean'
        },
        {
          name: "Load Animation Effect",
          basic: false,
          standard: false,
          pro: true,
          tooltip: "Smooth animation when marquee first appears",
          type: 'boolean'
        },
        {
          name: "Fade Effect",
          basic: false,
          standard: false,
          pro: true,
          tooltip: "Elegant fade transitions",
          type: 'boolean'
        },
        {
          name: "Mixed/Uniform Media Toggle",
          basic: false,
          standard: false,
          pro: true,
          tooltip: "Switch between mixed and uniform media sizes",
          type: 'boolean'
        }
      ]
    },
    {
      category: "Documentation & Examples",
      items: [
        {
          name: "Implementation Examples",
          basic: "Basic examples",
          standard: "Comprehensive examples",
          pro: "Comprehensive examples",
          type: 'string'
        },
        {
          name: "Documentation",
          basic: "Basic setup guide",
          standard: "Detailed documentation",
          pro: "Detailed documentation",
          type: 'string'
        },
        {
          name: "Code Snippets",
          basic: "Essential snippets",
          standard: "Full snippet library",
          pro: "Full snippet library",
          type: 'string'
        }
      ]
    },
    {
      category: "Support",
      items: [
        {
          name: "Email Support",
          basic: "Basic email support",
          standard: "Priority email support",
          pro: "Priority email support",
          type: 'string'
        },
        {
          name: "Response Time",
          basic: "48 hours",
          standard: "24 hours",
          pro: "12 hours",
          type: 'string'
        }
      ]
    }
  ];

  const renderFeatureValue = (feature: Feature, tier: 'basic' | 'standard' | 'pro') => {
    if (feature.type === 'boolean') {
      return feature[tier] ? (
        <Check className="h-5 w-5 text-teal-400 flex-shrink-0" />
      ) : (
        <Minus className="h-5 w-5 text-gray-500 flex-shrink-0" />
      );
    }
    return <span className="text-teal-400">•</span>;
  };

  const renderColumn = (tier: 'basic' | 'standard' | 'pro', borderColor: string, bgColor: string) => (
    <div className={`space-y-6 p-6 rounded-lg border ${borderColor} ${bgColor}`}>
      <h3 className="text-xl font-medium text-white capitalize">{tier}</h3>
      <div className="space-y-8">
        {features.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h4 className="text-sm font-medium text-teal-400">{section.category}</h4>
            <ul className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2 group relative">
                  {renderFeatureValue(item, tier)}
                  <span className="text-sm text-gray-300">
                    {item.name}
                    {item.type === 'string' && `: ${item[tier]}`}
                  </span>
                  {item.type === 'boolean' && item.tooltip && (
                    <div className="absolute left-0 -top-8 hidden group-hover:block bg-gray-800 p-2 rounded text-xs text-gray-300 w-48">
                      {item.tooltip}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`max-w-5xl mx-auto my-20 transition-all duration-1000 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`}>
      <h2 className="text-2xl font-semibold mb-10 text-white text-center">What You Get</h2>
      
      <div className="grid grid-cols-3 gap-8">
        {renderColumn('basic', 'border-gray-800', 'bg-gray-900/50')}
        {renderColumn('standard', 'border-teal-800', 'bg-teal-900/10')}
        {renderColumn('pro', 'border-blue-800', 'bg-blue-900/10')}
      </div>

      <p className="text-sm text-gray-400 mt-6 text-center">
        Files are delivered instantly after payment. Contact support if you need to restore access.
      </p>
    </div>
  );
};

export default DeliverablesList;