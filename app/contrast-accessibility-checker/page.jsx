'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContrastAccessibilityChecker = () => {
  const [foregroundColor, setForegroundColor] = useState('#FFFFFF'); // Default foreground color
  const [backgroundColor, setBackgroundColor] = useState('#000000'); // Default background color
  const [contrastRatio, setContrastRatio] = useState(null);
  const [isAccessible, setIsAccessible] = useState(null);

  const calculateContrastRatio = (fg, bg) => {
    const luminance = (color) => {
      const rgb = color.match(/\w\w/g).map((x) => parseInt(x, 16) / 255);
      const [r, g, b] = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const fgLuminance = luminance(fg);
    const bgLuminance = luminance(bg);
    const ratio = (Math.max(fgLuminance, bgLuminance) + 0.05) / (Math.min(fgLuminance, bgLuminance) + 0.05);
    return ratio.toFixed(2);
  };

  const checkAccessibility = () => {
    const ratio = calculateContrastRatio(foregroundColor.replace('#', ''), backgroundColor.replace('#', ''));
    setContrastRatio(ratio);
    setIsAccessible(ratio >= 4.5); // WCAG AA standard for normal text
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Contrast Accessibility Checker
          </h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foreground Color
            </label>
            <input
              type="color"
              value={foregroundColor}
              onChange={(e) => setForegroundColor(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <button
            onClick={checkAccessibility}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Check Contrast
          </button>

          {contrastRatio !== null && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Contrast Ratio</h2>
              <p className="text-gray-700">Ratio: {contrastRatio}</p>
              <p className={`text-lg font-bold ${isAccessible ? 'text-green-600' : 'text-red-600'}`}>
                {isAccessible ? 'Accessible' : 'Not Accessible'}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContrastAccessibilityChecker;
