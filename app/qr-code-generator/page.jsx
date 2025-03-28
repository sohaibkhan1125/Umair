'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Copy, QrCode, Link, Text, Mail, Phone, Wifi, Calendar } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from 'qrcode.react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function QRCodeGeneratorPage() {
  const [content, setContent] = useState('');
  const [type, setType] = useState('text');
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');
  const [includeMargin, setIncludeMargin] = useState(true);
  const [error, setError] = useState('');

  const handleGenerate = () => {
    if (!content.trim()) {
      setError('Please enter some content to generate QR code');
      toast.error('Please enter some content');
      return;
    }

    // Validate content based on type
    switch (type) {
      case 'url':
        if (!content.startsWith('http://') && !content.startsWith('https://')) {
          setError('Please enter a valid URL starting with http:// or https://');
          toast.error('Invalid URL format');
          return;
        }
        break;
      case 'email':
        if (!content.includes('@')) {
          setError('Please enter a valid email address');
          toast.error('Invalid email format');
          return;
        }
        break;
      case 'phone':
        if (!/^\+?[\d\s-()]+$/.test(content)) {
          setError('Please enter a valid phone number');
          toast.error('Invalid phone number format');
          return;
        }
        break;
      case 'wifi':
        if (!content.includes('SSID:')) {
          setError('Please enter WiFi details in the format: SSID:name,Password:pass');
          toast.error('Invalid WiFi format');
          return;
        }
        break;
      case 'calendar':
        if (!content.includes('BEGIN:VEVENT')) {
          setError('Please enter valid calendar event data');
          toast.error('Invalid calendar format');
          return;
        }
        break;
    }

    setError('');
    toast.success('QR code generated successfully!');
  };

  const handleDownload = () => {
    const svg = document.getElementById('qr-code');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qr-code.png';
      downloadLink.href = pngFile;
      downloadLink.click();
      toast.success('QR code downloaded!');
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleCopy = () => {
    const svg = document.getElementById('qr-code');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    navigator.clipboard.writeText(svgData);
    toast.success('QR code copied to clipboard!');
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'url':
        return 'https://example.com';
      case 'email':
        return 'example@email.com';
      case 'phone':
        return '+1 (555) 123-4567';
      case 'wifi':
        return 'SSID:MyWiFi,Password:MyPassword';
      case 'calendar':
        return 'BEGIN:VEVENT\nSUMMARY:Meeting\nDTSTART:20240320T100000\nDTEND:20240320T110000\nEND:VEVENT';
      default:
        return 'Enter text to generate QR code';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">QR Code Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Content Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">
                          <div className="flex items-center gap-2">
                            <Text className="w-4 h-4" />
                            Text
                          </div>
                        </SelectItem>
                        <SelectItem value="url">
                          <div className="flex items-center gap-2">
                            <Link className="w-4 h-4" />
                            URL
                          </div>
                        </SelectItem>
                        <SelectItem value="email">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email
                          </div>
                        </SelectItem>
                        <SelectItem value="phone">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Phone
                          </div>
                        </SelectItem>
                        <SelectItem value="wifi">
                          <div className="flex items-center gap-2">
                            <Wifi className="w-4 h-4" />
                            WiFi
                          </div>
                        </SelectItem>
                        <SelectItem value="calendar">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Calendar
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Content</Label>
                    {type === 'text' ? (
                      <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={getPlaceholder()}
                        className="min-h-[100px]"
                      />
                    ) : (
                      <Input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={getPlaceholder()}
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Size (px)</Label>
                      <Input
                        type="number"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        min={128}
                        max={512}
                        step={32}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Background Color</Label>
                      <Input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Foreground Color</Label>
                      <Input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Include Margin</Label>
                      <Select value={includeMargin.toString()} onValueChange={(value) => setIncludeMargin(value === 'true')}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleGenerate} className="flex-1">
                      <QrCode className="w-4 h-4 mr-2" />
                      Generate
                    </Button>
                    <Button variant="outline" onClick={handleCopy}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" onClick={handleDownload}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-4">
                  {error ? (
                    <div className="text-red-500 text-center py-4">{error}</div>
                  ) : content ? (
                    <div className="p-4 bg-white rounded-lg shadow-lg">
                      <QRCodeSVG
                        id="qr-code"
                        value={content}
                        size={size}
                        bgColor={bgColor}
                        fgColor={fgColor}
                        includeMargin={includeMargin}
                        level="H"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                      <QrCode className="w-16 h-16 mb-4" />
                      <p>Enter content to generate QR code</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-2">About QR Codes</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>QR codes can store various types of data including text, URLs, contact information, and more</li>
                  <li>Higher error correction levels allow the QR code to remain readable even if damaged</li>
                  <li>QR codes can be scanned using most smartphone cameras</li>
                  <li>The size and colors of QR codes can be customized while maintaining readability</li>
                  <li>QR codes are widely used for marketing, payments, and information sharing</li>
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