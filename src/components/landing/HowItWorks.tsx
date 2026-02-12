"use client";

import { motion } from "framer-motion";
import { UserPlus, Building, BarChart } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            icon: UserPlus,
            title: "Create Account",
            desc: "Sign up in seconds and verify your email.",
        },
        {
            icon: Building,
            title: "Add Your Gym",
            desc: "Set up your gym profile, staff, and plans.",
        },
        {
            icon: BarChart,
            title: "Start Managing",
            desc: "Onboard members and track growth instantly.",
        },
    ];

    return (
        <section id="how-it-works" className="py-24 relative bg-black/40">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Get started in 3 simple steps
                    </h2>
                    <p className="text-gray-400">No credit card required for trial.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent z-0" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center mb-6 border border-white/10 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all duration-300">
                                <step.icon className="w-10 h-10 text-gray-300 group-hover:text-orange-400 transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-gray-400 text-sm max-w-xs">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
