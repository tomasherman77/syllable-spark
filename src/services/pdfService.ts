
import { BoldingOption } from '@/components/ProcessingOptions';

// This is a mock service that simulates PDF processing
// In a real implementation, this would connect to a backend API

// Helper function to simulate async operations with progress
const simulateProgress = (
  callback: (progress: number) => void,
  duration: number = 3000,
  steps: number = 20
): Promise<void> => {
  return new Promise((resolve) => {
    let step = 0;
    const interval = duration / steps;
    
    const updateProgress = () => {
      step++;
      const progress = Math.min(Math.round((step / steps) * 100), 100);
      callback(progress);
      
      if (step >= steps) {
        resolve();
      } else {
        setTimeout(updateProgress, interval);
      }
    };
    
    updateProgress();
  });
};

// Mock function to simulate file upload
export const uploadPdfFile = async (
  file: File,
  onProgress: (progress: number) => void
): Promise<string> => {
  // Simulate file upload with progress
  await simulateProgress(onProgress, 2000, 10);
  
  // Return a mock file ID
  return `file_${Date.now()}`;
};

// Mock function to simulate PDF processing
export const processPdf = async (
  fileId: string,
  boldingOption: BoldingOption,
  onProgress: (progress: number) => void
): Promise<{ downloadUrl: string; previewUrl?: string }> => {
  // Simulate processing with progress
  await simulateProgress(onProgress, 4000, 20);
  
  // In a real implementation, this would return URLs from the backend
  // For now, we'll just return mock URLs
  return {
    downloadUrl: `#download-${fileId}-${boldingOption}`,
    previewUrl: boldingOption === 'syllable' 
      ? `#preview-syllable-${fileId}` 
      : `#preview-letters-${fileId}`
  };
};

// Mock function for actual PDF download (would connect to backend in real implementation)
export const downloadProcessedPdf = (downloadUrl: string, fileName: string): void => {
  // In a real app, this would trigger an actual download
  console.log(`Downloading processed PDF: ${fileName} from ${downloadUrl}`);
  
  // For demo purposes, we'll show an alert
  alert(`In a real implementation, this would download your processed PDF: ${fileName}`);
};
