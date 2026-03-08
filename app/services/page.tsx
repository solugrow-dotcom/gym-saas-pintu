'use client'

import Link from 'next/link'
import { Dumbbell, LayoutDashboard, CreditCard, BadgeCheck, Activity, Bot, Salad, Globe, Mail, Menu } from 'lucide-react'

// Custom Logo component to match the SVG in Stitch
const SoluGrowLogo = ({ className }: { className?: string }) => (
    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
        <g clipPath="url(#clip0_6_330)">
            <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
        </g>
        <defs>
            <clipPath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clipPath>
        </defs>
    </svg>
)

export default function ServicesPage() {
    const services = [
        {
            title: 'Gym Management CRM',
            desc: 'Streamline your daily operations, lead generation, and member engagement in one central hub.',
            icon: LayoutDashboard,
            tag: 'SaaS UI',
            image: '/images/stitch/services.png'
        },
        {
            title: 'Membership Billing',
            desc: 'Automated recurring invoicing and secure payment processing to keep your revenue flowing.',
            icon: CreditCard,
            tag: 'Glassmorphism',
            image: '/images/stitch/services.png'
        },
        {
            title: 'Trainer Management',
            desc: 'Optimize schedules, track session performance, and manage commissions for your staff.',
            icon: BadgeCheck,
            tag: 'Dark Theme',
            image: '/images/stitch/services.png'
        },
        {
            title: 'Gym Analytics',
            desc: 'Deep data-driven insights into member churn, peak hours, and revenue trends to scale fast.',
            icon: Activity,
            tag: 'Real-time Data',
            image: '/images/stitch/services.png'
        },
        {
            title: 'WhatsApp Automation',
            desc: 'Automated alerts, personalized birthday wishes, and targeted marketing campaigns via WhatsApp.',
            icon: Bot,
            tag: 'Enterprise Grade',
            image: '/images/stitch/services.png'
        },
        {
            title: 'AI Diet & Workout',
            desc: "Personalized fitness and nutrition plans powered by advanced AI for every member's goals.",
            icon: Salad,
            tag: 'Next-gen AI',
            image: '/images/stitch/services.png'
        }
    ]

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark text-slate-100 font-display">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/5 px-6 md:px-20 lg:px-40 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-3 text-primary">
                    <SoluGrowLogo className="size-8" />
                    <h2 className="text-slate-100 text-xl font-bold leading-tight tracking-tight">SoluGrow</h2>
                </Link>
                <div className="flex flex-1 justify-end gap-8 items-center">
                    <nav className="hidden md:flex items-center gap-9">
                        <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium" href="/">Home</Link>
                        <Link className="text-primary text-sm font-medium" href="/services">Services</Link>
                        <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium" href="/pricing">Pricing</Link>
                        <Link className="text-slate-300 hover:text-primary transition-colors text-sm font-medium" href="/contact">Contact</Link>
                    </nav>
                    <Link href="/signup" className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20">
                        Get Started
                    </Link>
                </div>
            </header>

            <main className="flex-1 px-6 md:px-20 lg:px-40 py-12 lg:py-20">
                <div className="max-w-[960px] mx-auto mb-16">
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <h1 className="text-slate-100 text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                            SoluGrow Platform Services
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl font-normal max-w-2xl">
                            Empower your fitness business with our comprehensive suite of digital tools designed for explosive growth and seamless member experiences.
                        </p>
                    </div>
                </div>

                <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <div key={i} className="glass-card flex flex-col gap-4 p-5 rounded-xl group hover:border-primary/40 transition-all cursor-default">
                            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden relative" style={{ backgroundImage: `url('${s.image}')` }}>
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                                <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider text-primary bg-background-dark/60 px-2 py-1 rounded">
                                    {s.tag}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-primary font-bold">
                                    <s.icon className="w-5 h-5" />
                                    <h3 className="text-slate-100 text-lg font-bold">{s.title}</h3>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-[960px] mx-auto mt-20 md:mt-32">
                    <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 p-10 md:p-16 rounded-3xl text-center flex flex-col items-center gap-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 size-64 bg-primary/10 rounded-full blur-3xl"></div>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-slate-100 text-3xl md:text-5xl font-black tracking-tight leading-tight">
                                Ready to transform <br /> your gym?
                            </h2>
                            <p className="text-slate-400 text-lg max-w-[600px] mx-auto">
                                Join 500+ fitness centers worldwide that are scaling their business and delighting members with SoluGrow.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center relative z-10">
                            <Link href="/signup" className="flex min-w-[200px] items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                                Start Free Trial
                            </Link>
                            <Link href="/contact" className="flex min-w-[200px] items-center justify-center rounded-xl h-14 px-8 border border-white/10 bg-white/5 text-slate-100 text-base font-bold hover:bg-white/10 transition-all">
                                Book a Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-white/5 mt-20 px-6 md:px-20 lg:px-40 py-12">
                <div className="max-w-[960px] mx-auto flex flex-col gap-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <Link href="/" className="flex items-center gap-3 text-primary">
                            <SoluGrowLogo className="size-6" />
                            <h2 className="text-slate-100 text-lg font-bold">SoluGrow</h2>
                        </Link>
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            <Link className="text-slate-400 hover:text-primary transition-colors text-sm" href="/privacy">Privacy Policy</Link>
                            <Link className="text-slate-400 hover:text-primary transition-colors text-sm" href="/terms">Terms of Service</Link>
                            <Link className="text-slate-400 hover:text-primary transition-colors text-sm" href="/help">Help Center</Link>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
                        <p className="text-slate-500 text-sm">© 2026 SoluGrow Platform. All rights reserved.</p>
                        <div className="flex gap-4">
                            <Link className="text-slate-500 hover:text-primary" href="/social"><Globe className="w-5 h-5" /></Link>
                            <Link className="text-slate-500 hover:text-primary" href="/mail"><Mail className="w-5 h-5" /></Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
