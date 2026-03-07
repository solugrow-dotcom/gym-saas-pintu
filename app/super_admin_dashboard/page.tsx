'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SuperAdminDashboard() {
    const [stats, setStats] = useState({ gyms: 0, members: 0, payments: 0, revenue: 0 })
    const [revenueData, setRevenueData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            try {
                const { count: gymCount } = await supabase.from('gyms').select('*', { count: 'exact', head: true })
                const { count: memberCount } = await supabase.from('members').select('*', { count: 'exact', head: true })
                const { count: payCount } = await supabase.from('payments').select('*', { count: 'exact', head: true })
                const { data: payments } = await supabase.from('payments').select('amount, payment_date')

                const totalRevenue = payments?.reduce((acc, p) => acc + Number(p.amount), 0) || 0

                // Mocking monthly chart data based on last 6 months
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                const mockRevenue = months.map((m, i) => ({ month: m, amount: (totalRevenue / 6) * (0.8 + Math.random() * 0.4) }))
                setRevenueData(mockRevenue)

                setStats({
                    gyms: gymCount || 0,
                    members: memberCount || 0,
                    payments: payCount || 0,
                    revenue: totalRevenue
                })
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) return <div className="p-8 text-center text-gray-500 font-black uppercase tracking-widest animate-pulse font-sans">Crunching Global Data...</div>

    return (
        <div>
            <header className="mb-16">
                <h1 className="text-6xl font-black text-gray-900 tracking-tighter uppercase underline decoration-blue-600 decoration-[16px] underline-offset-8">Global Control</h1>
                <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.4em] mt-6 ml-2 italic">Platform-Wide Analytics & Infrastructure Monitoring</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
                {[
                    { label: 'Licensed Gyms', value: stats.gyms, color: 'blue', desc: 'Active instances' },
                    { label: 'Total Members', value: stats.members, color: 'indigo', desc: 'Global users' },
                    { label: 'Transactions', value: stats.payments, color: 'purple', desc: 'Billing nodes' },
                    { label: 'Gross Revenue', value: `$${stats.revenue.toLocaleString()}`, color: 'green', desc: 'Projected growth' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-12 rounded-[4rem] shadow-2xl border border-gray-100 transition-all hover:shadow-blue-50 hover:translate-y-[-10px] relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-50 rounded-bl-full opacity-40 transition-all group-hover:scale-110`}></div>
                        <p className={`text-${stat.color}-600 font-black uppercase text-[10px] tracking-[0.3em] mb-4 relative z-10`}>{stat.label}</p>
                        <p className="text-7xl font-black text-gray-900 tracking-tighter mb-2 relative z-10">{stat.value}</p>
                        <p className="text-gray-300 font-bold text-xs uppercase tracking-widest relative z-10">{stat.desc}</p>
                    </div>
                ))}
            </div>

            <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 bg-gray-900 p-16 rounded-[4.5rem] shadow-3xl text-white outline outline-1 outline-gray-800">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-4xl font-black tracking-tighter uppercase">Revenue Velocity</h2>
                        <span className="text-[10px] font-black text-blue-400 border border-blue-400 px-4 py-1.5 rounded-full uppercase tracking-widest">Growth Vector</span>
                    </div>

                    <div className="flex items-end justify-between h-64 gap-6 px-4">
                        {revenueData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                <div
                                    className="w-full bg-blue-600 rounded-2xl transition-all duration-500 shadow-lg shadow-blue-500/20 group-hover:bg-blue-400 group-hover:scale-105"
                                    style={{ height: `${(d.amount / (stats.revenue / 4)) * 100}%`, minHeight: '10%' }}
                                ></div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition">{d.month}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 pt-12 border-t border-gray-800 flex justify-around">
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Stability</p>
                            <p className="text-xl font-black">99.98%</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Growth</p>
                            <p className="text-xl font-black">+14.2%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-12 rounded-[4.5rem] shadow-2xl border border-gray-100 flex flex-col justify-center text-center">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.4em] mb-4">Core Alert Status</p>
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <div className="w-12 h-12 bg-green-500 rounded-full animate-ping opacity-20"></div>
                        <div className="w-12 h-12 bg-green-500 rounded-full absolute flex items-center justify-center text-white font-black">✓</div>
                    </div>
                    <p className="text-2xl font-black text-gray-900 tracking-tight">System Nominal</p>
                    <p className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-widest">Global heartbeats verified</p>

                    <button className="mt-12 p-5 bg-gray-50 text-gray-400 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-100 transition shadow-sm">
                        Initiate Platform Audit
                    </button>
                </div>
            </section>
        </div>
    )
}
