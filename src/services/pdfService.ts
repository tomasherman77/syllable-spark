
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
  // In a real implementation, we would use a PDF library like pdf-lib or pdfjs
  // For this simulation, we'll create a more realistic sample PDF
  
  const paragraphs = [
    "This is a demonstration of the PDF processing feature with multiple paragraphs.",
    "In a real implementation, we would process your actual uploaded document using a PDF library.",
    "The application would analyze each word to determine syllables or count letters based on your selection.",
    "Education research suggests that highlighting parts of words can improve reading comprehension and retention."
  ];
  
  // Process each paragraph
  const processedParagraphs = paragraphs.map(paragraph => 
    processTextWithBolding(paragraph, boldingOption)
  );
  
  // Create a more structured PDF showing our processed text
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
<< /Length 1500 >>
stream
BT
/F1 24 Tf
50 750 Td
(PDF with ${boldingOption === 'syllable' ? 'First Syllable' : 'First 3 Letters'} Bolded) Tj

/F1 12 Tf
0 -40 Td
(Original text samples would be extracted from your document.) Tj

0 -30 Td
(Below is a demonstration of how the text would appear after processing:) Tj

/F1 14 Tf
-20 -40 Td
${processedParagraphs[0]}

0 -30 Td
${processedParagraphs[1]}

0 -30 Td
${processedParagraphs[2]}

0 -30 Td
${processedParagraphs[3]}

/F1 12 Tf
0 -50 Td
(In the full implementation, your entire document would be processed,) Tj
0 -20 Td
(including all text while preserving images, tables, and formatting.) Tj

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
0000001820 00000 n
0000001887 00000 n
trailer
<< /Size 8 /Root 1 0 R >>
startxref
1957
%%EOF
  `;

  return new Blob([pdfContent], { type: 'application/pdf' });
};

// Process a paragraph of text, formatting each word with proper PDF text commands
const processTextWithBolding = (text: string, boldingOption: BoldingOption): string => {
  // Split the text into words
  const words = text.split(' ');
  
  // Process each word
  const formattedParagraph = words.map(word => {
    // Handle punctuation by separating it from the word
    const punctuationMatch = word.match(/([.,;:!?)]*)$/);
    const punctuation = punctuationMatch ? punctuationMatch[0] : '';
    const cleanWord = word.substring(0, word.length - punctuation.length);
    
    if (cleanWord.length <= 1) {
      return `/F1 14 Tf(${word}) Tj`;
    }
    
    let boldPart = '';
    let restPart = '';
    
    if (boldingOption === 'syllable') {
      // More sophisticated syllable detection
      // First check for consonant clusters at beginning
      const consonantClusterMatch = cleanWord.match(/^[bcdfghjklmnpqrstvwxyz]+/i);
      const initialConsonants = consonantClusterMatch ? consonantClusterMatch[0] : '';
      
      // Then find the vowel group that follows
      const remainingAfterConsonants = cleanWord.substring(initialConsonants.length);
      const vowelGroupMatch = remainingAfterConsonants.match(/^[aeiou]+/i);
      
      if (vowelGroupMatch) {
        // The syllable is the initial consonants + the vowel group
        boldPart = initialConsonants + vowelGroupMatch[0];
        restPart = cleanWord.substring(boldPart.length) + punctuation;
      } else {
        // Fallback if no vowel found (rare cases)
        boldPart = cleanWord.substring(0, Math.min(2, cleanWord.length));
        restPart = cleanWord.substring(Math.min(2, cleanWord.length)) + punctuation;
      }
    } else {
      // Bold first 3 letters (or the whole word if shorter)
      boldPart = cleanWord.substring(0, Math.min(3, cleanWord.length));
      restPart = cleanWord.substring(Math.min(3, cleanWord.length)) + punctuation;
    }
    
    // Return PDF text commands for this word
    return `/F2 14 Tf(${boldPart}) Tj /F1 14 Tf(${restPart}) Tj`;
  });
  
  // Join the formatted words with spaces in between
  return formattedParagraph.join(' ');
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
