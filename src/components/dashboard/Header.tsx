"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export function Header() {
    const { user, signOut } = useAuth();

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
            <div className="flex items-center">
                <h2 className="text-lg font-semibold">Welcome back, {user?.email}</h2>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{user?.role}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                </Button>
            </div>
        </header>
    );
}
