// FAQSection.tsx
"use client";

import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { faqs } from "@/data/constants";
 
const FAQSection = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-0" id="faqs">
      <h1 className="text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">Frequently Asked Questions</h1>
      <div className="flex justify-center">
        <Accordion type="single" collapsible className="w-4/5">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-300 dark:border-gray-700 last:border-none">
              <AccordionTrigger className="flex justify-between items-center text-2xl text-gray-800 dark:text-gray-200 py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xl text-gray-700 dark:text-gray-300 p-3">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;
