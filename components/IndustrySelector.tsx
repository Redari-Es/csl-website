"use client"
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export interface Industry {
  id: string;
  name: string;
}

interface IndustrySelectorProps {
  industries: Industry[];
  onSelect?: (industryId: string | null) => void;
  className?: string;
}

export default function IndustrySelector({ 
  industries, 
  onSelect,
  className = ""
}: IndustrySelectorProps) {
  const t = useTranslations();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  
  const handleSelect = (id: string | null) => {
    setSelectedIndustry(id);
    if (onSelect) onSelect(id);
  };

  return (
    <div className={className}>
      <h3 className="text-lg font-medium mb-4">{t('filterByIndustry')}</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={selectedIndustry === null ? 'default' : 'outline'}
          onClick={() => handleSelect(null)}
        >
          {t('allIndustries')}
        </Button>
        
        {industries.map((industry) => (
          <Button 
            key={industry.id}
            variant={selectedIndustry === industry.id ? 'default' : 'outline'}
            onClick={() => handleSelect(industry.id)}
          >
            {industry.name}
          </Button>
        ))}
      </div>
    </div>
  );
}