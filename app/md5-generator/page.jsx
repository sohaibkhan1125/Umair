'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Hash, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import crypto from 'crypto';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function MD5GeneratorPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [salt, setSalt] = useState('');
  const [useSalt, setUseSalt] = useState(false);

  const generateMD5 = (text, salt = '') => {
    const hash = crypto.createHash('md5');
    hash.update(text + salt);
    return hash.digest('hex');
  };

  const handleGenerate = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to generate MD5 hash');
      return;
    }

    const hash = generateMD5(input, useSalt ? salt : '');
    setOutput(hash);
    toast.success('MD5 hash generated!');
  };

  const handleCopy = () => {
    if (!output) {
      toast.error('No hash to copy');
      return;
    }
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard!');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setSalt('');
    setUseSalt(false);
    toast.success('Form cleared!');
  };

  const handleGenerateSalt = () => {
    const newSalt = crypto.randomBytes(8).toString('hex');
    setSalt(newSalt);
    toast.success('New salt generated!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">MD5 Hash Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Input Text</Label>
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Enter text to generate MD5 hash..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Salt (Optional)</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="useSalt"
                          checked={useSalt}
                          onChange={(e) => setUseSalt(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="useSalt" className="text-sm">Use Salt</Label>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={salt}
                        onChange={(e) => setSalt(e.target.value)}
                        placeholder="Enter salt or generate one..."
                        disabled={!useSalt}
                      />
                      <Button
                        variant="outline"
                        onClick={handleGenerateSalt}
                        disabled={!useSalt}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleGenerate} className="flex-1">
                      <Hash className="w-4 h-4 mr-2" />
                      Generate MD5
                    </Button>
                    <Button variant="outline" onClick={handleCopy}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" onClick={handleClear}>
                      Clear
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>MD5 Hash</Label>
                  <Textarea
                    value={output}
                    readOnly
                    className="min-h-[100px] font-mono"
                    placeholder="Generated MD5 hash will appear here..."
                  />
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-2">About MD5 Hashing</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>MD5 (Message-Digest Algorithm 5) is a cryptographic hash function</li>
                  <li>It produces a 128-bit (32-character) hash value</li>
                  <li>MD5 hashes are commonly used for file integrity verification</li>
                  <li>While MD5 is widely used, it's not recommended for cryptographic security</li>
                  <li>Adding a salt can increase security by making rainbow table attacks more difficult</li>
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