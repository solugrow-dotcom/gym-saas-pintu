"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@insforge/nextjs";
import { insforge } from "@/lib/insforge";
import { Building2, User, CreditCard, ArrowRight, Loader2 } from "lucide-react";
import Script from "next/script";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Razorpay: any;
    }
}

export default function Onboarding() {
    const { user } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const plan = searchParams.get('plan');

    const [role, setRole] = useState<"owner" | "member" | null>(null);
    const [gymName, setGymName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<"role" | "details" | "payment">("role");

    // Derived state for handling back/next logic
    // If role is selected, we move to details or payment

    const handleRoleSelect = (selectedRole: "owner" | "member") => {
        setRole(selectedRole);
        if (selectedRole === "owner") {
            setStep("details");
        } else {
            // Member flow doesn't need gym creation or payment in this context usually
            // but the original code showed "Join your Gym" screen.
            setStep("details");
        }
    };

    const handleCreateGym = async (paymentId?: string) => {
        if (!user || !gymName) return;
        setIsLoading(true);

        try {
            // 1. Create Tenant
            const slug = gymName.toLowerCase().replace(/\s+/g, "-") + "-" + Math.floor(Math.random() * 1000);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: tenant, error: tenantError } = await (insforge as any)
                .from("tenants")
                .insert([{
                    name: gymName,
                    slug,
                    is_active: true, // Activate immediately after payment
                    subscription_status: 'active',
                    subscription_plan: plan || 'free',
                    payment_id: paymentId || null
                }])
                .select()
                .single();

            if (tenantError) throw tenantError;

            // 2. Update User Profile with Role & Tenant
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error: updateError } = await (insforge as any)
                .from("users")
                .update({
                    role: "gym_owner",
                    tenant_id: tenant.id
                })
                .eq("id", user.id);

            if (updateError) throw updateError;

            // 3. Redirect to Dashboard
            router.push("/dashboard");
        } catch (err) {
            console.error("Onboarding failed:", err);
            alert("Failed to create gym. Please try again.");
            setIsLoading(false);
        }
    };

    const handlePayment = async () => {
        if (!gymName) return;
        setIsLoading(true);

        try {
            // Create Order
            const res = await fetch("/api/create-order", {
                method: "POST",
                body: JSON.stringify({ plan: plan || 'basic' }), // Default to basic if no plan? Or handle error.
            });

            if (!res.ok) throw new Error("Failed to create order");
            const order = await res.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "SoluGrow SaaS",
                description: `Subscription for ${plan} plan`,
                order_id: order.id,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                handler: function (response: any) {
                    // console.log(response.razorpay_payment_id);
                    // console.log(response.razorpay_order_id);
                    // console.log(response.razorpay_signature);
                    handleCreateGym(response.razorpay_payment_id);
                },
                prefill: {
                    name: user?.user_metadata?.full_name || user?.email,
                    email: user?.email,
                    contact: "", // specific contact if available
                },
                theme: {
                    color: "#f97316",
                },
                modal: {
                    ondismiss: function () {
                        setIsLoading(false);
                    }
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (err) {
            console.error("Payment initiation failed:", err);
            alert("Failed to initiate payment.");
            setIsLoading(false);
        }
    };

    const onNext = () => {
        if (step === 'details') {
            if (role === 'owner' && plan) {
                setStep('payment');
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((user as any)?.user_metadata?.role === 'owner') {
                // If no plan selected, maybe create free trial? 
                // For now, let's assume they must have a plan or we default to trial without payment
                // But the user asked for Razorpay.
                // If they came without a plan, maybe redirect to pricing or just create free account?
                // Let's create account directly if no plan (Free Trial).
                handleCreateGym();
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="max-w-2xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold mb-4">Welcome to SoluGrow! 👋</h1>
                    <p className="text-gray-400">Let&apos;s set up your profile.</p>
                </div>

                {!role ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        <button
                            onClick={() => handleRoleSelect("owner")}
                            className="glass-card p-8 rounded-2xl border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all text-left group"
                        >
                            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Building2 className="w-6 h-6 text-orange-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">I own a Gym</h3>
                            <p className="text-sm text-gray-400">
                                I want to manage my members, staff, and payments.
                            </p>
                        </button>

                        <button
                            onClick={() => handleRoleSelect("member")}
                            className="glass-card p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-left group"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <User className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">I&apos;m a Member</h3>
                            <p className="text-sm text-gray-400">
                                I want to track my workouts and check my subscription.
                            </p>
                        </button>
                    </div>
                ) : step === "details" ? (
                    role === "owner" ? (
                        <div className="glass-card p-8 rounded-2xl border border-white/10 max-w-md mx-auto">
                            <h3 className="text-xl font-bold text-white mb-6">Create your Gym Profile</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Gym Name</label>
                                    <input
                                        type="text"
                                        value={gymName}
                                        onChange={(e) => setGymName(e.target.value)}
                                        placeholder="e.g. Iron Paradise"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50"
                                    />
                                </div>

                                <button
                                    onClick={onNext}
                                    disabled={isLoading || !gymName}
                                    className="w-full py-3 rounded-lg bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors flex items-center justify-center gap-2"
                                >
                                    {plan ? "Continue to Payment" : "Create Gym"}
                                    <ArrowRight className="w-4 h-4" />
                                </button>

                                <button
                                    onClick={() => setRole(null)}
                                    className="w-full py-2 text-sm text-gray-500 hover:text-white"
                                >
                                    Go Back
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card p-8 rounded-2xl border border-white/10 max-w-md mx-auto text-center">
                            <h3 className="text-xl font-bold text-white mb-4">Join your Gym</h3>
                            <p className="text-gray-400 mb-6">
                                Ask your gym owner for an invite link to join their SoluGrow workspace.
                            </p>
                            <button
                                onClick={() => setRole(null)}
                                className="text-orange-400 hover:text-orange-300 text-sm font-medium"
                            >
                                Go Back
                            </button>
                        </div>
                    )
                ) : step === "payment" ? (
                    <div className="glass-card p-8 rounded-2xl border border-white/10 max-w-md mx-auto text-center">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                            <CreditCard className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Complete Subscription</h3>
                        <p className="text-gray-400 mb-6">
                            You selected the <span className="text-white font-semibold">{plan}</span> plan.
                        </p>

                        <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-400">Plan</span>
                                <span className="text-white capitalize">{plan}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span className="text-gray-200">Total</span>
                                <span className="text-white">
                                    {plan?.toLowerCase() === 'basic' ? '₹999' :
                                        plan?.toLowerCase() === 'pro' ? '₹1,999' : '₹2,999'}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isLoading}
                            className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Pay Now"}
                        </button>

                        <button
                            onClick={() => setStep('details')}
                            disabled={isLoading}
                            className="w-full py-3 text-sm text-gray-500 hover:text-white mt-2"
                        >
                            Back
                        </button>
                    </div>
                ) : null}
            </div>
        </div >
    );
}
