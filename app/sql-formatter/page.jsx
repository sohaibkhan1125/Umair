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
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SqlFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [uppercase, setUppercase] = useState(true);

  const formatSQL = (sql) => {
    try {
      // Basic SQL formatting logic
      let formatted = sql
        // Remove extra whitespace
        .replace(/\s+/g, ' ')
        // Add newlines before keywords
        .replace(/\b(SELECT|FROM|WHERE|AND|OR|JOIN|LEFT|RIGHT|INNER|OUTER|GROUP BY|ORDER BY|HAVING|LIMIT|OFFSET)\b/gi, '\n$1')
        // Add newlines after commas
        .replace(/,/g, ',\n')
        // Add newlines after parentheses
        .replace(/\(/g, '(\n')
        .replace(/\)/g, '\n)')
        // Remove empty lines
        .replace(/\n\s*\n/g, '\n')
        // Trim whitespace
        .trim();

      // Apply indentation
      let lines = formatted.split('\n');
      let indentLevel = 0;
      let result = lines.map(line => {
        line = line.trim();
        if (line.includes(')')) {
          indentLevel--;
        }
        const indentation = ' '.repeat(indentLevel * indentSize);
        if (line.includes('(')) {
          indentLevel++;
        }
        return indentation + line;
      }).join('\n');

      // Apply uppercase to keywords if enabled
      if (uppercase) {
        const keywords = [
          'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT', 'RIGHT',
          'INNER', 'OUTER', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT',
          'OFFSET', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER',
          'DROP', 'TABLE', 'DATABASE', 'INDEX', 'VIEW', 'TRIGGER',
          'PROCEDURE', 'FUNCTION', 'AS', 'ON', 'IN', 'NOT', 'NULL',
          'DEFAULT', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'UNIQUE',
          'CHECK', 'CONSTRAINT'
        ];
        
        keywords.forEach(keyword => {
          const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
          result = result.replace(regex, keyword);
        });
      }

      return result;
    } catch (error) {
      console.error('Formatting error:', error);
      return 'Error formatting SQL query';
    }
  };

  const handleFormat = () => {
    if (!input.trim()) {
      toast.error('Please enter a SQL query');
      return;
    }
    const formatted = formatSQL(input);
    setOutput(formatted);
    toast.success('SQL query formatted successfully!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Formatted SQL copied to clipboard!');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    toast.success('Form cleared!');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('SQL file downloaded!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">SQL Formatter</CardTitle>
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
                          type="number"
                          min="1"
                          max="8"
                          value={indentSize}
                          onChange={(e) => setIndentSize(Number(e.target.value))}
                          className="w-16 px-2 py-1 border rounded"
                        />
                        <Label>Indent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={uppercase}
                          onChange={(e) => setUppercase(e.target.checked)}
                          className="rounded"
                        />
                        <Label>Uppercase Keywords</Label>
                      </div>
                    </div>
                  </div>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your SQL query here..."
                    className="min-h-[300px] font-mono"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Formatted SQL</Label>
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
                  <div className="min-h-[300px] border rounded-md overflow-auto">
                    <SyntaxHighlighter
                      language="sql"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        height: '100%',
                        minHeight: '300px'
                      }}
                    >
                      {output || 'Formatted SQL will appear here...'}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={handleFormat} className="w-32">
                  Format SQL
                </Button>
                <Button onClick={handleClear} variant="outline" className="w-32">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-2">SQL Formatting Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Keywords are automatically capitalized for better readability</li>
                  <li>Proper indentation is applied based on query structure</li>
                  <li>Line breaks are added before major clauses (SELECT, FROM, WHERE, etc.)</li>
                  <li>Commas and parentheses are properly formatted</li>
                  <li>Extra whitespace is removed while maintaining query structure</li>
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