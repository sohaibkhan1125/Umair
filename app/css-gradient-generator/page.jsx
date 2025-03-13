'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CssGradientGenerator = () => {
  const [color1, setColor1] = useState('#ff7e5f'); // Default color 1
  const [color2, setColor2] = useState('#feb47b'); // Default color 2
  const [gradientType, setGradientType] = useState('linear'); // Default gradient type
  const [angle, setAngle] = useState(90); // Default angle for linear gradient
  const [cssGradient, setCssGradient] = useState('');

  const generateGradient = () => {
    const gradient = gradientType === 'linear'
      ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;
    setCssGradient(gradient);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cssGradient).then(() => {
      alert('Gradient CSS copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            CSS Gradient Generator
          </h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color 1
            </label>
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color 2
            </label>
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gradient Type
            </label>
            <select
              value={gradientType}
              onChange={(e) => setGradientType(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
          </div>

          {gradientType === 'linear' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Angle (degrees)
              </label>
              <input
                type="number"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter angle (0-360)"
                min="0"
                max="360"
              />
            </div>
          )}

          <button
            onClick={generateGradient}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Generate Gradient
          </button>

          {cssGradient && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Generated CSS Gradient</h2>
              <div
                className="h-32 rounded-md"
                style={{ background: cssGradient }}
              />
              <pre className="bg-gray-100 p-4 rounded-md border border-gray-300 overflow-x-auto mt-2">
                {cssGradient}
              </pre>
              <button
                onClick={handleCopy}
                className="mt-4 w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
              >
                Copy Gradient CSS
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CssGradientGenerator;
