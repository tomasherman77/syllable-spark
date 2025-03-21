
import React from 'react';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("w-full py-6", className)}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold">SyllableBold</h1>
        </div>
        <nav className="hidden sm:flex space-x-6 items-center">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Examples</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
