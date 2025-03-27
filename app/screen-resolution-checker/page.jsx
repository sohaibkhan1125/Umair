'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function ScreenResolutionCheckerPage() {
  const [screenInfo, setScreenInfo] = useState({
    width: 0,
    height: 0,
    availWidth: 0,
    availHeight: 0,
    colorDepth: 0,
    pixelDepth: 0,
    devicePixelRatio: 0,
    orientation: '',
    aspectRatio: '',
  });

  const updateScreenInfo = () => {
    const newInfo = {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
      devicePixelRatio: window.devicePixelRatio,
      orientation: window.screen.orientation?.type || 'unknown',
      aspectRatio: (window.screen.width / window.screen.height).toFixed(2),
    };
    setScreenInfo(newInfo);
  };

  useEffect(() => {
    updateScreenInfo();
    
    // Update on resize and orientation change
    window.addEventListener('resize', updateScreenInfo);
    window.addEventListener('orientationchange', updateScreenInfo);
    
    return () => {
      window.removeEventListener('resize', updateScreenInfo);
      window.removeEventListener('orientationchange', updateScreenInfo);
    };
  }, []);

  const handleCopy = () => {
    const infoText = `Screen Resolution Information:
Width: ${screenInfo.width}px
Height: ${screenInfo.height}px
Available Width: ${screenInfo.availWidth}px
Available Height: ${screenInfo.availHeight}px
Color Depth: ${screenInfo.colorDepth} bits
Pixel Depth: ${screenInfo.pixelDepth} bits
Device Pixel Ratio: ${screenInfo.devicePixelRatio}
Orientation: ${screenInfo.orientation}
Aspect Ratio: ${screenInfo.aspectRatio}`;

    navigator.clipboard.writeText(infoText);
    toast.success('Screen information copied to clipboard!');
  };

  const handleRefresh = () => {
    updateScreenInfo();
    toast.success('Screen information refreshed!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Screen Resolution Checker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4 p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">Screen Dimensions</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Width:</span>
                      <span className="font-medium">{screenInfo.width}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Height:</span>
                      <span className="font-medium">{screenInfo.height}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available Width:</span>
                      <span className="font-medium">{screenInfo.availWidth}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available Height:</span>
                      <span className="font-medium">{screenInfo.availHeight}px</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">Display Properties</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Color Depth:</span>
                      <span className="font-medium">{screenInfo.colorDepth} bits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pixel Depth:</span>
                      <span className="font-medium">{screenInfo.pixelDepth} bits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Device Pixel Ratio:</span>
                      <span className="font-medium">{screenInfo.devicePixelRatio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Orientation:</span>
                      <span className="font-medium capitalize">{screenInfo.orientation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Aspect Ratio:</span>
                      <span className="font-medium">{screenInfo.aspectRatio}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={handleCopy} className="w-32">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Info
                </Button>
                <Button onClick={handleRefresh} variant="outline" className="w-32">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-2">What is Screen Resolution?</h3>
                <p className="text-muted-foreground">
                  Screen resolution refers to the number of pixels displayed on your screen, typically shown as width × height (e.g., 1920 × 1080). 
                  The higher the resolution, the more pixels are displayed, resulting in sharper and clearer images. 
                  Available resolution is the actual usable screen space, excluding taskbars and other system UI elements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}