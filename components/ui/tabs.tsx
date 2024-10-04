"use client";

import { FC, useState } from "react";
import cn from "@/utils/cn";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode;
};

interface TabsProps {
  tabs: Tab[];
  containerClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}

export const Tabs: FC<TabsProps> = ({
  tabs,
  containerClassName,
  tabClassName,
  contentClassName,
}) => {
  const [activeTab, setActiveTab] = useState<string | null>(null); // Set initial active tab
  const [hoveredTab, setHoveredTab] = useState<string | null>(null); // State for hovered tab

  return (
    <div className={cn("ag-format-container", containerClassName)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tabs.map((tab) => (
          <div key={tab.value} className="ag-courses_item flex-auto">
            <button
              className={cn("ag-courses-item_link w-full", tabClassName, {
                "hover:bg-gray-300": hoveredTab === tab.value, // Add hover class
              })}
              onClick={() => setActiveTab(activeTab === tab.value ? null : tab.value)} // Toggle active tab
              onMouseEnter={() => setHoveredTab(tab.value)} // Set hovered tab
              onMouseLeave={() => setHoveredTab(null)} // Reset hovered tab
            >
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title text-left">{tab.title}</div>
            </button>

            {/* Content should appear below the button, outside the button element */}
            {activeTab === tab.value && (
              <div className={cn("tab-content mt-4 p-4 rounded shadow-md", contentClassName)}>
                {tab.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
