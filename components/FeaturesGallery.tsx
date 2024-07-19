"use client";

import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";

export default function FeaturesGallery() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12 md:py-16 lg:py-20" id="features">
      <h1 className="text-6xl font-bold text-white mt-6 mb-6 text-center">Features</h1>
      <HoverEffect />
    </div>
  );
}