'use client';

import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export default function SearchBar({ 
  placeholder,
  searchOpen,
  setSearchOpen,
  searchValue,
  setSearchValue,
}: SearchBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <div className="ml-4 relative flex items-center transition-all duration-300">
      {searchOpen ? (
        <div className="flex items-center bg-sky-50 rounded-lg border border-sky-200 overflow-hidden transition-all duration-300 w-48 md:w-56 shadow-sm">
          <input
            ref={searchInputRef}
            type="text"
            placeholder={placeholder}
            className="w-full pl-3 py-2 text-sm focus:outline-none bg-transparent text-sky-700 placeholder:text-sky-400"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus
          />
          <Button 
            variant="ghost" 
            size="icon"
            className="text-sky-500 hover:bg-sky-100 transition-colors"
            onClick={() => setSearchOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button 
          variant="ghost" 
          size="icon"
          className="text-sky-600 hover:bg-sky-100 transition-colors duration-200"
          onClick={() => setSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}