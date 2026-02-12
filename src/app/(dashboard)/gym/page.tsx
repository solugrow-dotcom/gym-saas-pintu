"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { insforge } from "@/lib/insforge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function GymProfilePage() {
    const { user } = useAuth();
    const [gym, setGym] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchGym() {
            if (!user?.gym_id) {
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await insforge.database
                    .from("gyms")
                    .select("*")
                    .eq("id", user.gym_id)
                    .single();

                if (error) throw error;
                setGym(data);
            } catch (error) {
                console.error("Error fetching gym:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchGym();
    }, [user]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        try {
            const { error } = await insforge.database
                .from("gyms")
                .update({
                    name: gym.name,
                    address: gym.address,
                    contact_phone: gym.contact_phone,
                })
                .eq("id", gym.id);

            if (error) throw error;
            setMessage("Gym profile updated successfully!");
        } catch (error: any) {
            setMessage("Error updating profile: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    if (!gym) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>No Gym Found</CardTitle>
                    <CardDescription>You are not associated with any gym.</CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Gym Profile</CardTitle>
                    <CardDescription>Manage your gym's public information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Gym Name</Label>
                            <Input
                                id="name"
                                value={gym.name}
                                onChange={(e) => setGym({ ...gym, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                value={gym.address || ""}
                                onChange={(e) => setGym({ ...gym, address: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Contact Phone</Label>
                            <Input
                                id="phone"
                                value={gym.contact_phone || ""}
                                onChange={(e) => setGym({ ...gym, contact_phone: e.target.value })}
                            />
                        </div>

                        {message && (
                            <p className={`text-sm ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                                {message}
                            </p>
                        )}

                        <Button type="submit" disabled={saving}>
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
