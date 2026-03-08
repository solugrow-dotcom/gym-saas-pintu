'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { activateSubscription } from '@/lib/actions'
import { useState } from 'react'

export default function PaymentPage() {
    const searchParams = useSearchParams()
    const gymId = searchParams.get('gymId')
    const plan = searchParams.get('plan')
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [confirmed, setConfirmed] = useState(false)

    const handleConfirm = async () => {
        setLoading(true)
        try {
            await activateSubscription(gymId, plan)
            setConfirmed(true)
            setTimeout(() => {
                router.push('/gym_admin_dashboard')
            }, 2000)
        } catch (err: any) {
            alert(err.message)
            setLoading(false)
        }
    }

    if (confirmed) {
        return (
            <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center font-sans p-8">
                <div className="bg-white p-12 rounded-[4rem] shadow-3xl text-center border-2 border-green-500 max-w-lg w-full animate-in zoom-in duration-300">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white text-5xl font-black">✓</div>
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">Activation Success</h1>
                    <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-10 leading-relaxed italic border-l-4 border-green-500 pl-6">
                        Your gym node is now synchronized. Redirection in progress...
                    </p>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 animate-progress w-full"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center font-sans">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase mb-4 underline decoration-blue-600 decoration-8 underline-offset-8">Secure Transfer</h1>
                <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-xs">Verify your transaction to initiate gym syncing</p>
            </header>

            <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-gray-100 max-w-xl w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full"></div>

                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">UPI Verification Needed</h2>

                <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white shadow-xl mb-10 relative group transition hover:scale-[1.02]">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Merchant Identity</p>
                    <p className="text-2xl font-black tracking-tight mb-6">9719408937@ptyes</p>
                    <div className="flex justify-between items-center border-t border-gray-800 pt-6">
                        <div>
                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Amount Due</p>
                            <p className="text-3xl font-black text-blue-400 tracking-tighter">₹{plan === 'Pro Plan' ? '1999' : '999'}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Plan Type</p>
                            <p className="text-lg font-black uppercase tracking-tighter">{plan}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 mb-10">
                    <p className="text-xs text-gray-400 font-bold leading-relaxed italic border-l-4 border-blue-600 pl-6">
                        Instructions: Open your payment app (PhonePe, GPay, Paytm) and transfer the amount to the UPI ID above. Once done, confirm the transfer.
                    </p>
                </div>

                <button
                    disabled={loading || !gymId}
                    onClick={handleConfirm}
                    className="w-full p-6 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl hover:bg-blue-700 hover:translate-y-[-4px] active:scale-95 disabled:bg-gray-300 transition-all"
                >
                    {loading ? 'Verifying Sync...' : 'Direct Confirm Payment'}
                </button>

                <p className="mt-8 text-center text-gray-400 font-bold uppercase text-[10px] tracking-widest opacity-60 italic">
                    Internal transfer protocol v.4.0 active
                </p>
            </div>
        </div>
    )
}
