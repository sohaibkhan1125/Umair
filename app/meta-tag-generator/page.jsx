'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Eye } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function MetaTagGeneratorPage() {
  const [metaData, setMetaData] = useState({
    title: 'My Website',
    description: 'Welcome to my website',
    keywords: 'website, meta tags, seo',
    author: 'Your Name',
    ogTitle: 'My Website',
    ogDescription: 'Welcome to my website',
    ogImage: 'https://example.com/image.jpg',
    ogUrl: 'https://example.com',
    twitterCard: 'summary_large_image',
    twitterTitle: 'My Website',
    twitterDescription: 'Welcome to my website',
    twitterImage: 'https://example.com/image.jpg',
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1.0',
    charset: 'UTF-8',
    language: 'en',
    themeColor: '#ffffff',
    favicon: 'https://example.com/favicon.ico',
  });

  const [output, setOutput] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const generateMetaTags = (data) => {
    const tags = [
      // Basic Meta Tags
      `<title>${data.title}</title>`,
      `<meta name="description" content="${data.description}" />`,
      `<meta name="keywords" content="${data.keywords}" />`,
      `<meta name="author" content="${data.author}" />`,
      `<meta name="robots" content="${data.robots}" />`,
      `<meta name="viewport" content="${data.viewport}" />`,
      `<meta charset="${data.charset}" />`,
      `<meta http-equiv="Content-Language" content="${data.language}" />`,
      `<meta name="theme-color" content="${data.themeColor}" />`,
      `<link rel="icon" href="${data.favicon}" />`,

      // Open Graph Meta Tags
      `<meta property="og:title" content="${data.ogTitle}" />`,
      `<meta property="og:description" content="${data.ogDescription}" />`,
      `<meta property="og:image" content="${data.ogImage}" />`,
      `<meta property="og:url" content="${data.ogUrl}" />`,
      `<meta property="og:type" content="website" />`,

      // Twitter Card Meta Tags
      `<meta name="twitter:card" content="${data.twitterCard}" />`,
      `<meta name="twitter:title" content="${data.twitterTitle}" />`,
      `<meta name="twitter:description" content="${data.twitterDescription}" />`,
      `<meta name="twitter:image" content="${data.twitterImage}" />`,
    ];

    return tags.join('\n');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMetaData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerate = () => {
    const generatedTags = generateMetaTags(metaData);
    setOutput(generatedTags);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Meta tags copied to clipboard!');
  };

  const handleClear = () => {
    setMetaData({
      title: '',
      description: '',
      keywords: '',
      author: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      ogUrl: '',
      twitterCard: 'summary_large_image',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: '',
      robots: 'index, follow',
      viewport: 'width=device-width, initial-scale=1.0',
      charset: 'UTF-8',
      language: 'en',
      themeColor: '#ffffff',
      favicon: '',
    });
    setOutput('');
    toast.success('Form cleared!');
  };

  const handlePreviewToggle = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Meta Tag Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Basic Meta Tags */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Meta Tags</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={metaData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={metaData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      name="keywords"
                      value={metaData.keywords}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      name="author"
                      value={metaData.author}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Open Graph Meta Tags */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Open Graph Meta Tags</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ogTitle">OG Title</Label>
                    <Input
                      id="ogTitle"
                      name="ogTitle"
                      value={metaData.ogTitle}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ogDescription">OG Description</Label>
                    <Input
                      id="ogDescription"
                      name="ogDescription"
                      value={metaData.ogDescription}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ogImage">OG Image URL</Label>
                    <Input
                      id="ogImage"
                      name="ogImage"
                      value={metaData.ogImage}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ogUrl">OG URL</Label>
                    <Input
                      id="ogUrl"
                      name="ogUrl"
                      value={metaData.ogUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Twitter Card Meta Tags */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Twitter Card Meta Tags</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitterTitle">Twitter Title</Label>
                    <Input
                      id="twitterTitle"
                      name="twitterTitle"
                      value={metaData.twitterTitle}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitterDescription">Twitter Description</Label>
                    <Input
                      id="twitterDescription"
                      name="twitterDescription"
                      value={metaData.twitterDescription}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitterImage">Twitter Image URL</Label>
                    <Input
                      id="twitterImage"
                      name="twitterImage"
                      value={metaData.twitterImage}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Meta Tags */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Meta Tags</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="robots">Robots</Label>
                    <Input
                      id="robots"
                      name="robots"
                      value={metaData.robots}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="viewport">Viewport</Label>
                    <Input
                      id="viewport"
                      name="viewport"
                      value={metaData.viewport}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="charset">Charset</Label>
                    <Input
                      id="charset"
                      name="charset"
                      value={metaData.charset}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Input
                      id="language"
                      name="language"
                      value={metaData.language}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="themeColor">Theme Color</Label>
                    <Input
                      id="themeColor"
                      name="themeColor"
                      value={metaData.themeColor}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="favicon">Favicon URL</Label>
                    <Input
                      id="favicon"
                      name="favicon"
                      value={metaData.favicon}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={handleGenerate} className="w-32">
                  Generate
                </Button>
                <Button onClick={handlePreviewToggle} variant="outline" className="w-32">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button onClick={handleClear} variant="outline" className="w-32">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>

              {output && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="output">Generated Meta Tags</Label>
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
                  {previewMode ? (
                    <div className="p-4 bg-white border rounded-lg">
                      <div className="font-mono whitespace-pre-wrap">{output}</div>
                    </div>
                  ) : (
                    <Textarea
                      id="output"
                      value={output}
                      readOnly
                      className="min-h-[200px] font-mono bg-muted"
                    />
                  )}
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