import React from "react";

interface SmoothScrollLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({ href, className, children }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default SmoothScrollLink;
