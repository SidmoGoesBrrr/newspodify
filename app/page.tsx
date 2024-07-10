"use client";

import Hero from "@/components/Hero";
import Waitlist from "@/components/Waitlist";
import FeaturesGallery from "@/components/FeaturesGallery";

export default function Home() {
    return (
        <main>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 align-center items-center justify-center flex flex-col">
                <Hero />
                <Waitlist />
                <FeaturesGallery />
            </div>
        </main>
    );
}
