
import React, { useState, useCallback, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FileUploader from '@/components/FileUploader';
import ProcessingOptions, { BoldingOption } from '@/components/ProcessingOptions';
import ProcessingStatus from '@/components/ProcessingStatus';
import ProcessedResult from '@/components/ProcessedResult';
import { uploadPdfFile, processPdf, downloadProcessedPdf } from '@/services/pdfService';

type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

const PdfProcessor = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [boldingOption, setBoldingOption] = useState<BoldingOption>('syllable');
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ downloadUrl: string; previewUrl?: string } | null>(null);

  // Reset progress when switching to a new status
  useEffect(() => {
    if (status === 'idle' || status === 'complete' || status === 'error') {
      setProgress(0);
    }
  }, [status]);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setFileId(null);
    setStatus('idle');
    setProgress(0);
    setResult(null);
  }, []);

  const handleBoldingOptionChange = useCallback((option: BoldingOption) => {
    setBoldingOption(option);
  }, []);

  const handleProcess = useCallback(async () => {
    if (!file) {
      toast.error('Please upload a PDF file first.');
      return;
    }

    try {
      // Step 1: Upload the file
      setStatus('uploading');
      const id = await uploadPdfFile(file, setProgress);
      setFileId(id);

      // Step 2: Process the file
      setStatus('processing');
      setProgress(0);
      const processResult = await processPdf(id, boldingOption, setProgress);
      
      // Step 3: Set the result
      setResult(processResult);
      setStatus('complete');
      toast.success('PDF processed successfully! Ready for download.');
    } catch (error) {
      console.error('Processing error:', error);
      setStatus('error');
      toast.error('An error occurred during processing. Please try again.');
    }
  }, [file, boldingOption]);

  const handleDownload = useCallback(() => {
    if (file && result?.downloadUrl) {
      downloadProcessedPdf(result.downloadUrl, file.name);
    }
  }, [file, result]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Process Your PDF</h1>
            <p className="text-muted-foreground">
              Upload your PDF and we'll bold the first syllable of every word.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <FileUploader onFileSelect={handleFileSelect} />
              
              {(status === 'uploading' || status === 'processing' || status === 'complete' || status === 'error') && (
                <ProcessingStatus status={status} progress={progress} />
              )}
              
              {status === 'complete' && file && result && (
                <ProcessedResult 
                  fileName={file.name}
                  downloadUrl={result.downloadUrl}
                  previewUrl={result.previewUrl}
                  className="mt-6"
                />
              )}
            </div>
            
            <div>
              <ProcessingOptions
                boldingOption={boldingOption}
                onBoldingOptionChange={handleBoldingOptionChange}
                onProcess={handleProcess}
                isProcessing={status === 'uploading' || status === 'processing'}
                disabled={!file}
              />
              
              <div className="mt-8 p-5 border rounded-lg bg-card">
                <h3 className="text-lg font-medium mb-3">PDF Processing Details</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-center rounded-full bg-primary/10 text-primary shrink-0">•</span>
                    <span>Your PDF will be processed with the selected bolding option.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-center rounded-full bg-primary/10 text-primary shrink-0">•</span>
                    <span>All formatting, images, and layouts will be preserved.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-center rounded-full bg-primary/10 text-primary shrink-0">•</span>
                    <span>Processing time depends on the PDF size and complexity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-center rounded-full bg-primary/10 text-primary shrink-0">•</span>
                    <span>Files are automatically deleted from our servers after processing.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer className="mt-12" />
    </div>
  );
};

export default PdfProcessor;
