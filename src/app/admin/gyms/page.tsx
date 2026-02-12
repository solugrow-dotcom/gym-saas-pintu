"use client";

import { useEffect, useState } from "react";
import { insforge } from "@/lib/insforge";
import { Building2, Search, Filter, ExternalLink } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

interface Tenant {
    id: string;
    name: string;
    slug: string;
    subscription_plan: string;
    subscription_status: string;
    created_at: string;
    is_active: boolean;
}

export default function AdminGyms() {
    const [gyms, setGyms] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchGyms = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { data } = await (insforge as any)
                    .from("tenants")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (data) setGyms(data);
            } catch (error) {
                console.error("Error fetching gyms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGyms();
    }, []);

    const filteredGyms = gyms.filter(gym =>
        gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gym.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleStatus = async (gymId: string, currentStatus: boolean) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error } = await (insforge as any)
                .from("tenants")
                .update({ is_active: !currentStatus })
                .eq("id", gymId);

            if (error) throw error;

            setGyms(gyms.map(g =>
                g.id === gymId ? { ...g, is_active: !currentStatus } : g
            ));
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Manage Gyms</h1>
                    <p className="text-gray-400">View and manage all registered gyms.</p>
                </div>

                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search gyms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-purple-500/50 w-full md:w-64"
                        />
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Gym Name</th>
                                <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Plan</th>
                                <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">Loading gyms...</td>
                                </tr>
                            ) : filteredGyms.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">No gyms found.</td>
                                </tr>
                            ) : (
                                filteredGyms.map((gym) => (
                                    <tr key={gym.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
                                                    <Building2 className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{gym.name}</p>
                                                    <p className="text-xs text-gray-500">/{gym.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 rounded-md bg-white/5 text-gray-300 text-xs border border-white/10 capitalize">
                                                {gym.subscription_plan}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleToggleStatus(gym.id, gym.is_active)}
                                                className={clsx(
                                                    "px-2 py-1 rounded-full text-xs font-medium border transition-colors",
                                                    gym.is_active
                                                        ? "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
                                                        : "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/20"
                                                )}
                                            >
                                                {gym.is_active ? "Active" : "Inactive"}
                                            </button>
                                        </td>
                                        <td className="p-4 flex gap-2">
                                            <Link href={`/dashboard?tenant=${gym.slug}`} className="p-2 border border-white/10 rounded-lg hover:bg-white/5 text-purple-400 transition-colors" title="Login as Owner">
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
