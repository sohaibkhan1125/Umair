'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HexToJsxConverter = () => {
    const [hexColor, setHexColor] = useState('');
    const [jsxStyle, setJsxStyle] = useState('');
    const [error, setError] = useState('');

    const convertHexToJsx = () => {
        // Validate hex color input
        const hexPattern = /^#([0-9A-F]{3}){1,2}$/i;
        if (!hexPattern.test(hexColor)) {
            setError('Please enter a valid hex color code (e.g., #ff5733 or #f00).');
            setJsxStyle('');
            return;
        }

        // Convert hex to RGB
        let r, g, b;
        if (hexColor.length === 4) { // Short hex format
            r = parseInt(hexColor[1] + hexColor[1], 16);
            g = parseInt(hexColor[2] + hexColor[2], 16);
            b = parseInt(hexColor[3] + hexColor[3], 16);
        } else { // Long hex format
            r = parseInt(hexColor.slice(1, 3), 16);
            g = parseInt(hexColor.slice(3, 5), 16);
            b = parseInt(hexColor.slice(5, 7), 16);
        }

        // Create JSX style object
        const styleObject = `{
            backgroundColor: 'rgb(${r}, ${g}, ${b})'
        }`;

        setJsxStyle(styleObject);
        setError('');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Hex to JSX Converter</h1>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label htmlFor="hexColor" className="block text-gray-700">Enter Hex Color Code</label>
                        <input
                            type="text"
                            id="hexColor"
                            value={hexColor}
                            onChange={(e) => setHexColor(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="#ff5733"
                        />
                    </div>
                    <button
                        onClick={convertHexToJsx}
                        className="w-full bg-blue-500 text-white p-2 rounded-lg"
                    >
                        Convert to JSX
                    </button>
                    {error && (
                        <div className="mt-4 text-red-500">{error}</div>
                    )}
                    {jsxStyle && (
                        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-xl font-bold">Generated JSX Style</h2>
                            <pre className="text-gray-700">{jsxStyle}</pre>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HexToJsxConverter;
