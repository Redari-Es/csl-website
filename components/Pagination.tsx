import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages,
  onPageChange 
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    
    // 总是显示第一页
    pages.push(1);
    
    // 当前页前后各显示1页
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    // 添加省略号或页码
    if (start > 2) {
      pages.push('...');
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // 添加结尾的省略号或页码
    if (end < totalPages - 1) {
      pages.push('...');
    }
    
    // 总是显示最后一页
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button 
        variant="outline" 
        size="icon" 
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <Button key={index} variant="ghost" size="icon" disabled>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            key={index}
            variant={currentPage === page ? 'default' : 'outline'}
            size="icon"
            onClick={() => onPageChange?.(page as number)}
          >
            {page}
          </Button>
        )
      ))}
      
      <Button 
        variant="outline" 
        size="icon" 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}