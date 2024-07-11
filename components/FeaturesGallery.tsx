import { useState } from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { TABS } from "@/data/constants"

interface Tab {
  title: string;
  description: string;
  imageUrl: string;
  baseColor: string;
  secondColor: string;
}

const HoverTab = ({ tab, isActive, onTabClick }: { 
  tab: Tab; 
  isActive: boolean; 
  onTabClick: (tabIndex: number) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative group block p-4 rounded-lg shadow-md cursor-pointer",
        "bg-gray-800 text-white", // Dark background and light text by default
        isActive ? `bg-gray-800 border-2 border-gray-500` : "bg-gray-800", // Active or default background color
        hovered && !isActive && "bg-gray-700", // Darken background on hover if not active
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onTabClick(TABS.findIndex(t => t.title === tab.title))}
    >
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full ${tab.baseColor} mr-4`} />
        <h4 className="text-lg font-bold">{tab.title}</h4>
      </div>
      {isActive && (
        <motion.p
          className="mt-4 text-gray-200"
          initial={{ height: 0, opacity: 0, translateY: 20 }} // Initial height and opacity
          animate={{ height: "auto", opacity: 1, translateY: 0 }} // Animate to full height and opacity
          exit={{ height: 0, opacity: 0, translateY: -20 }} // Exit animation
          transition={{ duration: 0.5 }} // Animation duration
        >
          {tab.description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default function FeaturesGallery() {
  const [currentTab, setCurrentTab] = useState<Tab>(TABS[0]);

  const handleTabClick = (tabIndex: number) => {
    setCurrentTab(TABS[tabIndex]);
  };

  return (
    <div className="container mx-auto py-12 text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="grid grid-cols-1 gap-8">
            {TABS.map((tab, idx) => (
              <HoverTab
                key={idx}
                tab={tab}
                isActive={tab.title === currentTab.title}
                onTabClick={handleTabClick}
              />
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <motion.div
            className="relative h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }} // Animation duration
          >
            <NextImage src={currentTab.imageUrl} alt={currentTab.title} layout="fill" objectFit="cover" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
