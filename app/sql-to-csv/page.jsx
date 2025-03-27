'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Download } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function SqlToCsvPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [includeHeaders, setIncludeHeaders] = useState(true);

  const extractColumns = (sql) => {
    // Remove comments
    sql = sql.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Extract the SELECT part
    const selectMatch = sql.match(/SELECT\s+(.*?)\s+FROM/i);
    if (!selectMatch) {
      throw new Error('Invalid SQL query. Must contain a SELECT statement.');
    }

    const selectPart = selectMatch[1].trim();
    
    // Handle different column formats
    const columns = selectPart.split(',')
      .map(col => col.trim())
      .map(col => {
        // Handle column aliases
        const aliasMatch = col.match(/as\s+(\w+)$/i);
        if (aliasMatch) return aliasMatch[1];
        
        // Handle table.column format
        const tableColumnMatch = col.match(/.*?\.(\w+)$/);
        if (tableColumnMatch) return tableColumnMatch[1];
        
        // Handle functions and expressions
        if (col.includes('(')) {
          const funcMatch = col.match(/(\w+)\s*\(/i);
          if (funcMatch) return funcMatch[1];
        }
        
        // Handle * and table.*
        if (col === '*') return 'all_columns';
        if (col.endsWith('.*')) return col.replace('.*', '_all');
        
        return col;
      })
      .filter(col => col); // Remove empty columns

    if (columns.length === 0) {
      throw new Error('No valid columns found in the SELECT statement.');
    }

    return columns;
  };

  const convertSqlToCsv = (sql) => {
    try {
      // Extract column names
      const columns = extractColumns(sql);

      // Generate sample data rows
      const rows = [];
      for (let i = 0; i < 5; i++) {
        const row = columns.map(col => {
          // Generate sample data based on column name
          if (col === 'all_columns') return 'Sample Data';
          if (col === '_all') return 'Sample Table Data';
          if (col.toLowerCase().includes('id')) return i + 1;
          if (col.toLowerCase().includes('name')) return `Sample ${col} ${i + 1}`;
          if (col.toLowerCase().includes('date')) return new Date().toISOString().split('T')[0];
          if (col.toLowerCase().includes('email')) return `sample${i + 1}@example.com`;
          if (col.toLowerCase().includes('amount')) return (Math.random() * 1000).toFixed(2);
          if (col.toLowerCase().includes('count')) return Math.floor(Math.random() * 100);
          if (col.toLowerCase().includes('status')) return ['Active', 'Inactive', 'Pending'][Math.floor(Math.random() * 3)];
          return `Sample ${col} ${i + 1}`;
        });
        rows.push(row);
      }

      // Convert to CSV format
      let csv = '';
      
      // Add headers if enabled
      if (includeHeaders) {
        csv += columns.join(delimiter) + '\n';
      }

      // Add data rows
      rows.forEach(row => {
        csv += row.map(cell => {
          // Escape special characters and wrap in quotes if needed
          const cellStr = String(cell);
          if (cellStr.includes(delimiter) || cellStr.includes('"') || cellStr.includes('\n')) {
            return `"${cellStr.replace(/"/g, '""')}"`;
          }
          return cellStr;
        }).join(delimiter) + '\n';
      });

      return csv.trim();
    } catch (error) {
      console.error('Conversion error:', error);
      return `Error converting SQL to CSV: ${error.message}`;
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error('Please enter a SQL query');
      return;
    }
    const converted = convertSqlToCsv(input);
    setOutput(converted);
    toast.success('SQL converted to CSV successfully!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('CSV data copied to clipboard!');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    toast.success('Form cleared!');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('CSV file downloaded!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">SQL to CSV Converter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Input SQL</Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={delimiter}
                          onChange={(e) => setDelimiter(e.target.value)}
                          className="w-12 px-2 py-1 border rounded"
                          maxLength={1}
                        />
                        <Label>Delimiter</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={includeHeaders}
                          onChange={(e) => setIncludeHeaders(e.target.checked)}
                          className="rounded"
                        />
                        <Label>Include Headers</Label>
                      </div>
                    </div>
                  </div>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your SQL SELECT query here..."
                    className="min-h-[300px] font-mono"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>CSV Output</Label>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="h-8 px-2"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDownload}
                        className="h-8 px-2"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={output}
                    readOnly
                    className="min-h-[300px] font-mono bg-muted"
                  />
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={handleConvert} className="w-32">
                  Convert
                </Button>
                <Button onClick={handleClear} variant="outline" className="w-32">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-2">SQL to CSV Conversion Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Enter a valid SQL SELECT query</li>
                  <li>Supports column aliases (AS keyword)</li>
                  <li>Handles table.column format</li>
                  <li>Supports * and table.*</li>
                  <li>Special characters in data are properly escaped</li>
                  <li>Choose your preferred delimiter (default: comma)</li>
                  <li>Toggle headers on/off as needed</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}