'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { createGym } from '@/lib/actions'
import Link from 'next/link'
import { User, Mail, Lock, Building2, Rocket, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react'

const SoluGrowLogo = ({ className }: { className?: string }) => (
    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
        <g clipPath="url(#clip0_6_330)">
            <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
        </g>
        <defs><clipPath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clipPath></defs>
    </svg>
)

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [role, setRole] = useState('gym_admin') // Default to gym_admin for trial
    const [gymName, setGymName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (role === 'gym_admin' && !gymName) {
            setError('Please provide a gym name.')
            setLoading(false)
            return
        }

        const { data, error: signupError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: role,
                },
            },
        })

        if (signupError) {
            setError(signupError.message)
            setLoading(false)
            return
        }

        if (data.user) {
            try {
                if (role === 'gym_admin') {
                    const gym = await createGym({ name: gymName, ownerId: data.user.id })
                    router.push(`/choose-plan?gymId=${gym.id}`)
                } else if (role === 'super_admin') {
                    router.push('/super_admin_dashboard')
                } else {
                    router.push('/member_mobile_panel')
                }
            } catch (err: any) {
                console.error('Finalization error:', err)
                setError('Signup successful but profile setup failed: ' + err.message)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div className="relative min-h-screen bg-background-dark text-slate-100 font-display flex flex-col overflow-x-hidden">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-white/5 px-6 py-4 lg:px-20 sticky top-0 bg-background-dark/80 backdrop-blur-md z-50">
                <Link href="/" className="flex items-center gap-2 text-primary">
                    <SoluGrowLogo className="size-8" />
                    <h2 className="text-xl font-black tracking-tighter uppercase italic text-slate-100">SoluGrow</h2>
                </Link>
                <div className="hidden md:flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Already configured?</span>
                    <Link className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline hover:text-white transition-all" href="/login">Authenticate</Link>
                </div>
            </header>

            <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 lg:px-20 relative">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse-glow"></div>

                <div className="w-full max-w-[480px] space-y-8 z-10">
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <h1 className="text-4xl font-black leading-tight tracking-tighter uppercase italic text-slate-100">
                            Start your <span className="text-primary">free trial</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-relaxed">
                            Join SoluGrow today and scale your gym business with our advanced management platform.
                        </p>
                    </div>

                    <div className="glass-card p-8 lg:p-10 rounded-3xl border border-white/5 shadow-massive overflow-hidden relative">
                        {/* Decorative element */}
                        <div className="absolute -top-12 -right-12 size-32 bg-primary/10 rounded-full blur-2xl"></div>

                        <form onSubmit={handleSignup} className="flex flex-col gap-5">
                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                                    {error}
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Full Identity</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 w-5 h-5" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="John Doe"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-slate-700 font-bold text-slate-100"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Digital Mail</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 w-5 h-5" />
                                    <input
                                        required
                                        type="email"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-slate-700 font-bold text-slate-100"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">System Role</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 w-5 h-5" />
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-bold text-slate-100 appearance-none cursor-pointer"
                                    >
                                        <option value="gym_admin" className="bg-slate-900">Gym Owner / Admin</option>
                                        <option value="member" className="bg-slate-900">Gym Member</option>
                                        <option value="super_admin" className="bg-slate-900">Platform Admin</option>
                                    </select>
                                </div>
                            </div>

                            {role === 'gym_admin' && (
                                <div className="flex flex-col gap-2 animate-float-slow">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-4">Organization Name</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/80 w-5 h-5" />
                                        <input
                                            required
                                            type="text"
                                            placeholder="Your Gym's Name"
                                            value={gymName}
                                            onChange={(e) => setGymName(e.target.value)}
                                            className="w-full bg-primary/5 border border-primary/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-primary/30 font-bold text-primary"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Security Key</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 w-5 h-5" />
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a secure password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-slate-700 font-bold text-slate-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-4 flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-5 text-xl font-black italic uppercase text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin w-6 h-6" />
                                ) : (
                                    <>Initialize Profile <Rocket className="ml-2 w-6 h-6" /></>
                                )}
                            </button>

                            <div className="mt-2 text-center">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 leading-relaxed">
                                    By initializing, you agree to our
                                    <Link className="text-primary hover:underline ml-1" href="/terms">Terms</Link>
                                    and
                                    <Link className="text-primary hover:underline ml-1" href="/privacy">Privacy</Link>.
                                </p>
                            </div>
                        </form>

                        <div className="relative py-4 mt-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/5"></span>
                            </div>
                            <div className="relative flex justify-center text-[8px] uppercase font-black tracking-[0.3em] text-slate-700">
                                <span className="bg-background-dark px-2">Secure 256-bit AES Encryption</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-auto flex flex-col items-center gap-4 border-t border-white/5 px-10 py-8 text-center text-slate-600 uppercase font-black tracking-widest text-[10px]">
                <p>© 2026 SoluGrow Automation. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link className="hover:text-primary" href="/status">Status</Link>
                    <Link className="hover:text-primary" href="/docs">Docs</Link>
                    <Link className="hover:text-primary" href="/support">Support</Link>
                </div>
            </footer>

            <div className="fixed top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none hidden xl:block"></div>
        </div>
    )
}
