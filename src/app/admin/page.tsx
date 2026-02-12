"use client";

import { useEffect, useState } from "react";
import { insforge } from "@/lib/insforge";
import { Building2, Users, CircleDollarSign, Activity } from "lucide-react";
import clsx from "clsx";

export default function AdminOverview() {
    const [stats, setStats] = useState({
        totalGyms: 0,
        totalUsers: 0,
        activeSubs: 0,
        totalRevenue: 0 // Mocked for now or calculated
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { count: gymCount } = await (insforge as any).from("tenants").select("*", { count: 'exact', head: true });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { count: userCount } = await (insforge as any).from("users").select("*", { count: 'exact', head: true });

                // For demonstration, mocking revenue based on gym count (assuming avg plan price)
                // Real implementation would sum up payments table.
                const estimatedRevenue = (gymCount || 0) * 2000;

                setStats({
                    totalGyms: gymCount || 0,
                    totalUsers: userCount || 0,
                    activeSubs: gymCount || 0, // Assuming all created gyms are active for now
                    totalRevenue: estimatedRevenue
                });
            } catch (error) {
                console.error("Error fetching admin stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Total Revenue",
            value: `₹${stats.totalRevenue.toLocaleString()}`,
            icon: CircleDollarSign,
            color: "text-green-400",
            bg: "bg-green-500/10",
            trend: "+12.5%"
        },
        {
            title: "Total Gyms",
            value: stats.totalGyms,
            icon: Building2,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            trend: "+4 this week"
        },
        {
            title: "Active Users",
            value: stats.totalUsers,
            icon: Users,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            trend: "+24 new"
        },
        {
            title: "Active Subs",
            value: stats.activeSubs,
            icon: Activity,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            trend: "98% retention"
        }
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                <p className="text-gray-400">Welcome back, Super Admin. Here&apos;s what&apos;s happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, i) => (
                    <div key={i} className="glass-card p-6 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={clsx("p-3 rounded-lg", stat.bg)}>
                                <stat.icon className={clsx("w-6 h-6", stat.color)} />
                            </div>
                            <span className="text-xs font-medium text-green-400 bg-green-900/20 px-2 py-1 rounded-full">
                                {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
                        <p className="text-2xl font-bold text-white">{loading ? "..." : stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-6 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Recent Gym Signups</h3>
                        <button className="text-sm text-purple-400 hover:text-purple-300">View All</button>
                    </div>
                    {/* Placeholder for list */}
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                                        G
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Iron Gym {i + 1}</p>
                                        <p className="text-xs text-gray-500">Pro Plan • Delhi</p>
                                    </div>
                                </div>
                                <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">Active</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-6 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="mt-1 relative">
                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                    {i !== 3 && <div className="absolute top-3 left-1 w-px h-12 bg-white/10" />}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-300">New subscription payment received from <span className="text-white font-medium">Gym {i + 1}</span></p>
                                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
