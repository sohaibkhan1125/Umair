'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CssMinifier = () => {
  const [cssInput, setCssInput] = useState(''); // Input CSS code
  const [minifiedCss, setMinifiedCss] = useState(''); // Minified CSS output

  const minifyCss = () => {
    const minified = cssInput
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .replace(/\/\*.*?\*\//g, '') // Remove comments
      .replace(/\s*([{};:])\s*/g, '$1') // Remove spaces around braces, semicolons, and colons
      .trim(); // Trim leading and trailing whitespace
    setMinifiedCss(minified);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(minifiedCss).then(() => {
      alert('Minified CSS copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            CSS Minifier
          </h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input CSS
            </label>
            <textarea
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value)}
              rows="10"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Paste your CSS code here..."
            />
          </div>

          <button
            onClick={minifyCss}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Minify CSS
          </button>

          {minifiedCss && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Minified CSS</h2>
              <pre className="bg-gray-100 p-4 rounded-md border border-gray-300 overflow-x-auto">
                {minifiedCss}
              </pre>
              <button
                onClick={handleCopy}
                className="mt-4 w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
              >
                Copy Minified CSS
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CssMinifier;
