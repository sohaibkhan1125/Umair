'use client'
import {
    Search,
    BarChart2,
    Link2,
    Globe,
    PlusCircle,
    Edit3,
    Copy,
    Lightbulb,
    ChevronDown,
    ArrowRight,
    Bell,
    ChartNoAxesCombined,
  } from "lucide-react"
  import { Button } from "../../components/ui/button";
  import React, { useState } from 'react';
  import Navbar from "./Navbar";
  import Link from 'next/link';
  
  
  export default function SeoToolsWebsite() {
    const tools = [
      { id: 1, name: "AdSense Revenue Calculator", description: "Calculate your AdSense revenue based on your traffic and click-through rate", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-dollar-sign"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>, href: "/adsense-revenue-calculator" },
      { 
        id: 2, 
        name: "Alt Text Generator", 
        description: "Generate alt text for your images to improve SEO and accessibility", 
        logo: (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-chart-no-axes-combined"
          >
            <path d="M12 16v5"/>
            <path d="M16 14v7"/>
            <path d="M20 10v11"/>
            <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/>
            <path d="M4 18v3"/>
            <path d="M8 14v7"/>
          </svg>
        ), 
        href: "/alt-text-generator" 
      },
            { id: 3, name: "AMP Validation Tool", description: "Amp validation tool to check if your website is AMP compliant", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-left-right-ellipsis"><path d="m18 8 4 4-4 4"/><path d="m6 8-4 4 4 4"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>, href: "/amp-validation" },
      { 
        id: 4, 
        name: "Banner Ad Maker", 
        description: "Create professional banner ads with custom text, colors, and designs", 
        logo: (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-layout-template"
          >
            <rect width="18" height="7" x="3" y="3" rx="1"/>
            <rect width="7" height="7" x="3" y="14" rx="1"/>
            <rect width="7" height="7" x="14" y="14" rx="1"/>
          </svg>
        ),
        href: "/banner-ad-maker" 
      },
      { 
        id: 5, 
        name: "Free Barcode Generator", 
        description: "Generate barcodes for your products and services", 
        logo: (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-barcode"
          >
            <path d="M3 5v14"/>
            <path d="M8 5v14"/>
            <path d="M12 5v14"/>
            <path d="M17 5v14"/>
            <path d="M21 5v14"/>
          </svg>
        ), 
        href: "/barcode-generator" 
      },
      { 
        id: 6, 
        name: "Base64 Encoder Tool", 
        description: "Encode and decode text to Base64 format", 
        logo: (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-baseline"
          >
            <path d="M4 20h16"/>
            <path d="m6 16 6-12 6 12"/>
            <path d="M8 12h8"/>
          </svg>
        ), 
        href: "/base64-encoder" 
      },
      { 
        id: 7, 
        name: "Bootstrap Grid Generator", 
        description: "Generate Bootstrap grid system for your website", 
        logo: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-panel-top"><rect width="18" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>
        ), 
        href: "/bootstrap-grid-generator" 
      },
      { 
        id: 8, 
        name: "Box Shadow Generator", 
        description: "Generate box shadow for your website easily", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-box"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>        ), 
        href: "/box-shadow-generator" 
      },
      { 
        id: 9, 
        name: "Browser Compatibility Checker", 
        description: "Check if your website is compatible with different browsers", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chrome"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" x2="12" y1="8" y2="8"/><line x1="3.95" x2="8.54" y1="6.06" y2="14"/><line x1="10.88" x2="15.46" y1="21.94" y2="14"/></svg>        ), 
        href: "/browser-compatibility-checker" 
      },
      { 
        id: 10, 
        name: "Button Maker Tool", 
        description: "Easily create beautiful buttons for your website", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-power"><path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/></svg>        ), 
        href: "/button-generator" 
      },
      { 
        id: 11, 
        name: "CMS Comparison Tool", 
        description: "Compare different CMS platforms and choose the best one for your website", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-right"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>        ), 
        href: "/cms-comparison-tool" 
      },
      { 
        id: 12, 
        name: "Color Picker Tool", 
        description: "Pick a color and get the hex code and rgb code", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paint-bucket"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/></svg>        ), 
          href: "/color-picker-tool" 
      },
      { 
        id: 13, 
        name: "Contrast Accessibility Checker", 
        description: "Check the contrast of your website and make it more accessible", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-contrast"><circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/></svg>        ),   
        href: "/contrast-accessibility-checker" 
      },
      { 
        id: 14, 
        name: "CSS Code Formatter", 
        description: "Format your CSS code easily with this tool", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>        ),   
        href: "/css-code-formatter" 
      },
      { 
        id: 15, 
        name: "CSS Gradient Generator", 
        description: "Generate CSS gradients for your website", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paint-roller"><rect width="16" height="6" x="2" y="2" rx="2"/><path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect width="4" height="6" x="8" y="16" rx="1"/></svg>        ),    
        href: "/css-gradient-generator" 
      },
      { 
        id: 16, 
        name: "CSS Grid Generator", 
        description: "Generate CSS grid for your website with this tool", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-between-horizontal-start"><rect width="13" height="7" x="8" y="3" rx="1"/><path d="m2 9 3 3-3 3"/><rect width="13" height="7" x="8" y="14" rx="1"/></svg>        ),      
        href: "/css-grid-generator" 
      },
      { 
        id: 17, 
        name: "CSS Minifire Tool", 
        description: "Minify your CSS code with this tool and make it smaller", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-left-right-ellipsis"><path d="m18 8 4 4-4 4"/><path d="m6 8-4 4 4 4"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>        ),      
        href: "/css-minifire-tool" 
      },
      { 
        id: 18, 
        name: "CSV to JSON Converter", 
        description: "Convert your CSV file to JSON with this tool", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-json"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"/><path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"/></svg>        ),               
        href: "/csv-to-json-converter" 
      },
      { 
        id: 19, 
        name: "CSV to SQL Converter", 
        description: "Convert your CSV file to SQL with this tool", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>        ),               
        href: "/csv-to-sql-converter" 
      },
      { 
        id: 20, 
        name: "DMCA Disclaimer", 
        description: "This is a free DMCA Disclaimer Generator tool that helps you create a DMCA Disclaimer for your website", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>        ),               
        href: "/dmca-disclaimer" 
      },
      { 
        id: 21, 
        name: "DNS Lookup Tool", 
        description: "This is a free DNS Lookup Tool that helps you find the DNS of a website", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-server"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>        ),               
        href: "/dns-lookup-tool" 
      },
      { 
        id: 22, 
        name: "DNS Speed Test Tool", 
        description: "This is a free DNS Speed Test Tool that helps you find the speed of your DNS", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-gauge"><path d="M15.6 2.7a10 10 0 1 0 5.7 5.7"/><circle cx="12" cy="12" r="2"/><path d="M13.4 10.6 19 5"/></svg>        ),               
        href: "/dns-speed-test" 
      },
      { 
        id: 23, 
        name: "Domain Age Checker", 
        description: "This is a free Domain Age Checker that helps you find the age of a website", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>        ),               
        href: "/domain-age-checker" 
      },
      { 
        id: 24, 
        name: "Favicon Generator", 
        description: "This is a free Favicon Generator tool that helps you to generator favicon.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-feather"><path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"/><path d="M16 8 2 22"/><path d="M17.5 15H9"/></svg> ),
href:"/favicon-generator" 
      },
      { 
        id: 25, 
        name: "Flexbox Generator", 
        description: "This is a free Flexbox layout generator tool for you.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-vertical-distribute-end"><rect width="14" height="6" x="5" y="14" rx="2"/><rect width="10" height="6" x="7" y="4" rx="2"/><path d="M2 20h20"/><path d="M2 10h20"/></svg>),
