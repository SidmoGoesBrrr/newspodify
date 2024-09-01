"use client";

import { FC, useState, useEffect, useMemo } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const [availableNewsletters, setAvailableNewsletters] = useState<string[]>([]);

  useEffect(() => {
    // Set available newsletters when the component mounts
    setAvailableNewsletters(newsletters.map((newsletter) => newsletter.name));
  }, []);

  // Prepare the tabs configuration
  const tabs = categories.map((category) => ({
    title: category,
    value: category,
    content: (
      <div className="p-4 bg-gray-200 dark:bg-zinc-800 rounded-lg w-full">
        <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
          {category} Newsletters
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {getNewslettersByCategory(category).map((newsletter) => (
            <li
              key={newsletter.name}
              className="flex items-center space-x-2 p-2"
            >
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
      </div>
    ),
  }));

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-white text-3xl font-bold mb-6">Your Newsletters</h1>
      {/* Add spacing to the Tabs section */}
      <div className="mb-64"> {/* Adjust top and bottom margin as needed */}
        <Tabs
          tabs={tabs}
          containerClassName="mt-6"
          tabClassName="text-lg"
          activeTabClassName="bg-blue-500 text-white"
          contentClassName="mt-10"
        />
      </div>
    </section>
  );
};

export default NewsletterSelector;
