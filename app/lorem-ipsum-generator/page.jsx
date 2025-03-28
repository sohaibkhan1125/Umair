'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RefreshCw, Text, List, Hash } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function LoremIpsumGeneratorPage() {
  const [type, setType] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');
  const [startWithLorem, setStartWithLorem] = useState(true);

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
    'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
    'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'voluptate', 'velit',
    'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur',
    'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui',
    'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateParagraph = () => {
    const words = [...loremWords];
    const sentenceCount = Math.floor(Math.random() * 3) + 3; // 3-5 sentences
    let paragraph = '';

    for (let i = 0; i < sentenceCount; i++) {
      const wordCount = Math.floor(Math.random() * 10) + 10; // 10-20 words
      let sentence = '';

      for (let j = 0; j < wordCount; j++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words[randomIndex];
        sentence += (j === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + ' ';
      }

      paragraph += sentence.trim() + '. ';
    }

    return paragraph.trim();
  };

  const generateList = () => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const wordCount = Math.floor(Math.random() * 5) + 3; // 3-8 words
      let item = '';
      for (let j = 0; j < wordCount; j++) {
        const randomIndex = Math.floor(Math.random() * loremWords.length);
        const word = loremWords[randomIndex];
        item += (j === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + ' ';
      }
      items.push(item.trim() + '.');
    }
    return items.join('\n');
  };

  const generateWords = () => {
    const words = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * loremWords.length);
      words.push(loremWords[randomIndex]);
    }
    return words.join(' ');
  };

  const handleGenerate = () => {
    let result = '';
    switch (type) {
      case 'paragraphs':
        const paragraphs = [];
        for (let i = 0; i < count; i++) {
          paragraphs.push(generateParagraph());
        }
        result = paragraphs.join('\n\n');
        break;
      case 'sentences':
        const sentences = [];
        for (let i = 0; i < count; i++) {
          const wordCount = Math.floor(Math.random() * 10) + 10;
          let sentence = '';
          for (let j = 0; j < wordCount; j++) {
            const randomIndex = Math.floor(Math.random() * loremWords.length);
            const word = loremWords[randomIndex];
            sentence += (j === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + ' ';
          }
          sentences.push(sentence.trim() + '.');
        }
        result = sentences.join(' ');
        break;
      case 'words':
        result = generateWords();
        break;
      case 'list':
        result = generateList();
        break;
      default:
        result = generateParagraph();
    }

    if (startWithLorem) {
      result = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + result;
    }

    setOutput(result);
    toast.success('Lorem ipsum text generated!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard!');
  };

  const handleClear = () => {
    setOutput('');
    toast.success('Output cleared!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Lorem Ipsum Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paragraphs">
                          <div className="flex items-center gap-2">
                            <Text className="w-4 h-4" />
                            Paragraphs
                          </div>
                        </SelectItem>
                        <SelectItem value="sentences">
                          <div className="flex items-center gap-2">
                            <Text className="w-4 h-4" />
                            Sentences
                          </div>
                        </SelectItem>
                        <SelectItem value="words">
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            Words
                          </div>
                        </SelectItem>
                        <SelectItem value="list">
                          <div className="flex items-center gap-2">
                            <List className="w-4 h-4" />
                            List Items
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Count</Label>
                    <Input
                      type="number"
                      value={count}
                      onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                      min={1}
                      max={100}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="startWithLorem"
                      checked={startWithLorem}
                      onChange={(e) => setStartWithLorem(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="startWithLorem">Start with "Lorem ipsum"</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleGenerate} className="flex-1">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Generate
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
                  <Label>Output</Label>
                  <Textarea
                    value={output}
                    readOnly
                    className="min-h-[300px] font-mono"
                    placeholder="Generated text will appear here..."
                  />
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-2">About Lorem Ipsum</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Lorem ipsum is placeholder text commonly used in the design industry</li>
                  <li>It has been used since the 1500s when an unknown printer took a galley of type</li>
                  <li>The text is derived from sections of Cicero's "de Finibus Bonorum et Malorum"</li>
                  <li>It helps designers focus on layout without being distracted by readable content</li>
                  <li>Lorem ipsum is now widely used in web design, typography, and publishing</li>
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
