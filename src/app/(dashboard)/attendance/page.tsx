"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { insforge } from "@/lib/insforge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AttendancePage() {
    const { user } = useAuth();
    const [attendance, setAttendance] = useState<any[]>([]);
    const [memberId, setMemberId] = useState("");
    const [loading, setLoading] = useState(false);

    // Initial Fetch + Realtime Subscription
    useEffect(() => {
        if (!user?.gym_id) return;

        // 1. Fetch initial data
        const fetchAttendance = async () => {
            const { data } = await insforge.database
                .from("attendance")
                .select("*, members(name)")
                .eq("gym_id", user.gym_id)
                .order("created_at", { ascending: false })
                .limit(20);

            if (data) setAttendance(data);
        };

        fetchAttendance();

        // 2. Realtime Subscription
        const channel = insforge.channel('attendance_updates')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'attendance',
                    filter: `gym_id=eq.${user.gym_id}`,
                },
                async (payload) => {
                    // Fetch the member name for the new row
                    const { data } = await insforge.database
                        .from("members")
                        .select("name")
                        .eq("id", payload.new.member_id)
                        .single();

                    const newRecord = { ...payload.new, members: data };
                    setAttendance((prev) => [newRecord, ...prev]);
                }
            )
            .subscribe();

        return () => {
            insforge.removeChannel(channel);
        };
    }, [user]);

    const handleCheckIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // In a real app, this would be a lookup or QR scan
            // Here we manually enter a Member ID for demo purposes
            const { error } = await insforge.database
                .from("attendance")
                .insert([{
                    gym_id: user.gym_id,
                    member_id: memberId,
                    date: new Date().toISOString().split('T')[0],
                    checkin_time: new Date().toLocaleTimeString()
                }]);

            if (error) throw error;
            setMemberId("");
        } catch (err: any) {
            alert("Check-in failed (Invalid Member ID?): " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Live Attendance</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Manual Check-In</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCheckIn} className="flex gap-4">
                        <Input
                            placeholder="Enter Member UUID"
                            value={memberId}
                            onChange={e => setMemberId(e.target.value)}
                            required
                        />
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Check In
                        </Button>
                    </form>
                    <p className="text-sm text-muted-foreground mt-2">
                        * Realtime updates enabled. New check-ins will appear below instantly.
                    </p>
                </CardContent>
            </Card>

            <div className="grid gap-4">
                {attendance.map((record) => (
                    <Card key={record.id} className="transition-all hover:bg-accent/50">
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{record.members?.name || "Unknown Member"}</p>
                                <p className="text-sm text-muted-foreground">{record.date}</p>
                            </div>
                            <div className="text-lg font-mono font-medium text-green-600">
                                {record.checkin_time}
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {attendance.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No check-ins today.</p>
                )}
            </div>
        </div>
    );
}
