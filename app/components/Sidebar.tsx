'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Sidebar({ role }) {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    const menuItems = {
        super_admin: [
            { name: 'Dashboard', href: '/super_admin_dashboard' },
            { name: 'Manage Gyms', href: '/super_admin_dashboard/gyms' },
            { name: 'Settings', href: '/super_admin_dashboard/settings' },
        ],
        gym_admin: [
            { name: 'Overview', href: '/gym_admin_dashboard' },
            { name: 'Members', href: '/gym_admin_dashboard/members' },
            { name: 'Attendance', href: '/gym_admin_dashboard/attendance' },
            { name: 'Payments', href: '/gym_admin_dashboard/payments' },
            { name: 'Settings', href: '/gym_admin_dashboard/settings' },
        ],
        member: [
            { name: 'My Panel', href: '/member_mobile_panel' },
            { name: 'History', href: '/member_mobile_panel/history' },
            { name: 'Settings', href: '/member_mobile_panel/settings' },
        ]
    }

    const currentMenu = menuItems[role] || []

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col min-h-screen fixed left-0 top-0 shadow-2xl z-20">
            <div className="p-8 border-b border-gray-800">
                <h1 className="text-2xl font-black tracking-tighter text-blue-500 uppercase flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">G</div>
                    Gym SaaS
                </h1>
            </div>

            <nav className="flex-1 p-6 space-y-3">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 mb-2">Navigation</p>
                {currentMenu.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${pathname === item.href
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 translate-x-1'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full transition-all ${pathname === item.href ? 'bg-white scale-125' : 'bg-gray-600 group-hover:bg-blue-400'}`}></span>
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="p-6 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="w-full p-4 bg-red-600/10 text-red-500 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg active:scale-95"
                >
                    Secure Sign Out
                </button>
            </div>
        </div>
    )
}
