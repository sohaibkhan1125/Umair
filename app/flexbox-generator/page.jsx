'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FlexboxGenerator = () => {
    const [flexDirection, setFlexDirection] = useState('row');
    const [justifyContent, setJustifyContent] = useState('flex-start');
    const [alignItems, setAlignItems] = useState('stretch');
    const [flexWrap, setFlexWrap] = useState('nowrap');
    const [copySuccess, setCopySuccess] = useState('');

    const flexContainerStyle = {
        display: 'flex',
        flexDirection: flexDirection,
        justifyContent: justifyContent,
        alignItems: alignItems,
        flexWrap: flexWrap,
        height: '200px',
        border: '2px dashed #ccc',
        padding: '10px',
        marginBottom: '20px',
    };

    const generateFlexboxCode = () => {
        return `
            display: flex;
            flex-direction: ${flexDirection};
            justify-content: ${justifyContent};
            align-items: ${alignItems};
            flex-wrap: ${flexWrap};
        `;
    };

    const copyToClipboard = () => {
        const code = generateFlexboxCode();
        navigator.clipboard.writeText(code).then(() => {
            setCopySuccess('Flexbox code copied to clipboard!');
            setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Flexbox Layout Generator</h1>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700">Flex Direction</label>
                        <select
                            value={flexDirection}
                            onChange={(e) => setFlexDirection(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="row">Row</option>
                            <option value="row-reverse">Row Reverse</option>
                            <option value="column">Column</option>
                            <option value="column-reverse">Column Reverse</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Justify Content</label>
                        <select
                            value={justifyContent}
                            onChange={(e) => setJustifyContent(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="flex-start">Flex Start</option>
                            <option value="flex-end">Flex End</option>
                            <option value="center">Center</option>
                            <option value="space-between">Space Between</option>
                            <option value="space-around">Space Around</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Align Items</label>
                        <select
                            value={alignItems}
                            onChange={(e) => setAlignItems(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="stretch">Stretch</option>
                            <option value="flex-start">Flex Start</option>
                            <option value="flex-end">Flex End</option>
                            <option value="center">Center</option>
                            <option value="baseline">Baseline</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Flex Wrap</label>
                        <select
                            value={flexWrap}
                            onChange={(e) => setFlexWrap(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="nowrap">No Wrap</option>
                            <option value="wrap">Wrap</option>
                            <option value="wrap-reverse">Wrap Reverse</option>
                        </select>
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="w-full bg-green-500 text-white p-2 rounded-lg mt-4"
                    >
                        Copy Flexbox Code
                    </button>
                    {copySuccess && (
                        <div className="mt-2 text-green-500">{copySuccess}</div>
                    )}
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Preview</h2>
                    <div style={flexContainerStyle}>
                        <div className="flex-item bg-blue-500 text-white p-4 m-2">Item 1</div>
                        <div className="flex-item bg-green-500 text-white p-4 m-2">Item 2</div>
                        <div className="flex-item bg-red-500 text-white p-4 m-2">Item 3</div>
                        <div className="flex-item bg-yellow-500 text-white p-4 m-2">Item 4</div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FlexboxGenerator;
