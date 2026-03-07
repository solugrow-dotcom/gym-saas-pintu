'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()

    const handleLogin = async (e) => {
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
            } catch (err) {
                console.error('Login profile sync error:', err)
                setError('Login successful but role identification failed.')
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
            <form onSubmit={handleLogin} className="p-10 bg-white shadow-2xl rounded-[2.5rem] w-full max-w-md border border-gray-100 transition-all hover:shadow-blue-100">
                <h1 className="text-4xl font-black mb-10 text-center text-gray-900 tracking-tighter uppercase underline decoration-blue-600 decoration-8 underline-offset-8">Secure Portal</h1>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex gap-3 items-center">
                        <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-lg">!</span>
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-5 border-2 border-gray-100 rounded-2xl text-gray-900 focus:border-blue-500 outline-none transition font-bold"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Secure Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-5 border-2 border-gray-100 rounded-2xl text-gray-900 focus:border-blue-500 outline-none transition font-bold"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 text-white p-5 rounded-2xl mt-10 font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 hover:translate-y-[-4px] active:scale-95 disabled:bg-gray-400 transition-all"
                >
                    {loading ? 'Authenticating...' : 'Enter Console'}
                </button>

                <p className="mt-8 text-center text-gray-500 font-bold">
                    New operator? <a href="/signup" className="text-blue-600 border-b-2 border-blue-600 pb-0.5 hover:text-blue-800 transition">Request Access</a>
                </p>
            </form>
        </div>
    )
}
