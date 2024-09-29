'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/data/constants';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: '100%' },
    };

    const handleLinkClick = (href: string) => {
        // Close the menu if it's open
        setMenuOpen(false);

        // Navigate to the root page and scroll
        if (window.location.pathname !== '/') {
            window.location.href = '/';
        }

        // Perform smooth scrolling after navigation
        window.requestAnimationFrame(() => {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        });
    };

    return (
        <nav className="relative flex justify-between items-center max-w-6xl text-xl mx-auto px-6 py-5 text-white">
            <Link href="/" className="flex flex-row items-center">
                <Image
                    src="/nsp_logo.png"
                    alt="logo"
                    width={75}
                    height={75}
                    className="rounded-full"
                />
            </Link>
            <ul className="hidden lg:flex gap-8">
                {NAV_LINKS.map((link) => (
                    <li key={link.key}>
                        <div onClick={() => handleLinkClick(link.href)}>
                            <a className="text-slate-5 hover:text-orange transition-all text-xl hover:font-bold hover:text-xl">
                                {link.label}
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="lg:flex items-center">
                <Link href="/dashboard" className="hidden lg:flex items-center bg-orange text-white py-2 px-4 rounded-full hover:bg-gray-700 hover:scale-125 transition-all">
                    Try Version 0.0.1
                </Link>
            </div>
            <div className="hidden lg:flex items-center">
                <SignedOut>
                    <SignInButton /> {/* Adjust size */}
                </SignedOut>
                <SignedIn>
                    <div className="user-button-wrapper"> {/* Adjust size */}
                    <UserButton />
                    </div>
                </SignedIn>
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
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLinkClick(link.href);
                                        }}
                                        className="text-slate-300 hover:text-slate-50 transition-all text-lg hover:font-bold hover:text-xl"
                                    >
                                        {link.label}
                                    </a>
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
