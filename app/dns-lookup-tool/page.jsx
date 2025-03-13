'use client';

import React, { useState } from 'react';
import http from 'https';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DnsLookupTool = () => {
    const [domain, setDomain] = useState('');
    const [dnsRecords, setDnsRecords] = useState(null);
    const [error, setError] = useState('');

    const handleDomainChange = (e) => {
        setDomain(e.target.value);
    };

    const performDnsLookup = () => {
        setError('');
        setDnsRecords(null);
        
        const options = {
            method: 'GET',
            hostname: 'dns-lookup11.p.rapidapi.com',
            port: null,
            path: `/nslookup?domain=${domain}`,
            headers: {
                'x-rapidapi-key': 'b9b276d0c1msh822603b0c726babp1e9c4djsn4fbc5f965e78',
                'x-rapidapi-host': 'dns-lookup11.p.rapidapi.com'
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on('data', function (chunk) {
                chunks.push(chunk);
            });

            res.on('end', function () {
                const body = Buffer.concat(chunks);
                const data = JSON.parse(body.toString());
                setDnsRecords(data);
            });
        });

        req.on('error', (err) => {
            setError('Failed to fetch DNS records');
            console.error(err);
        });

        req.end();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                        DNS Lookup Tool
                    </h1>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter Domain Name
                        </label>
                        <input
                            type="text"
                            value={domain}
                            onChange={handleDomainChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        onClick={performDnsLookup}
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
                    >
                        Lookup DNS Records
                    </button>

                    {error && (
                        <div className="mt-4 text-red-500">
                            {error}
                        </div>
                    )}

                    {dnsRecords && (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">DNS Records</h2>
                            <pre className="bg-gray-100 p-4 rounded-md border border-gray-300 overflow-x-auto">
                                {JSON.stringify(dnsRecords, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DnsLookupTool;
