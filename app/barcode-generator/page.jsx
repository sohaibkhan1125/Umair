'use client'
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Script from 'next/script';

const BarcodeGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [showError, setShowError] = useState(false);
  const barcodeRef = useRef(null);
  const [isJsBarcodeLoaded, setIsJsBarcodeLoaded] = useState(false);

  useEffect(() => {
    // Load JsBarcode script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js';
    script.async = true;
    script.onload = () => setIsJsBarcodeLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const generateBarcode = () => {
    if (!inputText || !isJsBarcodeLoaded) {
      setShowError(true);
      setDownloadUrl('');
      return;
    }

    setShowError(false);
    const barcodeSvg = barcodeRef.current;
    barcodeSvg.innerHTML = '';

    try {
      // Generate barcode using JsBarcode
      window.JsBarcode(barcodeSvg, inputText, {
        format: "CODE128",
        width: 2,
        height: 100,
        displayValue: true
      });

      // Convert SVG to PNG for download
      const svgData = new XMLSerializer().serializeToString(barcodeSvg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngData = canvas.toDataURL('image/png');
        setDownloadUrl(pngData);
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    } catch (error) {
      console.error('Error generating barcode:', error);
      setShowError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className=" mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
              Barcode Generator
            </h1>
            
            <div className="mb-6">
              <label 
                htmlFor="inputText" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter Text:
              </label>
              <input
                type="text"
                id="inputText"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setShowError(false);
                }}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter text to generate barcode"
              />
            </div>

            <button
              onClick={generateBarcode}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
            >
              Generate Barcode
            </button>
            
            <div className="mt-6 flex flex-col items-center">
              {showError && (
                <p className="text-red-500 mb-4">
                  Please enter some text to generate a barcode.
                </p>
              )}
              <div className="w-full flex justify-center mb-4">
                <svg id="barcode" ref={barcodeRef}></svg>
              </div>
              
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download="barcode.png"
                  className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 text-center"
                >
                  Download Barcode
                </a>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Enter the text you want to convert into a barcode</li>
              <li>Click the "Generate Barcode" button</li>
              <li>Your barcode will be displayed on the screen</li>
              <li>Click the "Download Barcode" button to save it as a PNG image</li>
            </ol>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BarcodeGenerator;
