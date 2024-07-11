"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const Hero: React.FC = () => {
    return (
        <section id="hero" className="pb-20 pt-36 overflow-auto text-darkblue flex flex-col lg:flex-row items-center lg:justify-center lg:space-x-10 px-4 lg:px-20">
            <div className="lg:w-1/2 flex flex-col items-center lg:items-start mb-10 lg:mb-0">
                <TextGenerateEffect words={"Your News, Your Way"} 
                className="text-5xl font-extrabold text-center lg:text-left mb-6"/>
                
                <HeroHighlight>
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: [20, -5, 0],
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-slate-600 max-w-4xl leading-relaxed lg:leading-snug text-center lg:text-left mx-auto lg:mx-0"
                    >
                        With Newspodify, stay updated effortlessly by turning your favorite newsletters into a unique podcast{" "}
                        <Highlight className="text-white">
                            tailored to your interests
                        </Highlight>
                    </motion.h1>
                </HeroHighlight>
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
                <img 
                    src="/hero.jpg" 
                    alt="Newspodify in action" 
                    className="max-w-full h-auto object-cover rounded-lg shadow-lg"
                />
            </div>
        </section>
    );
};

export default Hero;
