"use client";

import React from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { TABS } from "@/data/constants";

interface Tab {
  title: string;
  description: string;
  imageUrl: string;
}

export default function FeaturesGallery() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-12" id="features">
      <HoverEffect
        items={TABS.map(tab => ({
          title: tab.title,
          description: tab.description,
          imageUrl: tab.imageUrl, // Pass image URL
        }))}
      />
    </div>
  );
}
