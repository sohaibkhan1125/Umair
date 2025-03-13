'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CsvToSqlConverter = () => {
  const [csvData, setCsvData] = useState('');
  const [sqlData, setSqlData] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCsvData(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const convertCsvToSql = () => {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const sqlStatements = lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      const formattedValues = values.map(value => `'${value.replace(/'/g, "''")}'`).join(', ');
      return `INSERT INTO your_table_name (${headers.join(', ')}) VALUES (${formattedValues});`;
    });
    setSqlData(sqlStatements.join('\n'));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlData).then(() => {
      alert('SQL data copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            CSV to SQL Converter
          </h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload CSV File
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <button
            onClick={convertCsvToSql}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Convert to SQL
          </button>

          {sqlData && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Generated SQL</h2>
              <pre className="bg-gray-100 p-4 rounded-md border border-gray-300 overflow-x-auto">
                {sqlData}
              </pre>
              <button
                onClick={handleCopy}
                className="mt-4 w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
              >
                Copy SQL Data
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CsvToSqlConverter;
