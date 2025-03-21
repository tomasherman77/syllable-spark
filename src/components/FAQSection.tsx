
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

interface FAQSectionProps {
  className?: string;
}

const FAQSection = ({ className }: FAQSectionProps) => {
  const faqs = [
    {
      question: "What types of files can I process?",
      answer: "Currently, our tool only processes PDF files. We plan to add support for other document formats in the future."
    },
    {
      question: "Is there a file size limit?",
      answer: "Yes, the maximum file size is 50MB. For larger files, please contact us for custom solutions."
    },
    {
      question: "How does syllable detection work?",
      answer: "Our system uses linguistic algorithms to identify syllable breaks in English words. For languages or cases where syllable detection is challenging, you can choose the 'First 3 Letters' option instead."
    },
    {
      question: "Will my PDF formatting be preserved?",
      answer: "Yes, our tool preserves the original formatting of your PDF, including images, tables, colors, and most styling elements. Only the text is modified to bold the first syllable or letters of each word."
    },
    {
      question: "Is my data secure?",
      answer: "Your privacy is important to us. We do not store your PDFs on our servers longer than necessary for processing. All files are automatically deleted after processing is complete."
    },
    {
      question: "Can I process multiple PDFs at once?",
      answer: "Currently, the tool processes one PDF at a time. For batch processing needs, please contact us for custom solutions."
    }
  ];

  return (
    <section className={cn("py-12 md:py-24", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our PDF processing tool
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-500">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
