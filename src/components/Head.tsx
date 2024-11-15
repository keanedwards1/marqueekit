import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

interface SEOHeadProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  locale?: string;
  twitterHandle?: string;
  author?: string;
  keywords?: string;
  themeColor?: string;
  dateCreated?: string;
  dateModified?: string;
  siteName?: string;
  gaAdsId?: string; // Google Ads tracking ID
  ga4Id?: string;   // Google Analytics 4 tracking ID
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  url = '',
  image = '/favicon.ico',
  type = 'website',
  locale = 'en_US',
  twitterHandle = '',
  author = '',
  keywords = '',
  themeColor = '#ffffff',
  dateCreated,
  dateModified,
  siteName = 'MarqueeKit',
  gaAdsId = 'AW-16777705244',
  ga4Id = 'G-G7E25FG4HP',
}) => {
  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />

        {/* Canonical Link */}
        {url && <link rel="canonical" href={url} />}

        {/* SEO Keywords */}
        {keywords && <meta name="keywords" content={keywords} />}

        {/* Open Graph Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content={type} />
        <meta property="og:locale" content={locale} />
        <meta property="og:site_name" content={siteName} />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        {twitterHandle && <meta name="twitter:site" content={`@${twitterHandle}`} />}
        {twitterHandle && <meta name="twitter:creator" content={`@${twitterHandle}`} />}

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content={author} />
        <meta httpEquiv="Content-Language" content={locale} />
        <meta name="theme-color" content={themeColor} />
        <meta name="title" content={title} />

        {/* Favicon and Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />

        {/* Structured Data (JSON-LD) for Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebSite",
            "name": siteName,
            "url": url,
            "logo": image,
            "description": description,
            "publisher": {
              "@type": "Organization",
              "name": siteName,
              "logo": {
                "@type": "ImageObject",
                "url": image
              }
            },
            "inLanguage": locale,
            "isAccessibleForFree": "True",
            "dateCreated": dateCreated,
            "dateModified": dateModified
          })}
        </script>
      </Head>

      {/* Google Analytics 4 Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga4Id}');
        `}
      </Script>

      {/* Google Ads Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaAdsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaAdsId}');
        `}
      </Script>
    </>
  );
};

export default SEOHead;