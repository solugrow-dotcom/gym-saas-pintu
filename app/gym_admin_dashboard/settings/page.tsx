export default function SettingsPage() {
    return (
        <div>
            <header className="mb-12">
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Platform Settings</h1>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-2 ml-1 italic opacity-60">System Configuration Nodes</p>
            </header>

            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 max-w-2xl">
                <div className="space-y-8">
                    {[
                        { title: 'Identity Protection', desc: 'Secure encryption for member credentials', status: 'ACTIVE' },
                        { title: 'Data Synchronization', desc: 'Real-time heartbeat monitoring', status: 'SYNCHRONIZED' },
                        { title: 'Audit Logging', desc: 'Internal financial ledger integrity', status: 'VERIFIED' }
                    ].map((s, i) => (
                        <div key={i} className="flex justify-between items-center group">
                            <div>
                                <h3 className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition">{s.title}</h3>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{s.desc}</p>
                            </div>
                            <span className="px-4 py-1.5 bg-gray-50 text-gray-400 text-[9px] font-black rounded-full uppercase tracking-widest">{s.status}</span>
                        </div>
                    ))}
                </div>

                <button disabled className="w-full mt-12 p-5 bg-gray-100 text-gray-300 rounded-2xl font-black uppercase text-xs tracking-widest cursor-not-allowed">
                    Protected System Logic
                </button>
            </div>
        </div>
    )
}
