'use client'

import Link from 'next/link'
import { CheckCircle2, Minus, Dumbbell, Menu, X, ChevronRight } from 'lucide-react'

const SoluGrowLogo = ({ className }: { className?: string }) => (
    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
    </svg>
)

export default function PricingPage() {
    return (
        <div className="relative min-h-screen bg-background-dark text-slate-100 font-display overflow-x-hidden">
            {/* Background Accents */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>

            <div className="relative flex flex-col h-full grow">
                {/* Navigation */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-primary/10 px-6 md:px-20 py-4 glass sticky top-0 z-50">
                    <Link href="/" className="flex items-center gap-4">
                        <div className="text-primary">
                            <SoluGrowLogo className="w-8 h-8" />
                        </div>
                        <h2 className="text-slate-100 text-xl font-black leading-tight tracking-tight">SoluGrow</h2>
                    </Link>
                    <div className="hidden md:flex flex-1 justify-center gap-8">
                        <Link className="text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="/features">Features</Link>
                        <Link className="text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="/services">Services</Link>
                        <Link className="text-primary text-sm font-bold" href="/pricing">Pricing</Link>
                        <Link className="text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="/contact">Contact</Link>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/signup" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                            Sign Up
                        </Link>
                        <Link href="/login" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 glass text-slate-100 text-sm font-bold hover:bg-primary/10 transition-all">
                            Log In
                        </Link>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                    {/* Hero Section */}
                    <div className="text-center mb-20 animate-float-slow">
                        <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Pricing Plans</span>
                        <h1 className="text-slate-100 text-5xl md:text-6xl font-black mb-6 tracking-tight">Flexible Plans for Every Stage</h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Choose the perfect plan to accelerate your growth with SoluGrow's powerful tools. Transparent pricing with no hidden fees.
                        </p>
                    </div>

                    {/* Pricing Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {/* Starter Card */}
                        <div className="glass flex flex-col p-8 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300">
                            <div className="mb-8">
                                <h3 className="text-slate-100 text-xl font-bold mb-2">Starter</h3>
                                <p className="text-slate-400 text-sm mb-6">Perfect for individuals and side projects.</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-slate-100 text-4xl font-black">₹999</span>
                                    <span className="text-slate-400 text-sm">/month</span>
                                </div>
                            </div>
                            <Link href="/signup?plan=starter" className="w-full glass-card py-3 px-4 rounded-lg font-bold text-center text-slate-100 mb-8 hover:bg-primary hover:text-white transition-all border border-white/5">
                                Get Started
                            </Link>
                            <ul className="space-y-4 flex-grow">
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="text-primary w-5 h-5" /> 5 Active Projects
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="text-primary w-5 h-5" /> Basic Analytics
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="text-primary w-5 h-5" /> Email Support
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="text-primary w-5 h-5" /> 1GB Cloud Storage
                                </li>
                            </ul>
                        </div>

                        {/* Pro Card (Recommended) */}
                        <div className="relative glass-card flex flex-col p-8 rounded-xl border-2 border-primary transform md:-translate-y-4 shadow-2xl shadow-primary/20 bg-primary/5">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                                Recommended
                            </div>
                            <div className="mb-8">
                                <h3 className="text-slate-100 text-xl font-bold mb-2">Pro</h3>
                                <p className="text-slate-400 text-sm mb-6">Our most popular plan for growing teams.</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-slate-100 text-4xl font-black">₹1999</span>
                                    <span className="text-slate-400 text-sm">/month</span>
                                </div>
                            </div>
                            <Link href="/signup?plan=pro" className="w-full bg-primary py-3 px-4 rounded-lg font-bold text-center text-white mb-8 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                Choose Pro
                            </Link>
                            <ul className="space-y-4 flex-grow">
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="text-primary w-5 h-5" /> Unlimited Projects
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300 font-semibold">
                                    <CheckCircle2 className="text-primary w-5 h-5" /> Advanced Analytics
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="text-primary w-5 h-5" /> Priority Support
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="text-primary w-5 h-5" /> 10GB Cloud Storage
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="text-primary w-5 h-5" /> Custom Integrations
                                </li>
                            </ul>
                        </div>

                        {/* Enterprise Card */}
                        <div className="glass flex flex-col p-8 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300">
                            <div className="mb-8">
                                <h3 className="text-slate-100 text-xl font-bold mb-2">Enterprise</h3>
                                <p className="text-slate-400 text-sm mb-6">Advanced features for large corporations.</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-slate-100 text-4xl font-black">₹2999</span>
                                    <span className="text-slate-400 text-sm">/month</span>
                                </div>
                            </div>
                            <Link href="/contact" className="w-full glass-card py-3 px-4 rounded-lg font-bold text-center text-slate-100 mb-8 hover:bg-primary hover:text-white transition-all border border-white/5">
                                Contact Sales
                            </Link>
                            <ul className="space-y-4 flex-grow">
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="text-primary w-5 h-5" /> Custom Solutions
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="text-primary w-5 h-5" /> Dedicated Account Manager
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="text-primary w-5 h-5" /> 24/7 Phone Support
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300 font-semibold">
                                    <CheckCircle2 className="text-primary w-5 h-5" /> Unlimited Storage
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="text-primary w-5 h-5" /> SSO & Security
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="mt-32">
                        <h2 className="text-slate-100 text-3xl font-bold mb-10 text-center uppercase tracking-tight italic">Compare Plan Features</h2>
                        <div className="overflow-x-auto rounded-2xl glass border border-primary/10">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-primary/5">
                                        <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-100">Features</th>
                                        <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-100 text-center">Starter</th>
                                        <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-100 text-center">Pro</th>
                                        <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-100 text-center">Enterprise</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr>
                                        <td className="p-6 text-sm text-slate-300 font-medium">Analytics Deep Dive</td>
                                        <td className="p-6 text-sm text-center text-slate-400">Basic</td>
                                        <td className="p-6 text-sm text-center text-primary font-bold">Advanced</td>
                                        <td className="p-6 text-sm text-center text-slate-400">Custom Reports</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 text-sm text-slate-300 font-medium">Customer Support</td>
                                        <td className="p-6 text-sm text-center text-slate-400">Email Only</td>
                                        <td className="p-6 text-sm text-center text-slate-400">Priority Email</td>
                                        <td className="p-6 text-sm text-center text-primary font-bold">24/7 Dedicated</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 text-sm text-slate-300 font-medium">Storage Capacity</td>
                                        <td className="p-6 text-sm text-center text-slate-400">1 GB</td>
                                        <td className="p-6 text-sm text-center text-slate-400">10 GB</td>
                                        <td className="p-6 text-sm text-center text-primary font-bold">Unlimited</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 text-sm text-slate-300 font-medium">API Access</td>
                                        <td className="p-6 text-sm text-center text-slate-600"><Minus className="mx-auto" /></td>
                                        <td className="p-6 text-sm text-center text-primary"><CheckCircle2 className="mx-auto w-5 h-5" /></td>
                                        <td className="p-6 text-sm text-center text-primary"><CheckCircle2 className="mx-auto w-5 h-5" /></td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 text-sm text-slate-300 font-medium">Team Members</td>
                                        <td className="p-6 text-sm text-center text-slate-400">Up to 3</td>
                                        <td className="p-6 text-sm text-center text-slate-400">Up to 15</td>
                                        <td className="p-6 text-sm text-center text-primary font-bold">Unlimited</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 text-sm text-slate-300 font-medium">Custom Branding</td>
                                        <td className="p-6 text-sm text-center text-slate-600"><Minus className="mx-auto" /></td>
                                        <td className="p-6 text-sm text-center text-slate-600"><Minus className="mx-auto" /></td>
                                        <td className="p-6 text-sm text-center text-primary"><CheckCircle2 className="mx-auto w-5 h-5" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* FAQ Snippet */}
                    <div className="mt-32 text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-slate-100">Still have questions?</h2>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link href="/contact" className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                Chat with us
                            </Link>
                            <Link href="/help" className="px-8 py-3 rounded-xl glass-card text-slate-100 font-bold hover:bg-primary/10 transition-all border border-white/5">
                                View help center
                            </Link>
                        </div>
                    </div>
                </main>

                <footer className="border-t border-white/5 mt-20 py-12 glass">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="text-primary">
                                    <SoluGrowLogo className="w-6 h-6" />
                                </div>
                                <span className="text-lg font-black tracking-tight text-slate-100">SoluGrow</span>
                            </div>
                            <p className="text-sm text-slate-500">Scaling businesses with modern, elegant solutions since 2024.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-100 mb-6 font-display uppercase tracking-widest text-xs">Product</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><Link className="hover:text-primary transition-colors" href="/features">Features</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="/services">Services</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="/pricing">Pricing</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-100 mb-6 font-display uppercase tracking-widest text-xs">Company</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><Link className="hover:text-primary transition-colors" href="/about">About Us</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="/contact">Contact</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="/terms">Terms</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-100 mb-6 font-display uppercase tracking-widest text-xs">Legal</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><Link className="hover:text-primary transition-colors" href="/privacy">Privacy Policy</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="/cookies">Cookie Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-sm text-slate-600">
                        © 2026 SoluGrow Inc. All rights reserved.
                    </div>
                </footer>
            </div>
        </div>
    )
}