href:"/flexbox-generator" 
      },
      { 
        id: 26, 
        name: "HEX to JSX", 
        description: "By using this tool you can easily convert hex to jsx.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paintbrush-vertical"><path d="M10 2v2"/><path d="M14 2v4"/><path d="M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z"/><path d="M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1"/></svg>),
href:"/hex-to-jsx" 
      },
      { 
        id: 27, 
        name: "HTML Formatter", 
        description: "By using this tool you can easily format your HTML code.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-code"><path d="M10 12.5 8 15l2 2.5"/><path d="m14 12.5 2 2.5-2 2.5"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/></svg>),
href:"/html-formatter" 
      },
      { 
        id: 28, 
        name: "HTML Minifire", 
        description: "By using this tool you can easily minify your HTML code.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-unfold-horizontal"><path d="M16 12h6"/><path d="M8 12H2"/><path d="M12 2v2"/><path d="M12 8v2"/><path d="M12 14v2"/><path d="M12 20v2"/><path d="m19 15 3-3-3-3"/><path d="m5 9-3 3 3 3"/></svg>),
href:"/html-minify" 
      },
      { 
        id: 29, 
        name: "HTML to Markdown", 
        description: "By using this tool you can easily convert your HTML to markdown.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ampersand"><path d="M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13"/><path d="M16 12h3"/></svg>),
