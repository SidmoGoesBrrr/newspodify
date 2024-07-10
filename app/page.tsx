"use client";

import Hero from "@/components/Hero";
import Waitlist from "@/components/Waitlist";
import FeaturesGallery from "@/components/FeaturesGallery";

export default function Home() {
    return (
        <main>
            <div>
                <Hero />
                <Waitlist />
                <FeaturesGallery />
            </div>
        </main>
    );
}
