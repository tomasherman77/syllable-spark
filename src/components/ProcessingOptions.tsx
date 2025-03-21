
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export type BoldingOption = 'syllable' | 'letters';

interface ProcessingOptionsProps {
  boldingOption: BoldingOption;
  onBoldingOptionChange: (option: BoldingOption) => void;
  onProcess: () => void;
  isProcessing: boolean;
  disabled: boolean;
}

const ProcessingOptions = ({
  boldingOption,
  onBoldingOptionChange,
  onProcess,
  isProcessing,
  disabled
}: ProcessingOptionsProps) => {
  return (
    <div className="w-full space-y-6 rounded-lg p-5 border bg-card animate-fade-in">
      <div>
        <h3 className="text-lg font-medium">Processing Options</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Select how you want to bold your text
        </p>
      </div>
      
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="bolding-option">Bolding Style</Label>
          <Select
            value={boldingOption}
            onValueChange={(value) => onBoldingOptionChange(value as BoldingOption)}
            disabled={isProcessing || disabled}
          >
            <SelectTrigger id="bolding-option" className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="syllable">First Syllable</SelectItem>
              <SelectItem value="letters">First 3 Letters</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            {boldingOption === 'syllable' 
              ? 'Bold the first syllable of each word'
              : 'Bold the first 3 letters of each word'}
          </p>
        </div>
      </div>

      <Button 
        onClick={onProcess} 
        disabled={isProcessing || disabled}
        className="w-full"
      >
        {isProcessing ? 'Processing...' : 'Process PDF'}
      </Button>
    </div>
  );
};

export default ProcessingOptions;
