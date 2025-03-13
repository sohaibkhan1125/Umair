'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DmcaDisclaimerGenerator = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [disclaimer, setDisclaimer] = useState('');

    const generateDisclaimer = () => {
        const disclaimerText = `
            DMCA Disclaimer

            This website, ${website}, is protected by copyright law. 
            If you believe that your work has been copied in a way that constitutes copyright infringement, 
            please contact us at ${email}.

            Name: ${name}
            Email: ${email}
            Website: ${website}
        `;
        setDisclaimer(disclaimerText);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                        DMCA Disclaimer Generator
                    </h1>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Website
                        </label>
                        <input
                            type="text"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        onClick={generateDisclaimer}
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
                    >
                        Generate Disclaimer
                    </button>

                    {disclaimer && (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Generated DMCA Disclaimer</h2>
                            <pre className="bg-gray-100 p-4 rounded-md border border-gray-300 overflow-x-auto">
                                {disclaimer}
                            </pre>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DmcaDisclaimerGenerator;
