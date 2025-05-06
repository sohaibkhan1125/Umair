'use client';

import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CSVToTable = () => {
  const [csvData, setCsvData] = useState('');
  const [tableData, setTableData] = useState({ headers: [], rows: [] });
  const [hasHeaders, setHasHeaders] = useState(true);
  const [separator, setSeparator] = useState(',');
  const [showGenerated, setShowGenerated] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [tableStyle, setTableStyle] = useState('default');
  const [customStyles, setCustomStyles] = useState({
    tableBorder: '#ddd',
    headerBg: '#f2f2f2',
    headerText: '#333',
    rowEvenBg: '#ffffff',
    rowOddBg: '#f9f9f9',
    cellBorder: '#ddd',
    hoverColor: '#f5f5f5',
    fontSize: '14px',
    borderRadius: '4px',
  });
  
  const tableRef = useRef(null);
  const textareaRef = useRef(null);
  
  // Sample CSV data
  const sampleData = `Name,Email,Phone Number,Country
John Doe,john@example.com,(555) 123-4567,United States
Jane Smith,jane@example.com,(555) 987-6543,Canada
Robert Johnson,robert@example.com,(555) 246-8135,United Kingdom
Maria Garcia,maria@example.com,(555) 369-1478,Spain
James Wilson,james@example.com,(555) 159-7534,Australia`;

  // Table style presets
  const tableStyles = {
    default: {
      tableBorder: '#ddd',
      headerBg: '#f2f2f2',
      headerText: '#333',
      rowEvenBg: '#ffffff',
      rowOddBg: '#f9f9f9',
      cellBorder: '#ddd',
      hoverColor: '#f5f5f5',
      fontSize: '14px',
      borderRadius: '4px',
    },
    dark: {
      tableBorder: '#444',
      headerBg: '#333',
      headerText: '#fff',
      rowEvenBg: '#444',
      rowOddBg: '#3a3a3a',
      cellBorder: '#555',
      hoverColor: '#505050',
      fontSize: '14px',
      borderRadius: '4px',
    },
    colorful: {
      tableBorder: '#a3c2e8',
      headerBg: '#4a89dc',
      headerText: '#ffffff',
      rowEvenBg: '#ffffff',
      rowOddBg: '#eef5fe',
      cellBorder: '#c6d9ef',
      hoverColor: '#d4e6f6',
      fontSize: '14px',
      borderRadius: '6px',
    },
    minimal: {
      tableBorder: 'transparent',
      headerBg: 'transparent',
      headerText: '#555',
      rowEvenBg: '#ffffff',
      rowOddBg: '#ffffff',
      cellBorder: '#eee',
      hoverColor: '#fafafa',
      fontSize: '14px',
      borderRadius: '0px',
    },
    professional: {
      tableBorder: '#bbb',
      headerBg: '#2c3e50',
      headerText: '#ffffff',
      rowEvenBg: '#ffffff',
      rowOddBg: '#f8f9fa',
      cellBorder: '#ddd',
      hoverColor: '#ebf0f6',
      fontSize: '14px',
      borderRadius: '0px',
    },
  };

  // Parse CSV string to table data
  const parseCSV = () => {
    if (!csvData.trim()) return;
    
    try {
      // Split by lines
      const lines = csvData.split(/\r\n|\n/);
      if (lines.length === 0) return;
      
      // Determine headers and data rows
      let headers = [];
      let rows = [];
      let startIndex = 0;
      
      if (hasHeaders) {
        const headerLine = lines[0];
        headers = headerLine.split(separator).map(header => header.trim().replace(/^["'](.*)["']$/, '$1'));
        startIndex = 1;
      } else {
        // If no headers, generate default column names
        const firstRow = lines[0].split(separator);
        headers = firstRow.map((_, index) => `Column ${index + 1}`);
      }
      
      // Parse data rows
      for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Handle quoted values with commas inside
        let values = [];
        let inQuotes = false;
        let currentValue = '';
        
        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          
          if (char === '"' && (j === 0 || line[j-1] !== '\\')) {
            inQuotes = !inQuotes;
          } else if (char === separator && !inQuotes) {
            values.push(currentValue.trim().replace(/^["'](.*)["']$/, '$1'));
            currentValue = '';
          } else {
            currentValue += char;
          }
        }
        
        values.push(currentValue.trim().replace(/^["'](.*)["']$/, '$1'));
        rows.push(values);
      }
      
      setTableData({ headers, rows });
      setShowGenerated(true);
    } catch (error) {
      console.error('Error parsing CSV:', error);
      alert('Error parsing CSV data. Please check the format and try again.');
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setCsvData(e.target.result);
    };
    reader.readAsText(file);
  };

  // Apply selected style preset
  const applyStylePreset = (preset) => {
    setTableStyle(preset);
    setCustomStyles(tableStyles[preset]);
  };

  // Generate HTML code for the table
  const generateHtmlCode = () => {
    if (!tableData.headers.length) return '';
    
    const styles = customStyles;
    
    const cssStyles = `
<style>
.csv-table {
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  font-size: ${styles.fontSize};
  border: 1px solid ${styles.tableBorder};
  border-radius: ${styles.borderRadius};
  overflow: hidden;
}

.csv-table th {
  vertical-align: bottom;
  padding: 0.75rem;
  text-align: left;
  border-bottom: 2px solid ${styles.cellBorder};
  background-color: ${styles.headerBg};
  color: ${styles.headerText};
  font-weight: bold;
}

.csv-table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid ${styles.cellBorder};
}

.csv-table tr:nth-child(even) {
  background-color: ${styles.rowEvenBg};
}

.csv-table tr:nth-child(odd) {
  background-color: ${styles.rowOddBg};
}

.csv-table tr:hover {
  background-color: ${styles.hoverColor};
}
</style>`;

    const tableRows = tableData.rows.map((row, rowIndex) => {
      const cells = row.map((cell, cellIndex) => {
        return `    <td>${cell}</td>`;
      }).join('\n');
      return `  <tr>\n${cells}\n  </tr>`;
    }).join('\n');

    const tableHeaders = tableData.headers.map(header => {
      return `    <th>${header}</th>`;
    }).join('\n');

    const htmlTable = `${cssStyles}
<table class="csv-table">
  <thead>
  <tr>
${tableHeaders}
  </tr>
  </thead>
  <tbody>
${tableRows}
  </tbody>
</table>`;

    return htmlTable;
  };

  // Copy generated HTML to clipboard
  const copyHtml = () => {
    const htmlCode = generateHtmlCode();
    navigator.clipboard.writeText(htmlCode).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
      () => {
        setCopySuccess(false);
      }
    );
  };

  // Load sample data
  const loadSample = () => {
    setCsvData(sampleData);
  };

  // Clear the input and table
  const clearAll = () => {
    setCsvData('');
    setTableData({ headers: [], rows: [] });
    setShowGenerated(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            CSV to HTML Table Converter
          </h1>
          
          <div className="grid grid-cols-1 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter CSV Data
                </label>
                <textarea
                  ref={textareaRef}
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  rows={8}
                  placeholder="Paste your CSV data here or upload a file..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CSV Options
                  </label>
                  <div className="flex flex-col space-y-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={hasHeaders}
                        onChange={() => setHasHeaders(!hasHeaders)}
                        className="rounded text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">First row contains headers</span>
                    </label>
                    
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Separator</label>
                      <select
                        value={separator}
                        onChange={(e) => setSeparator(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value=",">Comma (,)</option>
                        <option value=";">Semicolon (;)</option>
                        <option value="\t">Tab</option>
                        <option value="|">Pipe (|)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Table Style
                  </label>
                  <select
                    value={tableStyle}
                    onChange={(e) => applyStylePreset(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="default">Default</option>
                    <option value="dark">Dark</option>
                    <option value="colorful">Colorful</option>
                    <option value="minimal">Minimal</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File Upload
                  </label>
                  <input
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleFileUpload}
                    className="w-full p-2 text-sm text-gray-700"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <button
                  onClick={parseCSV}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <span>Generate Table</span>
                </button>
                
                <button
                  onClick={copyHtml}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                  disabled={!showGenerated}
                >
                  <span>{copySuccess ? 'Copied!' : 'Copy HTML'}</span>
                </button>
                
                <button
                  onClick={loadSample}
                  className="bg-purple-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <span>Load Sample</span>
                </button>
                
                <button
                  onClick={clearAll}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <span>Clear All</span>
                </button>
              </div>
            </div>
            
            {showGenerated && tableData.headers.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Generated Table Preview</h2>
                <div className="overflow-x-auto" ref={tableRef}>
                  <table className="w-full mb-6 overflow-hidden" style={{
                    borderCollapse: 'collapse',
                    fontSize: customStyles.fontSize,
                    border: `1px solid ${customStyles.tableBorder}`,
                    borderRadius: customStyles.borderRadius,
                  }}>
                    <thead>
                      <tr>
                        {tableData.headers.map((header, index) => (
                          <th key={index} style={{
                            padding: '0.75rem',
                            backgroundColor: customStyles.headerBg,
                            color: customStyles.headerText,
                            textAlign: 'left',
                            borderBottom: `2px solid ${customStyles.cellBorder}`,
                            fontWeight: 'bold',
                          }}>
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} style={{
                          backgroundColor: rowIndex % 2 === 0 ? customStyles.rowEvenBg : customStyles.rowOddBg,
                        }}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} style={{
                              padding: '0.75rem',
                              borderTop: `1px solid ${customStyles.cellBorder}`,
                              verticalAlign: 'top',
                            }}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-md font-medium mb-3 text-blue-800">About CSV to HTML Table Converter:</h3>
                  <ul className="list-disc list-inside text-sm text-blue-700 space-y-2">
                    <li>Easily convert CSV data into styled HTML tables</li>
                    <li>Choose from different pre-designed table styles</li>
                    <li>Copy the generated HTML code to use in your website or blog</li>
                    <li>Handles quoted values with commas inside them</li>
                    <li>Responsive tables that look good on all devices</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CSVToTable; 