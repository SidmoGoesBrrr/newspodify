"use client";
import React from "react";
import FAQAccordion from "./ui/accordion";
import SectionHeader from "./ui/section-headers";

const FAQSection = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-0" id="faq">
      <SectionHeader text="Frequently Asked Questions"/>

      <div>
        <FAQAccordion />
      </div>
    </div>
  );
};

export default FAQSection;
