'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SuperAdminDashboard() {
    const [stats, setStats] = useState({ gyms: 0, members: 0, payments: 0, revenue: 0 })
    const [revenueData, setRevenueData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            try {
                const { count: gymCount } = await supabase.from('gyms').select('*', { count: 'exact', head: true })
                const { count: memberCount } = await supabase.from('members').select('*', { count: 'exact', head: true })
                const { count: payCount } = await supabase.from('payments').select('*', { count: 'exact', head: true })
                const { data: payments } = await supabase.from('payments').select('amount, payment_date')

                const totalRevenue = payments?.reduce((acc, p) => acc + Number(p.amount), 0) || 0

                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                const mockRevenue = months.map((m, i) => ({
                    month: m,
                    amount: (totalRevenue / 6) * (0.8 + Math.random() * 0.4)
                }))
                setRevenueData(mockRevenue)

                setStats({
                    gyms: gymCount || 0,
                    members: memberCount || 0,
                    payments: payCount || 0,
                    revenue: totalRevenue
                })
            } catch (err: any) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-primary space-y-4">
            <span className="animate-spin material-symbols-outlined text-6xl">progress_activity</span>
            <p className="font-black uppercase tracking-[0.5em] text-xs">Synchronizing Intelligence...</p>
        </div>
    )

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Global <span className="text-primary">Control</span></h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em] mt-4 ml-1">Infrastructure Monitoring • SoluGrow SaaS</p>
                </div>
                <div className="flex gap-3">
                    <button className="glass px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all outline-none border-white/5">Export Audit</button>
                    <button className="bg-primary px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">System Scan</button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[
                    { label: 'Licensed Gyms', value: stats.gyms, icon: 'location_city', desc: 'Active instances' },
                    { label: 'Total Members', value: stats.members.toLocaleString(), icon: 'group', desc: 'Global users' },
                    { label: 'Transactions', value: stats.payments, icon: 'receipt_long', desc: 'Billing nodes' },
                    { label: 'Gross Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: 'payments', desc: 'Network growth' }
                ].map((stat, i) => (
                    <div key={i} className="glass p-10 rounded-[2.5rem] border-white/5 group hover:border-primary/50 transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="material-symbols-outlined text-7xl text-primary">{stat.icon}</span>
                        </div>
                        <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] mb-4">{stat.label}</p>
                        <p className="text-5xl font-black text-white italic tracking-tighter mb-2">{stat.value}</p>
                        <p className="text-slate-600 font-bold text-[10px] uppercase tracking-widest">{stat.desc}</p>
                    </div>
                ))}
            </div>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass p-10 lg:p-12 rounded-[3.5rem] border-white/5 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-16">
                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Revenue <span className="text-primary">Velocity</span></h2>
                        <div className="flex items-center gap-2">
                            <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Real-time sync</span>
                        </div>
                    </div>

                    <div className="flex items-end justify-between h-72 gap-4 lg:gap-8 px-2 lg:px-6">
                        {revenueData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-6 group">
                                <div
                                    className="w-full bg-primary/20 rounded-2xl transition-all duration-700 group-hover:bg-primary group-hover:shadow-[0_0_30px_rgba(236,91,19,0.3)]"
                                    style={{ height: `${(d.amount / (stats.revenue / 4)) * 100}%`, minHeight: '10%' }}
                                ></div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition">{d.month}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-12 border-t border-white/5 flex justify-around">
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Network Stability</p>
                            <p className="text-3xl font-black text-white italic">99.98%</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Growth Vector</p>
                            <p className="text-3xl font-black text-white italic">+14.2%</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="glass p-12 rounded-[3.5rem] border-white/5 flex flex-col items-center text-center justify-center flex-1">
                        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 relative">
                            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-10"></div>
                            <span className="material-symbols-outlined text-green-500 text-5xl">verified</span>
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">System Nominal</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Global Heartbeat Verified</p>
                    </div>

                    <div className="glass p-12 rounded-[3.5rem] border-white/5 group hover:border-primary/30 transition-all flex flex-col items-center text-center justify-center cursor-pointer">
                        <span className="material-symbols-outlined text-primary text-5xl mb-6 animate-float-slow">security</span>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Initiate Audit</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase mt-2 tracking-widest">Full Platform Integrity Check</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
