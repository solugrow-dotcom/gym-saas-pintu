"use client";

import { useState } from "react";
import { insforge } from "@/lib/insforge";
import { useUser } from "@insforge/nextjs";
import { QrCode, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function ScannerPage() {
    const { user } = useUser();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [scannedResult, setScannedResult] = useState<string | null>(null);
    const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [memberDetails, setMemberDetails] = useState<{ name: string; status: string } | null>(null);

    // Mock scanning function for demo
    const handleSimulateScan = () => {
        // In real app, this comes from QR reader
        const mockMemberId = prompt("Enter Member ID (Testing):", "test-member-id");
        if (mockMemberId) {
            verifyMember(mockMemberId);
        }
    };

    const verifyMember = async (memberId: string) => {
        setVerificationStatus('loading');
        setScannedResult(memberId);

        try {
            // 1. Get current tenant
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const safeUser = user as any;
            const userEmail = safeUser?.primaryEmailAddress?.emailAddress;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: currentUser } = await (insforge as any)
                .from("users")
                .select("tenant_id")
                .eq("email", userEmail)
                .single();

            if (!currentUser?.tenant_id) throw new Error("No tenant found");

            // 2. Fetch member and verify they belong to this tenant
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: member } = await (insforge as any)
                .from("users")
                .select("*")
                .eq("id", memberId)
                .eq("tenant_id", currentUser.tenant_id)
                .single();

            if (member) {
                setVerificationStatus('success');
                setMemberDetails({
                    name: member.name || member.email,
                    status: member.is_active ? 'Active' : 'Inactive'
                });

                // Log Check-in
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await (insforge as any)
                    .from("checkins")
                    .insert([{
                        tenant_id: currentUser.tenant_id,
                        user_id: member.id,
                        method: 'qr'
                    }]);

            } else {
                throw new Error("Member not found");
            }

        } catch (error) {
            console.error("Scanning error:", error);
            setVerificationStatus('error');
        }
    };

    const resetScan = () => {
        setVerificationStatus('idle');
        setScannedResult(null);
        setMemberDetails(null);
    };

    return (
        <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-2">QR Scanner</h1>
            <p className="text-gray-400 mb-8">Scan member QR code to mark attendance.</p>

            <div className="glass-card p-8 rounded-3xl border border-white/10 bg-black/50 relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">

                {/* Scanner UI - Default State */}
                {verificationStatus === 'idle' && (
                    <div className="space-y-6">
                        <div className="w-64 h-64 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center bg-white/5 mx-auto relative group cursor-pointer hover:border-orange-500/50 transition-colors" onClick={handleSimulateScan}>
                            <div className="absolute inset-0 border-2 border-orange-500/0 group-hover:border-orange-500/20 rounded-2xl transition-all animate-pulse pointer-events-none" />
                            <QrCode className="w-16 h-16 text-gray-500 group-hover:text-orange-500 transition-colors" />
                            <p className="absolute bottom-4 text-xs text-gray-500 font-mono">Tap to Scan</p>
                        </div>
                        <p className="text-sm text-gray-400">
                            Point camera at the member&apos;s QR code.
                        </p>
                    </div>
                )}

                {/* Loading State */}
                {verificationStatus === 'loading' && (
                    <div className="space-y-4">
                        <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto" />
                        <p className="text-lg text-white font-medium">Verifying...</p>
                    </div>
                )}

                {/* Success State */}
                {verificationStatus === 'success' && (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                            <CheckCircle className="w-12 h-12 text-green-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Access Granted</h2>
                            <p className="text-green-400 font-medium">Attendance Marked</p>
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full max-w-sm mx-auto">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-400 text-sm">Member</span>
                                <span className="text-white font-medium">{memberDetails?.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Status</span>
                                <span className="text-green-400 text-sm font-bold uppercase">{memberDetails?.status}</span>
                            </div>
                        </div>

                        <button onClick={resetScan} className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">
                            Scan Next
                        </button>
                    </div>
                )}

                {/* Error State */}
                {verificationStatus === 'error' && (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                        <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
                            <XCircle className="w-12 h-12 text-red-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Access Denied</h2>
                            <p className="text-red-400 font-medium">Invalid or Unknown Member</p>
                        </div>

                        <button onClick={resetScan} className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