href:"/html-to-markdown" 
      },
      { 
        id: 30, 
        name: "Image Compressor", 
        description: "By using this tool you can easily compress image size.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-image"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="12" r="2"/><path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22"/></svg>),
href:"/image-compressor" 
      },
      { 
        id: 31, 
        name: "Image Cropper", 
        description: "By using this tool you can easily crope image size.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-crop"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>),
href:"/image-cropper" 
      },
      { 
        id: 32, 
        name: "Image to Base64", 
        description: "By using this tool you can easily convert image to base64.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-binary"><rect x="14" y="14" width="4" height="6" rx="2"/><rect x="6" y="4" width="4" height="6" rx="2"/><path d="M6 20h4"/><path d="M14 10h4"/><path d="M6 14h2v6"/><path d="M14 4h2v6"/></svg>),
href:"/image-to-base64" 
      },
      { 
        id: 33, 
        name: "Word Counter", 
        description: "By using this tool you can easily count the words in your text.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calculator"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>),
href:"/word-counter" 
      },
      { 
        id: 34, 
        name: "HTML to JSX", 
        description: "By using this tool you can easily convert your HTML to JSX.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-code-2"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m5 12-3 3 3 3"/><path d="m9 18 3-3-3-3"/></svg>),
href:"/html-to-jsx" 
      },
      { 
        id: 35, 
        name: "JavaScript Formatter", 
        description: "By using this tool you can easily format your JavaScript code.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-scan-icon lucide-file-scan"><path d="M20 10V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 14a2 2 0 0 0-2 2"/><path d="M20 14a2 2 0 0 1 2 2"/><path d="M20 22a2 2 0 0 0 2-2"/><path d="M16 22a2 2 0 0 1-2-2"/></svg>),
href:"/javascript-formatter" 
      },
      { 
        id: 36, 
        name: "JSX to JavaScript", 
        description: "By using this tool you can easily convert your JSX to JavaScript.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-container-icon lucide-container"><path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"/><path d="M10 21.9V14L2.1 9.1"/><path d="m10 14 11.9-6.9"/><path d="M14 19.8v-8.1"/><path d="M18 17.5V9.4"/></svg>),
href:"/jsx-to-javascript" 
      },
      { 
        id: 37, 
        name: "JSON Formatter", 
        description: "By using this tool you can easily format your JSON code.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-json-icon lucide-file-json"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"/><path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"/></svg>),
href:"/json-formatter" 
      },
      { 
        id: 38, 
        name: "Meta Tags Generator", 
        description: "By using this tool you can easily generate meta tags for your website.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tags-icon lucide-tags"><path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"/><path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="6.5" cy="9.5" r=".5" fill="currentColor"/></svg>),
href:"/meta-tag-generator" 
      },
      { 
        id: 39, 
        name: "Sitemap Generator", 
        description: "By using this tool you can easily generate sitemap for your website.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin-plus-inside-icon lucide-map-pin-plus-inside"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><path d="M12 7v6"/><path d="M9 10h6"/></svg>),
href:"/sitemap-generator" 
      },
      { 
        id: 40, 
        name: "Robots.txt Generator", 
        description: "By using this tool you can easily generate robots.txt for your website.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot-icon lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>),
href:"/robotstxt-generator" 
      },
      { 
        id: 41, 
        name: "Screen Resolution Checker", 
        description: "By using this tool you can easily check the screen resolution of your device.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor-icon lucide-monitor"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>),
href:"/screen-resolution-checker" 
      },
      { 
        id: 42, 
        name: "SQL Formatter", 
        description: "By using this tool you can easily format your SQL code.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database-backup-icon lucide-database-backup"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 12a9 3 0 0 0 5 2.69"/><path d="M21 9.3V5"/><path d="M3 5v14a9 3 0 0 0 6.47 2.88"/><path d="M12 12v4h4"/><path d="M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16"/></svg>),
href:"/sql-formatter" 
      },
      { 
        id: 43, 
        name: "SQL Minifier", 
        description: "By using this tool you can easily minify your SQL code.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-repeat2-icon lucide-repeat-2"><path d="m2 9 3-3 3 3"/><path d="M13 18H7a2 2 0 0 1-2-2V6"/><path d="m22 15-3 3-3-3"/><path d="M11 6h6a2 2 0 0 1 2 2v10"/></svg>),
href:"/sql-minifire" 
      },
      { 
        id: 44, 
        name: "Case Converter", 
        description: "By using this tool you can easily convert your text to different cases.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-case-upper-icon lucide-case-upper"><path d="m3 15 4-8 4 8"/><path d="M4 13h6"/><path d="M15 11h4.5a2 2 0 0 1 0 4H15V7h4a2 2 0 0 1 0 4"/></svg>),
