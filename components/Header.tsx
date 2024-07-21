"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/data/constants";
import { FaHourglassEnd } from "react-icons/fa";
import SmoothScrollLink from "./ui/SmoothScrolLink";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-5">
            <Link href="/">
                <Image src="/nsp_logo.jpg" alt="logo" width={60} height={50} />
            </Link>
            <ul className={`lg:flex gap-8 ${menuOpen ? "block" : "hidden"}`}>
                {NAV_LINKS.map((link) => (
                    <li key={link.key}>
                        <SmoothScrollLink href={link.href} className="text-slate-300 hover:text-slate-50 transition-all text-lg hover:font-bold hover:text-xl">
                            {link.label}
                        </SmoothScrollLink>
                    </li>
                ))}
            </ul>
            <div className="hidden lg:flex items-center">
                <Link href="#waitlist" className="flex items-center bg-slate-400 text-slate-50 py-2 px-4 rounded-full hover:bg-gray-700  hover:scale-125 transition-all">
                    <FaHourglassEnd className="mr-2" />
                    Join Waitlist Now
                </Link>
            </div>
            <div className="lg:hidden">
                <Image
                    src="/menu.svg"
                    alt="menu"
                    width={32}
                    height={32}
                    className="cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            </div>
        </nav>
    );
};

export default Header;
