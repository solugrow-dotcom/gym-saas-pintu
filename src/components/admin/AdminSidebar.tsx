"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Building2, Users, Settings, LogOut, ShieldCheck
} from "lucide-react";
import clsx from "clsx";


const navigation = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Gyms", href: "/admin/gyms", icon: Building2 },
    { name: "All Users", href: "/admin/users", icon: Users },
    { name: "Settings & Keys", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-[#0f0f0f] border-r border-white/5 flex flex-col h-full sticky top-0">
            <div className="p-6">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/20">
                        A
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">
                        Super<span className="text-purple-500">Admin</span>
                    </span>
                </Link>
                <div className="mt-2 text-xs text-gray-500 px-1 uppercase tracking-wider font-semibold">
                    Master Controls
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
                                isActive
                                    ? "bg-purple-600/10 text-purple-400 border border-purple-500/10"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5 shrink-0 transition-colors", isActive ? "text-purple-400" : "text-gray-500 group-hover:text-gray-300")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="mb-4 px-3 py-2 bg-purple-900/10 rounded-lg border border-purple-500/10 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-purple-500" />
                    <div>
                        <p className="text-xs text-purple-300 font-medium">Logged in via</p>
                        <p className="text-xs text-gray-400 truncate w-32">Safe Mode</p>
                    </div>
                </div>
                <button
                    onClick={() => import("@/lib/insforge").then(m => m.insforge.auth.signOut())}
                    className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
