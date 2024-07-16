"use client";

import Hero from "@/components/Hero";
import Waitlist from "@/components/Waitlist";
import FeaturesGallery from "@/components/FeaturesGallery";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main>
            <div>
                <Hero />
                <Waitlist />
                <FeaturesGallery />
                <Footer />
            </div>
        </main>
    );
}
