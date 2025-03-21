
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProcessingStatusProps {
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
  progress: number;
  className?: string;
}

const ProcessingStatus = ({
  status,
  progress,
  className
}: ProcessingStatusProps) => {
  const getStatusText = () => {
    switch(status) {
      case 'idle':
        return 'Ready to Process';
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Processing PDF...';
      case 'complete':
        return 'Processing Complete';
      case 'error':
        return 'Error Processing PDF';
      default:
        return 'Ready to Process';
    }
  };
  
  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{getStatusText()}</span>
        <span className="text-xs text-muted-foreground">{progress}%</span>
      </div>
      <Progress 
        value={progress} 
        className={cn(
          "h-2 transition-all duration-300", 
          status === 'error' ? "bg-destructive/30" : "",
          status === 'complete' ? "bg-green-100" : ""
        )}
      />
      <p className="text-xs text-muted-foreground mt-1">
        {status === 'processing' && 'Detecting syllables and applying formatting...'}
        {status === 'complete' && 'Your PDF is ready to download'}
        {status === 'error' && 'There was an error processing your PDF. Please try again.'}
      </p>
    </div>
  );
};

export default ProcessingStatus;
