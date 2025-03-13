'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ButtonGenerator = () => {
  const [buttonText, setButtonText] = useState('Click Me');
  const [buttonColor, setButtonColor] = useState('#4F46E5'); // Default color
  const [buttonSize, setButtonSize] = useState('md'); // Default size
  const [buttonStyle, setButtonStyle] = useState('solid'); // Default style
  const [hoverEffect, setHoverEffect] = useState('bg-blue-600'); // Default hover effect

  const buttonSizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };

  const buttonClasses = `
    ${buttonSizes[buttonSize]} 
    ${buttonStyle === 'solid' ? 'bg-blue-500 text-white' : 'bg-transparent border border-blue-500 text-blue-500'}
    rounded-lg 
    hover:${hoverEffect} 
    transition-colors duration-200
  `;

  const handleCopyCode = () => {
    const code = `<button class="${buttonClasses}" style="background-color: ${buttonStyle === 'solid' ? buttonColor : 'transparent'};">${buttonText}</button>`;
    navigator.clipboard.writeText(code).then(() => {
      alert('Button code copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Button Generator Tool
          </h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Text
            </label>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter button text"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Color
            </label>
            <input
              type="color"
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Size
            </label>
            <select
              value={buttonSize}
              onChange={(e) => setButtonSize(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Style
            </label>
            <select
              value={buttonStyle}
              onChange={(e) => setButtonStyle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="solid">Solid</option>
              <option value="outline">Outline</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hover Effect
            </label>
            <select
              value={hoverEffect}
              onChange={(e) => setHoverEffect(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="bg-blue-600">Solid Darker</option>
              <option value="bg-blue-100">Outline Light</option>
              <option value="bg-blue-300">Solid Lighter</option>
            </select>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Button Preview</h2>
            <button
              className={buttonClasses}
              style={{ backgroundColor: buttonStyle === 'solid' ? buttonColor : 'transparent' }}
            >
              {buttonText}
            </button>
          </div>

          <div className="mt-8">
            <button
              onClick={handleCopyCode}
              className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
            >
              Copy Button Code
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ButtonGenerator;
