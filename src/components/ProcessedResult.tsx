
import React from 'react';
import { Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { downloadProcessedPdf } from '@/services/pdfService';

interface ProcessedResultProps {
  fileName: string;
  downloadUrl: string;
  previewUrl?: string;
  className?: string;
}

const ProcessedResult = ({
  fileName,
  downloadUrl,
  previewUrl,
  className
}: ProcessedResultProps) => {
  const handleDownload = () => {
    downloadProcessedPdf(downloadUrl, fileName);
  };

  return (
    <div className={cn("w-full p-5 rounded-lg border space-y-4 bg-card animate-scale-in", className)}>
      <div>
        <h3 className="text-lg font-medium">Your PDF is Ready</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {fileName ? `Processed_${fileName}` : 'Your processed file is ready to download'}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button 
          variant="default" 
          onClick={handleDownload}
          className="flex items-center gap-2 w-full"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
        
        {previewUrl && (
          <Button 
            variant="outline" 
            onClick={() => window.open(previewUrl, '_blank')}
            className="flex items-center gap-2 w-full"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProcessedResult;
