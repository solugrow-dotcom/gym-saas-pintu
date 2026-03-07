'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { addMember, updateMember, deleteMember } from '@/lib/actions'

export default function MembersPage() {
    const [members, setMembers] = useState([])
    const [gym, setGym] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showAdd, setShowAdd] = useState(false)
    const [newMember, setNewMember] = useState({ name: '', email: '', phone: '', plan: 'Monthly' })

    useEffect(() => {
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: gymData } = await supabase.from('gyms').select('*').eq('owner_id', user.id).single()
                setGym(gymData)
                if (gymData) {
                    const { data } = await supabase.from('members').select('*').eq('gym_id', gymData.id).order('join_date', { ascending: false })
                    setMembers(data || [])
                }
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    const handleAdd = async (e) => {
        e.preventDefault()
        try {
            const m = await addMember({
                gymId: gym.id,
                name: newMember.name,
                email: newMember.email,
                phone: newMember.phone,
                membershipPlan: newMember.plan
            })
            setMembers([m, ...members])
            setShowAdd(false)
            setNewMember({ name: '', email: '', phone: '', plan: 'Monthly' })
        } catch (err) { alert(err.message) }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return
        try {
            await deleteMember(id)
            setMembers(members.filter(m => m.id !== id))
        } catch (err) { alert(err.message) }
    }

    if (loading) return <div>Syncing Members...</div>

    return (
        <div>
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Members Directory</h1>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1 ml-1 underline decoration-blue-600 decoration-4">Operational Nodes</p>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition shadow-xl"
                >
                    Add New Node
                </button>
            </header>

            {showAdd && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <form onSubmit={handleAdd} className="bg-white p-10 rounded-[3rem] shadow-3xl w-full max-w-lg border border-gray-100 flex flex-col gap-4 animate-in fade-in zoom-in duration-300">
                        <h2 className="text-3xl font-black mb-4 tracking-tight uppercase">Registration</h2>
                        <input type="text" placeholder="Full Name" value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} className="p-4 border-2 border-gray-50 rounded-2xl font-bold bg-gray-50 focus:bg-white transition outline-none" required />
                        <input type="email" placeholder="Email (Optional)" value={newMember.email} onChange={e => setNewMember({ ...newMember, email: e.target.value })} className="p-4 border-2 border-gray-50 rounded-2xl font-bold bg-gray-50 focus:bg-white transition outline-none" />
                        <input type="text" placeholder="Phone Status" value={newMember.phone} onChange={e => setNewMember({ ...newMember, phone: e.target.value })} className="p-4 border-2 border-gray-50 rounded-2xl font-bold bg-gray-50 focus:bg-white transition outline-none" />
                        <select value={newMember.plan} onChange={e => setNewMember({ ...newMember, plan: e.target.value })} className="p-4 border-2 border-gray-50 rounded-2xl font-bold bg-gray-50 focus:bg-white transition outline-none">
                            <option>Monthly</option>
                            <option>Quarterly</option>
                            <option>Yearly</option>
                        </select>
                        <div className="flex gap-4 mt-4">
                            <button type="button" onClick={() => setShowAdd(false)} className="flex-1 p-4 bg-gray-100 text-gray-400 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-200 transition">Cancel</button>
                            <button type="submit" className="flex-1 p-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-200">Confirm</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase font-black tracking-widest text-gray-400">
                        <tr>
                            <th className="p-8">Member Identity</th>
                            <th className="p-8">Lifecycle</th>
                            <th className="p-8">Status</th>
                            <th className="p-8 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {members.map(m => (
                            <tr key={m.id} className="hover:bg-blue-50/20 transition-all font-bold group">
                                <td className="p-8">
                                    <p className="text-gray-900 text-lg leading-none mb-1">{m.name}</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">{m.phone || m.email || 'No credentials'}</p>
                                </td>
                                <td className="p-8">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest">{m.membership_plan}</span>
                                </td>
                                <td className="p-8">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2.5 h-2.5 rounded-full ${m.status === 'active' ? 'bg-green-500 shadow-green-200' : 'bg-red-500 shadow-red-200'} shadow-lg`}></div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${m.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>{m.status}</p>
                                    </div>
                                </td>
                                <td className="p-8 text-right">
                                    <button
                                        onClick={() => handleDelete(m.id)}
                                        className="text-gray-200 hover:text-red-500 transition-all uppercase text-[10px] font-black tracking-widest opacity-0 group-hover:opacity-100"
                                    >
                                        Deactivate Node
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {members.length === 0 && <div className="p-32 text-center text-gray-300 font-black uppercase tracking-[0.3em] opacity-40 italic">Member base empty</div>}
            </div>
        </div>
    )
}
