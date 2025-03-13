'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BrowserCapabilityChecker = () => {
  const [capabilities, setCapabilities] = useState([]);
  const [result, setResult] = useState(null);

  const checkCapabilities = () => {
    const features = [
      { name: 'Geolocation', supported: 'geolocation' in navigator },
      { name: 'Web Storage', supported: 'localStorage' in window },
      { name: 'Service Workers', supported: 'serviceWorker' in navigator },
      { name: 'WebSockets', supported: 'WebSocket' in window },
      { name: 'Fetch API', supported: 'fetch' in window },
      { name: 'WebRTC', supported: 'RTCPeerConnection' in window },
      { name: 'WebGL', supported: !!document.createElement('canvas').getContext('webgl') },
    ];

    setCapabilities(features);
    setResult(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Browser Capability Checker
          </h1>

          <button
            onClick={checkCapabilities}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Check Browser Capabilities
          </button>

          {capabilities.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Capabilities</h2>
              <ul className="list-disc list-inside">
                {capabilities.map((feature, index) => (
                  <li key={index} className={`flex justify-between ${feature.supported ? 'text-green-600' : 'text-red-600'}`}>
                    <span>{feature.name}</span>
                    <span>{feature.supported ? 'Supported' : 'Not Supported'}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrowserCapabilityChecker; 