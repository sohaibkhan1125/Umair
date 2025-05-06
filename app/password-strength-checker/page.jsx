'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../../components/ui/button';

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState('');
  const [strengthScore, setStrengthScore] = useState(0);
  const [strengthLevel, setStrengthLevel] = useState('');
  const [strengthColor, setStrengthColor] = useState('bg-gray-200');
  const [feedback, setFeedback] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  // Password strength criteria
  const criteria = [
    { id: 'length', label: 'At least 8 characters', regex: /.{8,}/, met: false },
    { id: 'uppercase', label: 'Contains uppercase letters', regex: /[A-Z]/, met: false },
    { id: 'lowercase', label: 'Contains lowercase letters', regex: /[a-z]/, met: false },
    { id: 'numbers', label: 'Contains numbers', regex: /[0-9]/, met: false },
    { id: 'special', label: 'Contains special characters', regex: /[^A-Za-z0-9]/, met: false },
  ];

  // Update password strength when password changes
  useEffect(() => {
    if (!password) {
      setStrengthScore(0);
      setStrengthLevel('');
      setStrengthColor('bg-gray-200');
      setFeedback([]);
      return;
    }

    // Check each criterion
    const metCriteria = criteria.map(criterion => {
      const isMetCriterion = criterion.regex.test(password);
      return { ...criterion, met: isMetCriterion };
    });

    // Count how many criteria are met
    const metCount = metCriteria.filter(c => c.met).length;
    
    // Calculate score (0-100)
    const score = Math.min(100, Math.round((metCount / criteria.length) * 100));
    
    // Set strength level
    let level = '';
    let color = '';
    
    if (score === 0) {
      level = 'None';
      color = 'bg-gray-200';
    } else if (score <= 25) {
      level = 'Very Weak';
      color = 'bg-red-500';
    } else if (score <= 50) {
      level = 'Weak';
      color = 'bg-orange-500';
    } else if (score <= 75) {
      level = 'Moderate';
      color = 'bg-yellow-500';
    } else if (score < 100) {
      level = 'Strong';
      color = 'bg-green-400';
    } else {
      level = 'Very Strong';
      color = 'bg-green-600';
    }
    
    // Generate feedback
    const feedbackItems = metCriteria
      .filter(c => !c.met)
      .map(c => c.label);
    
    // Additional checks for common patterns
    if (password.toLowerCase().includes('password')) {
      feedbackItems.push('Avoid using the word "password"');
    }
    
    if (/(\w)\1{2,}/.test(password)) {
      feedbackItems.push('Avoid repeating characters (e.g., "aaa")');
    }
    
    if (/^(123|abc|qwerty)/i.test(password)) {
      feedbackItems.push('Avoid common sequences (e.g., "123", "abc", "qwerty")');
    }

    if (password.length > 8 && metCriteria.filter(c => c.met).length <= 2) {
      feedbackItems.push('Use more varied character types for better security');
    }
    
    setStrengthScore(score);
    setStrengthLevel(level);
    setStrengthColor(color);
    setFeedback(feedbackItems);
  }, [password]);

  // Generate a strong random password
  const generatePassword = () => {
    const length = 16;
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_-+=<>?';
    
    const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
    
    // Make sure to include at least one of each character type
    let newPassword = 
      uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length)) +
      lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length)) +
      numberChars.charAt(Math.floor(Math.random() * numberChars.length)) +
      specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    
    // Fill the rest with random characters
    for (let i = 4; i < length; i++) {
      newPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    
    // Shuffle the password
    newPassword = newPassword.split('').sort(() => 0.5 - Math.random()).join('');
    
    setGeneratedPassword(newPassword);
    setCopySuccess(false);
  };

  // Copy password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
      () => {
        setCopySuccess(false);
      }
    );
  };

  const useGeneratedPassword = () => {
    setPassword(generatedPassword);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Password Strength Checker
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Your Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type your password to check its strength"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Password Strength:</span>
                  <span className={`text-sm font-medium 
                    ${strengthLevel === 'Very Strong' || strengthLevel === 'Strong' ? 'text-green-600' : 
                     strengthLevel === 'Moderate' ? 'text-yellow-600' : 
                     strengthLevel === 'Weak' || strengthLevel === 'Very Weak' ? 'text-red-600' : 'text-gray-600'}`}>
                    {strengthLevel || 'None'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${strengthColor}`} style={{ width: `${strengthScore}%` }}></div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-md font-medium mb-3 text-gray-700">Password Requirements:</h3>
                <ul className="space-y-2">
                  {criteria.map((criterion) => (
                    <li key={criterion.id} className="flex items-start">
                      <div className={`flex-shrink-0 h-5 w-5 ${criterion.regex.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                        {criterion.regex.test(password) ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                        )}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{criterion.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {feedback.length > 0 && (
                <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h3 className="text-md font-medium mb-2 text-orange-800">Suggestions for Improvement:</h3>
                  <ul className="list-disc list-inside text-sm text-orange-700 space-y-1">
                    {feedback.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Need a Strong Password?</h2>
                <p className="text-gray-600 mb-4">
                  Generate a secure random password that meets all security criteria.
                </p>
                
                {generatedPassword && (
                  <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">{generatedPassword}</span>
                      <button
                        onClick={copyToClipboard}
                        className="ml-2 p-2 text-blue-600 hover:text-blue-800"
                        title="Copy to clipboard"
                      >
                        {copySuccess ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        )}
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={generatePassword}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
                  >
                    Generate Password
                  </Button>
                  
                  {generatedPassword && (
                    <Button 
                      onClick={useGeneratedPassword}
                      variant="outline"
                      className="flex-1 py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Use This Password
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-md font-medium mb-3 text-blue-800">Password Security Tips:</h3>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-2">
                  <li>Never reuse passwords across multiple sites</li>
                  <li>Consider using a password manager to store complex passwords</li>
                  <li>Change your important passwords every 3-6 months</li>
                  <li>Avoid using personal information in your passwords</li>
                  <li>A longer password is generally more secure than a complex shorter one</li>
                  <li>Use multi-factor authentication whenever possible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PasswordStrengthChecker; 