"use client";

import React from 'react';
import { CopyableCode } from '@/components/ui/copyable-code';
import { Play, Settings, Gauge, Loader, Wand2 } from 'lucide-react';

export default function MethodsPage() {
  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 max-w-4xl relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Methods</h1>
          <p className="text-xl text-gray-400">
            Control and customize your marquee programmatically
          </p>
        </div>

        <div className="space-y-12">
          {/* Playback Control */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Play className="h-6 w-6 text-blue-500" />
                Playback Control
              </h2>

              <div className="grid gap-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <code className="text-blue-400">play()</code>
                  <p className="text-gray-300 mt-2">
                    Starts or resumes the marquee animation with smooth acceleration.
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-400">
                    <li>• Smoothly accelerates to target speed</li>
                    <li>• Maintains hardware acceleration</li>
                    <li>• Preserves current position</li>
                  </ul>
                  <CopyableCode 
                    className="mt-3"
                    code={`const marquee = new MarqueeKit("#my-marquee", options);

// Start or resume animation
marquee.play();

// Example: Play/Pause toggle
let isPlaying = true;
toggleButton.addEventListener('click', () => {
  if (isPlaying) {
    marquee.pause();
    toggleButton.textContent = "Play";
  } else {
    marquee.play();
    toggleButton.textContent = "Pause";
  }
  isPlaying = !isPlaying;
});`}
                  />
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <code className="text-blue-400">pause()</code>
                  <p className="text-gray-300 mt-2">
                    Gradually slows the marquee to a smooth stop.
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-400">
                    <li>• Uses smooth deceleration</li>
                    <li>• Maintains current position</li>
                    <li>• Can be resumed with play()</li>
                  </ul>
                  <CopyableCode 
                    className="mt-3"
                    code={`const marquee = new MarqueeKit("#product-showcase", options);

// Example: Pause on video play
const video = document.querySelector("#promo-video");

video.addEventListener("play", () => {
  marquee.pause();  // Smoothly pause marquee
});

video.addEventListener("pause", () => {
  marquee.play();   // Resume marquee
});`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Speed Control */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Gauge className="h-6 w-6 text-blue-500" />
                Speed Control
              </h2>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <code className="text-blue-400">setSpeed(speed: number)</code>
                <p className="text-gray-300 mt-2">
                  Updates the marquee scroll speed with smooth transition.
                </p>
                <ul className="mt-2 space-y-1 text-gray-400">
                  <li>• Smoothly transitions to new speed</li>
                  <li>• Maintains scroll position</li>
                  <li>• Hardware accelerated</li>
                </ul>
                <CopyableCode 
                  className="mt-3"
                  code={`const marquee = new MarqueeKit("#image-gallery", options);

// Example: Speed control with range input
const speedControl = document.querySelector("#speed-slider");
speedControl.addEventListener("input", (e) => {
  const newSpeed = parseInt(e.target.value);
  marquee.setSpeed(newSpeed);
});

// Example: Speed presets
const speeds = {
  slow: 30,
  normal: 50,
  fast: 80
};

function setSpeedPreset(preset) {
  marquee.setSpeed(speeds[preset]);
  
  // Update UI
  document.querySelector(".active-speed")?.classList.remove("active-speed");
  document.querySelector(\`[data-speed="\${preset}"]\`).classList.add("active-speed");
}`}
                />
              </div>
            </div>
          </section>

          {/* Visual Adjustments */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Wand2 className="h-6 w-6 text-blue-500" />
                Visual Adjustments
              </h2>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <code className="text-blue-400">setBorderRadius(radius: number)</code>
                <p className="text-gray-300 mt-2">
                  Updates the border radius of all images with smooth transition.
                </p>
                <ul className="mt-2 space-y-1 text-gray-400">
                  <li>• Affects all images instantly</li>
                  <li>• Smooth transition animation</li>
                  <li>• Can be used for dynamic effects</li>
                </ul>
                <CopyableCode 
                  className="mt-3"
                  code={`const marquee = new MarqueeKit("#team-photos", options);

// Example: Shape toggle button
let isCircular = false;
const toggleShape = () => {
  isCircular = !isCircular;
  marquee.setBorderRadius(isCircular ? 9999 : 8);
  
  shapeButton.textContent = isCircular ? 
    "Make Square" : "Make Circular";
};

// Example: Border radius slider
radiusSlider.addEventListener("input", (e) => {
  marquee.setBorderRadius(parseInt(e.target.value));
});`}
                />
              </div>
            </div>
          </section>

          {/* Advanced Usage */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Settings className="h-6 w-6 text-blue-500" />
                Advanced Usage
              </h2>

              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Combining Methods
                  </h3>
                  <CopyableCode 
                    code={`const marquee = new MarqueeKit("#interactive-gallery", options);

// Create an interactive control panel
class MarqueeController {
  constructor(marquee) {
    this.marquee = marquee;
    this.isPlaying = true;
    this.isCircular = false;
    this.currentSpeed = 50;
    this.setupControls();
  }

  setupControls() {
    // Speed control
    this.speedSlider = document.querySelector("#speed");
    this.speedSlider.addEventListener("input", (e) => {
      this.currentSpeed = parseInt(e.target.value);
      this.marquee.setSpeed(this.currentSpeed);
      this.updateSpeedDisplay();
    });

    // Play/Pause toggle
    this.playButton = document.querySelector("#playPause");
    this.playButton.addEventListener("click", () => {
      this.isPlaying ? this.marquee.pause() : this.marquee.play();
      this.isPlaying = !this.isPlaying;
      this.updatePlayButton();
    });

    // Shape toggle
    this.shapeButton = document.querySelector("#shapeToggle");
    this.shapeButton.addEventListener("click", () => {
      this.isCircular = !this.isCircular;
      this.marquee.setBorderRadius(this.isCircular ? 9999 : 8);
      this.updateShapeButton();
    });
  }

  updateSpeedDisplay() {
    document.querySelector("#speedValue").textContent = this.currentSpeed;
  }

  updatePlayButton() {
    this.playButton.textContent = this.isPlaying ? "Pause" : "Play";
  }

  updateShapeButton() {
    this.shapeButton.textContent = this.isCircular ? 
      "Make Square" : "Make Circular";
  }
}

// Initialize controller
new MarqueeController(marquee);`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Responsive Behavior
                  </h3>
                  <CopyableCode 
                    code={`const marquee = new MarqueeKit("#responsive-marquee", options);

// Adjust marquee based on viewport size
function updateMarqueeForViewport() {
  const viewportWidth = window.innerWidth;
  
  if (viewportWidth < 768) {
    marquee.setSpeed(30);  // Slower on mobile
    marquee.setBorderRadius(4);  // Smaller radius
  } else {
    marquee.setSpeed(50);  // Normal speed on desktop
    marquee.setBorderRadius(8);  // Normal radius
  }
}

// Listen for resize events
window.addEventListener('resize', 
  debounce(updateMarqueeForViewport, 250)
);

// Initial setup
updateMarqueeForViewport();`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Cleanup */}
          <section className="space-y-6">
            <div className="group p-6 rounded-xl border hover:border-gray-300 transition-colors bg-black/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Loader className="h-6 w-6 text-blue-500" />
                Cleanup
              </h2>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <code className="text-blue-400">destroy()</code>
                <p className="text-gray-300 mt-2">
                  Cleans up the marquee instance and removes all event listeners.
                </p>
                <ul className="mt-2 space-y-1 text-gray-400">
                  <li>• Stops all animations</li>
                  <li>• Removes event listeners</li>
                  <li>• Cleans up DOM elements</li>
                  <li>• Prevents memory leaks</li>
                </ul>
                <CopyableCode 
                  className="mt-3"
                  code={`const marquee = new MarqueeKit("#dynamic-marquee", options);

// Example: Cleanup when component unmounts
function cleanup() {
  marquee.destroy();  // Clean up instance
}

// Example: Dynamic content updates
function updateContent(newImages) {
  marquee.destroy();  // Clean up old instance
  
  // Create new instance with new images
  return new MarqueeKit("#dynamic-marquee", {
    ...options,
    images: newImages
  });
}`}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}