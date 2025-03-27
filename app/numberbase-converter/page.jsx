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

export default function CaseConverterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [selectedCase, setSelectedCase] = useState('sentence');

  const convertCase = (text, caseType) => {
    if (!text.trim()) return '';

    switch (caseType) {
      case 'uppercase':
        return text.toUpperCase();
      
      case 'lowercase':
        return text.toLowerCase();
      
      case 'capitalize':
        return text
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      
      case 'sentence':
        return text
          .split('. ')
          .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase())
          .join('. ');
      
      case 'camelCase':
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
          .replace(/^[A-Z]/, c => c.toLowerCase());
      
      case 'PascalCase':
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
          .replace(/^[a-z]/, c => c.toUpperCase());
      
      case 'snake_case':
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '_')
          .replace(/^_+|_+$/g, '');
      
      case 'kebab-case':
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      
      case 'dot.case':
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '.')
          .replace(/^\.+|\.+$/g, '');
      
      case 'CONSTANT_CASE':
        return text
          .toUpperCase()
          .replace(/[^A-Z0-9]+/g, '_')
          .replace(/^_+|_+$/g, '');
      
      case 'Title Case':
        return text
          .toLowerCase()
          .replace(/(?:^|\s|'|")\S/g, char => char.toUpperCase());
      
      case 'aNtIcAsE':
        return text
          .split('')
          .map((char, i) => i % 2 === 0 ? char.toLowerCase() : char.toUpperCase())
          .join('');
      
      case 'InVeRsE cAsE':
        return text
          .split('')
          .map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase())
          .join('');
      
      default:
        return text;
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error('Please enter some text');
      return;
    }
    const converted = convertCase(input, selectedCase);
    setOutput(converted);
    toast.success('Text converted successfully!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Converted text copied to clipboard!');
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
    a.download = 'converted.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Converted text downloaded!');
  };

  const caseTypes = [
    { value: 'uppercase', label: 'UPPERCASE' },
    { value: 'lowercase', label: 'lowercase' },
    { value: 'capitalize', label: 'Capitalize' },
    { value: 'sentence', label: 'Sentence case' },
    { value: 'camelCase', label: 'camelCase' },
    { value: 'PascalCase', label: 'PascalCase' },
    { value: 'snake_case', label: 'snake_case' },
    { value: 'kebab-case', label: 'kebab-case' },
    { value: 'dot.case', label: 'dot.case' },
    { value: 'CONSTANT_CASE', label: 'CONSTANT_CASE' },
    { value: 'Title Case', label: 'Title Case' },
    { value: 'aNtIcAsE', label: 'aNtIcAsE' },
    { value: 'InVeRsE cAsE', label: 'InVeRsE cAsE' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Case Converter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Input Text</Label>
                    <select
                      value={selectedCase}
                      onChange={(e) => setSelectedCase(e.target.value)}
                      className="px-3 py-1 border rounded-md bg-background"
                    >
                      {caseTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your text here..."
                    className="min-h-[300px]"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Converted Text</Label>
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
                    className="min-h-[300px] bg-muted"
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
                <h3 className="font-semibold text-lg mb-2">Case Conversion Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Select the desired case style from the dropdown menu</li>
                  <li>Paste or type your text in the input field</li>
                  <li>Click Convert to transform the text</li>
                  <li>Use Copy or Download to save the result</li>
                  <li>Clear the form to start over</li>
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