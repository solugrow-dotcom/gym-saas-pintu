"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, CalendarCheck, Settings, Dumbbell } from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Members", href: "/dashboard/members", icon: Users },
    { name: "Attendance", href: "/dashboard/attendance", icon: CalendarCheck },
    { name: "Gym Profile", href: "/dashboard/gym", icon: Settings },
    { name: "Workouts", href: "/dashboard/workouts", icon: Dumbbell },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full border-r bg-card text-card-foreground">
            <div className="p-6">
                <h1 className="text-2xl font-bold tracking-tight text-primary">Gym Manager</h1>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <Icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t">
                <p className="text-xs text-center text-muted-foreground">© 2024 Gym Manager</p>
            </div>
        </div>
    );
}
