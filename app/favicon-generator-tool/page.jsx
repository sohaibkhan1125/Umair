'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../../components/ui/button';
import html2canvas from 'html2canvas';

const FaviconGenerator = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [text, setText] = useState('A');
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [backgroundColor, setBackgroundColor] = useState('#3B82F6');
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
  const [fontWeight, setFontWeight] = useState('bold');
  const [borderRadius, setBorderRadius] = useState(0);
  const [generatedFavicon, setGeneratedFavicon] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageSize, setImageSize] = useState(64);
  
  const faviconRef = useRef(null);
  
  // Font options
  const fontOptions = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'Courier New, monospace', label: 'Courier New' },
    { value: 'Tahoma, sans-serif', label: 'Tahoma' },
    { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
    { value: 'Impact, sans-serif', label: 'Impact' },
    { value: 'Comic Sans MS, cursive', label: 'Comic Sans MS' },
  ];
  
  // Font weight options
  const fontWeightOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'bold', label: 'Bold' },
  ];
  
  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Generate favicon from the reference div
  const generateFavicon = async () => {
    if (!faviconRef.current) return;
    
    try {
      const canvas = await html2canvas(faviconRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });
      
      const faviconDataUrl = canvas.toDataURL('image/png');
      setGeneratedFavicon(faviconDataUrl);
    } catch (error) {
      console.error('Error generating favicon:', error);
    }
  };
  
  // Download favicon
  const downloadFavicon = () => {
    if (!generatedFavicon) return;
    
    const link = document.createElement('a');
    link.href = generatedFavicon;
    link.download = 'favicon.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Reset to default values
  const resetForm = () => {
    if (activeTab === 'text') {
      setText('A');
      setFontSize(48);
      setTextColor('#FFFFFF');
      setBackgroundColor('#3B82F6');
      setFontFamily('Arial, sans-serif');
      setFontWeight('bold');
      setBorderRadius(0);
    } else {
      setUploadedImage(null);
      setImageSize(64);
    }
    setGeneratedFavicon(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Favicon Generator Tool
          </h1>
          
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                className={`py-2 px-4 ${activeTab === 'text' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => {
                  setActiveTab('text');
                  setGeneratedFavicon(null);
                }}
              >
                Text Favicon
              </button>
              <button
                className={`py-2 px-4 ${activeTab === 'image' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => {
                  setActiveTab('image');
                  setGeneratedFavicon(null);
                }}
              >
                Image Favicon
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {activeTab === 'text' ? (
                <div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text (1-2 characters recommended)
                    </label>
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value.slice(0, 2))}
                      maxLength={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size: {fontSize}px
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="60"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Family
                    </label>
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {fontOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Weight
                    </label>
                    <select
                      value={fontWeight}
                      onChange={(e) => setFontWeight(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {fontWeightOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-12 h-12 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
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
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Border Radius: {borderRadius}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="32"
                      value={borderRadius}
                      onChange={(e) => setBorderRadius(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full py-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: Square image, PNG or JPG format
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Size: {imageSize}px
                    </label>
                    <input
                      type="range"
                      min="16"
                      max="128"
                      value={imageSize}
                      onChange={(e) => setImageSize(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex space-x-4 mt-8">
                <Button
                  onClick={generateFavicon}
                  className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
                  disabled={(activeTab === 'image' && !uploadedImage)}
                >
                  Generate Favicon
                </Button>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="flex-1 py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
                >
                  Reset
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold mb-6">Preview</h2>
              
              <div className="relative mb-8">
                {activeTab === 'text' ? (
                  <div
                    ref={faviconRef}
                    className="flex items-center justify-center"
                    style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: backgroundColor,
                      color: textColor,
                      fontFamily: fontFamily,
                      fontSize: `${fontSize}px`,
                      fontWeight: fontWeight,
                      borderRadius: `${borderRadius}px`,
                      textAlign: 'center',
                      lineHeight: 1,
                    }}
                  >
                    {text}
                  </div>
                ) : (
                  uploadedImage && (
                    <div
                      ref={faviconRef}
                      style={{
                        width: `${imageSize}px`,
                        height: `${imageSize}px`,
                      }}
                    >
                      <img 
                        src={uploadedImage} 
                        alt="Favicon Preview" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  )
                )}
              </div>
              
              {generatedFavicon && (
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-4">Generated Favicon</h3>
                  <div className="mb-4">
                    <img 
                      src={generatedFavicon} 
                      alt="Generated Favicon" 
                      className="mx-auto border border-gray-200" 
                      style={{ width: '64px', height: '64px' }}
                    />
                  </div>
                  
                  <Button
                    onClick={downloadFavicon}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
                  >
                    Download Favicon
                  </Button>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium mb-2">How to use your favicon:</h4>
                    <ol className="text-xs text-gray-600 list-decimal list-inside">
                      <li className="mb-1">Download the favicon image</li>
                      <li className="mb-1">Save it as "favicon.ico" in your website's root directory</li>
                      <li className="mb-1">Add this code to your HTML head section:</li>
                    </ol>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                      {`<link rel="icon" href="favicon.ico" type="image/x-icon" />`}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FaviconGenerator; 