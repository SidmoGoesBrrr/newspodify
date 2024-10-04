"use client";

import { FC, useMemo, useEffect, useState } from "react";
import { Tabs } from "./ui/tabs"; // Adjust path based on your file structure
import { newsletters } from "@/data/constants"; // Adjust path based on your file structure

interface NewsletterSelectorProps {
  selectedNewsletters: string[];
  onUpdateNewsletter: (newsletter: string, action: "add" | "remove") => void;
}

// Extract unique categories from the newsletters
const getCategories = () => {
  const categoriesSet = new Set<string>();
  newsletters.forEach((newsletter) =>
    newsletter.categories.forEach((category) => categoriesSet.add(category))
  );
  return Array.from(categoriesSet);
};

// Function to get newsletters based on a selected category
const getNewslettersByCategory = (category: string) => {
  return newsletters.filter((newsletter) =>
    newsletter.categories.includes(category)
  );
};

const NewsletterSelector: FC<NewsletterSelectorProps> = ({
  selectedNewsletters,
  onUpdateNewsletter,
}) => {
  const categories = useMemo(getCategories, []);

  // Prepare the tabs configuration
  const tabs = categories.map((category) => ({
    title: category,
    value: category,
    content: (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {getNewslettersByCategory(category).map((newsletter) => (
            <li key={newsletter.name} className="flex items-center space-x-2 p-2">
              <input
                type="checkbox"
                checked={selectedNewsletters.includes(newsletter.name)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onUpdateNewsletter(newsletter.name, "add");
                  } else {
                    onUpdateNewsletter(newsletter.name, "remove");
                  }
                }}
                className="form-checkbox text-orange-1"
              />
              <label className="text-black dark:text-white">
                {newsletter.display_name}
              </label>
            </li>
          ))}
        </ul>
    ),
  }));

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-white text-3xl font-bold mb-6">Your Newsletters</h1>
      <div className="mb-64"> {/* Adjust top and bottom margin as needed */}
        <Tabs
          tabs={tabs}
          containerClassName="mt-6"
          tabClassName="text-lg"
          contentClassName="mt-10"
        />
      </div>
    </section>
  );
};

export default NewsletterSelector;
