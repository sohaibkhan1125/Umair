'use client'
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdSenseCalculator = () => {
    const [results, setResults] = useState({
        eCPM: 'N/A',
        dailyRevenue: 'N/A',
        dailyClicks: 'N/A',
        monthlyRevenue: 'N/A',
        monthlyClicks: 'N/A',
        annualRevenue: 'N/A',
        annualClicks: 'N/A',
    });
    const [showResults, setShowResults] = useState(false);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCalculate = async () => {
        const impressions = document.getElementById('impressions').value;
        const ctr = document.getElementById('ctr').value;
        const cpc = document.getElementById('cpc').value;

        if (impressions && ctr && cpc) {
            setLoading(true);
            try {
                const response = await fetch(`https://seo-api2.p.rapidapi.com/adsense-calculator?impressions=${impressions}&ctr=${ctr}&cpc=${cpc}`, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'cca330428dmsh4b459b029c77e3cp1a7504jsn8f61efbba564',
                        'x-rapidapi-host': 'seo-api2.p.rapidapi.com'
                    }
                });
                const data = await response.json();

                if (data.status === 'success') {
                    setResults({
                        eCPM: data.eCPM !== undefined ? `$${data.eCPM.toFixed(2)}` : 'N/A',
                        dailyRevenue: data.daily && data.daily.revenue !== undefined ? `$${data.daily.revenue.toFixed(2)}` : 'N/A',
                        dailyClicks: data.daily && data.daily.clicks !== undefined ? `${data.daily.clicks}` : 'N/A',
                        monthlyRevenue: data.monthly && data.monthly.revenue !== undefined ? `$${data.monthly.revenue.toFixed(2)}` : 'N/A',
                        monthlyClicks: data.monthly && data.monthly.clicks !== undefined ? `${data.monthly.clicks}` : 'N/A',
                        annualRevenue: data.annually && data.annually.revenue !== undefined ? `$${data.annually.revenue.toFixed(2)}` : 'N/A',
                        annualClicks: data.annually && data.annually.clicks !== undefined ? `${data.annually.clicks}` : 'N/A',
                    });
                    setShowResults(true);
                } else {
                    alert('Failed to fetch AdSense data.');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please fill in all fields.');
        }
    };

    const handleCopy = () => {
        const resultsText = `
            eCPM: ${results.eCPM}
            Daily Revenue: ${results.dailyRevenue}
            Daily Clicks: ${results.dailyClicks}
            Monthly Revenue: ${results.monthlyRevenue}
            Monthly Clicks: ${results.monthlyClicks}
            Annual Revenue: ${results.annualRevenue}
            Annual Clicks: ${results.annualClicks}
        `.trim();

        navigator.clipboard.writeText(resultsText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold text-center mb-6">AdSense Calculator</h1>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label htmlFor="impressions" className="block text-gray-700">Impressions</label>
                        <input type="number" id="impressions" className="w-full p-2 border rounded" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="ctr" className="block text-gray-700">CTR (%)</label>
                        <input type="number" id="ctr" className="w-full p-2 border rounded" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="cpc" className="block text-gray-700">CPC ($)</label>
                        <input type="number" id="cpc" className="w-full p-2 border rounded" />
                    </div>

                    <button
                        onClick={handleCalculate}
                        className="w-full bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Calculate'
                        )}
                    </button>
                </div>

                {showResults && (
                    <div id="results" className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Results</h2>

                        <p id="eCPM" className="mb-2">eCPM: {results.eCPM}</p>
                        <p id="dailyRevenue" className="mb-2">Daily Revenue: {results.dailyRevenue}</p>
                        <p id="dailyClicks" className="mb-2">Daily Clicks: {results.dailyClicks}</p>
                        <p id="monthlyRevenue" className="mb-2">Monthly Revenue: {results.monthlyRevenue}</p>
                        <p id="monthlyClicks" className="mb-2">Monthly Clicks: {results.monthlyClicks}</p>
                        <p id="annualRevenue" className="mb-2">Annual Revenue: {results.annualRevenue}</p>
                        <p id="annualClicks" className="mb-2">Annual Clicks: {results.annualClicks}</p>

                        <button onClick={handleCopy} className="w-full bg-green-500 text-white p-2 rounded-lg flex items-center justify-center mt-4 cursor-pointer">
                            <span className="ml-2">{copied ? 'Copied!' : 'Copy All Results'}</span>
                        </button>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default AdSenseCalculator;
