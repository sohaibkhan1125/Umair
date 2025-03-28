'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Lock, Check, X } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: true,
    excludeAmbiguous: true
  });

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const similarChars = 'il1Lo0O';
  const ambiguousChars = '{}[]()/\'"`~,;:.<>';

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const generatePassword = () => {
    let chars = '';
    let password = '';

    // Build character set based on options
    if (options.uppercase) chars += uppercaseChars;
    if (options.lowercase) chars += lowercaseChars;
    if (options.numbers) chars += numberChars;
    if (options.symbols) chars += symbolChars;

    // Remove similar characters if option is enabled
    if (options.excludeSimilar) {
      chars = chars.split('').filter(char => !similarChars.includes(char)).join('');
    }

    // Remove ambiguous characters if option is enabled
    if (options.excludeAmbiguous) {
      chars = chars.split('').filter(char => !ambiguousChars.includes(char)).join('');
    }

    // Ensure at least one character from each selected type
    if (options.uppercase) {
      password += uppercaseChars[getRandomInt(uppercaseChars.length)];
    }
    if (options.lowercase) {
      password += lowercaseChars[getRandomInt(lowercaseChars.length)];
    }
    if (options.numbers) {
      password += numberChars[getRandomInt(numberChars.length)];
    }
    if (options.symbols) {
      password += symbolChars[getRandomInt(symbolChars.length)];
    }

    // Fill the rest randomly
    while (password.length < length) {
      password += chars[getRandomInt(chars.length)];
    }

    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    setPassword(password);
    toast.success('Password generated!');
  };

  const handleCopy = () => {
    if (!password) {
      toast.error('No password to copy');
      return;
    }
    navigator.clipboard.writeText(password);
    toast.success('Copied to clipboard!');
  };

  const handleClear = () => {
    setPassword('');
    toast.success('Password cleared!');
  };

  const calculateStrength = () => {
    if (!password) return 0;

    let strength = 0;
    const length = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);

    // Length contribution
    strength += Math.min(length * 2, 20);

    // Character type contribution
    if (hasUppercase) strength += 5;
    if (hasLowercase) strength += 5;
    if (hasNumbers) strength += 5;
    if (hasSymbols) strength += 5;

    return Math.min(strength, 100);
  };

  const getStrengthColor = (strength) => {
    if (strength < 30) return 'text-red-500';
    if (strength < 60) return 'text-yellow-500';
    if (strength < 80) return 'text-blue-500';
    return 'text-green-500';
  };

  const getStrengthText = (strength) => {
    if (strength < 30) return 'Weak';
    if (strength < 60) return 'Medium';
    if (strength < 80) return 'Strong';
    return 'Very Strong';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Password Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Password Length</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(Math.max(8, Math.min(128, parseInt(e.target.value) || 8)))}
                        min={8}
                        max={128}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        onClick={() => setLength(16)}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Options</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="uppercase"
                          checked={options.uppercase}
                          onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="uppercase">Include Uppercase (A-Z)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="lowercase"
                          checked={options.lowercase}
                          onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="lowercase">Include Lowercase (a-z)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="numbers"
                          checked={options.numbers}
                          onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="numbers">Include Numbers (0-9)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="symbols"
                          checked={options.symbols}
                          onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="symbols">Include Symbols (!@#$%^&*)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="excludeSimilar"
                          checked={options.excludeSimilar}
                          onChange={(e) => setOptions({ ...options, excludeSimilar: e.target.checked })}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="excludeSimilar">Exclude Similar Characters (il1Lo0O)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="excludeAmbiguous"
                          checked={options.excludeAmbiguous}
                          onChange={(e) => setOptions({ ...options, excludeAmbiguous: e.target.checked })}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="excludeAmbiguous">Exclude Ambiguous Characters (&#123;&#91;&#93;&#125;&#40;&#41;&#47;&#39;&#34;&#96;&#126;&#44;&#59;&#58;&#46;&#60;&#62;)</Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={generatePassword} className="flex-1">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Generate Password
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
                  <div className="space-y-2">
                    <Label>Generated Password</Label>
                    <div className="relative">
                      <Input
                        value={password}
                        readOnly
                        className="font-mono text-lg"
                        placeholder="Generated password will appear here..."
                      />
                      {password && (
                        <div className="absolute right-2 top-2">
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>

                  {password && (
                    <div className="space-y-2">
                      <Label>Password Strength</Label>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Strength:</span>
                          <span className={getStrengthColor(calculateStrength())}>
                            {getStrengthText(calculateStrength())}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getStrengthColor(calculateStrength())}`}
                            style={{ width: `${calculateStrength()}%` }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>Length: {password.length} characters</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>Unique: {new Set(password).size} characters</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {/[A-Z]/.test(password) ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                            <span>Uppercase</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {/[a-z]/.test(password) ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                            <span>Lowercase</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {/\d/.test(password) ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                            <span>Numbers</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {/[^A-Za-z0-9]/.test(password) ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                            <span>Symbols</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Password Security Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Use passwords that are at least 12 characters long</li>
                  <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
                  <li>Avoid using personal information or common words</li>
                  <li>Use different passwords for different accounts</li>
                  <li>Consider using a password manager to store your passwords securely</li>
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