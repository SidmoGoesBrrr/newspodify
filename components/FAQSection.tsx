"use client";
import React from "react";
import { FAQAccordion } from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-0" id="faqs">
      <h1 className="text-5xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h1>
      <div>
        <FAQAccordion />
      </div>
    </div>
  );
};

export default FAQSection;
