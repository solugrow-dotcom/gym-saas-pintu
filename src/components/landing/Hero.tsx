"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[#050505] z-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
                <div className="hero-glow"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        v2.0 is now live
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
                        Smart Gym <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                            Management
                        </span>
                    </h1>

                    <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
                        Manage members, payments, workouts, and operations in one secure platform.
                        Automate your gym with AI-powered tools designed for scale.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <Link href="/signup" className="px-8 py-4 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2 group">
                            Start Free Trial
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="#contact" className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                            <Play className="w-5 h-5 fill-current" />
                            Request Demo
                        </Link>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>14-day free trial</span>
                        </div>
                    </div>
                </motion.div>

                {/* Dashboard Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 50, rotateX: 10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative perspective-1000"
                >
                    <div className="relative z-10 glass-card rounded-2xl p-4 border border-white/10 shadow-2xl transform transition-transform hover:scale-[1.02] duration-500 text-left">
                        {/* Window Controls */}
                        <div className="flex items-center gap-1.5 mb-4 px-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>

                        {/* Dashboard Content Mock */}
                        <div className="bg-[#0f0f0f]/80 rounded-xl p-6 min-h-[400px] grid grid-cols-3 gap-4">
                            {/* Sidebar */}
                            <div className="col-span-1 border-r border-white/5 pr-4 space-y-3">
                                <div className="h-8 w-24 bg-white/10 rounded mb-6" />
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="h-6 w-full bg-white/5 rounded" />
                                ))}
                            </div>

                            {/* Main Content */}
                            <div className="col-span-2 space-y-4">
                                <div className="flex justify-between">
                                    <div className="h-8 w-32 bg-white/10 rounded" />
                                    <div className="h-8 w-8 rounded-full bg-orange-500" />
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <div className="h-4 w-12 bg-white/10 rounded mb-2" />
                                        <div className="h-8 w-20 bg-emerald-500/20 rounded text-emerald-400 flex items-center px-2 text-sm font-mono">+12%</div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <div className="h-4 w-12 bg-white/10 rounded mb-2" />
                                        <div className="h-8 w-20 bg-orange-500/20 rounded text-orange-400 flex items-center px-2 text-sm font-mono">$4.2k</div>
                                    </div>
                                </div>

                                {/* Chart Area */}
                                <div className="h-32 w-full bg-gradient-to-t from-orange-500/10 to-transparent rounded-lg border-b border-orange-500/20 relative overflow-hidden">
                                    <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-around px-2 pb-2 opacity-50">
                                        {[40, 60, 45, 70, 50, 80, 65].map((h, i) => (
                                            <div key={i} style={{ height: `${h}%` }} className="w-2 bg-orange-500/50 rounded-t" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -right-6 top-10 glass-card p-3 rounded-lg border border-white/10 flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">New Member</div>
                                <div className="text-sm font-bold text-white">Alex joined</div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute -left-6 bottom-20 glass-card p-3 rounded-lg border border-white/10 flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                                $
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">Revenue</div>
                                <div className="text-sm font-bold text-white">+$1,240 today</div>
                            </div>
                        </motion.div>

                    </div>

                    {/* Reflection/Glow below dashboard */}
                    <div className="absolute -bottom-10 left-10 right-10 h-20 bg-orange-500/20 blur-[60px] rounded-full z-0 pointer-events-none"></div>
                </motion.div>
            </div>
        </section>
    );
}
