"use client";

import { useEffect, useState } from "react";
import { insforge } from "@/lib/insforge";
import { User, Search, Shield } from "lucide-react";
import clsx from "clsx";

interface UserProfile {
    id: string;
    email: string;
    role: string;
    tenant_id: string;
    created_at: string;
}

export default function AdminUsers() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { data } = await (insforge as any)
                    .from("users")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (data) setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.role || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">All Users</h1>
                    <p className="text-gray-400">Manage user access and roles.</p>
                </div>

                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search users..."
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
                                <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                                <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                                <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Gym ID</th>
                                <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Joined Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">Loading users...</td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">No users found.</td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{user.email || "No Email"}</p>
                                                    <p className="text-xs text-gray-500">ID: {user.id.slice(0, 8)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5">
                                                {user.role === 'super_admin' && <Shield className="w-3 h-3 text-purple-400" />}
                                                <span className={clsx(
                                                    "text-sm capitalize",
                                                    user.role === 'super_admin' ? "text-purple-400 font-bold" :
                                                        user.role === 'gym_owner' ? "text-orange-400" : "text-gray-300"
                                                )}>
                                                    {user.role?.replace('_', ' ') || 'Member'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-500 font-mono">
                                            {user.tenant_id ? user.tenant_id.slice(0, 8) + "..." : "-"}
                                        </td>
                                        <td className="p-4 text-sm text-gray-400">
                                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}
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
