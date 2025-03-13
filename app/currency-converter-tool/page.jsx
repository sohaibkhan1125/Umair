'use client'
import React, { useEffect, useState } from 'react';
import http from 'https';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CurrencyConverter = () => {
    const [rates, setRates] = useState({});
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [currency, setCurrency] = useState('EUR');

    useEffect(() => {
        const options = {
            method: 'GET',
            hostname: 'currency-conversion-and-exchange-rates.p.rapidapi.com',
            port: null,
            path: '/latest?from=USD&to=EUR%2CGBP',
            headers: {
                'x-rapidapi-key': 'b9b276d0c1msh822603b0c726babp1e9c4djsn4fbc5f965e78',
                'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
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
                setRates(data.rates);
                setConvertedAmount(data.rates[currency] * amount);
            });
        });

        req.on('error', (e) => {
            console.error(e);
        });

        req.end();
    }, [amount, currency]);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        setConvertedAmount(rates[currency] * e.target.value);
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
        setConvertedAmount(rates[e.target.value] * amount);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                        Currency Converter
                    </h1>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount in USD
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Currency
                        </label>
                        <select
                            value={currency}
                            onChange={handleCurrencyChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>
                    <div className="mt-4 text-lg font-semibold">
                        Converted Amount: {convertedAmount.toFixed(2)} {currency}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CurrencyConverter;

// ... existing code ...