"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/data/constants";
import { FaHourglassEnd } from "react-icons/fa";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-5">
            <Link href="/">
                <Image src="/nsp_logo.jpg" alt="logo" width={100} height={30} />
            </Link>
            <ul className={`lg:flex gap-8 ${menuOpen ? "block" : "hidden"}`}>
                {NAV_LINKS.map((link) => (
                    <li key={link.key}>
                        <Link href={link.href} className="text-slate-300 hover:text-black transition-all text-lg hover:font-bold">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="hidden lg:flex items-center">
                <Link href="#waitlist" className="flex items-center bg-slate-400 text-slate-50 py-2 px-4 rounded-full hover:bg-gray-700 transition-all">
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
