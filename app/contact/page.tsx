'use client'

import Link from 'next/link'
import { Mail, MessageSquare, Instagram, MapPin, Send, ArrowRight, Diamond, Sun, Moon, Dumbbell } from 'lucide-react'

const SoluGrowLogo = ({ className }: { className?: string }) => (
    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
        <g clipPath="url(#clip0_6_330)">
            <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
        </g>
        <defs><clipPath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clipPath></defs>
    </svg>
)

export default function ContactPage() {
    return (
        <div className="relative min-h-screen bg-background-dark text-slate-100 font-display overflow-x-hidden bg-mesh">
            <div className="relative flex flex-col h-full grow">
                {/* Navigation */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 px-6 lg:px-40 py-4 backdrop-blur-md sticky top-0 z-50">
                    <Link href="/" className="flex items-center gap-4 text-primary">
                        <SoluGrowLogo className="size-8" />
                        <h2 className="text-slate-100 text-xl font-bold leading-tight tracking-tight">SoluGrow</h2>
                    </Link>
                    <div className="hidden md:flex flex-1 justify-end gap-8">
                        <nav className="flex items-center gap-9">
                            <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium" href="/">Home</Link>
                            <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium" href="/services">Services</Link>
                            <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium" href="/about">About</Link>
                            <Link className="text-primary text-sm font-bold underline underline-offset-4" href="/contact">Contact</Link>
                        </nav>
                        <button className="flex items-center justify-center rounded-lg h-10 bg-primary/10 text-primary border border-primary/30 px-3 hover:bg-primary hover:text-white transition-all">
                            <Sun className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 lg:px-20 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Left Column: Content & Contact Info */}
                        <div className="flex flex-col gap-8">
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-slate-100">
                                    Get in <span className="text-primary">Touch</span>
                                </h1>
                                <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                                    We're here to help you scale your fitness business. Reach out to us for any inquiries or strategic support.
                                </p>
                            </div>

                            {/* Contact Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <a className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all orange-glow flex flex-col gap-3" href="mailto:solugrow@gmail.com">
                                    <Mail className="text-primary w-8 h-8" />
                                    <div>
                                        <h3 className="font-bold text-slate-100">Email Us</h3>
                                        <p className="text-sm text-slate-400">solugrow@gmail.com</p>
                                    </div>
                                </a>
                                <a className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all orange-glow flex flex-col gap-3" href="#">
                                    <MessageSquare className="text-primary w-8 h-8" />
                                    <div>
                                        <h3 className="font-bold text-slate-100">WhatsApp</h3>
                                        <p className="text-sm text-slate-400">Connect instantly</p>
                                    </div>
                                </a>
                                <a className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all orange-glow flex flex-col gap-3" href="#">
                                    <Instagram className="text-primary w-8 h-8" />
                                    <div>
                                        <h3 className="font-bold text-slate-100">Instagram</h3>
                                        <p className="text-sm text-slate-400">@solugrow_official</p>
                                    </div>
                                </a>
                                <div className="group p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
                                    <MapPin className="text-primary w-8 h-8" />
                                    <div>
                                        <h3 className="font-bold text-slate-100">Location</h3>
                                        <p className="text-sm text-slate-400">Uttar Pradesh, India</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Integration Placeholder */}
                            <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-white/10">
                                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/stitch/contact.png')" }}>
                                    <div className="absolute inset-0 bg-background-dark/40 backdrop-blur-[2px]"></div>
                                    <div className="z-10 bg-primary p-3 rounded-full animate-bounce shadow-lg shadow-primary/50">
                                        <MapPin className="text-white w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="bg-white/5 border border-white/10 p-8 lg:p-10 rounded-3xl orange-glow">
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <Send className="text-primary w-6 h-6" />
                                Send us a Message
                            </h2>
                            <form className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-slate-300 text-sm font-semibold px-1">Full Name</label>
                                    <input className="w-full rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-white p-4 transition-all placeholder:text-slate-600 outline-none" placeholder="John Doe" type="text" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-slate-300 text-sm font-semibold px-1">Email Address</label>
                                    <input className="w-full rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-white p-4 transition-all placeholder:text-slate-600 outline-none" placeholder="john@example.com" type="email" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-slate-300 text-sm font-semibold px-1">Subject</label>
                                    <select className="w-full rounded-xl bg-background-dark border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-white p-4 transition-all outline-none">
                                        <option>Business Inquiry</option>
                                        <option>Support</option>
                                        <option>Partnership</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-slate-300 text-sm font-semibold px-1">Message</label>
                                    <textarea className="w-full rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary text-white p-4 transition-all placeholder:text-slate-600 outline-none resize-none" placeholder="How can we help you?" rows={4}></textarea>
                                </div>
                                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2" type="submit">
                                    Submit Inquiry
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </main>

                <footer className="border-t border-white/10 py-10 px-6 lg:px-40 text-center text-slate-500 text-sm">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2 text-slate-300 font-bold">
                            <Diamond className="text-primary w-5 h-5 shadow-glow" />
                            SoluGrow
                        </div>
                        <div className="flex gap-8">
                            <Link className="hover:text-primary transition-colors" href="/privacy">Privacy Policy</Link>
                            <Link className="hover:text-primary transition-colors" href="/terms">Terms of Service</Link>
                        </div>
                        <p>© 2026 SoluGrow. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}
