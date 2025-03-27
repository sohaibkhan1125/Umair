'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function SitemapGeneratorPage() {
  const [urls, setUrls] = useState([
    { url: '', priority: '1.0', changefreq: 'daily' }
  ]);
  const [output, setOutput] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://example.com');

  const handleAddUrl = () => {
    setUrls([...urls, { url: '', priority: '1.0', changefreq: 'daily' }]);
  };

  const handleRemoveUrl = (index) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
  };

  const handleUrlChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    setUrls(newUrls);
  };

  const generateSitemap = () => {
    try {
      // Validate URLs
      const validUrls = urls.filter(item => item.url.trim() !== '');
      if (validUrls.length === 0) {
        toast.error('Please add at least one URL');
        return;
      }

      // Generate XML
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${validUrls.map(item => `  <url>
    <loc>${baseUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}</loc>
    ${item.priority ? `<priority>${item.priority}</priority>` : ''}
    ${item.changefreq ? `<changefreq>${item.changefreq}</changefreq>` : ''}
  </url>`).join('\n')}
</urlset>`;

      setOutput(xml);
      toast.success('Sitemap generated successfully!');
    } catch (error) {
      toast.error('Error generating sitemap');
      console.error('Generation error:', error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Sitemap copied to clipboard!');
  };

  const handleClear = () => {
    setUrls([{ url: '', priority: '1.0', changefreq: 'daily' }]);
    setBaseUrl('https://example.com');
    setOutput('');
    toast.success('Form cleared!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Sitemap Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Base URL */}
              <div className="space-y-2">
                <Label htmlFor="baseUrl">Base URL</Label>
                <Input
                  id="baseUrl"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              {/* URLs */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>URLs</Label>
                  <Button
                    onClick={handleAddUrl}
                    variant="outline"
                    size="sm"
                    className="h-8 px-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add URL
                  </Button>
                </div>
                {urls.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="space-y-2">
                      <Label htmlFor={`url-${index}`}>URL Path</Label>
                      <Input
                        id={`url-${index}`}
                        value={item.url}
                        onChange={(e) => handleUrlChange(index, 'url', e.target.value)}
                        placeholder="/about"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`priority-${index}`}>Priority</Label>
                      <Input
                        id={`priority-${index}`}
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={item.priority}
                        onChange={(e) => handleUrlChange(index, 'priority', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`changefreq-${index}`}>Change Frequency</Label>
                      <select
                        id={`changefreq-${index}`}
                        value={item.changefreq}
                        onChange={(e) => handleUrlChange(index, 'changefreq', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="always">Always</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveUrl(index)}
                      className="h-8 px-2 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={generateSitemap} className="w-32">
                  Generate
                </Button>
                <Button onClick={handleClear} variant="outline" className="w-32">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>

              {output && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="output">Generated Sitemap</Label>
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
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}