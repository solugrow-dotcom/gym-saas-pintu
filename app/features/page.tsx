'use client'

import Link from 'next/link'
import { Dumbbell, Users, CheckCircle2, QrCode, Receipt, Sync, Heart, BarChart3, Smartphone, Rocket, Share2, Globe, Menu } from 'lucide-react'

// Custom Sync icon if not in lucide (lucide has RefreshCw)
const RefreshCw = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>
)

export default function FeaturesPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark text-slate-100 font-display">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-20 lg:px-40 py-4 sticky top-0 bg-background-dark/80 backdrop-blur-md z-50">
                <Link href="/" className="flex items-center gap-3">
                    <div className="text-primary">
                        <Dumbbell className="w-9 h-9" />
                    </div>
                    <h2 className="text-slate-100 text-xl font-bold leading-tight tracking-tight">SoluGrow</h2>
                </Link>
                <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
                    <nav className="flex items-center gap-8">
                        <Link className="text-primary transition-colors text-sm font-medium" href="/features">Features</Link>
                        <Link className="text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="/pricing">Pricing</Link>
                        <Link className="text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="/services">Services</Link>
                        <Link className="text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="/contact">Contact</Link>
                    </nav>
                    <div className="flex gap-3">
                        <Link href="/signup" className="flex items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <section className="px-6 md:px-20 lg:px-40 py-20 text-center">
                    <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Powering Your Fitness Empire</span>
                    <h1 className="text-slate-100 text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6">
                        Everything you need <br /><span className="text-primary">to scale faster.</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Say goodbye to spreadsheets and fragmented tools. SoluGrow brings every aspect of your gym into a single, high-performance dashboard.
                    </p>
                </section>

                <section className="px-6 md:px-20 lg:px-40 py-16 space-y-32">
                    {/* Member Management */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                                <Users className="w-7 h-7" />
                            </div>
                            <h2 className="text-4xl font-black text-slate-100">Member Management</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Manage thousands of profiles with ease. Track health goals, membership history, and personal milestones. Our intuitive CRM keeps your community engaged and organized.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="text-primary w-5 h-5" /> Digital contract signing</li>
                                <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="text-primary w-5 h-5" /> Member health & goal tracking</li>
                                <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="text-primary w-5 h-5" /> Automated anniversary & birthday rewards</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl overflow-hidden glass-card p-4">
                            <div className="aspect-video w-full bg-slate-800 rounded-xl relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/images/stitch/features.png')" }}>
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                            </div>
                        </div>
                    </div>

                    {/* QR Attendance */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 rounded-2xl overflow-hidden glass-card p-4">
                            <div className="aspect-video w-full bg-slate-800 rounded-xl relative flex items-center justify-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/images/stitch/features.png')" }}>
                                <div className="absolute inset-0 bg-primary/10 backdrop-blur-[2px]"></div>
                                <div className="bg-white p-6 rounded-2xl shadow-2xl relative z-10">
                                    <QrCode className="text-slate-900 w-24 h-24" />
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-6">
                            <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                                <QrCode className="w-7 h-7" />
                            </div>
                            <h2 className="text-4xl font-black text-slate-100">QR Attendance</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Contactless entry for the modern era. Members simply scan their dynamic QR code via the app. Real-time logging ensures you always know who is on the floor.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 glass-card rounded-xl">
                                    <h4 className="text-primary font-bold text-xl">1.2s</h4>
                                    <p className="text-xs text-slate-400">Average check-in time</p>
                                </div>
                                <div className="p-4 glass-card rounded-xl">
                                    <h4 className="text-primary font-bold text-xl">100%</h4>
                                    <p className="text-xs text-slate-400">Contactless & Paperless</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Billing */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                                <Receipt className="w-7 h-7" />
                            </div>
                            <h2 className="text-4xl font-black text-slate-100">Subscription Billing</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Never chase a payment again. Our automated billing engine handles recurring subscriptions, pro-rated charges, and failed payment recovery automatically.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-start gap-4 p-4 rounded-xl border border-primary/10 hover:border-primary/40 transition-all">
                                    <RefreshCw className="text-primary w-6 h-6" />
                                    <div>
                                        <h4 className="text-slate-100 font-bold">Auto-Retry Logic</h4>
                                        <p className="text-sm text-slate-400">Smart retries for declined cards to reduce churn.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-xl border border-primary/10 hover:border-primary/40 transition-all">
                                    <Receipt className="text-primary w-6 h-6" />
                                    <div>
                                        <h4 className="text-slate-100 font-bold">Tax Compliance</h4>
                                        <p className="text-sm text-slate-400">Automated invoices and tax reporting built-in.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden glass-card p-4">
                            <div className="aspect-video w-full bg-slate-800 rounded-xl relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/images/stitch/features.png')" }}>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>

                    {/* Feature Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
                        <div className="glass-card p-8 rounded-2xl flex flex-col gap-4 group hover:border-primary/30 transition-all">
                            <Dumbbell className="text-primary w-10 h-10" />
                            <h3 className="text-xl font-bold text-slate-100">Trainer Management</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Schedule sessions, track commissions, and manage trainer performance metrics in one view.
                            </p>
                        </div>
                        <div className="glass-card p-8 rounded-2xl flex flex-col gap-4 group hover:border-primary/30 transition-all">
                            <BarChart3 className="text-primary w-10 h-10" />
                            <h3 className="text-xl font-bold text-slate-100">Advanced Analytics</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Deep insights into churn rates, peak hours, and revenue growth with beautiful visual reports.
                            </p>
                        </div>
                        <div className="glass-card p-8 rounded-2xl flex flex-col gap-4 group hover:border-primary/30 transition-all">
                            <Smartphone className="text-primary w-10 h-10" />
                            <h3 className="text-xl font-bold text-slate-100">Mobile Access</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Native apps for iOS and Android so your staff and members can stay connected anywhere.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-20 lg:px-40 py-24 mb-20">
                    <div className="bg-gradient-to-br from-primary to-[#ff8c3a] rounded-[2rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 size-80 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-80 bg-background-dark/20 rounded-full blur-3xl"></div>
                        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black">Ready to elevate your gym?</h2>
                            <p className="text-white/90 text-lg">
                                Join over 2,000+ gym owners who have transformed their business operations with SoluGrow.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/signup" className="px-8 py-4 bg-background-dark text-white rounded-xl font-bold hover:bg-black transition-all">
                                    Start 14-Day Free Trial
                                </Link>
                                <Link href="/contact" className="px-8 py-4 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-all">
                                    Request a Custom Demo
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="px-6 md:px-20 lg:px-40 py-12 border-t border-primary/10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    <div className="col-span-2 space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Dumbbell className="w-8 h-8" />
                            <h2 className="text-slate-100 text-lg font-bold">SoluGrow</h2>
                        </div>
                        <p className="text-slate-500 text-sm max-w-xs">
                            The ultimate operating system for modern fitness centers and health clubs.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-slate-100 font-bold text-sm uppercase tracking-widest">Platform</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><Link className="hover:text-primary transition-colors" href="/features">Features</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/pricing">Pricing</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/services">Services</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-slate-100 font-bold text-sm uppercase tracking-widest">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><Link className="hover:text-primary transition-colors" href="/about">About Us</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/contact">Support</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/terms">Terms</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-600 text-xs">© 2026 SoluGrow CRM. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link className="text-slate-600 hover:text-primary" href="/share"><Share2 className="w-5 h-5" /></Link>
                        <Link className="text-slate-600 hover:text-primary" href="/lang"><Globe className="w-5 h-5" /></Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
