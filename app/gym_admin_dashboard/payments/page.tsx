'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { recordPayment } from '@/lib/actions'

export default function PaymentsPage() {
    const [members, setMembers] = useState<any[]>([])
    const [history, setHistory] = useState<any[]>([])
    const [gym, setGym] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [amount, setAmount] = useState('')
    const [method, setMethod] = useState('cash')

    useEffect(() => {
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: gymData } = await supabase.from('gyms').select('*').eq('owner_id', user.id).single()
                setGym(gymData)
                if (gymData) {
                    const { data: mData } = await supabase.from('members').select('*').eq('gym_id', gymData.id)
                    setMembers(mData || [])
                    const { data: hData } = await supabase.from('payments')
                        .select('*, members(name)')
                        .eq('gym_id', gymData.id)
                        .order('payment_date', { ascending: false })
                    setHistory(hData || [])
                }
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    const handlePay = async (memberId: string) => {
        if (!amount || Number(amount) <= 0) return alert('Invalid amount')
        try {
            const p = await recordPayment({ memberId, gymId: gym.id, amount: Number(amount), method })
            const member = members.find(m => m.id === memberId)
            setHistory([{ ...p, members: { name: member.name } }, ...history])
            setAmount('')
            alert('Financial transaction verified.')
        } catch (err: any) { alert(err.message) }
    }

    if (loading) return <div>Syncing Ledger...</div>

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <section className="lg:col-span-2">
                <header className="mb-8">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Finance Ledger</h1>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 ml-1">Payment Recording Layer</p>
                </header>

                <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-x-auto">
                    <table className="w-full text-left font-sans">
                        <thead className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase font-black tracking-widest text-gray-400">
                            <tr>
                                <th className="p-8">Member</th>
                                <th className="p-8">Plan</th>
                                <th className="p-8">Transaction Details</th>
                                <th className="p-8 text-right">Confirmation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {members.map(m => (
                                <tr key={m.id} className="hover:bg-green-50/20 transition-all font-bold group">
                                    <td className="p-8">
                                        <p className="text-gray-900 text-lg leading-none">{m.name}</p>
                                    </td>
                                    <td className="p-8">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{m.membership_plan}</span>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex gap-2">
                                            <input type="number" placeholder="$" value={amount} onChange={e => setAmount(e.target.value)} className="w-24 p-2 border-2 border-gray-50 rounded-xl bg-gray-50 focus:bg-white focus:border-green-500 outline-none transition font-black text-sm" />
                                            <select value={method} onChange={e => setMethod(e.target.value)} className="p-2 border-2 border-gray-50 rounded-xl bg-gray-50 font-black text-[10px] uppercase tracking-widest outline-none">
                                                <option value="cash">Cash</option>
                                                <option value="upi">UPI / Digital</option>
                                                <option value="card">Card</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <button
                                            onClick={() => handlePay(m.id)}
                                            className="px-6 py-2 bg-green-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-green-700 transition shadow-lg active:scale-95"
                                        >
                                            Record Pay
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <header className="mb-8">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Audit Trail</h2>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 ml-1 underline decoration-green-600 decoration-4">Transaction History</p>
                </header>

                <div className="space-y-4">
                    {history.map(h => (
                        <div key={h.id} className="bg-white p-6 rounded-3xl shadow-xl border border-gray-50 flex justify-between items-center transition hover:shadow-green-100">
                            <div>
                                <p className="font-black text-gray-900">{h.members?.name}</p>
                                <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">{h.method} Verification</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black text-gray-900 tracking-tighter">${h.amount}</p>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{new Date(h.payment_date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                    {history.length === 0 && <div className="p-20 text-center text-gray-300 font-bold italic uppercase tracking-widest">No transactions logged</div>}
                </div>
            </section>
        </div>
    )
}
