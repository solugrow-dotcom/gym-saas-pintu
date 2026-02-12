"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { insforge } from "@/lib/insforge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Loader2, Filter, UserPlus } from "lucide-react";

export default function MembersPage() {
    const { user } = useAuth();
    const [members, setMembers] = useState<any[]>([]);
    const [filteredMembers, setFilteredMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    // Add Member State
    const [newMember, setNewMember] = useState({ name: "", phone: "", email: "" });
    const [adding, setAdding] = useState(false);

    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Fetch Members
    useEffect(() => {
        async function fetchMembers() {
            if (!user?.gym_id) return;

            const { data, error } = await insforge.database
                .from("members")
                .select("*")
                .eq("gym_id", user.gym_id)
                .order("created_at", { ascending: false });

            if (!error && data) {
                setMembers(data);
                setFilteredMembers(data);
            }
            setLoading(false);
        }

        fetchMembers();
    }, [user]);

    // Handle Search & Filter Effect
    useEffect(() => {
        let result = members;

        // Filter by Status
        if (statusFilter !== "all") {
            result = result.filter(m => m.status === statusFilter);
        }

        // Filter by Search (Name, Phone, Email - if we had email in members view, but we only have it in users mostly. Wait, members table doesn't have email column?)
        // Schema check: members table has name, phone, but NO email. Email is in 'users'.
        // For search, we'll search name and phone.
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(m =>
                m.name.toLowerCase().includes(lowerQuery) ||
                (m.phone && m.phone.includes(lowerQuery))
            );
        }

        setFilteredMembers(result);
    }, [members, searchQuery, statusFilter]);

    // Add Member
    const handleAddMember = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.gym_id) return;
        setAdding(true);

        try {
            // STEP 1: Generate a UUID for the new member
            const newMemberId = crypto.randomUUID();

            // STEP 2: Insert into 'users' table (Ghost User for CRM)
            // We need this because 'members.id' FK references 'users.id'
            const { error: userError } = await insforge.database
                .from("users")
                .insert([{
                    id: newMemberId,
                    email: newMember.email, // Required by users table
                    role: 'member',
                    gym_id: user.gym_id
                }]);

            if (userError) {
                console.error("Error creating user entry:", userError);
                throw new Error("Failed to initialize member account. Email might be duplicate.");
            }

            // STEP 3: Insert into 'members' table
            const { error: memberError } = await insforge.database
                .from("members")
                .insert([{
                    id: newMemberId,
                    gym_id: user.gym_id,
                    name: newMember.name,
                    phone: newMember.phone,
                    status: 'active'
                }]);

            if (memberError) {
                // Cleanup: try to delete the user we just created to avoid orphans
                await insforge.database.from("users").delete().eq("id", newMemberId);
                throw memberError;
            }

            // Success
            setShowAddForm(false);
            setNewMember({ name: "", phone: "", email: "" });

            // Refresh List
            const { data } = await insforge.database
                .from("members")
                .select("*")
                .eq("gym_id", user.gym_id)
                .order("created_at", { ascending: false });

            if (data) {
                setMembers(data);
            }

        } catch (error: any) {
            alert("Failed to add member: " + error.message);
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Members</h1>
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                    <UserPlus className="mr-2 h-4 w-4" /> Add Member
                </Button>
            </div>

            {/* Add Member Form */}
            {showAddForm && (
                <Card className="border-primary/20 bg-accent/5">
                    <CardHeader>
                        <CardTitle>Add New Member</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddMember} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input
                                        value={newMember.name}
                                        onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                                        required
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        value={newMember.email}
                                        onChange={e => setNewMember({ ...newMember, email: e.target.value })}
                                        required
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone</Label>
                                    <Input
                                        value={newMember.phone}
                                        onChange={e => setNewMember({ ...newMember, phone: e.target.value })}
                                        placeholder="+1 234 567 890"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2 pt-2">
                                <Button variant="ghost" type="button" onClick={() => setShowAddForm(false)}>Cancel</Button>
                                <Button type="submit" disabled={adding}>
                                    {adding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create Member
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search members..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Members Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="rounded-md">
                        <div className="w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="bg-muted/50 [&_tr]:border-b">
                                    <tr className="border-b transition-colors">
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Name</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Phone</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={4} className="h-24 text-center">
                                                <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                                            </td>
                                        </tr>
                                    ) : filteredMembers.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                                No members found matching your criteria.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredMembers.map((member) => (
                                            <tr key={member.id} className="border-b transition-colors hover:bg-muted/50 cursor-pointer">
                                                <td className="p-4 align-middle font-medium">{member.name}</td>
                                                <td className="p-4 align-middle text-muted-foreground">{member.phone || "-"}</td>
                                                <td className="p-4 align-middle">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${member.status === 'active'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                                                        }`}>
                                                        {member.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 align-middle text-muted-foreground">
                                                    {member.join_date ? new Date(member.join_date).toLocaleDateString() : 'N/A'}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
