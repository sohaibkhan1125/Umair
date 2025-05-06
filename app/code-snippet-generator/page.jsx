'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../../components/ui/button';
import dynamic from 'next/dynamic';
import html2canvas from 'html2canvas';

// Dynamically import SyntaxHighlighter with no SSR to avoid hydration mismatch
const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then(mod => mod.Prism),
  { ssr: false }
);

const CodeSnippetGenerator = () => {
  const [code, setCode] = useState('function helloWorld() {\n  console.log("Hello, World!");\n}\n\nhelloWorld();');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('atomDark');
  const [fileName, setFileName] = useState('example.js');
  const [lineNumbers, setLineNumbers] = useState(true);
  const [borderRadius, setBorderRadius] = useState(8);
  const [fontSize, setFontSize] = useState(14);
  const [copySuccess, setCopySuccess] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);
  const [highlighterStyles, setHighlighterStyles] = useState(null);
  
  const snippetRef = useRef(null);
  
  // Load syntax highlighter styles only on client side
  useEffect(() => {
    import('react-syntax-highlighter/dist/esm/styles/prism').then(styles => {
      setHighlighterStyles({
        atomDark: styles.atomDark,
        dracula: styles.dracula,
        vscDarkPlus: styles.vscDarkPlus,
        tomorrow: styles.tomorrow,
        solarizedlight: styles.solarizedlight,
        prism: styles.prism,
        materialLight: styles.materialLight,
        materialDark: styles.materialDark
      });
    });
  }, []);
  
  // Language options
  const languageOptions = [
    { value: 'javascript', label: 'JavaScript', extension: 'js' },
    { value: 'typescript', label: 'TypeScript', extension: 'ts' },
    { value: 'jsx', label: 'React JSX', extension: 'jsx' },
    { value: 'tsx', label: 'React TSX', extension: 'tsx' },
    { value: 'html', label: 'HTML', extension: 'html' },
    { value: 'css', label: 'CSS', extension: 'css' },
    { value: 'sass', label: 'SASS', extension: 'scss' },
    { value: 'python', label: 'Python', extension: 'py' },
    { value: 'java', label: 'Java', extension: 'java' },
    { value: 'csharp', label: 'C#', extension: 'cs' },
    { value: 'php', label: 'PHP', extension: 'php' },
    { value: 'ruby', label: 'Ruby', extension: 'rb' },
    { value: 'go', label: 'Go', extension: 'go' },
    { value: 'rust', label: 'Rust', extension: 'rs' },
    { value: 'swift', label: 'Swift', extension: 'swift' },
    { value: 'bash', label: 'Bash', extension: 'sh' },
    { value: 'sql', label: 'SQL', extension: 'sql' },
    { value: 'json', label: 'JSON', extension: 'json' },
    { value: 'yaml', label: 'YAML', extension: 'yml' },
    { value: 'markdown', label: 'Markdown', extension: 'md' },
  ];
  
  // Theme options
  const themeOptions = [
    { value: 'atomDark', label: 'Atom Dark' },
    { value: 'dracula', label: 'Dracula' },
    { value: 'vscDarkPlus', label: 'VS Code Dark+' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'solarizedlight', label: 'Solarized Light' },
    { value: 'prism', label: 'Prism' },
    { value: 'materialLight', label: 'Material Light' },
    { value: 'materialDark', label: 'Material Dark' },
  ];
  
  // Get the actual theme object based on the selected theme value
  const getThemeStyle = () => {
    if (!highlighterStyles) return {};
    return highlighterStyles[theme] || highlighterStyles.atomDark;
  };
  
  // Update file extension when language changes
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    
    // Update file extension
    const selectedLanguage = languageOptions.find(l => l.value === newLanguage);
    if (selectedLanguage) {
      const namePart = fileName.split('.')[0] || 'example';
      setFileName(`${namePart}.${selectedLanguage.extension}`);
    }
  };
  
  // Copy code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
      () => {
        setCopySuccess(false);
      }
    );
  };
  
  // Generate and download image of code snippet
  const downloadAsImage = async () => {
    if (!snippetRef.current) return;
    
    try {
      const canvas = await html2canvas(snippetRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = fileName.split('.')[0] || 'code-snippet';
      link.download += '.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setImageSuccess(true);
      setTimeout(() => setImageSuccess(false), 2000);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };
  
  // Get HTML/CSS code for embedding
  const getEmbedCode = () => {
    // Create a simple HTML structure with inline styling for embedding
    const backgroundColor = theme.includes('Dark') || theme === 'dracula' || theme === 'atomDark' ? '#282a36' : '#f8f8f8';
    const embedCode = `<pre style="background: ${backgroundColor}; border-radius: ${borderRadius}px; padding: 16px; overflow: auto; font-size: ${fontSize}px; line-height: 1.5;">
  <code class="language-${language}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
</pre>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-${language}.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism${theme.includes('Dark') || theme === 'dracula' || theme === 'atomDark' ? '-tomorrow' : ''}.min.css" rel="stylesheet" />`;

    return embedCode;
  };
  
  // Copy embed code to clipboard
  const copyEmbedCode = () => {
    navigator.clipboard.writeText(getEmbedCode()).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
      () => {
        setCopySuccess(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Code Snippet Generator
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Code
                </label>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  rows={12}
                  placeholder="Paste your code here..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {languageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {themeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File Name
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="20"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Border Radius: {borderRadius}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div className="flex items-end">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={lineNumbers}
                      onChange={() => setLineNumbers(!lineNumbers)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Show Line Numbers</span>
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <span className="mr-2">Copy Code</span>
                  {copySuccess ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  )}
                </button>
                
                <button
                  onClick={downloadAsImage}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <span className="mr-2">Download Image</span>
                  {imageSuccess ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  )}
                </button>
                
                <button
                  onClick={copyEmbedCode}
                  className="bg-purple-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <span className="mr-2">Copy Embed Code</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                </button>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              
              <div className="mb-4 rounded-lg overflow-hidden" style={{ borderRadius: `${borderRadius}px` }} ref={snippetRef}>
                <div className="bg-gray-800 text-white px-4 py-2 text-sm flex justify-between items-center">
                  <span>{fileName}</span>
                  <span className="text-gray-400 text-xs">{languageOptions.find(l => l.value === language)?.label}</span>
                </div>
                
                {highlighterStyles && (
                  <SyntaxHighlighter
                    language={language}
                    style={getThemeStyle()}
                    showLineNumbers={lineNumbers}
                    customStyle={{
                      borderRadius: `0 0 ${borderRadius}px ${borderRadius}px`,
                      fontSize: `${fontSize}px`,
                      margin: 0,
                      padding: '16px',
                    }}
                  >
                    {code}
                  </SyntaxHighlighter>
                )}
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-md font-medium mb-3 text-blue-800">Tips:</h3>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-2">
                  <li>Use the "Download Image" button to create shareable screenshots of your code</li>
                  <li>The "Copy Embed Code" option gives you HTML to embed this snippet in websites</li>
                  <li>Customize the appearance to match your blog or documentation style</li>
                  <li>Add a proper filename to make your code snippets more professional</li>
                  <li>Choose themes that provide good contrast for your code</li>
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

export default CodeSnippetGenerator; 