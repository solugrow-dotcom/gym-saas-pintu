"use client";

import { useState } from "react";
import { Eye, EyeOff, Key, Settings as SettingsIcon } from "lucide-react";

export default function AdminSettings() {
    const [showKeys, setShowKeys] = useState(false);

    // This is just a UI representation. In a real app, you might fetch these or have a secure way to update them.
    // Since we are using .env, we can only display what's loaded or masked versions.

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-white mb-2">Platform Settings</h1>
            <p className="text-sm text-gray-400">Welcome back, Super Admin. Here&apos;s what&apos;s happening today.</p>
            <p className="text-gray-400 mb-8">Manage your API keys and global configurations.</p>

            <div className="glass-card p-8 rounded-xl border border-white/5 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                        <Key className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Payment Gateway (Razorpay)</h2>
                        <p className="text-sm text-gray-400">Manage your Razorpay credentials for payments.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Key ID</label>
                        <div className="relative">
                            <input
                                type={showKeys ? "text" : "password"}
                                value={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ""}
                                readOnly
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 pr-12 font-mono"
                                placeholder="rzp_test_..."
                            />
                            <button
                                onClick={() => setShowKeys(!showKeys)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                            >
                                {showKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            This key is loaded from <code className="bg-white/5 px-1 rounded">.env</code> file.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Key Secret</label>
                        <div className="relative">
                            <input
                                type="password"
                                value="************************"
                                readOnly
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-gray-500 focus:outline-none focus:border-blue-500/50 pr-12 font-mono cursor-not-allowed"
                            />
                        </div>
                        <p className="text-xs text-yellow-500/70 mt-2 flex items-center gap-1">
                            Secret is hidden for security. Check your server logs or .env file.
                        </p>
                    </div>
                </div>
            </div>

            <div className="glass-card p-8 rounded-xl border border-white/5 opacity-50 pointer-events-none">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                        <SettingsIcon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">General Settings</h2>
                        <p className="text-sm text-gray-400">Global platform configurations (Coming Soon).</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
