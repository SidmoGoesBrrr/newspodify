"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/data/constants";
import { FaHourglassEnd, FaTimes } from "react-icons/fa";
import SmoothScrollLink from "./ui/SmoothScrolLink";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "100%" },
    };

    return (
        <nav className="relative flex justify-between items-center max-w-7xl mx-auto px-6 py-5">
            <Link href="/" className="flex flex-row">
                <Image src="/nsp_diff_logo.png" alt="logo" width={50} height={50} className="bg-white rounded-full"/>
                
            </Link>
            <ul className="hidden lg:flex gap-8">
                {NAV_LINKS.map((link) => (
                    <li key={link.key}>
                        <div onClick={() => setMenuOpen(false)}>
                            <SmoothScrollLink
                                href={link.href}
                                className="text-slate-300 hover:text-slate-50 transition-all text-lg hover:font-bold hover:text-xl"
                            >
                                {link.label}
                            </SmoothScrollLink>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="hidden lg:flex items-center">
                <Link href="#waitlist" className="flex items-center bg-slate-400 text-slate-50 py-2 px-4 rounded-full hover:bg-gray-700 hover:scale-125 transition-all">
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
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={variants}
                        className="fixed top-0 right-0 h-full w-3/4 bg-slate-800 p-6 z-50 bg-opacity-95"
                    >
                        <div className="flex justify-end">
                            <FaTimes
                                size={32}
                                className="text-slate-50 cursor-pointer"
                                onClick={() => setMenuOpen(false)}
                            />
                        </div>
                        <ul className="flex flex-col items-center mt-10 gap-6">
                            {NAV_LINKS.map((link) => (
                                <li key={link.key}>
                                    <SmoothScrollLink href={link.href} className="text-slate-300 hover:text-slate-50 transition-all text-lg hover:font-bold hover:text-xl">
                                        {link.label}
                                    </SmoothScrollLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Header;
