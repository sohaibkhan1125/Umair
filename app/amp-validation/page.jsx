'use client'
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AmpValidation = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const validateAMP = async () => {
        if (!url.trim()) {
            alert('Please enter a valid URL.');
            return;
        }

        setLoading(true);
        setShowResult(false);

        // Simulate API call (replace with actual API call in production)
        setTimeout(() => {
            const isValidAMP = Math.random() > 0.5; // Random result for demo
            setResult({
                isValid: isValidAMP,
                url: url
            });
            setLoading(false);
            setShowResult(true);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-6">
                <div className=" mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                        AMP Validator Tool
                    </h1>

                    <div className="mb-6">
                        <label 
                            htmlFor="url" 
                            className="block text-gray-600 text-lg mb-2"
                        >
                            Enter the URL of the page to validate:
                        </label>
                        <input
                            type="text"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter URL..."
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-md focus:border-blue-600 focus:outline-none transition-colors duration-200"
                        />
                    </div>

                    <button
                        onClick={validateAMP}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400"
                    >
                        {loading ? 'Validating...' : 'Validate AMP'}
                    </button>

                    {loading && (
                        <div className="mt-6 text-center text-blue-600">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-2">Validating...</p>
                        </div>
                    )}

                    {showResult && (
                        <div className={`mt-6 p-4 rounded-md ${
                            result.isValid 
                                ? 'bg-green-100 border-2 border-green-200 text-green-800' 
                                : 'bg-red-100 border-2 border-red-200 text-red-800'
                        }`}>
                            <p className="text-lg">
                                The page at <strong>{result.url}</strong> is 
                                {result.isValid ? ' a valid' : ' not a valid'} AMP page.
                            </p>
                        </div>
                    )}

                    {/* Additional Information Section */}
                    <div className="mt-8 p-6 bg-gray-50 rounded-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            What is AMP Validation?
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            AMP (Accelerated Mobile Pages) validation ensures your web pages 
                            comply with AMP specifications for faster mobile loading. Valid AMP 
                            pages can be cached by Google and other platforms, potentially 
                            improving search visibility and user experience.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AmpValidation;
