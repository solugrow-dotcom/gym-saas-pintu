'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { recordAttendance } from '@/lib/actions'

export default function AttendancePage() {
    const [members, setMembers] = useState([])
    const [history, setHistory] = useState([])
    const [gym, setGym] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: gymData } = await supabase.from('gyms').select('*').eq('owner_id', user.id).single()
                setGym(gymData)
                if (gymData) {
                    const { data: mData } = await supabase.from('members').select('*').eq('gym_id', gymData.id).eq('status', 'active')
                    setMembers(mData || [])

                    const { data: hData } = await supabase.from('attendance')
                        .select('*, members(name)')
                        .eq('gym_id', gymData.id)
                        .order('created_at', { ascending: false })
                        .limit(50)
                    setHistory(hData || [])
                }
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    const handleMark = async (memberId) => {
        try {
            const entry = await recordAttendance({ memberId, gymId: gym.id })
            const member = members.find(m => m.id === memberId)
            setHistory([{ ...entry, members: { name: member.name } }, ...history])
            alert('Node access synchronized successfully.')
        } catch (err) { alert(err.message) }
    }

    if (loading) return <div>Synchronizing Timeline...</div>

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section>
                <header className="mb-8">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Mark Access</h1>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 ml-1">Live Checking System</p>
                </header>

                <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
                    {members.map(m => (
                        <div key={m.id} className="p-8 flex justify-between items-center hover:bg-blue-50/20 transition group">
                            <div>
                                <p className="text-lg font-black text-gray-900">{m.name}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{m.membership_plan} Account</p>
                            </div>
                            <button
                                onClick={() => handleMark(m.id)}
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition shadow-lg active:scale-95"
                            >
                                Check In
                            </button>
                        </div>
                    ))}
                    {members.length === 0 && <div className="p-20 text-center text-gray-300 font-bold">No active nodes available</div>}
                </div>
            </section>

            <section>
                <header className="mb-8">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Recent Activity</h2>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 ml-1">Historical Stream</p>
                </header>

                <div className="bg-gray-100 rounded-[3rem] p-10 h-[600px] overflow-y-auto space-y-4">
                    {history.map(h => (
                        <div key={h.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex justify-between items-center transition hover:shadow-md">
                            <div className="flex gap-4 items-center">
                                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center font-black">✓</div>
                                <div>
                                    <p className="font-bold text-gray-900">{h.members?.name}</p>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Entry Confirmed</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{new Date(h.created_at).toLocaleTimeString()}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight opacity-60">{new Date(h.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                    {history.length === 0 && <div className="h-full flex items-center justify-center text-gray-400 uppercase font-black tracking-widest opacity-20 italic">No historical data</div>}
                </div>
            </section>
        </div>
    )
}
