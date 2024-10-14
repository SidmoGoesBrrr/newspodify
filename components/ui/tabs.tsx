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
    <div className={cn("tab-format-container", containerClassName)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tabs.map((tab) => (
          <div key={tab.value} className="tabs_item flex-auto">
            <button
              className={cn("tabs-item_link w-full", tabClassName, {
                "tabs-active": activeTab === tab.value,
                "hover:bg-gray-300": hoveredTab === tab.value && activeTab !== tab.value,
              })}
              onClick={() => setActiveTab(activeTab === tab.value ? null : tab.value)} // Toggle active tab
              onMouseEnter={() => setHoveredTab(tab.value)} // Set hovered tab
              onMouseLeave={() => setHoveredTab(null)} // Reset hovered tab
            >
              <div className={cn("tabs-item_bg", {
                "transform scale-10": activeTab === tab.value || hoveredTab === tab.value
              })}></div>
              
              <div className="tabs-item_title text-left">{tab.title}</div>
              
            </button>
            {activeTab === tab.value && (
              <div className={cn("tabs-item_text text-left", contentClassName)}>
                {tab.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
