'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FaviconGenerator = () => {
    const [file, setFile] = useState(null);
    const [faviconUrl, setFaviconUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFaviconUrl(URL.createObjectURL(selectedFile)); // Preview the favicon
            setError('');
        }
    };

    const generateFavicon = () => {
        if (!file) {
            alert('Please upload an image file.');
            return;
        }

        setLoading(true);
        setError('');

        // Simulate favicon generation process
        setTimeout(() => {
            // Here you would typically handle the file upload and processing
            // For demonstration, we will just set the favicon URL
            setFaviconUrl(URL.createObjectURL(file));
            setLoading(false);
        }, 2000); // Simulate a 2-second processing time
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Favicon Generator Tool</h1>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label htmlFor="file" className="block text-gray-700">Upload Image File</label>
                        <input
                            type="file"
                            id="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        onClick={generateFavicon}
                        className={`w-full text-white p-2 rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Generate Favicon'}
                    </button>
                </div>

                {faviconUrl && (
                    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Generated Favicon</h2>
                        <img src={faviconUrl} alt="Generated Favicon" className="w-16 h-16" />
                        <p className="mt-2">Right-click the image to save it as a favicon.</p>
                    </div>
                )}

                {error && (
                    <div className="mt-4 text-red-500">
                        {error}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default FaviconGenerator;
