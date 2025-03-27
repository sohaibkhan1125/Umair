'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function HtmlToJsxPage() {
  const [html, setHtml] = useState('');
  const [jsx, setJsx] = useState('');

  const convertHtmlToJsx = (input: string) => {
    try {
      // Basic HTML to JSX conversion
      let result = input
        // Convert class to className
        .replace(/class=/g, 'className=')
        // Convert for to htmlFor
        .replace(/for=/g, 'htmlFor=')
        // Convert self-closing tags
        .replace(/<img([^>]*)>/g, '<img$1 />')
        .replace(/<input([^>]*)>/g, '<input$1 />')
        .replace(/<br([^>]*)>/g, '<br$1 />')
        // Convert style attributes to objects
        .replace(/style="([^"]*)"/g, (match, style) => {
          const styleObj = style.split(';')
            .filter(Boolean)
            .reduce((acc: any, curr: string) => {
              const [key, value] = curr.split(':').map(s => s.trim());
              const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
              acc[camelKey] = value;
              return acc;
            }, {});
          return `style={${JSON.stringify(styleObj)}}`;
        })
        // Convert event handlers
        .replace(/onclick=/g, 'onClick=')
        .replace(/onchange=/g, 'onChange=')
        .replace(/onsubmit=/g, 'onSubmit=')
        .replace(/onkeydown=/g, 'onKeyDown=')
        .replace(/onkeyup=/g, 'onKeyUp=')
        .replace(/onmouseover=/g, 'onMouseOver=')
        .replace(/onmouseout=/g, 'onMouseOut=')
        // Convert boolean attributes
        .replace(/disabled=/g, 'disabled={true}')
        .replace(/readonly=/g, 'readOnly={true}')
        .replace(/required=/g, 'required={true}')
        .replace(/checked=/g, 'checked={true}')
        .replace(/selected=/g, 'selected={true}');

      setJsx(result);
    } catch (error) {
      toast.error('Error converting HTML to JSX');
      console.error('Conversion error:', error);
    }
  };

  const handleConvert = () => {
    if (!html.trim()) {
      toast.error('Please enter some HTML to convert');
      return;
    }
    convertHtmlToJsx(html);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsx);
    toast.success('Copied to clipboard!');
  };

  const handleClear = () => {
    setHtml('');
    setJsx('');
    toast.success('Cleared all fields');
  };

  return (
    <section>
      <Navbar/>
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">HTML to JSX Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="html">HTML Input</Label>
              <Textarea
                id="html"
                placeholder="Enter your HTML here..."
                value={html}
                onChange={(e) => setHtml(e.target.value)}
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
                <Label htmlFor="jsx">JSX Output</Label>
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
                id="jsx"
                value={jsx}
                readOnly
                className="min-h-[200px] font-mono bg-muted"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <Footer/>
    </section>
  );
} 