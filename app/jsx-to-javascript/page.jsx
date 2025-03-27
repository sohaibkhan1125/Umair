'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function JsxToJavaScriptPage() {
  const [input, setInput] = useState(`// Sample JSX code to demonstrate conversion
function UserProfile({ name, age, hobbies }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="user-profile">
      <h1>Welcome, {name}!</h1>
      <p>Age: {age}</p>
      
      <div className="hobbies-section">
        <h2>Hobbies:</h2>
        <ul>
          {hobbies.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>
      </div>

      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="expand-btn"
      >
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>

      {isExpanded && (
        <div className="additional-info">
          <p>This is additional information</p>
          <span className="highlight">Highlighted text</span>
        </div>
      )}
    </div>
  );
}`);

  const [output, setOutput] = useState('');

  const convertJsxToJavaScript = (code) => {
    try {
      let converted = code
        // Convert JSX className to className
        .replace(/className=/g, 'className=')
        // Convert JSX self-closing tags
        .replace(/<(\w+)\s*\/>/g, 'React.createElement($1)')
        // Convert JSX opening tags
        .replace(/<(\w+)([^>]*)>/g, 'React.createElement($1, $2)')
        // Convert JSX closing tags
        .replace(/<\/(\w+)>/g, ')')
        // Convert JSX attributes
        .replace(/(\w+)=["']([^"']*)["']/g, '$1: "$2"')
        // Convert JSX expressions
        .replace(/{([^}]+)}/g, '$1')
        // Convert JSX children
        .replace(/>([^<]+)</g, ', "$1", ')
        // Clean up extra commas
        .replace(/,\s*\)/g, ')')
        // Add React.createElement import if not present
        .replace(/^/, 'import React from "react";\n\n');

      // Format the output
      converted = converted
        .replace(/\s+/g, ' ')
        .replace(/React\.createElement\(/g, '\nReact.createElement(')
        .replace(/\)/g, ')\n')
        .trim();

      return converted;
    } catch (error) {
      toast.error('Error converting JSX to JavaScript');
      console.error('Conversion error:', error);
      return code;
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error('Please enter some JSX code to convert');
      return;
    }
    setOutput(convertJsxToJavaScript(input));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard!');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    toast.success('Cleared all fields');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">JSX to JavaScript Converter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="input">Input JSX Code</Label>
                <Textarea
                  id="input"
                  placeholder="Enter JSX code to convert..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[200px] font-mono"
                />
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

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output">JavaScript Output</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-8 px-2"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  id="output"
                  value={output}
                  readOnly
                  className="min-h-[200px] font-mono bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
