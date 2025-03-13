'use client'
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Copy, Check } from 'lucide-react';

const Base64EncoderDecoder = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const encodeBase64 = () => {
    if (inputText) {
      try {
        const encoded = btoa(unescape(encodeURIComponent(inputText)));
        setOutputText(encoded);
      } catch (error) {
        setOutputText('Error encoding text. Please check your input.');
      }
    } else {
      setOutputText('Please enter some text.');
    }
  };

  const decodeBase64 = () => {
    if (inputText) {
      try {
        const decoded = decodeURIComponent(escape(atob(inputText)));
        setOutputText(decoded);
      } catch (error) {
        setOutputText('Invalid Base64 input.');
      }
    } else {
      setOutputText('Please enter some text.');
    }
  };

  const copyToClipboard = async () => {
    if (outputText) {
      try {
        await navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        alert('Failed to copy: ' + err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className=" mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
              Base64 Encoder/Decoder
            </h1>
            
            <div className="mb-6">
              <label 
                htmlFor="inputText" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Input Text:
              </label>
              <textarea
                id="inputText"
                rows="4"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter text here"
              />
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={encodeBase64}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
              >
                Encode to Base64
              </button>
              <button
                onClick={decodeBase64}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
              >
                Decode from Base64
              </button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label 
                  htmlFor="outputText" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Output:
                </label>
                {outputText && (
                  <button
                    onClick={copyToClipboard}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center gap-1 text-sm"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <textarea
                id="outputText"
                rows="4"
                value={outputText}
                readOnly
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Enter the text you want to encode or decode in the input field</li>
              <li>Click "Encode to Base64" to convert text to Base64 format</li>
              <li>Click "Decode from Base64" to convert Base64 back to regular text</li>
              <li>Click the copy icon to copy the output to your clipboard</li>
            </ol>
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Base64 encoding is commonly used for encoding binary data 
                (such as images or files) into ASCII text format that can be safely transmitted 
                over text-based protocols.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Base64EncoderDecoder;
