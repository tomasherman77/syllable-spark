
import React from 'react';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <section className={cn("py-12 md:py-24", className)}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              PDF Processing Tool
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Bold the first syllable of every word in your PDF
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Transform your documents with SyllableBold. Our intuitive tool processes PDFs and
              highlights the first syllable or first three letters of each word while preserving
              your document's original formatting.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/3] overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/30 animate-float rounded-lg border shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-8 py-6 text-center">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">Before</p>
                      <p className="text-xl">This Agreement is entered into by the Parties.</p>
                    </div>
                    <div className="h-px bg-primary/30 my-6"></div>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">After</p>
                      <p className="text-xl">
                        <span className="font-bold">Thi</span>s <span className="font-bold">Ag</span>reement is <span className="font-bold">en</span>tered <span className="font-bold">in</span>to by the <span className="font-bold">Par</span>ties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
