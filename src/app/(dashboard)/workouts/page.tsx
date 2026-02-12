"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { insforge } from "@/lib/insforge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2, Dumbbell, Trash2 } from "lucide-react";

export default function WorkoutsPage() {
    const { user } = useAuth();
    const [workouts, setWorkouts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    // Add Workout State
    const [newWorkout, setNewWorkout] = useState({ title: "", level: "Beginner", description: "" });
    const [adding, setAdding] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Fetch Workouts
    useEffect(() => {
        async function fetchWorkouts() {
            if (!user?.gym_id) return;

            const { data, error } = await insforge.database
                .from("workouts")
                .select("*")
                .eq("gym_id", user.gym_id)
                .order("created_at", { ascending: false });

            if (!error && data) {
                setWorkouts(data);
            }
            setLoading(false);
        }

        fetchWorkouts();
    }, [user]);

    // Add Workout
    const handleAddWorkout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.gym_id) return;
        setAdding(true);

        try {
            const { error } = await insforge.database
                .from("workouts")
                .insert([{
                    gym_id: user.gym_id,
                    title: newWorkout.title,
                    level: newWorkout.level,
                    description: newWorkout.description,
                }]);

            if (error) throw error;

            setShowAddForm(false);
            setNewWorkout({ title: "", level: "Beginner", description: "" });

            // Refresh
            const { data } = await insforge.database
                .from("workouts")
                .select("*")
                .eq("gym_id", user.gym_id)
                .order("created_at", { ascending: false });

            if (data) setWorkouts(data);

        } catch (error: any) {
            alert("Failed to create workout: " + error.message);
        } finally {
            setAdding(false);
        }
    };

    // Delete Workout
    const handleDeleteWorkout = async (id: string) => {
        if (!confirm("Are you sure you want to delete this workout?")) return;
        setDeletingId(id);

        try {
            const { error } = await insforge.database
                .from("workouts")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setWorkouts(prev => prev.filter(w => w.id !== id));
        } catch (error: any) {
            alert("Failed to delete workout: " + error.message);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Workouts</h1>
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                    <Plus className="mr-2 h-4 w-4" /> Create Workout
                </Button>
            </div>

            {/* Add Workout Form */}
            {showAddForm && (
                <Card className="border-primary/20 bg-accent/5">
                    <CardHeader>
                        <CardTitle>Create New Workout Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddWorkout} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Workout Title</Label>
                                    <Input
                                        value={newWorkout.title}
                                        onChange={e => setNewWorkout({ ...newWorkout, title: e.target.value })}
                                        required
                                        placeholder="e.g., Upper Body Power"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Difficulty Level</Label>
                                    <Select
                                        value={newWorkout.level}
                                        onValueChange={(val) => setNewWorkout({ ...newWorkout, level: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Beginner">Beginner</SelectItem>
                                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                                            <SelectItem value="Advanced">Advanced</SelectItem>
                                            <SelectItem value="Elite">Elite</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-1 md:col-span-2 space-y-2">
                                    <Label>Description / Instructions</Label>
                                    <Textarea
                                        value={newWorkout.description}
                                        onChange={e => setNewWorkout({ ...newWorkout, description: e.target.value })}
                                        placeholder="List exercises, sets, reps, and rest times..."
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2 pt-2">
                                <Button variant="ghost" type="button" onClick={() => setShowAddForm(false)}>Cancel</Button>
                                <Button type="submit" disabled={adding}>
                                    {adding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Workout
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Workouts Grid */}
            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : workouts.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                        <Dumbbell className="h-12 w-12 mb-4 opacity-20" />
                        <p className="text-lg font-medium">No workouts created yet.</p>
                        <p className="text-sm">Create your first workout plan to get started.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {workouts.map((workout) => (
                        <Card key={workout.id} className="flex flex-col hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl">{workout.title}</CardTitle>
                                        <CardDescription className="mt-1">
                                            <span className={`inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium ${workout.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                    workout.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                }`}>
                                                {workout.level}
                                            </span>
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                            onClick={() => handleDeleteWorkout(workout.id)}
                                            disabled={deletingId === workout.id}
                                        >
                                            {deletingId === workout.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-4">
                                    {workout.description || "No description provided."}
                                </p>
                            </CardContent>
                            <CardFooter className="text-xs text-muted-foreground pt-0">
                                Created {new Date(workout.created_at).toLocaleDateString()}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
