'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HtmlFormatter = () => {
  const [htmlInput, setHtmlInput] = useState(''); // Input HTML code
  const [formattedHtml, setFormattedHtml] = useState(''); // Formatted HTML output

  const formatHtml = () => {
    const formatted = htmlInput
      .replace(/>\s+</g, '><') // Remove whitespace between tags
      .replace(/</g, '\n<') // Add new line before each tag
      .replace(/(\s*<\/\w+>)/g, '$1\n') // Add new line after closing tags
      .trim(); // Trim leading and trailing whitespace
    setFormattedHtml(formatted);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedHtml).then(() => {
      alert('Formatted HTML copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            HTML Formatter
          </h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input HTML
            </label>
            <textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              rows="10"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Paste your HTML code here..."
            />
          </div>

          <button
            onClick={formatHtml}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Format HTML
          </button>

          {formattedHtml && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Formatted HTML</h2>
              <pre className="bg-gray-100 p-4 rounded-md border border-gray-300 overflow-x-auto">
                {formattedHtml}
              </pre>
              <button
                onClick={handleCopy}
                className="mt-4 w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
              >
                Copy Formatted HTML
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HtmlFormatter;
