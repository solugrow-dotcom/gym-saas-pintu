"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, LogOut, User } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, signOut } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "glass-nav py-4" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                        S
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">
                        Solu<span className="text-orange-500">Grow</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {["Features", "How it Works", "Pricing", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    {!user ? (
                        <>
                            <Link href="/login" className="text-sm font-medium text-white hover:text-orange-400 transition-colors">
                                Login
                            </Link>
                            <Link href="/signup" className="px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-all hover:scale-105 flex items-center gap-2 group">
                                Get Started
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="text-sm font-medium text-white hover:text-orange-400 transition-colors">
                                Dashboard
                            </Link>
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-orange-400 hover:bg-orange-500/30 transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                </button>

                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 top-full mt-2 w-48 bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-xl p-2 z-50"
                                        >
                                            <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-800 mb-2 truncate">
                                                {user.email}
                                            </div>
                                            <button
                                                onClick={() => signOut()}
                                                className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/5 rounded-lg flex items-center gap-2"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-gray-800 p-6 flex flex-col gap-4 shadow-2xl"
                    >
                        {["Features", "How it Works", "Pricing", "Contact"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                                className="text-gray-300 hover:text-white text-lg py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="h-px bg-gray-800 my-2" />

                        {!user ? (
                            <>
                                <Link href="/login" className="text-white py-2 block w-full text-left">Login</Link>
                                <Link href="/signup" className="w-full py-3 rounded-lg bg-orange-600 text-white font-semibold mt-2 text-center block">
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/dashboard" className="text-white py-2 block w-full text-left">Dashboard</Link>
                                <button
                                    onClick={() => signOut()}
                                    className="text-red-400 py-2 block w-full text-left flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
