'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Download, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function JsonValidatorPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [indentSize, setIndentSize] = useState(2);

  const validateAndFormatJSON = (jsonString) => {
    try {
      // Parse JSON to validate
      const parsed = JSON.parse(jsonString);
      
      // Format JSON with specified indentation
      const formatted = JSON.stringify(parsed, null, indentSize);
      
      setIsValid(true);
      setErrorMessage('');
      return formatted;
    } catch (error) {
      setIsValid(false);
      setErrorMessage(error.message);
      return jsonString;
    }
  };

  const handleValidate = () => {
    if (!input.trim()) {
      toast.error('Please enter JSON data');
      return;
    }
    const formatted = validateAndFormatJSON(input);
    setOutput(formatted);
    
    if (isValid) {
      toast.success('JSON is valid!');
    } else {
      toast.error('Invalid JSON!');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('JSON copied to clipboard!');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setIsValid(true);
    setErrorMessage('');
    toast.success('Form cleared!');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('JSON file downloaded!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">JSON Validator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Input JSON</Label>
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
                        {isValid ? (
                          <div className="flex items-center text-green-500">
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            <span>Valid</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-500">
                            <XCircle className="w-4 h-4 mr-1" />
                            <span>Invalid</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your JSON data here..."
                    className="min-h-[300px] font-mono"
                  />
                  {!isValid && (
                    <div className="text-sm text-red-500 mt-2">
                      Error: {errorMessage}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Formatted JSON</Label>
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
                <Button onClick={handleValidate} className="w-32">
                  Validate
                </Button>
                <Button onClick={handleClear} variant="outline" className="w-32">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-2">JSON Validation Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>JSON must be properly formatted with valid syntax</li>
                  <li>All strings must be enclosed in double quotes</li>
                  <li>Arrays and objects must be properly closed</li>
                  <li>Commas must separate array elements and object properties</li>
                  <li>Last property in an object should not have a trailing comma</li>
                  <li>Adjust indentation for better readability</li>
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