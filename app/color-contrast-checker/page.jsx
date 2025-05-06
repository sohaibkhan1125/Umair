'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../../components/ui/button';

const ColorContrastChecker = () => {
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [contrastRatio, setContrastRatio] = useState(21);
  const [wcagAA, setWcagAA] = useState(true);
  const [wcagAAA, setWcagAAA] = useState(true);
  const [sampleText, setSampleText] = useState('Sample Text');
  const [fontSize, setFontSize] = useState('16');
  const [isBold, setIsBold] = useState(false);

  // Function to calculate the relative luminance of a color
  const calculateLuminance = (hexColor) => {
    // Remove # if present
    hexColor = hexColor.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hexColor.substr(0, 2), 16) / 255;
    const g = parseInt(hexColor.substr(2, 2), 16) / 255;
    const b = parseInt(hexColor.substr(4, 2), 16) / 255;
    
    // Calculate the luminance using the formula
    const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  // Function to calculate contrast ratio
  const calculateContrastRatio = (color1, color2) => {
    const luminance1 = calculateLuminance(color1);
    const luminance2 = calculateLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  };

  // Check WCAG compliance
  const checkWCAGCompliance = (ratio, fontSize, isBold) => {
    // Convert font size to a number
    const size = parseFloat(fontSize);
    
    // WCAG AA: 4.5:1 for normal text, 3:1 for large text
    // WCAG AAA: 7:1 for normal text, 4.5:1 for large text
    const isLargeText = (size >= 18) || (size >= 14 && isBold);
    
    const aa = isLargeText ? ratio >= 3 : ratio >= 4.5;
    const aaa = isLargeText ? ratio >= 4.5 : ratio >= 7;
    
    return { aa, aaa };
  };

  // Swap colors
  const swapColors = () => {
    const temp = foregroundColor;
    setForegroundColor(backgroundColor);
    setBackgroundColor(temp);
  };

  // Update contrast ratio when colors change
  useEffect(() => {
    const ratio = calculateContrastRatio(foregroundColor, backgroundColor);
    setContrastRatio(ratio);
    
    const { aa, aaa } = checkWCAGCompliance(ratio, fontSize, isBold);
    setWcagAA(aa);
    setWcagAAA(aaa);
  }, [foregroundColor, backgroundColor, fontSize, isBold]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Color Contrast Checker
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Choose Colors</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="w-12 h-12 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-12 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <Button
                onClick={swapColors}
                className="w-full mb-8"
              >
                Swap Colors
              </Button>

              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Text Properties</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size (px)
                    </label>
                    <input
                      type="number"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      min="8"
                      max="72"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-end mb-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isBold}
                        onChange={() => setIsBold(!isBold)}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">Bold</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sample Text
                </label>
                <input
                  type="text"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              
              <div 
                className="mb-6 p-8 rounded-lg flex items-center justify-center text-center"
                style={{ 
                  backgroundColor: backgroundColor,
                  color: foregroundColor,
                  minHeight: '200px',
                  fontSize: `${fontSize}px`,
                  fontWeight: isBold ? 'bold' : 'normal'
                }}
              >
                {sampleText}
              </div>
              
              <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium">Contrast Ratio</span>
                  <span className={`text-lg font-bold ${contrastRatio >= 4.5 ? 'text-green-600' : 'text-red-600'}`}>
                    {contrastRatio.toFixed(2)}:1
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 h-3 rounded-full mb-6">
                  <div 
                    className={`h-3 rounded-full ${getContrastRatioColor(contrastRatio)}`} 
                    style={{ width: `${Math.min(contrastRatio / 21 * 100, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700">WCAG AA</span>
                  <span className={`font-medium ${wcagAA ? 'text-green-600' : 'text-red-600'}`}>
                    {wcagAA ? 'Pass' : 'Fail'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700">WCAG AAA</span>
                  <span className={`font-medium ${wcagAAA ? 'text-green-600' : 'text-red-600'}`}>
                    {wcagAAA ? 'Pass' : 'Fail'}
                  </span>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <h3 className="font-medium mb-2">WCAG Guidelines:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.</li>
                  <li>AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.</li>
                  <li>Large text is defined as 14pt bold or 18pt (or larger) regular.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Helper function to get color class based on contrast ratio
const getContrastRatioColor = (ratio) => {
  if (ratio >= 7) return 'bg-green-500';
  if (ratio >= 4.5) return 'bg-green-400';
  if (ratio >= 3) return 'bg-yellow-400';
  return 'bg-red-500';
};

export default ColorContrastChecker; 