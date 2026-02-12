"use client";

import { motion } from "framer-motion";
import {
    Users, Dumbbell, Calendar, CreditCard,
    BarChart3, MessageSquare, ShieldCheck, Zap
} from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Member Management",
        description: "Digital profiles, attendance tracking, and automated expiry alerts."
    },
    {
        icon: Dumbbell,
        title: "Workout & Diet Plans",
        description: "Assign personalized AI-generated plans to members directly."
    },
    {
        icon: CreditCard,
        title: "Payments & Invoicing",
        description: "Track dues, generate invoices, and accept online payments securely."
    },
    {
        icon: Calendar,
        title: "Smart Scheduling",
        description: "Manage classes, trainer slots, and resource booking effortlessly."
    },
    {
        icon: MessageSquare,
        title: "Automated Reminders",
        description: "Send WhatsApp/Email alerts for fees, offers, and birthdays."
    },
    {
        icon: Zap,
        title: "AI Gym Assistant",
        description: "Get insights, draft content, and answer member queries 24/7."
    },
    {
        icon: BarChart3,
        title: "Advanced Analytics",
        description: "Real-time revenue, churn rate, and active member reports."
    },
    {
        icon: ShieldCheck,
        title: "Role-Based Access",
        description: "Secure login for Owners, Staff, Trainers, and Members."
    }
];

export default function FeaturesGrid() {
    return (
        <section id="features" className="py-24 relative overflow-hidden bg-black/50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-6">
                        Everything you need to run a modern fitness center
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Stop using spreadsheets. SoluGrow brings your entire gym operation into one powerful, intuitive dashboard.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass-card p-6 rounded-2xl group hover:border-orange-500/30 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 group-hover:border-orange-500/20 transition-colors">
                                <feature.icon className="w-6 h-6 text-gray-300 group-hover:text-orange-400 transition-colors" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
