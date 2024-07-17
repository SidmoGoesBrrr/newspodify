"use client";

import React from "react";
import { faqs } from "@/data/constants";
import { motion } from "framer-motion";

const FAQSection = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-0" id="faq">
      <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{faq.question}</h2>
            <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;