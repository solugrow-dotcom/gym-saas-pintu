'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, ArrowRight, Loader2, Dumbbell } from 'lucide-react'

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

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { data, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (authError) {
            setError(authError.message)
            setLoading(false)
            return
        }

        if (data.user) {
            try {
                const { data: userData } = await supabase
                    .from('users')
                    .select('role')
                    .eq('id', data.user.id)
                    .single()

                if (userData?.role === 'super_admin') router.push('/super_admin_dashboard')
                else if (userData?.role === 'gym_admin') router.push('/gym_admin_dashboard')
                else router.push('/member_mobile_panel')
            } catch (err: any) {
                console.error('Login profile sync error:', err)
                setError('Login successful but role identification failed.')
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div className="relative min-h-screen bg-background-dark text-slate-100 font-display flex flex-col overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>

            {/* Top Navigation Bar */}
            <header className="w-full px-6 md:px-10 py-4 flex items-center justify-between border-b border-primary/10 sticky top-0 bg-background-dark/80 backdrop-blur-md z-50">
                <Link href="/" className="flex items-center gap-3 text-primary">
                    <SoluGrowLogo className="size-8" />
                    <h2 className="text-xl font-bold tracking-tight text-slate-100">SoluGrow</h2>
                </Link>
                <div className="hidden sm:flex items-center gap-6">
                    <Link className="text-sm font-medium hover:text-primary transition-colors text-slate-400" href="/pricing">Pricing</Link>
                    <Link className="text-sm font-medium hover:text-primary transition-colors text-slate-400" href="/contact">Support</Link>
                    <Link href="/signup" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-primary/20">
                        Sign Up
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center p-6 relative">
                {/* Login Card */}
                <div className="w-full max-w-[450px] glass-card orange-glow rounded-3xl p-8 md:p-10 z-10 border border-white/5">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black mb-2 italic uppercase">Welcome Back</h1>
                        <p className="text-slate-500 text-sm font-medium uppercase tracking-widest leading-relaxed">Secure access to your dashboard</p>
                    </div>

                    {/* Social Login */}
                    <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3.5 transition-all mb-6 group">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
                        </svg>
                        <span className="text-sm font-bold uppercase tracking-tight">Sign in with Google</span>
                    </button>

                    <div className="relative flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-white/5"></div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">Or continue with email</span>
                        <div className="flex-1 h-px bg-white/5"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest flex gap-3 items-center animate-shake">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-4">Identifier</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 w-5 h-5" />
                                    <input
                                        required
                                        type="email"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-600 font-bold text-slate-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Security Key</label>
                                    <Link className="text-[10px] font-black uppercase tracking-[0.1em] text-primary hover:text-white transition-colors" href="/forgot-password">Forgot Key?</Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 w-5 h-5" />
                                    <input
                                        required
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-600 font-bold text-slate-100"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 py-2">
                            <input className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/50 cursor-pointer" id="remember" type="checkbox" />
                            <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 cursor-pointer" htmlFor="remember">Keep me logged in</label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 uppercase italic disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin w-5 h-5 text-white" />
                            ) : (
                                <>Authenticate <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                        New operator? <Link className="text-primary hover:text-white transition-colors ml-1" href="/signup">Request Access</Link>
                    </p>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="w-full py-6 px-10 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                © 2026 SoluGrow Automation • Zero Trust Environment
                <div className="mt-2 flex justify-center gap-4">
                    <Link className="hover:text-primary transition-colors" href="/privacy">Privacy Policy</Link>
                    <Link className="hover:text-primary transition-colors" href="/terms">Terms of Service</Link>
                </div>
            </footer>
        </div>
    )
}
