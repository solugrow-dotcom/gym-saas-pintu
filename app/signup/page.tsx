'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { createGym } from '@/lib/actions'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [role, setRole] = useState('member')
    const [gymName, setGymName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
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
                // The trigger handles user creation in 'users' table.
                // We add gym creation for gym_admin.
                if (role === 'gym_admin') {
                    const gym = await createGym({ name: gymName, ownerId: data.user.id })
                    // Redirect to plan selection instead of dashboard
                    router.push(`/choose-plan?gymId=${gym.id}`)
                } else if (role === 'super_admin') {
                    router.push('/super_admin_dashboard')
                } else {
                    router.push('/member_mobile_panel')
                }
            } catch (err) {
                console.error('Finalization error:', err)
                setError('Signup successful but profile setup failed: ' + err.message)
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
            <form onSubmit={handleSignup} className="p-10 bg-white shadow-2xl rounded-[2.5rem] w-full max-w-md border border-gray-100 transition-all hover:shadow-blue-100">
                <h1 className="text-4xl font-black mb-8 text-center text-gray-900 tracking-tighter uppercase underline decoration-blue-600 decoration-8 underline-offset-8">Get Started</h1>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex gap-3 items-center">
                        <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-lg">!</span>
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-4 border-2 border-gray-100 rounded-2xl text-gray-900 focus:border-blue-500 outline-none transition font-bold"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 border-2 border-gray-100 rounded-2xl text-gray-900 focus:border-blue-500 outline-none transition font-bold"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 border-2 border-gray-100 rounded-2xl text-gray-900 focus:border-blue-500 outline-none transition font-bold"
                        required
                    />

                    <div className="pt-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2 ml-1">Account Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-4 border-2 border-gray-100 rounded-2xl text-gray-900 focus:border-blue-500 outline-none transition font-bold bg-white"
                        >
                            <option value="member">Gym Member</option>
                            <option value="gym_admin">Gym Owner / Admin</option>
                            <option value="super_admin">Super Admin</option>
                        </select>
                    </div>

                    {role === 'gym_admin' && (
                        <input
                            type="text"
                            placeholder="Your Gym Name"
                            value={gymName}
                            onChange={(e) => setGymName(e.target.value)}
                            className="w-full p-4 border-2 border-blue-100 rounded-2xl text-gray-900 focus:border-blue-500 outline-none transition font-bold bg-blue-50"
                            required
                        />
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-5 rounded-2xl mt-8 font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 hover:translate-y-[-4px] active:scale-95 disabled:bg-gray-400 transition-all"
                >
                    {loading ? 'Initializing...' : 'Launch Power'}
                </button>

                <p className="mt-8 text-center text-gray-500 font-bold">
                    Already a member? <a href="/login" className="text-blue-600 border-b-2 border-blue-600 pb-0.5 hover:text-blue-800 transition">Login Here</a>
                </p>
            </form>
        </div>
    )
}
