'use client'

import Link from 'next/link'
import { Dumbbell, Menu, ArrowRight, BarChart3, Users, Receipt, LineChart, Calendar, Megaphone, Smartphone, Twitter, Instagram, Github } from 'lucide-react'

export default function Landing() {
    return (
        <div className="relative min-h-screen flex flex-col hero-gradient bg-background-dark text-slate-100 font-display overflow-x-hidden">
            {/* Top Navigation */}
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Dumbbell className="text-primary w-8 h-8" />
                        <h2 className="text-xl font-extrabold tracking-tight">SoluGrow</h2>
                    </div>
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
                        <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
                        <Link href="/solutions" className="text-sm font-medium hover:text-primary transition-colors">Solutions</Link>
                        <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
                        <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="hidden sm:block text-sm font-semibold hover:text-primary transition-colors">Login</Link>
                        <Link href="/signup" className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all orange-glow">
                            Start Free Trial
                        </Link>
                    </div>
                    <button className="lg:hidden text-slate-100">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1 pt-32 pb-20 px-6 lg:px-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-xs font-bold text-primary tracking-wider uppercase">New: AI Member Retention v2.0</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                        Powerful Gym Management CRM Built For <span className="text-primary">Modern Fitness</span> Businesses
                    </h1>
                    <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                        Empower your fitness center with advanced member management, automated billing, and real-time analytics designed for growth. Scale your passion without the paperwork.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/signup" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-base font-bold transition-all flex items-center gap-2">
                            Start Free Trial <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/contact" className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-xl text-base font-bold transition-all">
                            Book Demo
                        </Link>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex -space-x-3">
                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-700"></div>
                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-600"></div>
                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-500"></div>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">Joined by 2,000+ gyms worldwide</p>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
                    <div className="relative glass rounded-2xl p-4 border border-white/10 orange-glow">
                        <div className="bg-background-dark rounded-xl overflow-hidden aspect-video border border-white/5 shadow-2xl relative">
                            {/* Dashboard UI Mockup */}
                            <div className="p-6 h-full flex flex-col gap-6">
                                <div className="flex justify-between items-center">
                                    <div className="h-4 w-32 bg-white/10 rounded"></div>
                                    <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/40"></div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-20 bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col justify-center">
                                        <div className="h-2 w-12 bg-slate-500 rounded mb-2"></div>
                                        <div className="h-4 w-16 bg-white/20 rounded"></div>
                                    </div>
                                    <div className="h-20 bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col justify-center">
                                        <div className="h-2 w-12 bg-slate-500 rounded mb-2"></div>
                                        <div className="h-4 w-16 bg-white/20 rounded"></div>
                                    </div>
                                    <div className="h-20 bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col justify-center">
                                        <div className="h-2 w-12 bg-slate-500 rounded mb-2"></div>
                                        <div className="h-4 w-16 bg-white/20 rounded"></div>
                                    </div>
                                </div>
                                <div className="flex-1 bg-white/5 rounded-lg border border-white/5 p-4 relative overflow-hidden">
                                    <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-primary/20 to-transparent"></div>
                                    <div className="flex items-end justify-between h-full gap-2 relative z-10">
                                        <div className="w-full bg-primary/40 rounded-t h-[40%]"></div>
                                        <div className="w-full bg-primary/60 rounded-t h-[70%]"></div>
                                        <div className="w-full bg-primary/40 rounded-t h-[50%]"></div>
                                        <div className="w-full bg-primary/80 rounded-t h-[90%]"></div>
                                        <div className="w-full bg-primary/60 rounded-t h-[60%]"></div>
                                        <div className="w-full bg-primary/90 rounded-t h-[100%]"></div>
                                    </div>
                                </div>
                            </div>
                            <img
                                className="absolute inset-0 object-cover opacity-10 mix-blend-overlay"
                                src="/images/stitch/home.png"
                                alt="Gym Management Dashboard"
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Trusted Integrations */}
            <section className="py-12 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-8">Integrated with global payment leaders</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all">
                        <div className="flex items-center gap-2 text-xl font-bold">
                            UPI
                        </div>
                        <div className="flex items-center gap-2 text-xl font-bold">
                            Razorpay
                        </div>
                        <div className="flex items-center gap-2 text-xl font-bold">
                            Stripe
                        </div>
                        <div className="flex items-center gap-2 text-xl font-bold">
                            PayPal
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-6 lg:px-10 max-w-7xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4">Everything You Need to Scale</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">One platform to manage your members, payments, staff, and marketing without switching between multiple tabs.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Feature 1 */}
                    <div className="glass p-8 rounded-2xl hover:border-primary/50 transition-all group">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                            <Users className="text-primary group-hover:text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Member Management</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Centralized database for all member profiles, attendance tracking, and performance logs.</p>
                    </div>
                    {/* Feature 2 */}
                    <div className="glass p-8 rounded-2xl hover:border-primary/50 transition-all group">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                            <Receipt className="text-primary group-hover:text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Automated Billing</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Collect payments automatically via UPI, Cards, or Wallets with instant recurring invoices.</p>
                    </div>
                    {/* Feature 3 */}
                    <div className="glass p-8 rounded-2xl hover:border-primary/50 transition-all group">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                            <LineChart className="text-primary group-hover:text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Real-time Analytics</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Visual reports on revenue, member churn, and peak hours to make data-driven decisions.</p>
                    </div>
                    {/* Feature 4 */}
                    <div className="glass p-8 rounded-2xl hover:border-primary/50 transition-all group">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                            <Calendar className="text-primary group-hover:text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Class Scheduling</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Easy-to-use booking system for personal training sessions and group fitness classes.</p>
                    </div>
                    {/* Feature 5 */}
                    <div className="glass p-8 rounded-2xl hover:border-primary/50 transition-all group">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                            <Megaphone className="text-primary group-hover:text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Marketing Tools</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Built-in SMS and email campaigns to re-engage lapsed members and promote new offers.</p>
                    </div>
                    {/* Feature 6 */}
                    <div className="glass p-8 rounded-2xl hover:border-primary/50 transition-all group">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                            <Smartphone className="text-primary group-hover:text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Staff & Trainer App</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Dedicated interface for trainers to track client progress and manage their schedules on the go.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 lg:px-10 max-w-7xl mx-auto w-full">
                <div className="relative bg-primary rounded-[2rem] p-12 lg:p-20 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 skew-x-[-20deg] translate-x-1/2"></div>
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Start Managing Your Gym Smarter Today</h2>
                        <p className="text-white/80 text-lg mb-10">Join thousands of fitness entrepreneurs who trust SoluGrow to run their operations smoothly. 14-day free trial. No credit card required.</p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/signup" className="bg-white text-primary px-8 py-4 rounded-xl text-base font-bold hover:bg-slate-100 transition-colors">
                                Get Started Now
                            </Link>
                            <Link href="/contact" className="bg-black/20 border border-white/30 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-white/10 transition-colors">
                                Contact Sales
                            </Link>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-10 hidden lg:block opacity-20">
                        <Dumbbell className="w-[20rem] h-[20rem] text-white select-none" />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-background-dark border-t border-white/5 pt-20 pb-10 px-6 lg:px-10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <Dumbbell className="text-primary w-8 h-8" />
                            <h2 className="text-xl font-extrabold tracking-tight">SoluGrow</h2>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            The ultimate CRM solution for modern gym owners and fitness professionals. Built for growth and scalability.
                        </p>
                        <div className="flex gap-4">
                            <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all" href="#">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all" href="#">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all" href="#">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" href="/features">Features</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/solutions">Integrations</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/pricing">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" href="/about">About Us</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/contact">Support</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-medium">
                    <p>© 2026 SoluGrow CRM. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link className="hover:text-white transition-colors" href="/privacy">Privacy Policy</Link>
                        <Link className="hover:text-white transition-colors" href="/cookies">Cookie Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
