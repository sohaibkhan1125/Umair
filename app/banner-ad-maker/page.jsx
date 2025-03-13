'use client'
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Download, RefreshCw } from 'lucide-react';
import dynamic from 'next/dynamic';

const BannerAdMaker = () => {
  const [bannerText, setBannerText] = useState('Your Banner Text');
  const [bannerColor, setBannerColor] = useState('#3B82F6');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState(32);
  const [bannerWidth, setBannerWidth] = useState(728);
  const [bannerHeight, setBannerHeight] = useState(90);
  const [isLoading, setIsLoading] = useState(false);
  const bannerRef = useRef(null);

  const bannerSizes = [
    { width: 728, height: 90, name: 'Leaderboard' },
    { width: 300, height: 250, name: 'Medium Rectangle' },
    { width: 160, height: 600, name: 'Wide Skyscraper' },
    { width: 320, height: 50, name: 'Mobile Banner' },
  ];

  const handleDownload = async () => {
    if (!bannerRef.current) return;
    
    setIsLoading(true);
    try {
      // Import html2canvas dynamically
      const html2canvas = (await import('html2canvas')).default;
      
      // Create a temporary container for the banner
      const container = document.createElement('div');
      const banner = bannerRef.current.cloneNode(true);
      
      // Reset transform scale to 1 for the actual download
      banner.style.transform = 'scale(1)';
      container.appendChild(banner);
      document.body.appendChild(container);
      
      // Generate canvas
      const canvas = await html2canvas(banner, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      // Clean up temporary elements
      document.body.removeChild(container);
      
      // Create download link
      const link = document.createElement('a');
      link.download = `banner-${bannerWidth}x${bannerHeight}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating banner:', error);
      alert('Failed to download banner. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSizeChange = (width, height) => {
    setBannerWidth(width);
    setBannerHeight(height);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Professional Banner Ad Maker
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Banner Preview */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div className="flex justify-center items-center bg-gray-100 p-4 rounded-md">
                <div
                  ref={bannerRef}
                  style={{
                    width: `${bannerWidth}px`,
                    height: `${bannerHeight}px`,
                    backgroundColor: bannerColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    transform: 'scale(0.8)',
                    transformOrigin: 'center',
                  }}
                  className="rounded-md shadow-md transition-colors duration-200"
                >
                  <p
                    style={{
                      color: textColor,
                      fontSize: `${fontSize}px`,
                      textAlign: 'center',
                      padding: '20px',
                      wordBreak: 'break-word',
                      width: '100%',
                      margin: 0,
                    }}
                    className="font-semibold"
                  >
                    {bannerText}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Customize Banner</h2>
              
              <div className="space-y-4">
                {/* Text Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Banner Text
                  </label>
                  <input
                    type="text"
                    value={bannerText}
                    onChange={(e) => setBannerText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your banner text"
                  />
                </div>

                {/* Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Background Color
                    </label>
                    <input
                      type="color"
                      value={bannerColor}
                      onChange={(e) => setBannerColor(e.target.value)}
                      className="w-full h-10 rounded-md cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Text Color
                    </label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full h-10 rounded-md cursor-pointer"
                    />
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="16"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Banner Sizes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banner Size
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {bannerSizes.map((size) => (
                      <button
                        key={size.name}
                        onClick={() => handleSizeChange(size.width, size.height)}
                        className={`px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                          bannerWidth === size.width && bannerHeight === size.height
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        {size.name}
                        <span className="block text-xs opacity-75">
                          {size.width}x{size.height}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  disabled={isLoading}
                  className="w-full mt-4 px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download Banner
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Enter your desired text in the banner text field</li>
              <li>Choose background and text colors using the color pickers</li>
              <li>Adjust the font size using the slider</li>
              <li>Select a standard banner size from the available options</li>
              <li>Click the Download button to save your banner as a PNG image</li>
            </ol>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BannerAdMaker;
