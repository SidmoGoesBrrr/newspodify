"use client";

import React from "react";
import HoverEffect from "./ui/card-hover-effect";
import SectionHeader from "./ui/section-headers";

export default function FeaturesGallery() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12 md:py-16 lg:py-20" id="features">
      <SectionHeader text="Features" />
      
      <HoverEffect />
    </div>
  );
}