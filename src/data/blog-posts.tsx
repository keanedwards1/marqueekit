// src/data/blog-posts.ts
import { BlogPost } from '@/types/blog';

export const SAMPLE_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with MarqueeKit',
    description:
      'Learn how to implement smooth, performant image marquees in your web projects.',
    content: `
      <h2>Introduction</h2>
      <p>MarqueeKit makes it easy to add smooth, performant image marquees to your web projects. In this guide, we'll walk through the basic setup and implementation using HTML and JavaScript.</p>
      
      <h2>Viewing The Demo (2 minutes)</h2>
      <p><strong>If you already know how to open a live server for HTML/CSS/JS:</strong></p>
      <ol>
        <li>Click on <code>index.html</code>.</li>
        <li>Open the live server.</li>
      </ol>
      
      <p><strong>If you don't yet know:</strong></p>
      <h3>Opening a Live Server</h3>
      <p>We'll be using my favorite VS Code Extension of all time: <strong>Live Server</strong>. Here's how we do it:</p>
      <ol>
        <li>Click the <strong>Extensions</strong> tab on the left side of VS Code.</li>
        <li>Search for <strong>Live Server</strong>.</li>
        <li>Click the <strong>Install</strong> button.</li>
        <li>Restart VS Code (Shift + Cmd + P → type: <em>Developer: Reload Window</em>).</li>
        <li>Open the <code>index.html</code> file.</li>
        <li>Click <strong>Go Live</strong> (located in the lower right with a little radiowave icon).</li>
        <li>This should open the demo in your preferred browser, and the image marquees should be visible and working.</li>
      </ol>
      <p>Feel free to look up other tutorials online for support with other IDEs like Sublime, Atom, WebStorm, and more. This can be frustrating if you're new to this and your IDE doesn't have a simple solution. If it's giving you troubles, you can skip this part or reach out to us for support, and we'll help within 24 hours.</p>
      
      <h2>Full Setup Instructions (5 minutes)</h2>
      
      <h3>1. Copy these two files into your project:</h3>
      <ul>
        <li><code>marquee.js</code> goes into your scripts folder.</li>
        <li><code>marquee.css</code> goes into your styles folder.</li>
      </ul>
      
      <h3>2. Copy the image folder into your project</h3>
      <p>Copy the <code>images</code> folder into your project’s <strong>root</strong> directory. This folder contains placeholder images at the moment. To make the marquee yours, you can add your own images.</p>
      
      <p><em>Example directory structure after adding the <code>images</code> folder:</em></p>
      <pre><code>&lt;!-- This is an example; your file structure
will look unique, but should contain the newly
added files and folders --&gt;

├── css
│   ├── shop.css
│   ├── checkout.css
│   ├── marquee.css
│   └── contact.css
├── html
│   ├── gallery.html
│   ├── shop.html
│   ├── checkout.html
│   ├── confirmation.html
│   ├── about.html
│   └── contact.html
├── images
│   ├── image1.webp
│   ├── image2.webp
│   ├── image3.webp
│   ├── image4.webp
│   └── logo.png
├── js
│   └── marquee.js
└── index.html

&lt;!-- Note: There's nothing requiring the images to be in the <code>images</code> folder except for the path in the HTML declaration. So you can move the images around as long as you adjust the paths to the images in the HTML. --&gt;
</code></pre>
      
      <h3>3. Add this HTML:</h3>
      <ol>
        <li>
          Add this line into the <code>&lt;head&gt;</code> of your chosen <code>.html</code> file:
          <pre><code>&lt;!-- Make sure to adapt this path to your file structure --&gt;
&lt;link rel="stylesheet" href="/styles/marquee.css"&gt;
</code></pre>
        </li>
        <li>
          Add this <code>&lt;section&gt;</code> into the <code>&lt;body&gt;</code> of your chosen <code>.html</code> file:
          <pre><code>&lt;div class="marquee-wrapper"&gt;
  &lt;h1&gt;MarqueeKit Examples&lt;/h1&gt;  
  &lt;section class="image-marquee"&gt;
    &lt;h2&gt;Basic Marquee&lt;/h2&gt;
    &lt;div id="image-marquee"&gt;&lt;/div&gt;
  &lt;/section&gt;
&lt;/div&gt;
</code></pre>
        </li>
        <li>
          Add these tags right before closing the <code>&lt;/body&gt;</code> tag:
          <pre><code>&lt;script src="/scripts/marquee.js"&gt;&lt;/script&gt; &lt;!-- Adapt this too --&gt;

&lt;script&gt;
  new MarqueeKit("#image-marquee", { // This ID needs to match the div's ID
    images: [
      "/images/image1.webp", // Add your own images
      "/images/image2.webp",
      "/images/image3.webp",
      "/images/image4.webp"
    ],
    imageWidth: 250, // Experiment with changing all of these and have fun 🕺
    height: 200,  
    speed: 50,
    gap: 20,
    reverse: false,
    pauseOnHover: false,
    imageScale: 1, // Try 1.05
    borderRadius: 8,
  });
&lt;/script&gt;
</code></pre>
          <p>I know that I sound like a broken record, but for the love of all that is sacred, make sure that all the paths are correct.</p>
        </li>
      </ol>
      
      <h3>4. Start a Live Server (see instructions above if needed)</h3>
      
      <h3>5. Remove body styling from <code>marquee.css</code> if interfering with your site's existing styles</h3>
      <pre><code>/* REMOVE FROM HERE */
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  padding: 20px 0px;
  background-color: #ffffff;
  background-image: 
    linear-gradient(rgba(3, 3, 3, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(8, 8, 8, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  min-height: 100vh;
}
/* TO HERE */

/* Rest of the CSS rules */

@media (prefers-color-scheme: dark) {

/* AND FROM HERE */
body {
  background-color: #0a0a0a;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  color: #e1e1e1;
}
/* TO HERE */

/* Rest of the CSS rules */

}
</code></pre>

      <p>That's it! Your marquee should be working now. <strong>Don't hesitate to email us at <a href="mailto:marqueekit1@gmail.com">marqueekit1@gmail.com</a> for support if anything's not working.</strong></p>
      
      <h2>Customization Options</h2>
      
      <p>Now the fun bit. You can make your marquee unique by adding any of these options:</p>
      <pre><code>new MarqueeKit("#my-marquee", {
  images: [ // Use at least 2 images
    "/images/image1.jpg", 
    "/images/image2.jpg",
    "/images/image3.jpg"
  ],
  // Optional
  imageWidth: 250,          // Sets the width of each image in pixels
  height: 200,              // Sets the marquee's height in pixels
  speed: 50,                // Sets scroll speed (higher = faster)
  gap: 20,                  // Creates space between each image (in pixels)
  reverse: false,           // Reverses the direction of the marquee (true = scroll right)
  pauseOnHover: true,       // Adds a smooth pause on hover effect
  imageScale: 1.05,         // Makes each image grow on hover (try 1.08, 1.1, 1.5, 2, etc.)
  borderRadius: 10          // Adjusts how rounded the corners of each image are
});

/* To add an on-load animation, add this to your head */
&lt;link rel="stylesheet" href="/css/animate.css"&gt;
/* Make sure to add it below the marquee.css import */
</code></pre>
      
      <h2>Previewing <code>.md</code> Files</h2>
      <p>If you've never viewed a <code>.md</code> file, you can do that with extensions like <strong>Markdown Preview Github Styling</strong> or <strong>Markdown Preview Enhanced</strong> in the VS Code ecosystem. You can also view it through the command palette:</p>
      <ol>
        <li>Open the <code>.md</code> file.</li>
        <li>Press <code>Shift + Ctrl/Cmd + P</code>.</li>
        <li>Search: <strong>Markdown: Open Preview</strong>.</li>
        <li>Press Enter.</li>
      </ol>
      
      <h2>Need More Help?</h2>
      <p><strong>Check out <code>index.html</code> for a working example, or email us at <a href="mailto:marqueekit1@gmail.com">marqueekit1@gmail.com</a>.</strong></p>
      
      <h2>Pricing Information</h2>
      <p>MarqueeKit offers advanced features and premium support through our paid plans. To learn more about our pricing, please visit <a href="https://marqueekit.com/pricing">marqueekit.com/pricing</a>.</p>
    `,
    author: 'Kean Edwards',
    date: '2024-11-15',
    readingTime: '5 min',
    slug: 'getting-started-with-marqueekit',
    tags: ['Tutorial', 'Web Development'],
    image: '/blog/getting-started.png',
  },
  {
    id: '2',
    title: 'Advanced MarqueeKit Techniques',
    description:
      'Dive deep into advanced features and optimization techniques for MarqueeKit implementations.',
    content: `
      <h2>Advanced Features</h2>
      <p>Once you've mastered the basics, MarqueeKit offers several advanced features for more complex implementations, such as custom animations, dynamic content loading, and responsive design considerations.</p>
      
      <h2>Performance Optimization</h2>
      <p>Learn how to optimize your marquees for maximum performance by utilizing techniques like memoization, lazy loading, and minimizing re-renders.</p>
      
      <h2>Custom Animations</h2>
      <p>You can customize the animation behavior by modifying the CSS animations or JavaScript parameters. Experiment with different easing functions, keyframes, and durations to achieve the desired effect.</p>
      
      <h2>Dynamic Content Loading</h2>
      <p>Integrate MarqueeKit with APIs or dynamic data sources to display real-time information. Ensure to handle asynchronous data loading and update the marquee content accordingly.</p>
      
      <h2>Responsive Design Considerations</h2>
      <p>Make your marquees responsive by adjusting the image sizes, gaps, and speeds based on the viewport size. Utilize CSS media queries or JavaScript event listeners to detect screen size changes and update the marquee settings.</p>
      
      <h2>Accessibility Enhancements</h2>
      <p>Ensure that your marquees are accessible to all users by adding ARIA roles, labels, and respecting user preferences for reduced motion. Implement keyboard navigation if necessary.</p>
    `,
    author: 'Kean Edwards',
    date: '2024-11-15',
    readingTime: '8 min',
    slug: 'advanced-marqueekit-techniques',
    tags: ['Advanced', 'Performance'],
    image: '/blog/advanced-kit.png',
  },
  {
    id: '3',
    title:
      'Building Custom Image Marquees: A Deep Dive into Smooth Animations',
    description:
      'Learn how to create performant, accessible image marquees while avoiding common implementation pitfalls.',
    content: `
      <h2>Introduction</h2>
      <p>While the classic HTML &lt;marquee&gt; element is long deprecated, the need for smooth scrolling content remains popular in modern web design. In this guide, we'll explore how to build a performant, customizable image marquee from scratch while avoiding common pitfalls that can lead to janky animations or poor performance.</p>
      
      <h2>The Basic Structure</h2>
      <p>First, let's establish the HTML structure for our marquee:</p>
      <pre><code>&lt;div class="marquee-container"&gt;
  &lt;div class="marquee-content"&gt;
    &lt;img src="image1.jpg" alt="Image 1"&gt;
    &lt;img src="image2.jpg" alt="Image 2"&gt;
    &lt;img src="image3.jpg" alt="Image 3"&gt;
    &lt;!-- Duplicate images for seamless loop --&gt;
    &lt;img src="image1.jpg" alt="Image 1"&gt;
    &lt;img src="image2.jpg" alt="Image 2"&gt;
    &lt;img src="image3.jpg" alt="Image 3"&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
      
      <h2>The CSS Foundation</h2>
      <p>Here's the essential CSS to get us started:</p>
      <pre><code>.marquee-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.marquee-content {
  display: flex;
  gap: 20px; /* Space between images */
  position: relative;
  white-space: nowrap;
  will-change: transform;
}

.marquee-content img {
  height: 200px; /* Adjust as needed */
  width: auto;
  object-fit: cover;
  flex-shrink: 0;
}</code></pre>

      <h2>Common Pitfalls and Solutions</h2>
      
      <h3>Pitfall #1: Using Left/Right Properties for Animation</h3>
      <p>Many developers initially try to animate using <code>left</code> or <code>right</code> properties, which can lead to poor performance as these trigger layout recalculations.</p>
      <p><strong>Solution:</strong> Use <code>transform: translateX()</code> instead:</p>
      <pre><code>@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.marquee-content {
  animation: scroll 20s linear infinite;
}</code></pre>
      
      <h3>Pitfall #2: Jerky Loop Transitions</h3>
      <p>When the animation loops, you might notice a sudden jump.</p>
      <p><strong>Solution:</strong> Duplicate the content and ensure the total width is calculated correctly:</p>
      <pre><code>const marqueeContent = document.querySelector('.marquee-content');
const images = marqueeContent.querySelectorAll('img');
const totalWidth = Array.from(images).slice(0, images.length / 2)
  .reduce((width, img) => width + img.offsetWidth + 20, 0); // 20 is gap

// Set animation duration based on content width
const duration = totalWidth / 50; // pixels per second
marqueeContent.style.animationDuration = \`\${duration}s\`;</code></pre>
      
      <h3>Pitfall #3: Performance Issues on Mobile</h3>
      <p>Mobile devices can struggle with continuous animations.</p>
      <p><strong>Solution:</strong> Use <code>will-change</code> and throttle animations when not in viewport:</p>
      <pre><code>// Use Intersection Observer to pause animation when not visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const marquee = entry.target;
    if (entry.isIntersecting) {
      marquee.style.animationPlayState = 'running';
    } else {
      marquee.style.animationPlayState = 'paused';
    }
  });
}, { threshold: 0.1 });

observer.observe(document.querySelector('.marquee-content'));</code></pre>
      
      <h3>Pitfall #4: Accessibility Concerns</h3>
      <p>Moving content can be problematic for users with motion sensitivity.</p>
      <p><strong>Solution:</strong> Respect user preferences and provide controls:</p>
      <pre><code>@media (prefers-reduced-motion: reduce) {
  .marquee-content {
    animation: none;
  }
}</code></pre>
      
      <pre><code>// Add pause on hover functionality
marqueeContent.addEventListener('mouseenter', () => {
  marqueeContent.style.animationPlayState = 'paused';
});

marqueeContent.addEventListener('mouseleave', () => {
  marqueeContent.style.animationPlayState = 'running';
});</code></pre>
      
      <h2>Advanced Features</h2>
      
      <h3>Dynamic Speed Adjustment</h3>
      <p>Let's add the ability to control the marquee speed:</p>
      <pre><code>class ImageMarquee {
  constructor(container, options = {}) {
    this.container = container;
    this.speed = options.speed || 1;
    this.direction = options.direction || 'left';
    this.setupMarquee();
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
    const currentDuration = parseFloat(
      getComputedStyle(this.content).animationDuration
    );
    this.content.style.animationDuration = \`\${currentDuration / newSpeed}s\`;
  }

  setupMarquee() {
    // Implementation details...
  }
}</code></pre>
      
      <h3>Responsive Considerations</h3>
      <p>Ensure your marquee works well across different screen sizes:</p>
      <pre><code>.marquee-container {
  --marquee-height: clamp(200px, 30vw, 400px);
}

.marquee-content img {
  height: var(--marquee-height);
  width: auto;
}

@media (max-width: 768px) {
  .marquee-content {
    gap: 10px;
  }
}</code></pre>
      
      <h2>Conclusion</h2>
      <p>Building a custom image marquee requires careful consideration of performance, accessibility, and user experience. By avoiding these common pitfalls and implementing the solutions provided, you can create smooth, performant marquees that enhance your web projects without compromising the user experience.</p>
      
      <p>Remember to:</p>
      <ul>
        <li>Use transform instead of position properties</li>
        <li>Implement proper looping techniques</li>
        <li>Consider performance optimizations</li>
        <li>Respect user preferences and accessibility</li>
        <li>Provide controls for user interaction</li>
      </ul>
      
      <p>Happy coding!</p>
    `,
    author: 'Kean Edwards',
    date: '2024-11-17',
    readingTime: '10 min',
    slug: 'building-custom-image-marquees',
    tags: ['Tutorial', 'Performance', 'Animation'],
    image: '/blog/marquee-tutorial.png',
  },
  {
    id: '4',
    title: 'Launching MarqueeKit on Product Hunt',
    description:
      'We are excited to announce that MarqueeKit is now live on Product Hunt!',
    content: `
      <h2>Introduction</h2>
      <p>After months of hard work and dedication, I'm thrilled to announce that MarqueeKit is now live on <a href="https://www.producthunt.com/posts/marqueekit">Product Hunt</a>!</p>
      
      <h2>Show Your Support</h2>
      <p>If you find MarqueeKit valuable, please visit our Product Hunt page and give us an upvote. Your support means a lot!</p>
      <iframe style="border: none;" src="https://cards.producthunt.com/cards/posts/615119?v=1" width="500" height="405" frameborder="0" scrolling="no" allowfullscreen></iframe>
      
      <h2>About MarqueeKit</h2>
      <p>MarqueeKit is a toolkit that allows you to easily implement smooth, customizable, and performant image marquees in your web applications using HTML, CSS, and JavaScript. It's designed to help developers add dynamic scrolling content without compromising performance or accessibility.</p>
      
      <h2>Features</h2>
      <ul>
        <li>Easy integration with any web project</li>
        <li>Highly customizable animations and styles</li>
        <li>Optimized for performance and accessibility</li>
        <li>Responsive design out of the box</li>
      </ul>
      
      <h2>Get Started</h2>
      <p>To start using MarqueeKit, follow our <a href="/blog/getting-started-with-marqueekit">Getting Started Guide</a>. Since MarqueeKit is not available via npm, you'll need to include the <code>marquee.js</code> and <code>marquee.css</code> files directly in your project.</p>
      
      <h2>Pricing Information</h2>
      <p>MarqueeKit offers advanced features and premium support through our paid plans. To learn more about our pricing, please visit <a href="https://marqueekit.com/pricing">marqueekit.com/pricing</a>.</p>
      
      <h2>Thank You</h2>
      <p>I want to extend a huge thank you to everyone who has supported the development of MarqueeKit. Your feedback and encouragement have been invaluable.</p>
      
      <p>Feel free to reach out with any questions or suggestions!</p>
    `,
    author: 'Kean Edwards',
    date: '2024-11-17',
    readingTime: '3 min',
    slug: 'launching-marqueekit-on-product-hunt',
    tags: ['Announcement', 'Product Hunt', 'Launch'],
    image: '/blog/product-hunt.png',
  },
];
