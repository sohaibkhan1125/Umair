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

export default function JavaScriptFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatJavaScript = (code) => {
    try {
      // Basic indentation and formatting
      let formatted = code
        // Add spaces around operators
        .replace(/([+\-*/%=&|<>!^~])/g, ' $1 ')
        // Add spaces after commas
        .replace(/,/g, ', ')
        // Add spaces after semicolons
        .replace(/;/g, '; ')
        // Add spaces after keywords
        .replace(/\b(if|else|for|while|do|switch|case|break|continue|return|function|var|let|const)\b/g, ' $1 ')
        // Remove multiple spaces
        .replace(/\s+/g, ' ')
        // Add newlines after semicolons
        .replace(/;/g, ';\n')
        // Add newlines after curly braces
        .replace(/{/g, '{\n')
        .replace(/}/g, '\n}')
        // Add newlines after parentheses
        .replace(/\(/g, '(\n')
        .replace(/\)/g, '\n)')
        // Add newlines after square brackets
        .replace(/\[/g, '[\n')
        .replace(/\]/g, '\n]')
        // Remove empty lines
        .replace(/\n\s*\n/g, '\n')
        // Trim whitespace
        .trim();

      // Add proper indentation
      let lines = formatted.split('\n');
      let indentLevel = 0;
      let indentedLines = lines.map(line => {
        line = line.trim();
        if (line.includes('}')) indentLevel--;
        let indented = '  '.repeat(indentLevel) + line;
        if (line.includes('{')) indentLevel++;
        return indented;
      });

      return indentedLines.join('\n');
    } catch (error) {
      toast.error('Error formatting JavaScript code');
      console.error('Formatting error:', error);
      return code;
    }
  };

  const minifyJavaScript = (code) => {
    try {
      return code
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
        // Remove whitespace
        .replace(/\s+/g, ' ')
        // Remove spaces around operators
        .replace(/\s*([+\-*/%=&|<>!^~])\s*/g, '$1')
        // Remove spaces after commas
        .replace(/,\s*/g, ',')
        // Remove spaces after semicolons
        .replace(/;\s*/g, ';')
        // Remove spaces around curly braces
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        // Remove spaces around parentheses
        .replace(/\s*\(\s*/g, '(')
        .replace(/\s*\)\s*/g, ')')
        // Remove spaces around square brackets
        .replace(/\s*\[\s*/g, '[')
        .replace(/\s*\]\s*/g, ']')
        // Trim whitespace
        .trim();
    } catch (error) {
      toast.error('Error minifying JavaScript code');
      console.error('Minification error:', error);
      return code;
    }
  };

  const handleFormat = () => {
    if (!input.trim()) {
      toast.error('Please enter some JavaScript code to format');
      return;
    }
    setOutput(formatJavaScript(input));
  };

  const handleMinify = () => {
    if (!input.trim()) {
      toast.error('Please enter some JavaScript code to minify');
      return;
    }
    setOutput(minifyJavaScript(input));
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
            <CardTitle className="text-2xl font-bold text-center">JavaScript Formatter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="input">Input JavaScript Code</Label>
                <Textarea
                  id="input"
                  placeholder="Enter JavaScript code to format..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
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
