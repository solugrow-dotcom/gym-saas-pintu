"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-24 relative bg-[#050505] border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Get in touch
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-md">
                            Have questions about enterprise plans or custom integrations? Our team is ready to help.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase font-semibold">Email</div>
                                    <a href="mailto:solugrow@gmail.com" className="hover:text-white transition-colors">solugrow@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase font-semibold">Support</div>
                                    <a href="mailto:pintuclub51@gmail.com" className="hover:text-white transition-colors">pintuclub51@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase font-semibold">Phone</div>
                                    <a href="tel:+919719408937" className="hover:text-white transition-colors">+91 9719408937</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase font-semibold">Location</div>
                                    <span>U.P, India</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8 rounded-2xl border border-white/10">
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="First Name" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50" />
                                <input type="text" placeholder="Last Name" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50" />
                            </div>
                            <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50" />
                            <textarea rows={4} placeholder="Your Message" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"></textarea>
                            <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
