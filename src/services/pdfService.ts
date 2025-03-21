
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

// Process PDF function - in a real app, this would call a backend API
export const processPdf = async (
  fileId: string,
  boldingOption: BoldingOption,
  onProgress: (progress: number) => void
): Promise<{ downloadUrl: string; previewUrl?: string }> => {
  // Simulate processing with progress
  await simulateProgress(onProgress, 4000, 20);
  
  // Generate a PDF with bolded first syllables or first 3 letters
  const pdfBlob = await generateProcessedPdf(boldingOption);
  
  // Create object URLs for the blob
  const downloadUrl = URL.createObjectURL(pdfBlob);
  const previewUrl = downloadUrl;
  
  return { downloadUrl, previewUrl };
};

// Generate a PDF with the first syllable or first 3 letters of each word bolded
const generateProcessedPdf = async (boldingOption: BoldingOption): Promise<Blob> => {
  // This is where the real implementation would process the PDF content
  // For now, we'll generate a sample PDF with some text that demonstrates the bolding
  
  const sampleText = "This is a demonstration of the PDF processing feature.";
  const processedContent = boldWords(sampleText, boldingOption);
  
  // Create a PDF with the processed content
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
<< /Font << /F1 6 0 R /F2 7 0 R >> >>
endobj
5 0 obj
<< /Length 350 >>
stream
BT
/F1 24 Tf
100 700 Td
(PDF with ${boldingOption === 'syllable' ? 'First Syllable' : 'First 3 Letters'} Bolded) Tj
/F1 14 Tf
100 650 Td
(Original text: ${sampleText}) Tj
/F1 14 Tf
100 620 Td
(${processedContent}) Tj
/F1 12 Tf
100 550 Td
(Note: This is a simulated result. In a full implementation, this would be your actual document with the first ${boldingOption === 'syllable' ? 'syllable' : '3 letters'} of each word bolded.) Tj
ET
endstream
endobj
6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
7 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
xref
0 8
0000000000 65535 f
0000000010 00000 n
0000000059 00000 n
0000000118 00000 n
0000000217 00000 n
0000000268 00000 n
0000000670 00000 n
0000000737 00000 n
trailer
<< /Size 8 /Root 1 0 R >>
startxref
807
%%EOF
  `;

  return new Blob([pdfContent], { type: 'application/pdf' });
};

// Function to bold parts of words based on the selected option
const boldWords = (text: string, boldingOption: BoldingOption): string => {
  // Split the text into words
  const words = text.split(' ');
  
  // Process each word
  const processedWords = words.map(word => {
    if (word.length <= 1) return word;
    
    let boldPart = '';
    let restPart = '';
    
    if (boldingOption === 'syllable') {
      // Simple syllable detection (in a real implementation, this would be more sophisticated)
      // For demo, we'll just bold the first vowel group
      const syllableMatch = word.match(/^[^aeiou]*[aeiou]+/i);
      if (syllableMatch) {
        boldPart = syllableMatch[0];
        restPart = word.substring(boldPart.length);
      } else {
        // Fallback if no vowel found
        boldPart = word.substring(0, 1);
        restPart = word.substring(1);
      }
    } else {
      // Bold first 3 letters (or the whole word if shorter)
      boldPart = word.substring(0, Math.min(3, word.length));
      restPart = word.substring(Math.min(3, word.length));
    }
    
    // For PDF content, we would return special formatting
    // In a real implementation with a PDF library, we would use proper text styling
    return `/F2 14 Tf(${boldPart}) Tj /F1 14 Tf(${restPart}) Tj`;
  });
  
  return processedWords.join(' ');
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
