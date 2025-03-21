
import React, { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { Upload, FileUp, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  maxSize?: number; // in MB
  accept?: string;
  className?: string;
}

const FileUploader = ({
  onFileSelect,
  maxSize = 50, // Default max size: 50MB
  accept = '.pdf',
  className,
}: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = useCallback((file: File): boolean => {
    // Check file type
    if (!file.type.includes('pdf')) {
      toast.error('Please upload a PDF file.');
      return false;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size exceeds ${maxSize}MB limit.`);
      return false;
    }

    return true;
  }, [maxSize]);

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
        toast.success(`"${file.name}" successfully uploaded.`);
      }
    }
  }, [onFileSelect, validateFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
        toast.success(`"${file.name}" successfully uploaded.`);
      }
    }
  }, [onFileSelect, validateFile]);

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const removeFile = useCallback(() => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className={cn("w-full", className)}>
      {!selectedFile ? (
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full h-64 px-4 transition-colors border-2 border-dashed rounded-lg cursor-pointer",
            isDragging 
              ? "border-primary bg-primary/5 animate-pulse" 
              : "border-border hover:bg-secondary/50",
            "group animate-fade-in"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleFileDrop}
          onClick={handleButtonClick}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 space-y-3 text-center">
            <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Upload your PDF</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                PDF (max {maxSize}MB)
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 mt-4 border rounded-lg bg-secondary/30 animate-scale-in">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-md bg-primary/10">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="overflow-hidden">
              <p className="font-medium truncate max-w-[200px] sm:max-w-sm">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={removeFile}
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
