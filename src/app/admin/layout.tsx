import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[#0a0a0a] overflow-hidden font-sans">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header / Top Bar (Optional, can be added later) */}
                <main className="flex-1 overflow-y-auto p-8 relative">
                    {/* Background Glow specific for Admin */}
                    <div className="absolute top-0 left-0 w-full h-[500px] bg-purple-900/5 blur-[120px] pointer-events-none" />
                    <div className="relative z-10 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
