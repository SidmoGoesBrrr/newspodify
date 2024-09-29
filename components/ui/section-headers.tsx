"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import clsx from "clsx"; // Use clsx to conditionally merge class names

interface SectionHeaderProps {
  text: string;
  className?: string; // Make className optional
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ text, className }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Adjust this to control when the animation triggers
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.h1
      ref={ref}
      className={clsx("text-6xl font-bold mt-6 mb-6 text-center", className)} // Merge default classes with className
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 1 }}
    >
      {text}
    </motion.h1>
  );
};

export default SectionHeader;
