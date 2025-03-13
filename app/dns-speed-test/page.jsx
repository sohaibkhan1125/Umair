'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DnsSpeedTestTool = () => {
    const [dnsList, setDnsList] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const testDNSServers = () => {
        const servers = dnsList.trim().split("\n");
        setResults([]); // Clear previous results
        setShowResults(false);

        if (servers.length === 0) {
            alert("Please enter at least one DNS server.");
            return;
        }

        servers.forEach(server => {
            const startTime = performance.now();
            const img = new Image();
            const url = `https://${server.trim()}/favicon.ico`;

            img.onload = img.onerror = () => {
                const endTime = performance.now();
                const responseTime = Math.round(endTime - startTime);
                setResults(prevResults => [
                    ...prevResults,
                    { server: server.trim(), time: responseTime }
                ]);
                setShowResults(true);
            };

            img.src = url + "?cache=" + Math.random(); // Prevent caching
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                        DNS Speed Test Tool
                    </h1>
                    <p className="mb-4">Enter a list of DNS server addresses and test their speed.</p>
                    <textarea
                        id="dnsList"
                        value={dnsList}
                        onChange={(e) => setDnsList(e.target.value)}
                        placeholder="Enter DNS servers (one per line)"
                        rows="5"
                        cols="50"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <br />
                    <button
                        onClick={testDNSServers}
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
                    >
                        Test DNS Servers
                    </button>

                    {showResults && (
                        <table className="mt-8 w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 p-2 bg-green-500 text-white">DNS Server</th>
                                    <th className="border border-gray-300 p-2 bg-green-500 text-white">Response Time (ms)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((result, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 p-2">{result.server}</td>
                                        <td className="border border-gray-300 p-2">{result.time} ms</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DnsSpeedTestTool;
