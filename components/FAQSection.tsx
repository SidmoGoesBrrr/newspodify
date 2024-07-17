"use client";

import React from "react";
import { TextRevealCard, TextRevealCardTitle, TextRevealCardDescription } from "@/components/ui/text-reveal-card";
import { faqs } from "@/data/constants";

const FAQSection = () => {
  return (
    <div className="container mx-auto py-12" id="faq">
      <h1 className="text-4xl font-bold text-center mb-8">FAQ</h1>
      <div className="grid gap-8">
        {faqs.map((faq, index) => (
          <TextRevealCard
            key={index}
            text={faq.question}
            revealText={faq.answer}
            className="mx-auto"
          >
          </TextRevealCard>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
