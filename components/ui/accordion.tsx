"use-client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { PlusIcon } from "@/components/ui/plus";
import { MinusIcon } from "@/components/ui/minus";
import { FAQS } from "@/data/constants";

export function FAQAccordion() {
  return (
    <div className="w-full md:w-4/5 lg:w-5/6 mx-auto">
      <Accordion variant="bordered">
        {FAQS.map((faq, index) => (
          <AccordionItem
            key={index}
            aria-label={"Accordion " + (index + 1)}
            indicator={({ isOpen }) => (
              <div className="flex items-end justify-end w-full">
                {isOpen ? <MinusIcon /> : <PlusIcon />}
              </div>
            )}
            className="my-accordion-item-background"
            title={
              <div className="flex items-center justify-between w-full">
                <span className="text-left text-lg md:text-2xl my-question-color">{faq.question}</span>
              </div>
            }
          >
            <div className="text-left text-base md:text-xl ml-6 my-accordion-item-content">
              {faq.answer}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
