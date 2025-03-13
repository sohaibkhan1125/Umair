'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CssCodeFormatter = () => {
  const [cssInput, setCssInput] = useState('');
  const [formattedCss, setFormattedCss] = useState('');

  const formatCss = () => {
    try {
      // Using a simple regex to format CSS
      const formatted = cssInput
        .replace(/([{}])/g, '\n$1\n') // Add new lines around braces
        .replace(/;\s*/g, ';\n') // Add new lines after semicolons
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .trim(); // Trim leading/trailing whitespace

      setFormattedCss(formatted);
    } catch (error) {
      setFormattedCss('Error formatting CSS');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedCss).then(() => {
      alert('Formatted CSS copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            CSS Code Formatter
          </h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input CSS Code
            </label>
            <textarea
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value)}
              rows="10"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your CSS code here..."
            />
          </div>

          <button
            onClick={formatCss}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Format CSS
          </button>

          {formattedCss && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Formatted CSS</h2>
              <pre className="bg-gray-100 p-4 rounded-md border border-gray-300 overflow-x-auto">
                {formattedCss}
              </pre>
              <button
                onClick={handleCopy}
                className="mt-4 w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
              >
                Copy Formatted CSS
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CssCodeFormatter;
