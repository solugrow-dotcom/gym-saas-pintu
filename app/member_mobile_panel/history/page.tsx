'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function MemberHistory() {
    const [history, setHistory] = useState([])
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchHistory() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: memberData } = await supabase.from('members').select('id').eq('email', user.email).single()
                if (memberData) {
                    const { data: aData } = await supabase.from('attendance').select('*').eq('member_id', memberData.id).order('created_at', { ascending: false })
                    setHistory(aData || [])
                    const { data: pData } = await supabase.from('payments').select('*').eq('member_id', memberData.id).order('created_at', { ascending: false })
                    setPayments(pData || [])
                }
            }
            setLoading(false)
        }
        fetchHistory()
    }, [])

    if (loading) return <div className="p-20 text-center font-black animate-pulse">Syncing Personnel History...</div>

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section>
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-8">Access Timeline</h2>
                <div className="bg-white rounded-[3.5rem] shadow-2xl p-10 space-y-4">
                    {history.map(h => (
                        <div key={h.id} className="p-6 bg-gray-50 rounded-2xl flex justify-between items-center transition hover:shadow-md">
                            <span className="text-sm font-black text-gray-900">{new Date(h.date).toLocaleDateString()}</span>
                            <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase">VERIFIED</span>
                        </div>
                    ))}
                    {history.length === 0 && <p className="text-center text-gray-300 italic uppercase font-black text-[10px] tracking-widest decoration-blue-600 underline">No historical access nodes found</p>}
                </div>
            </section>
            <section>
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-8">Billing Trail</h2>
                <div className="bg-white rounded-[3.5rem] shadow-2xl p-10 space-y-4">
                    {payments.map(p => (
                        <div key={p.id} className="p-6 bg-gray-50 rounded-2xl flex justify-between items-center transition hover:shadow-md">
                            <div>
                                <p className="text-sm font-black text-gray-900">${p.amount}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">{p.method} Sync</p>
                            </div>
                            <span className="text-[10px] font-black text-gray-400">{new Date(p.payment_date).toLocaleDateString()}</span>
                        </div>
                    ))}
                    {payments.length === 0 && <p className="text-center text-gray-300 italic uppercase font-black text-[10px] tracking-widest">No financial trail synchronized</p>}
                </div>
            </section>
        </div>
    )
}
