'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Globe, MapPin, Network, Shield, Clock } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function MyIpAddressPage() {
  const [ipInfo, setIpInfo] = useState({
    ip: '',
    city: '',
    region: '',
    country: '',
    loc: '',
    org: '',
    postal: '',
    timezone: '',
    hostname: '',
    isp: '',
    asn: '',
    connection: {
      type: '',
      speed: '',
      isp: ''
    },
    security: {
      proxy: false,
      hosting: false,
      tor: false
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchIpInfo = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch IP information from multiple APIs for comprehensive data
      const [ipifyResponse, ipApiResponse] = await Promise.all([
        fetch('https://api.ipify.org?format=json'),
        fetch('http://ip-api.com/json/')
      ]);

      if (!ipifyResponse.ok || !ipApiResponse.ok) {
        throw new Error('Failed to fetch IP information');
      }

      const ipifyData = await ipifyResponse.json();
      const ipApiData = await ipApiResponse.json();

      // Get hostname
      const hostnameResponse = await fetch(`https://dns.google/resolve?name=${ipifyData.ip}`);
      const hostnameData = await hostnameResponse.json();

      // Get connection info
      const connectionInfo = {
        type: navigator.connection?.effectiveType || 'unknown',
        speed: navigator.connection?.downlink || 'unknown',
        isp: ipApiData.isp || 'unknown'
      };

      // Get security info
      const securityInfo = {
        proxy: false, // Would need additional API to check
        hosting: ipApiData.hosting || false,
        tor: false // Would need additional API to check
      };

      setIpInfo({
        ip: ipifyData.ip,
        city: ipApiData.city || 'Unknown',
        region: ipApiData.regionName || 'Unknown',
        country: ipApiData.country || 'Unknown',
        loc: ipApiData.lat && ipApiData.lon ? `${ipApiData.lat}, ${ipApiData.lon}` : 'Unknown',
        org: ipApiData.org || 'Unknown',
        postal: ipApiData.zip || 'Unknown',
        timezone: ipApiData.timezone || 'Unknown',
        hostname: hostnameData.Answer?.[0]?.data || 'Unknown',
        isp: ipApiData.isp || 'Unknown',
        asn: ipApiData.as || 'Unknown',
        connection: connectionInfo,
        security: securityInfo
      });

      toast.success('IP information updated!');
    } catch (error) {
      console.error('Error fetching IP info:', error);
      setError('Failed to fetch IP information. Please try again.');
      toast.error('Failed to fetch IP information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIpInfo();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleRefresh = () => {
    fetchIpInfo();
  };

  const InfoCard = ({ icon: Icon, title, value, copyable = true }) => (
    <div className="p-4 border rounded-lg bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-muted-foreground" />
          <Label className="font-medium">{title}</Label>
        </div>
        {copyable && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy(value)}
            className="h-8 px-2"
          >
            <Copy className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="mt-2 text-lg font-mono">{value}</div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">My IP Address</CardTitle>
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {error ? (
                <div className="text-red-500 text-center py-4">{error}</div>
              ) : loading ? (
                <div className="text-center py-4">Loading IP information...</div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard
                      icon={Globe}
                      title="IP Address"
                      value={ipInfo.ip}
                    />
                    <InfoCard
                      icon={MapPin}
                      title="Location"
                      value={`${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country}`}
                    />
                    <InfoCard
                      icon={Network}
                      title="ISP"
                      value={ipInfo.isp}
                    />
                    <InfoCard
                      icon={Clock}
                      title="Timezone"
                      value={ipInfo.timezone}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard
                      icon={MapPin}
                      title="Coordinates"
                      value={ipInfo.loc}
                    />
                    <InfoCard
                      icon={Network}
                      title="Organization"
                      value={ipInfo.org}
                    />
                    <InfoCard
                      icon={Network}
                      title="ASN"
                      value={ipInfo.asn}
                    />
                    <InfoCard
                      icon={Network}
                      title="Hostname"
                      value={ipInfo.hostname}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg bg-card">
                      <h3 className="font-semibold mb-2">Connection Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="font-mono">{ipInfo.connection.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Speed:</span>
                          <span className="font-mono">{ipInfo.connection.speed} Mbps</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-card">
                      <h3 className="font-semibold mb-2">Security Information</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Proxy:</span>
                          <span className="font-mono">{ipInfo.security.proxy ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Hosting:</span>
                          <span className="font-mono">{ipInfo.security.hosting ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tor:</span>
                          <span className="font-mono">{ipInfo.security.tor ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-2">About IP Addresses</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>An IP address is a unique identifier assigned to devices on a network</li>
                  <li>IPv4 addresses are in the format xxx.xxx.xxx.xxx</li>
                  <li>Your IP address can reveal your approximate location</li>
                  <li>ISPs assign IP addresses to their customers</li>
                  <li>Some IP addresses are reserved for special purposes</li>
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