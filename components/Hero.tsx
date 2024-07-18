"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import BlurIn from "./ui/BlurIn";
import Link from 'next/link';
import { FaHourglassEnd, FaInfoCircle } from 'react-icons/fa';

const Hero: React.FC = () => {
    return (
        <section id="hero" className="pb-20 lg:pt-36 md:pt-24 pt-20 overflow-auto text-darkblue flex flex-col lg:flex-row items-center justify-center lg:space-x-10 px-4 lg:px-20">
            <div className="lg:w-1/2 flex flex-col items-center lg:items-start mb-5 lg:mb-0">
                <BlurIn
                    word="Your News, Your Way"
                    className="text-7xl font-bold text-[#40a3bb] mb-4" // Increased font size and added margin bottom
                />

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
                        className="px-4 md:text-3xl lg:text-4xl text-xl font-medium text-[#9cd9de] max-w-4xl leading-relaxed lg:leading-snug text-center lg:text-left mx-auto lg:mx-0 mt-1" // Increased font size and adjusted margin
                    >

                        With Newspodify,stay updated effortlessly by turning your favorite newsletters into a unique podcast{" "}
                        <br></br>
                        <Highlight className="text-[#89b6c5f4]">
                            tailored to your interests
                        </Highlight>
                    </motion.h2>
                </HeroHighlight>
                <div className="flex flex-col md:flex-row md:space-x-4 mt-6 md:mt-8 items-center justify-center"> {/* Updated flex styling */}
                    <Link href="#waitlist" className="flex items-center bg-slate-400 text-slate-50 py-3 px-6 rounded-full hover:bg-gray-700 transition-all text-lg md:text-xl mb-4 md:mb-0">
                        <FaHourglassEnd className="mr-2" />
                        Join Waitlist Now
                    </Link>
                    <Link href="#description" className="flex items-center bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-all text-lg md:text-xl">
                        <FaInfoCircle className="mr-2" />
                        Learn More
                    </Link>
                </div>
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0"> {/* Adjusted margin for image */}
                <img
                    src="/hero.jpg"
                    alt="Newspodify in action"
                    className="h-auto object-cover rounded-lg shadow-lg"
                />
            </div>
        </section>
    );
};

export default Hero;
