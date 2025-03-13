import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Ensure Button is imported
import { ChevronDown, ArrowRight } from "lucide-react"; // ✅ Import missing icons
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded p-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#01bd7d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8"/><path d="M16 8V5a2 2 0 0 1 2-2"/><circle cx="16" cy="13" r=".5"/><circle cx="18" cy="3" r=".5"/><circle cx="20" cy="21" r=".5"/><circle cx="20" cy="8" r=".5"/></svg>
            </div>
            <div>
              <span className="font-bold text-xl -ml-2">
                Web <span className="text-emerald-500">Craft Kit</span>
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            

            <a href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-gray-600 hover:text-gray-900">
              Terms and Conditions
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href='/contact'>
            <Button className="hidden md:flex items-center gap-1 cursor-pointer">
              <span>Contact Us</span>
              <ArrowRight size={16} />
            </Button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Page;
