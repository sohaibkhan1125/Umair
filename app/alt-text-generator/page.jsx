'use client'
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Copy, Check } from "lucide-react";

const AltTextGenerator = () => {
    const [image, setImage] = useState(null);
    const [altText, setAltText] = useState('');
    const [showAltText, setShowAltText] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                const generatedAltText = `An image of ${generateDescription(file.name)}`;
                setAltText(generatedAltText);
                setShowAltText(true);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file.');
        }
    };

    const generateDescription = (filename) => {
        const keywords = ["beautiful", "stunning", "vibrant", "dynamic", "detailed", "complex"];
        const subjects = ["landscape", "cityscape", "portrait", "animal", "object", "scene"];
        const randKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        const randSubject = subjects[Math.floor(Math.random() * subjects.length)];
        return `${randKeyword} ${randSubject}`;
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(altText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto p-6 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                    <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Alt Text Generator</h1>
                    
                    <div className="mb-4">
                        <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">Upload Image:</label>
                        <input 
                            type="file" 
                            id="imageUpload" 
                            accept="image/*" 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleImageUpload}
                        />
                    </div>

                    {image && (
                        <div className="mb-4 flex justify-center">
                            <img src={image} alt="Preview" className="w-96 h-96 rounded-md shadow-sm object-cover" />
                        </div>
                    )}

                    <button 
                        onClick={() => setShowAltText(true)} 
                        className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold hover:bg-blue-600"
                    >
                        Generate Alt Text
                    </button>

                    {showAltText && (
                        <div id="altTextOutput" className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-300">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold">Generated Alt Text:</h2>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors duration-200"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-4 w-4" />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <textarea 
                                id="altTextResult" 
                                rows="4" 
                                className="w-full p-2 border border-gray-300 rounded-md bg-white" 
                                value={altText} 
                                readOnly 
                            />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AltTextGenerator;
