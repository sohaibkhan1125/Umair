'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DomainAgeChecker = () => {
    const [domain, setDomain] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const checkDomainAge = () => {
        if (!domain) {
            alert('Please enter a domain name.');
            return;
        }
        fetchDomainAge(domain);
    };

    const fetchDomainAge = (domain) => {
        setLoading(true);
        setError('');
        setResults(null);
        
        fetch(`https://seo-api2.p.rapidapi.com/domain-age-checker?domain=${domain}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'cca330428dmsh4b459b029c77e3cp1a7504jsn8f61efbba564',
                'x-rapidapi-host': 'seo-api2.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.domain_name) {
                displayResults(data);
            } else {
                setError('Failed to fetch domain information.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setError('An error occurred while fetching domain information.');
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const displayResults = (data) => {
        const formattedResults = {
            domainName: data.domain_name || 'N/A',
            domainAge: data.age || 'N/A',
            creationDate: new Date(data.creation_date * 1000).toLocaleDateString() || 'N/A',
            updatedDate: new Date(data.updated_date * 1000).toLocaleDateString() || 'N/A',
            expirationDate: new Date(data.expiration_date * 1000).toLocaleDateString() || 'N/A',
        };
        setResults(formattedResults);
        setError('');
    };

    const copyResults = () => {
        if (results) {
            const resultsText = `
                Domain Name: ${results.domainName}
                Domain Age: ${results.domainAge}
                Creation Date: ${results.creationDate}
                Last Updated: ${results.updatedDate}
                Expiration Date: ${results.expirationDate}
            `.trim();

            navigator.clipboard.writeText(resultsText).then(() => {
                alert('Results copied to clipboard!');
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Domain Age Checker Tool</h1>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label htmlFor="domain" className="block text-gray-700">Enter Domain Name</label>
                        <input
                            type="text"
                            id="domain"
                            className="w-full p-2 border rounded"
                            placeholder="e.g., facebook.com"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={checkDomainAge}
                        className={`w-full text-white p-2 rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Check Domain Age'}
                    </button>
                </div>

                {results && (
                    <div id="results" className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Domain Information</h2>
                        <p className="mb-2">Domain Name: {results.domainName}</p>
                        <p className="mb-2">Domain Age: {results.domainAge}</p>
                        <p className="mb-2">Creation Date: {results.creationDate}</p>
                        <p className="mb-2">Last Updated: {results.updatedDate}</p>
                        <p className="mb-2">Expiration Date: {results.expirationDate}</p>
                        <button
                            onClick={copyResults}
                            className="w-full bg-green-500 text-white p-2 rounded-lg flex items-center justify-center mt-4"
                        >
                            Copy All Results
                        </button>
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

export default DomainAgeChecker;
