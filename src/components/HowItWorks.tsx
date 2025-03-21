
import React from 'react';
import { cn } from '@/lib/utils';

interface HowItWorksProps {
  className?: string;
}

const HowItWorks = ({ className }: HowItWorksProps) => {
  const steps = [
    {
      number: "01",
      title: "Upload Your PDF",
      description: "Select your PDF file from your device or drag and drop it into the upload area. We accept files up to 50MB in size.",
    },
    {
      number: "02",
      title: "Choose Bolding Option",
      description: "Select whether you want to bold the first syllable of each word or the first three letters.",
    },
    {
      number: "03",
      title: "Process Your Document",
      description: "Our system analyzes your PDF, detects word syllables, and applies bold formatting to the first syllable of each word.",
    },
    {
      number: "04",
      title: "Download the Result",
      description: "Once processing is complete, you can download your new PDF with the first syllable of each word bolded.",
    },
  ];

  return (
    <section className={cn("py-12 md:py-24", className)} id="how-it-works">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Process
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              How SyllableBold Works
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Process your PDFs in four simple steps
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 mt-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="grid md:grid-cols-5 items-start gap-4 md:gap-8 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-primary text-white border-primary shadow-sm md:col-span-1">
                <span className="text-sm font-medium">{step.number}</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
