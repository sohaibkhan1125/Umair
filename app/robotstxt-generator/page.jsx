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

export default function RobotsTxtGeneratorPage() {
  const [rules, setRules] = useState([
    { userAgent: '*', allow: '', disallow: '', crawlDelay: '' }
  ]);
  const [sitemap, setSitemap] = useState('');
  const [output, setOutput] = useState('');

  const handleAddRule = () => {
    setRules([...rules, { userAgent: '*', allow: '', disallow: '', crawlDelay: '' }]);
  };

  const handleRemoveRule = (index) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  const handleRuleChange = (index, field, value) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], [field]: value };
    setRules(newRules);
  };

  const generateRobotsTxt = () => {
    try {
      // Validate rules
      const validRules = rules.filter(rule => 
        rule.userAgent.trim() !== '' || 
        rule.allow.trim() !== '' || 
        rule.disallow.trim() !== '' || 
        rule.crawlDelay.trim() !== ''
      );

      if (validRules.length === 0) {
        toast.error('Please add at least one rule');
        return;
      }

      // Generate robots.txt content
      let content = '';
      
      validRules.forEach((rule, index) => {
        if (index > 0) content += '\n';
        
        if (rule.userAgent) {
          content += `User-agent: ${rule.userAgent}\n`;
        }
        
        if (rule.allow) {
          content += `Allow: ${rule.allow}\n`;
        }
        
        if (rule.disallow) {
          content += `Disallow: ${rule.disallow}\n`;
        }
        
        if (rule.crawlDelay) {
          content += `Crawl-delay: ${rule.crawlDelay}\n`;
        }
      });

      if (sitemap.trim()) {
        content += `\nSitemap: ${sitemap.trim()}`;
      }

      setOutput(content);
      toast.success('Robots.txt generated successfully!');
    } catch (error) {
      toast.error('Error generating robots.txt');
      console.error('Generation error:', error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Robots.txt copied to clipboard!');
  };

  const handleClear = () => {
    setRules([{ userAgent: '*', allow: '', disallow: '', crawlDelay: '' }]);
    setSitemap('');
    setOutput('');
    toast.success('Form cleared!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Robots.txt Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Rules */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Rules</Label>
                  <Button
                    onClick={handleAddRule}
                    variant="outline"
                    size="sm"
                    className="h-8 px-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Rule
                  </Button>
                </div>
                {rules.map((rule, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <Label>Rule {index + 1}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRule(index)}
                        className="h-8 px-2 text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`userAgent-${index}`}>User-agent</Label>
                        <Input
                          id={`userAgent-${index}`}
                          value={rule.userAgent}
                          onChange={(e) => handleRuleChange(index, 'userAgent', e.target.value)}
                          placeholder="*"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`allow-${index}`}>Allow</Label>
                        <Input
                          id={`allow-${index}`}
                          value={rule.allow}
                          onChange={(e) => handleRuleChange(index, 'allow', e.target.value)}
                          placeholder="/public/*"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`disallow-${index}`}>Disallow</Label>
                        <Input
                          id={`disallow-${index}`}
                          value={rule.disallow}
                          onChange={(e) => handleRuleChange(index, 'disallow', e.target.value)}
                          placeholder="/private/*"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`crawlDelay-${index}`}>Crawl-delay</Label>
                        <Input
                          id={`crawlDelay-${index}`}
                          type="number"
                          value={rule.crawlDelay}
                          onChange={(e) => handleRuleChange(index, 'crawlDelay', e.target.value)}
                          placeholder="10"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sitemap */}
              <div className="space-y-2">
                <Label htmlFor="sitemap">Sitemap URL (Optional)</Label>
                <Input
                  id="sitemap"
                  value={sitemap}
                  onChange={(e) => setSitemap(e.target.value)}
                  placeholder="https://example.com/sitemap.xml"
                />
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={generateRobotsTxt} className="w-32">
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
                    <Label htmlFor="output">Generated Robots.txt</Label>
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