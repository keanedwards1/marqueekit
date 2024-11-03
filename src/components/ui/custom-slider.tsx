// src/components/ui/CustomSlider.tsx

import React, { useState, useCallback, useRef } from 'react';

interface CustomSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ min, max, step, value, onChange }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateValue = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;

      const { left, width } = sliderRef.current.getBoundingClientRect();
      const percent = Math.min(1, Math.max(0, (clientX - left) / width));
      const newValue = Math.round((min + percent * (max - min)) / step) * step;
      onChange(newValue);
    },
    [min, max, step, onChange]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    calculateValue(e.clientX);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      calculateValue(e.clientX);
    }
  }, [isDragging, calculateValue]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      className="relative w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
    >
      <div
        className="absolute h-2 bg-blue-500 rounded-lg"
        style={{ width: `${percent}%` }}
      />
      <div
        className="absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer"
        style={{ left: `calc(${percent}% - 8px)`, top: '-6px' }}
      />
    </div>
  );
};

export default CustomSlider;
