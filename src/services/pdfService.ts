
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
  
  // Generate a dummy PDF content for demo purposes
  const dummyPdfBlob = generateDummyPdf();
  
  // Create object URLs for the blob
  const downloadUrl = URL.createObjectURL(dummyPdfBlob);
  const previewUrl = downloadUrl;
  
  return { downloadUrl, previewUrl };
};

// Function to generate a dummy PDF blob for demo purposes
const generateDummyPdf = (): Blob => {
  // This is a very minimal PDF file structure
  const pdfContent = `
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Font << /F1 6 0 R >> >>
endobj
5 0 obj
<< /Length 90 >>
stream
BT
/F1 24 Tf
100 700 Td
(Sample PDF with bolded syllables) Tj
/F1 14 Tf
0 -40 Td
(This is a mock PDF file. In a real implementation, this would be your processed PDF with the first syllable of each word in bold.) Tj
ET
endstream
endobj
6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 7
0000000000 65535 f
0000000010 00000 n
0000000059 00000 n
0000000118 00000 n
0000000217 00000 n
0000000258 00000 n
0000000399 00000 n
trailer
<< /Size 7 /Root 1 0 R >>
startxref
466
%%EOF
  `;

  return new Blob([pdfContent], { type: 'application/pdf' });
};

// Function for actual PDF download
export const downloadProcessedPdf = (downloadUrl: string, fileName: string): void => {
  // Create an anchor element
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `Processed_${fileName}`;
  
  // Append to the document
  document.body.appendChild(link);
  
  // Trigger the download
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  
  // Optional: revoke the object URL to free up memory
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
};
