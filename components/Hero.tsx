"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const Hero: React.FC = () => {
    return (
        <section id="hero" className="pb-20 pt-36 overflow-auto text-darkblue">
       
            <TextGenerateEffect words={"Your News, Your Way"} 
            className="text-5xl font-extrabold justify-center text-center"/>
           
            
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
                    className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-slate-600 max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
                >
                    With Newspodify, stay updated effortlessly by turning your favorite newsletters into a unique podcast{" "}
                    <Highlight className="text-white">
                        tailored to your interests
                    </Highlight>
                </motion.h1>
            </HeroHighlight>
        </section>
    );
};

export default Hero;
