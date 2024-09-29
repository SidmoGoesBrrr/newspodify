"use client";

import React from "react";
import { motion } from "framer-motion";
import cn from "@/utils/cn";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {


  
  return (
    <div
      className={cn(
        "relative lg:h-[25rem] md:h-[20rem] flex items-center justify-center w-full group",
        containerClassName
      )}
    >
      <div className="absolute inset-0 pointer-events-none" />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-200 group-hover:opacity-100"
        
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-[#fbeea0] to-[#fbeea0] dark:from-[#fbeea0] dark:to-[#fbeea0]`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
