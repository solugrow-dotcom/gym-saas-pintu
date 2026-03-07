'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function GlobalGymsPage() {
    const [gyms, setGyms] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchGyms() {
            const { data } = await supabase
                .from('gyms')
                .select('*, users(full_name, email)')
                .order('created_at', { ascending: false })
            setGyms(data || [])
            setLoading(false)
        }
        fetchGyms()
    }, [])

    if (loading) return <div className="p-20 text-center font-black animate-pulse">Syncing Global Node Directory...</div>

    return (
        <div>
            <header className="mb-12">
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase underline decoration-blue-600 decoration-8 underline-offset-8">Licensed Instances</h1>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-4 ml-1 italic opacity-60">Complete platform-wide node registry</p>
            </header>

            <div className="bg-white rounded-[3.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left font-sans">
                    <thead className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase font-black tracking-widest text-gray-400">
                        <tr>
                            <th className="p-8">Gym Identity</th>
                            <th className="p-8">Operator Control</th>
                            <th className="p-8">Lifecycle Start</th>
                            <th className="p-8 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {gyms.map(g => (
                            <tr key={g.id} className="hover:bg-blue-50/20 transition-all font-bold group">
                                <td className="p-8">
                                    <p className="text-gray-900 text-lg leading-none mb-1">{g.name}</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">ID: {g.id.slice(0, 8)}</p>
                                </td>
                                <td className="p-8">
                                    <p className="text-sm font-black text-gray-900">{g.users?.full_name}</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{g.users?.email}</p>
                                </td>
                                <td className="p-8">
                                    <p className="text-sm font-black text-gray-900">{new Date(g.created_at).toLocaleDateString()}</p>
                                </td>
                                <td className="p-8 text-right">
                                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest">ACTIVE NODE</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {gyms.length === 0 && <div className="p-32 text-center text-gray-300 font-black uppercase tracking-[0.3em] opacity-40 italic">Global registry empty</div>}
            </div>
        </div>
    )
}
