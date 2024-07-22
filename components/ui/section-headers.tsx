"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionHeaderProps {
  text: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ text }) => {
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
      className="text-6xl font-bold text-white mt-6 mb-6 text-center"
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
