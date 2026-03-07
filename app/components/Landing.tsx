'use client'

import Link from 'next/link'

export default function Landing() {
    return (
        <div className="bg-white min-h-screen font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">G</div>
                        <span className="text-2xl font-black tracking-tighter uppercase italic">GymSaaS</span>
                    </div>
                    <div className="hidden md:flex items-center gap-10">
                        <a href="#features" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition">Features</a>
                        <a href="#pricing" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition">Pricing</a>
                        <Link href="/login" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition">Login</Link>
                        <Link href="/signup" className="px-6 py-3 bg-blue-600 text-white rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 hover:translate-y-[-2px] transition-all">
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-24 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-bounce-slow">
                        Revolutionizing Fitness Management
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.9] text-gray-900 mb-8 uppercase">
                        Scale Your <br />
                        <span className="text-blue-600 italic">Gym Empire.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-500 font-bold mb-12 leading-relaxed">
                        The all-in-one OS for modern gym owners. Automate attendance, manage payments, and track growth with military-grade precision.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link href="/signup" className="w-full md:w-auto px-12 py-6 bg-gray-900 text-white rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl hover:bg-blue-600 hover:translate-y-[-4px] active:scale-95 transition-all">
                            Start Free Trial
                        </Link>
                        <a href="#features" className="w-full md:w-auto px-12 py-6 bg-white text-gray-900 border-2 border-gray-100 rounded-[2rem] font-black text-lg uppercase tracking-widest hover:border-blue-600 transition-all">
                            Watch Demo
                        </a>
                    </div>
                </div>
                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl font-black tracking-tight uppercase mb-4">Precision Tools</h2>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Engineered for deep operational control</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { title: 'Member Matrix', desc: 'Complete CRUD control over your member database with role-based access.', icon: 'M' },
                            { title: 'Live Pulse', desc: 'Real-time attendance tracking with synchronized historical logs.', icon: 'P' },
                            { title: 'Financial Audit', desc: 'Secure payment recording with UPI integration and audit trails.', icon: 'F' }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-12 rounded-[4rem] shadow-xl border border-gray-50 hover:shadow-blue-100 transition-all hover:translate-y-[-8px]">
                                <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-2xl font-black mb-8 shadow-lg shadow-blue-100">{feature.icon}</div>
                                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{feature.title}</h3>
                                <p className="text-gray-500 font-bold leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl font-black tracking-tight uppercase mb-4">Transparent Tiers</h2>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Choose your growth velocity</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Basic Plan */}
                        <div className="bg-white p-16 rounded-[4.5rem] shadow-2xl border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group hover:translate-y-[-10px] transition-all">
                            <div className="absolute top-0 left-0 w-full h-4 bg-gray-100 group-hover:bg-blue-600 transition-colors"></div>
                            <h3 className="text-3xl font-black uppercase mb-2">Basic Plan</h3>
                            <div className="flex items-baseline gap-2 mb-10">
                                <span className="text-6xl font-black text-gray-900">₹999</span>
                                <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">/ Month</span>
                            </div>
                            <ul className="space-y-4 mb-12 text-gray-500 font-bold">
                                <li>Up to 150 members</li>
                                <li>Attendance tracking</li>
                                <li>Payment tracking</li>
                                <li className="opacity-20 line-through">Advanced analytics</li>
                            </ul>
                            <Link href="/signup" className="w-full py-5 bg-gray-900 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all">
                                Select Basic
                            </Link>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-white p-16 rounded-[4.5rem] shadow-2xl border-2 border-blue-600 flex flex-col items-center text-center relative overflow-hidden group hover:translate-y-[-10px] transition-all">
                            <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest">Most Popular</div>
                            <h3 className="text-3xl font-black uppercase mb-2">Pro Plan</h3>
                            <div className="flex items-baseline gap-2 mb-10">
                                <span className="text-6xl font-black text-blue-600">₹1999</span>
                                <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">/ Month</span>
                            </div>
                            <ul className="space-y-4 mb-12 text-gray-500 font-bold">
                                <li>Unlimited members</li>
                                <li>Advanced analytics</li>
                                <li>Export reports</li>
                                <li>Priority support</li>
                            </ul>
                            <Link href="/signup" className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all">
                                Select Pro
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">G</div>
                        <span className="text-xl font-black tracking-tighter uppercase italic">GymSaaS</span>
                    </div>
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">© 2026 Operational Intelligence v4.0. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="text-gray-500 hover:text-white transition">Twitter</a>
                        <a href="#" className="text-gray-500 hover:text-white transition">LinkedIn</a>
                        <a href="#" className="text-gray-500 hover:text-white transition">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
