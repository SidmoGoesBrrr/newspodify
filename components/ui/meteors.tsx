import React from "react";
import cn from "@/utils/cn";

const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <>
      {meteors.map((el, idx) => (
       <span
       key={"meteor" + idx}
       className={cn(
         "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-full bg-yellow-300 shadow-[0_0_4px_2px_rgba(255,255,0,0.1)] rotate-[215deg]",
         "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[2px] before:bg-gradient-to-r before:from-[#ffffff] before:to-transparent",
         className
       )}
       style={{
         top: 0,
         left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
         animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
         animationDuration: Math.floor(Math.random() * (10 - 2) + 4) + "s",
       }}
     ></span>
      ))}
    </>
  );
};

export default Meteors;
