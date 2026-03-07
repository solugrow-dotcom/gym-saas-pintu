'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/app/components/Sidebar'
import { getSubscription } from '@/lib/actions'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({ children }) {
    const [role, setRole] = useState(null)
    const [sub, setSub] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function fetchInitialData() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                // Fetch User Role
                const { data: userData } = await supabase.from('users').select('role, gym_id').eq('id', user.id).single()
                setRole(userData?.role)

                // Fetch Subscription if gym_admin
                if (userData?.role === 'gym_admin' && userData?.gym_id) {
                    const subscription = await getSubscription(userData.gym_id)
                    setSub(subscription)

                    // If no subscription or expired, redirect
                    if (!subscription || subscription.status !== 'active') {
                        router.push(`/choose-plan?gymId=${userData.gym_id}`)
                    }
                }
            }
            setLoading(false)
        }
        fetchInitialData()
    }, [router])

    if (loading) return <div className="p-20 text-center font-black uppercase tracking-widest animate-pulse font-sans">Syncing...</div>

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar role={role} />
            <div className="flex-1 ml-64 p-10 font-sans">
                {children}
            </div>
        </div>
    )
}
