'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function MemberMobilePanel() {
    const [member, setMember] = useState(null)
    const [attendance, setAttendance] = useState([])
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: memberData } = await supabase
                    .from('members')
                    .select('*, gyms(name)')
                    .eq('email', user.email)
                    .single()

                if (memberData) {
                    setMember(memberData)

                    const { data: aData } = await supabase
                        .from('attendance')
                        .select('*')
                        .eq('member_id', memberData.id)
                        .order('created_at', { ascending: false })
                    setAttendance(aData || [])

                    const { data: pData } = await supabase
                        .from('payments')
                        .select('*')
                        .eq('member_id', memberData.id)
                        .order('created_at', { ascending: false })
                    setPayments(pData || [])
                }
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    if (loading) return <div className="p-20 text-center font-black animate-pulse uppercase tracking-[0.5em]">Syncing Personal Node...</div>

    if (!member) return (
        <div className="p-20 text-center bg-white rounded-[4rem] shadow-3xl border border-gray-100 max-w-2xl mx-auto mt-20">
            <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter uppercase">Access Denied</h1>
            <p className="text-gray-400 font-bold mb-10 leading-relaxed italic border-l-4 border-red-500 pl-6">
                Your email identity is not yet linked to an operational gym node. Please coordinate with your gym admin for registration.
            </p>
            <a href="/login" className="px-12 py-5 bg-gray-900 border-2 border-gray-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all">Back to Landing</a>
        </div>
    )

    return (
        <div className="max-w-6xl mx-auto">
            <header className="bg-gradient-to-r from-blue-700 to-blue-900 p-16 rounded-[4.5rem] shadow-3xl text-white mb-16 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-10">
                    <div>
                        <p className="text-blue-300 font-black uppercase text-[10px] tracking-[0.5em] mb-4 opacity-80">Operational Intelligence</p>
                        <h1 className="text-7xl font-black tracking-tighter mb-4">{member.name}</h1>
                        <p className="text-blue-100 font-black text-2xl uppercase tracking-widest">{member.gyms?.name}</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <div className="bg-white/10 backdrop-blur-md px-10 py-5 rounded-3xl border border-white/20 mb-4 transition hover:bg-white/20">
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Status Level</p>
                            <p className="text-3xl font-black uppercase tracking-tighter">{member.membership_plan}</p>
                        </div>
                        <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${member.status === 'active' ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'
                            }`}>
                            {member.status === 'active' ? 'Node Active' : 'Access Restricted'}
                        </span>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                <section>
                    <div className="flex justify-between items-center mb-8 px-4">
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Attendance Stream</h2>
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-widest">Verified Entries Only</span>
                    </div>
                    <div className="bg-white rounded-[4rem] shadow-2xl border border-gray-100 p-10 h-[500px] overflow-y-auto space-y-6">
                        {attendance.length > 0 ? attendance.map(a => (
                            <div key={a.id} className="flex justify-between items-center p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-blue-100 transition shadow-sm group">
                                <div className="flex gap-6 items-center">
                                    <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center font-black text-blue-600 shadow-md transition group-hover:scale-110">✓</div>
                                    <div>
                                        <p className="text-lg font-black text-gray-900 tracking-tight">Entry Synchronized</p>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Point Verification Success</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-gray-900 tracking-tighter">{new Date(a.date).toLocaleDateString()}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-60">Session {a.id.slice(-4).toUpperCase()}</p>
                                </div>
                            </div>
                        )) : (
                            <div className="h-full flex items-center justify-center text-gray-300 font-black uppercase tracking-widest italic opacity-40 p-20 text-center">Empty checking history</div>
                        )}
                    </div>
                </section>

                <section>
                    <div className="flex justify-between items-center mb-8 px-4">
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Financial Audit</h2>
                        <span className="text-[10px] font-black text-green-600 bg-green-50 px-4 py-1.5 rounded-full uppercase tracking-widest">Verified Transfers</span>
                    </div>
                    <div className="bg-white rounded-[4rem] shadow-2xl border border-gray-100 p-10 h-[500px] overflow-y-auto space-y-6">
                        {payments.length > 0 ? payments.map(p => (
                            <div key={p.id} className="flex justify-between items-center p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-green-100 transition shadow-sm group">
                                <div className="flex gap-6 items-center">
                                    <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center font-black text-green-600 shadow-md transition group-hover:scale-110">$</div>
                                    <div>
                                        <p className="text-lg font-black text-gray-900 tracking-tight">Transaction Logged</p>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{p.method} Verification</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-black text-green-600 tracking-tighter">${p.amount}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-60">{new Date(p.payment_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )) : (
                            <div className="h-full flex items-center justify-center text-gray-300 font-black uppercase tracking-widest italic opacity-40 p-20 text-center">No transactions verified</div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}
