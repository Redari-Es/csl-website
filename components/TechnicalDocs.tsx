import { Button } from '@/components/ui/button';
import { Download, FileText, FileCode, FileSpreadsheet } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TechnicalDocs() {
  const t = useTranslations();
  
  const documents = [
    {
      name: t('datasheet'),
      type: 'PDF',
      size: '2.4 MB',
      icon: FileText
    },
    {
      name: t('userManual'),
      type: 'PDF',
      size: '5.1 MB',
      icon: FileCode
    },
    {
      name: t('technicalSpecifications'),
      type: 'XLSX',
      size: '1.2 MB',
      icon: FileSpreadsheet
    },
    {
      name: t('safetyCertifications'),
      type: 'PDF',
      size: '3.7 MB',
      icon: FileText
    }
  ];

  return (
    <div className="space-y-4">
      {documents.map((doc, index) => (
        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <doc.icon className="h-6 w-6 text-primary" />
            <div>
              <h4 className="font-medium">{doc.name}</h4>
              <p className="text-sm text-muted-foreground">
                {doc.type} • {doc.size}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            {t('download')}
          </Button>
        </div>
      ))}
    </div>
  );
}