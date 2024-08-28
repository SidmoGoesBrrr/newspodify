import Image from "next/image";
import cn from "@/utils/cn";
import { FEATURES } from "@/data/constants";

function HoverEffect() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {FEATURES.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  imageUrl,
  index,
}: {
  title: string;
  description: string;
  imageUrl: string;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800 transition-transform duration-300",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800",
        "hover:scale-120"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400 transition-transform duration-300 group-hover/feature:scale-110">
        <Image src={imageUrl} alt={title} className="w-full h-auto rounded-2xl" width={1080} height={1080}/>
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10 transition-transform duration-300 group-hover/feature:translate-x-2">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="inline-block text-neutral-800 dark:text-neutral-100 group-hover/feature:text-2xl">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10 transition-transform duration-300 group-hover/feature:translate-x-2 group-hover/feature:text-base">
        {description}
      </p>
    </div>
  );
};

export default HoverEffect;
