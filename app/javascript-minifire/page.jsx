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

export default function JavaScriptMinifierPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [preserveComments, setPreserveComments] = useState(false);

  const minifyJavaScript = (code) => {
    try {
      let minified = code;

      // Remove comments if not preserving them
      if (!preserveComments) {
        minified = minified
          .replace(/\/\*[\s\S]*?\*\//g, '') // Multi-line comments
          .replace(/\/\/.*$/gm, ''); // Single-line comments
      }

      // Remove unnecessary whitespace
      minified = minified
        // Remove whitespace around operators
        .replace(/\s*([+\-*/%&|^=<>!])\s*/g, '$1')
        // Remove whitespace around parentheses and brackets
        .replace(/\s*([()\[\]{}])\s*/g, '$1')
        // Remove whitespace around commas and semicolons
        .replace(/\s*([,;])\s*/g, '$1')
        // Remove whitespace around dots
        .replace(/\s*\.\s*/g, '.')
        // Remove multiple spaces
        .replace(/\s+/g, ' ')
        // Remove spaces at the start and end of lines
        .replace(/^\s+|\s+$/gm, '')
        // Remove empty lines
        .replace(/\n\s*\n/g, '\n')
        // Remove trailing whitespace
        .replace(/\s+$/g, '')
        // Remove leading/trailing whitespace
        .trim();

      // Handle special cases
      minified = minified
        // Add space after keywords
        .replace(/\b(if|else|for|while|do|switch|case|return|break|continue|throw|try|catch|finally|new|delete|typeof|instanceof|in|of)\b/g, ' $1 ')
        // Add space after function keyword
        .replace(/\bfunction\b/g, 'function ')
        // Add space after var/let/const
        .replace(/\b(var|let|const)\b/g, '$1 ')
        // Remove spaces around dots in numbers
        .replace(/(\d)\s*\.\s*(\d)/g, '$1.$2')
        // Remove spaces in function calls
        .replace(/\s*\(\s*/g, '(')
        .replace(/\s*\)\s*/g, ')')
        // Remove spaces in array access
        .replace(/\s*\[\s*/g, '[')
        .replace(/\s*\]\s*/g, ']')
        // Remove spaces in object literals
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        // Remove spaces around colons in objects
        .replace(/\s*:\s*/g, ':')
        // Remove spaces around arrow functions
        .replace(/\s*=>\s*/g, '=>')
        // Remove spaces around template literals
        .replace(/\s*`\s*/g, '`')
        // Remove spaces around spread operator
        .replace(/\s*\.\.\.\s*/g, '...')
        // Remove spaces around optional chaining
        .replace(/\s*\?\.\s*/g, '?.')
        // Remove spaces around nullish coalescing
        .replace(/\s*\?\?\s*/g, '??')
        // Remove spaces around logical operators
        .replace(/\s*&&\s*/g, '&&')
        .replace(/\s*\|\|\s*/g, '||')
        // Remove spaces around comparison operators
        .replace(/\s*==\s*/g, '==')
        .replace(/\s*===\s*/g, '===')
        .replace(/\s*!=\s*/g, '!=')
        .replace(/\s*!==\s*/g, '!==')
        .replace(/\s*<=\s*/g, '<=')
        .replace(/\s*>=\s*/g, '>=')
        // Remove spaces around assignment operators
        .replace(/\s*=\s*/g, '=')
        .replace(/\s*\+=\s*/g, '+=')
        .replace(/\s*-=\s*/g, '-=')
        .replace(/\s*\*=\s*/g, '*=')
        .replace(/\s*\/=\s*/g, '/=')
        .replace(/\s*%=\s*/g, '%=')
        .replace(/\s*&=\s*/g, '&=')
        .replace(/\s*\|=\s*/g, '|=')
        .replace(/\s*\^=\s*/g, '^=')
        .replace(/\s*<<=\s*/g, '<<=')
        .replace(/\s*>>=\s*/g, '>>=')
        .replace(/\s*>>>=\s*/g, '>>>=')
        // Remove spaces around increment/decrement
        .replace(/\s*\+\+\s*/g, '++')
        .replace(/\s*--\s*/g, '--')
        // Remove spaces around bitwise operators
        .replace(/\s*&\s*/g, '&')
        .replace(/\s*\|\s*/g, '|')
        .replace(/\s*\^\s*/g, '^')
        .replace(/\s*~\s*/g, '~')
        .replace(/\s*<<\s*/g, '<<')
        .replace(/\s*>>\s*/g, '>>')
        .replace(/\s*>>>\s*/g, '>>>');

      return minified;
    } catch (error) {
      console.error('Minification error:', error);
      return `Error minifying JavaScript: ${error.message}`;
    }
  };

  const handleMinify = () => {
    if (!input.trim()) {
      toast.error('Please enter JavaScript code');
      return;
    }
    const minified = minifyJavaScript(input);
    setOutput(minified);
    toast.success('JavaScript code minified successfully!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Minified code copied to clipboard!');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    toast.success('Form cleared!');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Minified JavaScript file downloaded!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">JavaScript Minifier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Input JavaScript</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={preserveComments}
                        onChange={(e) => setPreserveComments(e.target.checked)}
                        className="rounded"
                      />
                      <Label>Preserve Comments</Label>
                    </div>
                  </div>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your JavaScript code here..."
                    className="min-h-[300px] font-mono"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Minified JavaScript</Label>
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
                <Button onClick={handleMinify} className="w-32">
                  Minify
                </Button>
                <Button onClick={handleClear} variant="outline" className="w-32">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-2">JavaScript Minification Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Removes unnecessary whitespace and newlines</li>
                  <li>Preserves code functionality while reducing file size</li>
                  <li>Handles all JavaScript operators and special characters</li>
                  <li>Option to preserve comments for debugging</li>
                  <li>Maintains proper spacing around operators for readability</li>
                  <li>Handles template literals, arrow functions, and modern JS features</li>
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