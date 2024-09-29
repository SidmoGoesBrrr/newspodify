"use client";

import { motion } from "framer-motion";
import { FaHourglassEnd, FaInfoCircle } from 'react-icons/fa';
import Image from "next/image";
import Link from 'next/link';
import { FlipWords } from "./ui/flip-words";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import BlurIn from "./ui/blur-in";

const Hero: React.FC = () => {
    return (
        <section id="hero" className="pb-20 lg:pt-36 md:pt-24 pt-20 overflow-auto text-darkblue flex flex-col lg:flex-row items-center justify-center lg:space-x-10 px-4 lg:px-20">
            <div className="lg:w-1/2 flex flex-col items-center lg:items-start mb-5 lg:mb-0">
                <div className="text-7xl font-bold mb-4">
                    <BlurIn
                        word="Your" className="text-white"/> <FlipWords
                        words={["News", "Way"]}
                        duration={1500}
                        className="text-orange"/>       
                </div>

                <HeroHighlight>
                    <motion.h2
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
                        className="px-4 md:text-3xl lg:text-4xl text-xl font-medium text-white max-w-4xl leading-relaxed lg:leading-snug text-center lg:text-left mx-auto lg:mx-0 mt-1" // Increased font size and adjusted margin
                    >

                        With Newspodify, stay updated effortlessly by turning your favorite newsletters into a unique podcast{" "}
                        <Highlight className="text-orange">
                            tailored to your interests
                        </Highlight>
                    </motion.h2>
                </HeroHighlight>
                <div className="flex flex-col md:flex-row md:space-x-4 mt-6 md:mt-8 items-center justify-center"> {/* Updated flex styling */}
                    <Link href="/dashboard" className="flex items-center bg-orange text-white py-3 px-6 rounded-full hover:bg-gray-700 hover:scale-95 transition-all text-lg md:text-xl mb-4 md:mb-0">
                        <FaHourglassEnd className="mr-2" />
                        Try Version 0.1.0
                    </Link>
                    <Link href="#description" className="flex items-center bg-white text-orange py-3 px-6 rounded-full hover:bg-gray-700 hover:scale-95 transition-all text-lg md:text-xl">
                        <FaInfoCircle className="mr-2" />
                        Learn More
                    </Link>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
                <Image
                    src="/hero.png"
                    alt="Newspodify in action"
                    className="w-full max-w-full h-auto object-cover rounded-lg"
                    width={1440}
                    height={1440}
                />
            </div>

        </section>
    );
};

export default Hero;