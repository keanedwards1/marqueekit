# MarqueeKit Standard Package

## Installation Steps

### Step 1: Add Component File
Create a new file called `MarqueeStandard.tsx` in your components directory and copy the code from Step 2 into it.

### Step 2: Component Code
Copy this optimized component code:

```tsx
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';  // For Next.js users

interface MarqueeProps {
  // Required props
  items: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  }[];
  
  // Optional customization
  speed?: number;           // Pixels per second, default: 50
  height?: number;          // Container height, default: 200
  gap?: number;            // Gap between items, default: 20
  scaleOnHover?: boolean;  // Scale effect on hover, default: false
  className?: string;      // Additional container classes
  imageClassName?: string; // Additional image classes
  
  // Loading optimization
  priority?: boolean;      // Prioritize loading, default: false
  loading?: 'eager' | 'lazy'; // Loading strategy, default: 'lazy'
  
  // Advanced options
  reverse?: boolean;       // Reverse direction, default: false
  pauseOnHover?: boolean; // Pause animation on hover, default: false
  snapToItem?: boolean;   // Snap to items when paused, default: false
}

export default function MarqueeStandard({
  items,
  speed = 50,
  height = 200,
  gap = 20,
  scaleOnHover = false,
  className = '',
  imageClassName = '',
  priority = false,
  loading = 'lazy',
  reverse = false,
  pauseOnHover = false,
  snapToItem = false,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calculate dimensions based on image aspect ratios
  const getItemWidth = (item: typeof items[0]) => {
    if (item.width && item.height) {
      const aspectRatio = item.width / item.height;
      return height * aspectRatio;
    }
    return height * 1.5; // Default aspect ratio
  };

  // Calculate total width for animation
  const totalWidth = items.reduce((acc, item) => {
    return acc + getItemWidth(item) + gap;
  }, 0);

  // Dynamic styles for animation
  const dynamicStyles = `
    .marquee-container {
      height: ${height}px;
      --gap: ${gap}px;
      --duration: ${totalWidth / speed}s;
      --reverse: ${reverse ? -1 : 1};
      --play-state: ${isPaused ? 'paused' : 'running'};
    }

    .marquee-track {
      animation: scroll var(--duration) linear infinite;
      animation-direction: ${reverse ? 'reverse' : 'normal'};
      animation-play-state: var(--play-state);
    }

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-50% - var(--gap)));
      }
    }

    ${scaleOnHover ? `
      .marquee-item:hover {
        transform: scale(1.05);
        transition: transform 0.2s ease;
      }
    ` : ''}

    ${snapToItem && pauseOnHover ? `
      .marquee-track[data-paused="true"] {
        transform: translateX(var(--snap-offset));
        transition: transform 0.3s ease;
      }
    ` : ''}
  `;

  // Image component based on framework
  const ImageComponent = ({ item }: { item: typeof items[0] }) => {
    // Check if we're in a Next.js environment
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_VERSION) {
      return (
        <Image
          src={item.src}
          alt={item.alt || ''}
          width={item.width || height * 1.5}
          height={item.height || height}
          priority={priority}
          loading={loading}
          className={`h-full w-full object-cover rounded-lg transition-transform ${imageClassName}`}
        />
      );
    }

    // Regular img element for non-Next.js environments
    return (
      <img
        src={item.src}
        alt={item.alt || ''}
        loading={loading}
        className={`h-full w-full object-cover rounded-lg transition-transform ${imageClassName}`}
      />
    );
  };

  const MarqueeItems = items.map((item, index) => (
    <div
      key={`${index}-${item.src}`}
      className="marquee-item flex-none transition-transform"
      style={{
        width: `${getItemWidth(item)}px`,
        marginRight: `${gap}px`,
      }}
    >
      <ImageComponent item={item} />
    </div>
  ));

  return (
    <div
      ref={containerRef}
      className={`marquee-container relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {isVisible && (
        <div 
          className="marquee-track absolute flex"
          data-paused={isPaused}
        >
          {MarqueeItems}
          {MarqueeItems} {/* Duplicate for seamless loop */}
        </div>
      )}
      <style jsx>{dynamicStyles}</style>
    </div>
  );
}
```

### Step 3: Image Preparation
Prepare your images following these guidelines:
1. Optimize images using a tool like `sharp` or an online optimizer
2. Use modern formats like WebP when possible
3. Keep reasonable dimensions (recommend max 1200px width)
4. Place images in your public directory

Example image preparation:
```bash
public/
  marquee-images/
    image1.webp  # 800x600px
    image2.webp  # 800x600px
    image3.webp  # 800x600px
```

### Step 4: Implementation
Add the marquee to your page:

```tsx
import MarqueeStandard from '@/components/MarqueeStandard';

const items = [
  {
    src: '/marquee-images/image1.webp',
    alt: 'Description 1',
    width: 800,
    height: 600,
  },
  {
    src: '/marquee-images/image2.webp',
    alt: 'Description 2',
    width: 800,
    height: 600,
  },
  {
    src: '/marquee-images/image3.webp',
    alt: 'Description 3',
    width: 800,
    height: 600,
  },
];

export default function YourPage() {
  return (
    <MarqueeStandard
      items={items}
      height={300}
      speed={50}
      gap={20}
      scaleOnHover
      pauseOnHover
      loading="eager"
      className="my-8"
    />
  );
}
```

### Step 5: Performance Optimization
Add these performance optimizations:

1. **Next.js users**: Add this to `next.config.js`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = nextConfig;
```

2. **Regular React users**: Add this to your `index.html`:
```html
<link rel="preload" as="image" href="/marquee-images/image1.webp">
<link rel="preload" as="image" href="/marquee-images/image2.webp">
<link rel="preload" as="image" href="/marquee-images/image3.webp">
```

## Features & Options

### Basic Options
- `items`: Array of images with metadata
- `speed`: Animation speed (pixels per second)
- `height`: Container height
- `gap`: Space between items
- `className`: Additional container classes
- `imageClassName`: Additional image classes

### Interactive Features
- `scaleOnHover`: Scale effect on hover
- `pauseOnHover`: Pause animation on hover
- `snapToItem`: Snap to nearest item when paused
- `reverse`: Reverse scrolling direction

### Performance Options
- `priority`: Prioritize image loading
- `loading`: Choose loading strategy ('eager' or 'lazy')

## Performance Features

1. **Intersection Observer**
   - Only animates when in viewport
   - Reduces CPU/GPU usage

2. **Image Optimization**
   - Automatic WebP conversion (Next.js)
   - Lazy loading by default
   - Responsive image sizes

3. **Animation Performance**
   - Uses CSS transforms
   - Hardware acceleration
   - RAF-free animation
   - Minimal repaints

4. **Memory Management**
   - Cleanup on unmount
   - Event listener management
   - Efficient image duplication

## Troubleshooting

1. **Images not loading**
   - Check image paths are relative to public directory
   - Verify image files exist and permissions
   - Try using absolute URLs for testing

2. **Performance issues**
   - Reduce number of items
   - Optimize image sizes
   - Enable lazy loading
   - Decrease animation speed

3. **Animation glitches**
   - Clear browser cache
   - Check for CSS conflicts
   - Verify image dimensions
   - Adjust gap and speed

## Support
For issues or questions, contact support at marqueekit1@gmail.com

