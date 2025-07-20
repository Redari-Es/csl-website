'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

export default function Pagination({ currentPage, totalPages, className }: PaginationProps) {
  useEffect(() => {
    gsap.fromTo(
      '.page-item',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 }
    );
  }, []);

  return (
    <div className={`${className ?? ''}`}>
      <nav className="flex justify-center items-center gap-2">
        <button className="page-item flex items-center justify-center w-8 h-8 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white">
          <span>←</span>
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-item flex items-center justify-center w-8 h-8 rounded-full ${
              index + 1 === currentPage
                ? 'bg-cyan-700'
                : 'bg-transparent border border-cyan-500 hover:bg-cyan-600'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button className="page-item flex items-center justify-center w-8 h-8 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white">
            <span>→</span>
        </button>
      </nav>
    </div>
  );
}