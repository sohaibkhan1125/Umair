'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function JsonFormatterPage() {
  const [input, setInput] = useState(`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA",
    "zipCode": "10001"
  },
  "hobbies": ["reading", "gaming", "coding"],
  "education": [
    {
      "degree": "Bachelor's",
      "major": "Computer Science",
      "year": 2015
    },
    {
      "degree": "Master's",
      "major": "Software Engineering",
      "year": 2017
    }
  ],
  "isActive": true,
  "lastLogin": "2024-03-15T10:30:00Z"
}`);

  const [output, setOutput] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const formatJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      setIsValid(false);
      setErrorMessage(error.message);
      return jsonString;
    }
  };

  const minifyJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed);
    } catch (error) {
      setIsValid(false);
      setErrorMessage(error.message);
      return jsonString;
    }
  };

  const validateJSON = (jsonString) => {
    try {
      JSON.parse(jsonString);
      setIsValid(true);
      setErrorMessage('');
      return true;
    } catch (error) {
      setIsValid(false);
      setErrorMessage(error.message);
      return false;
    }
  };

  const handleFormat = () => {
    if (!input.trim()) {
      toast.error('Please enter some JSON to format');
      return;
    }
    if (validateJSON(input)) {
      setOutput(formatJSON(input));
    }
  };

  const handleMinify = () => {
    if (!input.trim()) {
      toast.error('Please enter some JSON to minify');
      return;
    }
    if (validateJSON(input)) {
      setOutput(minifyJSON(input));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard!');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setIsValid(true);
    setErrorMessage('');
    toast.success('Cleared all fields');
  };

  const handleInputChange = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
    validateJSON(newInput);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">JSON Formatter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="input">Input JSON</Label>
                  <div className="flex items-center space-x-2">
                    {isValid ? (
                      <div className="flex items-center text-green-500">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">Valid JSON</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <XCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">Invalid JSON</span>
                      </div>
                    )}
                  </div>
                </div>
                {!isValid && (
                  <div className="text-sm text-red-500">
                    Error: {errorMessage}
                  </div>
                )}
                <Textarea
                  id="input"
                  placeholder="Enter JSON to format..."
                  value={input}
                  onChange={handleInputChange}
                  className="min-h-[200px] font-mono"
                />
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={handleFormat} className="w-32">
                  Format
                </Button>
                <Button onClick={handleMinify} className="w-32">
                  Minify
                </Button>
                <Button onClick={handleClear} variant="outline" className="w-32">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output">Output</Label>
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
