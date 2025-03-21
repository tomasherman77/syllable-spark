
import React from 'react';
import { Check, Upload, FileText, Download, Scan, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturesProps {
  className?: string;
}

const Features = ({ className }: FeaturesProps) => {
  const features = [
    {
      icon: <Upload className="h-6 w-6 text-primary" />,
      title: "Easy Uploads",
      description: "Drag and drop your PDF files directly into the browser or select them from your device.",
    },
    {
      icon: <Scan className="h-6 w-6 text-primary" />,
      title: "Syllable Detection",
      description: "Automatically detects the first syllable of each word in your document.",
    },
    {
      icon: <Wand2 className="h-6 w-6 text-primary" />,
      title: "Format Preservation",
      description: "Maintains your original PDF's formatting, including images, tables, and styling.",
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Multiple Options",
      description: "Choose between bolding the first syllable or the first three letters of each word.",
    },
    {
      icon: <Check className="h-6 w-6 text-primary" />,
      title: "High Accuracy",
      description: "Precise processing ensures consistent results across all types of documents.",
    },
    {
      icon: <Download className="h-6 w-6 text-primary" />,
      title: "Instant Downloads",
      description: "Download your processed PDF immediately after completion.",
    },
  ];

  return (
    <section className={cn("py-12 md:py-24 bg-secondary/50", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Everything you need for PDF syllable highlighting
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our tool is designed to make it easy to enhance readability and emphasis in your documents
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-2 rounded-lg border p-6 bg-background shadow-sm transition-all hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-2 rounded-full bg-primary/10">{feature.icon}</div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
