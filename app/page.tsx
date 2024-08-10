"use client";

import Hero from "@/components/Hero";
import Description from "@/components/Description";
import FAQSection from "@/components/FAQSection";

export default function Home() {
    return (
        <main>
            <div className="pb-10">
                <Hero />
                <Description />
                <FAQSection />
            </div>
        </main>
    );
}
