'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function GymAdminDashboard() {
    const [gym, setGym] = useState<any>(null)
    const [subscription, setSubscription] = useState<any>(null)
    const [stats, setStats] = useState({ members: 0, attendanceToday: 0, revenueMonth: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: gymData } = await supabase.from('gyms').select('*').eq('owner_id', user.id).single()
                setGym(gymData)

                if (gymData) {
                    // Fetch Subscription
                    const { data: subData } = await supabase.from('subscriptions').select('*').eq('gym_id', gymData.id).single()
                    setSubscription(subData)

                    const { count: memberCount } = await supabase.from('members').select('*', { count: 'exact', head: true }).eq('gym_id', gymData.id)
                    const { count: attCount } = await supabase.from('attendance')
                        .select('*', { count: 'exact', head: true })
                        .eq('gym_id', gymData.id)
                        .eq('date', new Date().toISOString().split('T')[0])

                    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]
                    const { data: payments } = await supabase.from('payments')
                        .select('amount')
                        .eq('gym_id', gymData.id)
                        .gte('payment_date', startOfMonth)

                    setStats({
                        members: memberCount || 0,
                        attendanceToday: attCount || 0,
                        revenueMonth: payments?.reduce((acc, p) => acc + Number(p.amount), 0) || 0
                    })
                }
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    if (loading) return <div className="animate-pulse">Loading Analytics...</div>

    return (
        <div>
            <header className="mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">{gym?.name || 'Pulse Dashboard'}</h1>
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.4em] mt-2 ml-1 italic">Advanced Performance Monitoring v3.0</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Status Protocol</p>
                    <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                        <div className={`w-3 h-3 rounded-full ${subscription?.status === 'active' ? 'bg-green-500 shadow-green-200' : 'bg-red-500 shadow-red-200'} shadow-lg animate-pulse`}></div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">{subscription?.plan || 'No Plan'} - {subscription?.status || 'Unknown'}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter border-l pl-3">EXP: {subscription?.expiry_date || 'N/A'}</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Active Members', value: stats.members, color: 'blue', desc: 'Cumulative growth' },
                    { label: 'Attendance Today', value: stats.attendanceToday, color: 'indigo', desc: 'Checked-in nodes' },
                    { label: 'Revenue (MTD)', value: `$${stats.revenueMonth}`, color: 'green', desc: 'Digital & cash total' }
                ].map((stat, i) => (
                    <div key={i} className="group bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 hover:shadow-blue-100 transition-all hover:translate-y-[-8px]">
                        <p className={`text-${stat.color}-600 font-black uppercase text-[10px] tracking-widest mb-4`}>{stat.label}</p>
                        <p className="text-6xl font-black text-gray-900 tracking-tighter mb-2">{stat.value}</p>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest opacity-60">{stat.desc}</p>
                    </div>
                ))}
            </div>

            <section className="mt-12 bg-gray-900 p-12 rounded-[3.5rem] shadow-3xl text-white relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <h2 className="text-3xl font-black mb-2 tracking-tight">Ready to onboard?</h2>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Direct access to member directory and payments</p>
                    </div>
                    <a href="/gym_admin_dashboard/members" className="px-10 py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all">
                        Manage Members
                    </a>
                </div>
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
            </section>
        </div>
    )
}
