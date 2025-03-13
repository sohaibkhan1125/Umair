'use client';
import React from 'react'
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
  } from "lucide-react"
  import { Button } from "../../components/ui/button";
  import Navbar from "./Navbar";
  import Link from 'next/link';

const Footer = () => {
  return (
    <div>
       <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className=" rounded p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#01bd7d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8"/><path d="M16 8V5a2 2 0 0 1 2-2"/><circle cx="16" cy="13" r=".5"/><circle cx="18" cy="3" r=".5"/><circle cx="20" cy="21" r=".5"/><circle cx="20" cy="8" r=".5"/></svg>

                  </div>
                  <div>
                    <span className="font-bold text-white">
                      Web <span className="text-emerald-500"> Craft Kit</span>
                    </span>
                  </div>
                </div>
                <p className="text-sm">Free latest online tools for you without any subscription or any login.</p>
              </div>
  
              <div>
                <h3 className="font-bold text-white mb-4">Tools</h3>
                <ul className="space-y-4 text-sm">
                  <li>
                    <Link href="/button-generator" className="hover:text-white">Button Maker</Link>
                  </li>
                  <li>
                    <Link href='/css-code-formatter' className="hover:text-white">CSS Formatter</Link>
                  </li>
                  <li>
                    <Link href='/color-picker-tool' className="hover:text-white">Color Picker</Link>
                  </li>
                  <li>
                    <Link href='/html-minify' className="hover:text-white">HTML Minifier</Link>
                  </li>
                  <li>
                    <Link href='/image-compressor' className="hover:text-white">Image Compressor</Link>
                  </li>
                </ul>
              </div>
  
           
  
              <div>
                <h3 className="font-bold text-white mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/about" className="hover:text-white">About Us</Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white">Contact</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="terms-and-conditions" className="hover:text-white">Terms and Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              
            </div>
  
            <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
              <p>© 2025 Web Craft Kit. All rights reserved.</p>
            </div>
          </div>
        </footer>
    </div>
  )
}

export default Footer