href:"/case-converter" 
      },
      { 
        id: 45, 
        name: "Numberbase Converter", 
        description: "By using this tool you can easily convert your text to different cases.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-ordered-icon lucide-list-ordered"><path d="M10 12h11"/><path d="M10 18h11"/><path d="M10 6h11"/><path d="M4 10h2"/><path d="M4 6h1v4"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>),
href:"/numberbase-converter" 
      },
      { 
        id: 46, 
        name: "SQL to CSV", 
        description: "By using this tool you can easily convert your SQL to CSV.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-diff-icon lucide-file-diff"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M9 10h6"/><path d="M12 13V7"/><path d="M9 17h6"/></svg>),
href:"/sql-to-csv" 
      },
      { 
        id: 47, 
        name: "JavaScript Minifier", 
        description: "By using this tool you can easily minify your JavaScript code.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-diff-icon lucide-file-diff"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M9 10h6"/><path d="M12 13V7"/><path d="M9 17h6"/></svg>),
href:"/javascript-minifire" 
      },
      { 
        id: 48, 
        name: "JSON Validator", 
        description: "By using this tool you can easily validate your JSON code.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big-icon lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>),
href:"/json-validator" 
      },
      { 
        id: 49, 
        name: "My IP Address", 
        description: "By using this tool you can easily check your IP address.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pinned-icon lucide-map-pinned"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/><circle cx="12" cy="8" r="2"/><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/></svg>),
href:"/my-ip-address" 
      },
      { 
        id: 50, 
        name: "QR Code Generator", 
        description: "By using this tool you can easily generate QR code for your website.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-qr-code-icon lucide-qr-code"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>),
href:"/qr-code-generator" 
      },
      { 
        id: 51, 
        name: "Lorem Ipsum Generator", 
        description: "By using this tool you can easily generate Lorem Ipsum for your website.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-letter-text-icon lucide-letter-text"><path d="M15 12h6"/><path d="M15 6h6"/><path d="m3 13 3.553-7.724a.5.5 0 0 1 .894 0L11 13"/><path d="M3 18h18"/><path d="M4 11h6"/></svg>),
href:"/lorem-ipsum-generator" 
      },
      { 
        id: 52, 
        name: "MD5 Generator", 
        description: "By using this tool you can easily generate md5.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-lock-icon lucide-file-lock"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><rect width="8" height="6" x="8" y="12" rx="1"/><path d="M10 12v-2a2 2 0 1 1 4 0v2"/></svg>),
  href:"/md5-generator" 
      },
      { 
        id: 53, 
        name: "Password Generator", 
        description: "By using this tool you can easily generate password.", 
        logo: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key-round-icon lucide-key-round"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/></svg>),
  href:"/password-generator" 
      },
    ];
  
    const [searchTerm, setSearchTerm] = useState('');
    const [showAll, setShowAll] = useState(false);
  
    const filteredTools = tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="min-h-screen flex flex-col">
  
        <section className="bg-gradient-to-r from-blue-700 to-blue-500 py-16 text-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              90+  FREE LATEST TOOLS <span className="text-blue-100"> </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              We offer free latest tools that are easy to use and can help you improve your online presence.
            </p>
  
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full py-4 px-6 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>
  
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">Most Popular SEO Tools</h2>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTools.slice(0, showAll ? filteredTools.length : 8).map(tool => (
                <Link key={tool.id} href={tool.href} passHref>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                    <div className="bg-blue-600 p-6 flex justify-center">
                      {typeof tool.logo === 'string' ? (
                        <img src={tool.logo} alt={`${tool.name} logo`} className="w-16 h-16" />
                      ) : (
                        tool.logo
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-center">
                        {tool.name.split(' ').slice(0, 2).join(' ')}<br />
                        {tool.name.split(' ').slice(2).join(' ')}
                      </h3>
                      <p className="text-gray-600 text-sm text-center">{tool.description}</p>
                      <Button variant="outline" className="w-full mt-4 cursor-pointer">
                        Try Now
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
  
            <div className="text-center mt-12">
              <Button size="lg" className="px-8" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Show Less' : 'View All 70+ Tools'}
              </Button>
            </div>
          </div>
        </section>
  
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">Why Choose Our Tools?</h2>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Get real-time results in seconds, not minutes or hours</p>
              </div>
  
              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Accurate Data</h3>
                <p className="text-gray-600">Make decisions based on reliable and up-to-date information</p>
              </div>
  
              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 11L19 13L23 9"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">User Friendly</h3>
                <p className="text-gray-600">Intuitive interfaces designed for both beginners and experts</p>
              </div>
            </div>
          </div>
        </section>
  
       
  
      </div>
    )
  }
  
  