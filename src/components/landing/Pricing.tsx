"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";

const plans = [
    {
        name: "Basic",
        price: "999",
        features: ["Up to 100 Members", "Basic Reporting", "Attendance Tracking", "Email Support"],
    },
    {
        name: "Pro",
        price: "1,999",
        isPopular: true,
        features: [
            "Up to 500 Members",
            "Advanced Analytics",
            "WhatsApp Reminders",
            "Workout & Diet Plans",
            "Priority Support"
        ],
    },
    {
        name: "Elite",
        price: "2,999",
        features: [
            "Unlimited Members",
            "Multi-Gym Management",
            "AI Coach Integration",
            "White-label Branding",
            "Dedicated Account Manager"
        ],
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 relative bg-black/60">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Transparent Pricing
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Choose the plan that fits your gym&apos;s size.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto align-start">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={clsx(
                                "glass-card p-8 rounded-3xl relative flex flex-col",
                                plan.isPopular ? "border-orange-500/50 bg-orange-500/5 shadow-2xl shadow-orange-900/20" : "border-white/10 hover:border-white/20"
                            )}
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-xl font-semibold text-gray-300 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold text-white">₹{plan.price}</span>
                                    <span className="text-gray-500">/month</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <Link href="#" className="none"><Check className="w-5 h-5 text-orange-500 shrink-0" /></Link>
                                        {feat}
                                    </li>

                                ))}
                            </ul>

                            <Link
                                href={`/signup?plan=${plan.name.toLowerCase()}`}
                                className={clsx(
                                    "w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2",
                                    plan.isPopular
                                        ? "bg-orange-600 hover:bg-orange-700 text-white hover:scale-105 shadow-lg"
                                        : "bg-white/10 hover:bg-white/20 text-white"
                                )}
                            >
                                {plan.isPopular ? "Start Free Trial" : "Get Started"}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
