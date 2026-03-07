'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { createSubscription } from '@/lib/actions'
import { useState } from 'react'

export default function ChoosePlanPage() {
    const searchParams = useSearchParams()
    const gymId = searchParams.get('gymId')
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const plans = [
        {
            name: 'Basic Plan',
            price: '999',
            features: [
                'Up to 150 members',
                'Attendance tracking',
                'Payment tracking'
            ],
            color: 'blue'
        },
        {
            name: 'Pro Plan',
            price: '1999',
            features: [
                'Unlimited members',
                'Advanced analytics',
                'Export reports',
                'Priority support'
            ],
            color: 'indigo'
        }
    ]

    const handleSelect = async (planName) => {
        setLoading(true)
        try {
            await createSubscription({ gymId, plan: planName })
            router.push(`/payment?gymId=${gymId}&plan=${planName}`)
        } catch (err) {
            alert(err.message)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center font-sans">
            <header className="text-center mb-16">
                <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase mb-4">Choose Your Vector</h1>
                <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-xs">Select a performance tier to activate your gym node</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
                {plans.map((plan, i) => (
                    <div key={i} className="bg-white p-12 rounded-[4rem] shadow-2xl border border-gray-100 flex flex-col items-center text-center transition-all hover:translate-y-[-10px] hover:shadow-blue-100 relative overflow-hidden group">
                        <div className={`absolute top-0 left-0 w-full h-4 bg-${plan.color}-600`}></div>

                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-2">{plan.name}</h2>
                        <div className="flex items-baseline gap-2 mb-10">
                            <span className="text-5xl font-black text-gray-900">₹{plan.price}</span>
                            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">/ Month</span>
                        </div>

                        <ul className="space-y-4 mb-12 w-full">
                            {plan.features.map((f, j) => (
                                <li key={j} className="text-gray-600 font-bold text-sm border-b border-gray-50 pb-2">
                                    <span className={`text-${plan.color}-600 mr-2`}>✓</span> {f}
                                </li>
                            ))}
                        </ul>

                        <button
                            disabled={loading || !gymId}
                            onClick={() => handleSelect(plan.name)}
                            className={`w-full p-5 bg-${plan.color}-600 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl transition-all hover:bg-${plan.color}-700 active:scale-95 disabled:bg-gray-300`}
                        >
                            {loading ? 'Initializing...' : 'Select Plan'}
                        </button>
                    </div>
                ))}
            </div>

            {!gymId && (
                <p className="mt-12 text-red-500 font-black uppercase text-xs tracking-widest bg-red-50 p-4 rounded-2xl border border-red-100 italic">
                    Critical Error: No Gym ID detected in synchronization stream.
                </p>
            )}
        </div>
    )
}
