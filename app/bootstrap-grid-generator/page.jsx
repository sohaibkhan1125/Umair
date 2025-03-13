'use client'
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Script from 'next/script';

const BootstrapGridGenerator = () => {
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [gridHtml, setGridHtml] = useState('');
  const [error, setError] = useState('');

  // Load Bootstrap CSS
  const bootstrapCss = `
    .col-preview {
      background-color: #f8f9fa;
      border: 1px dashed #dee2e6;
      padding: 10px;
      text-align: center;
    }
  `;

  const generateGrid = () => {
    setError('');

    if (!rows || !columns) {
      setError('Please fill in both fields.');
      return;
    }

    const columnSets = columns.split(',').map(col => parseInt(col.trim()));
    const totalColumns = columnSets.reduce((sum, col) => sum + col, 0);

    if (totalColumns !== 12) {
      setError('The sum of columns per row must equal 12.');
      return;
    }

    let newGridHtml = '';

    for (let i = 0; i < parseInt(rows); i++) {
      newGridHtml += '<div class="row mb-3">';
      columnSets.forEach(col => {
        newGridHtml += `<div class="col-${col} col-preview">${col}</div>`;
      });
      newGridHtml += '</div>';
    }

    setGridHtml(newGridHtml);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Bootstrap CSS */}
      <Script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" 
        strategy="afterInteractive"
      />
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      <style>{bootstrapCss}</style>
      
      <main className="container mx-auto px-4 py-8">
        <div className=" mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
              Bootstrap Grid Generator
            </h1>

            <div className="mb-6">
              <label 
                htmlFor="rows" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Number of Rows
              </label>
              <input
                type="number"
                id="rows"
                min="1"
                value={rows}
                onChange={(e) => setRows(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter number of rows"
              />
            </div>

            <div className="mb-6">
              <label 
                htmlFor="columns" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Columns per Row (comma-separated)
              </label>
              <input
                type="text"
                id="columns"
                value={columns}
                onChange={(e) => setColumns(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., 4,4,4 or 6,6"
              />
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <button
              onClick={generateGrid}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
            >
              Generate Grid
            </button>

            {gridHtml && (
              <div className="mt-8 p-6 border border-gray-200 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Preview</h2>
                <div 
                  dangerouslySetInnerHTML={{ __html: gridHtml }} 
                  className="grid-preview"
                />
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Enter the number of rows you want in your grid</li>
              <li>Enter the column sizes separated by commas (must sum to 12)</li>
              <li>Examples of valid column combinations:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-600">
                  <li>4,4,4 (three equal columns)</li>
                  <li>6,6 (two equal columns)</li>
                  <li>3,6,3 (wider middle column)</li>
                  <li>8,4 (two-thirds, one-third split)</li>
                </ul>
              </li>
              <li>Click "Generate Grid" to see your Bootstrap grid layout</li>
            </ol>
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Bootstrap's grid system is based on a 12-column layout. 
                The numbers you enter for columns must add up to 12 for a valid grid row.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BootstrapGridGenerator;
