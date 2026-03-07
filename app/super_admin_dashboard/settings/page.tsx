export default function SuperAdminSettings() {
    return (
        <div>
            <header className="mb-12 text-center lg:text-left">
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Platform Governance</h1>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-2 ml-1 opacity-60 italic">Global Infrastructure Configuration</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-gray-100">
                    <h3 className="text-xl font-black mb-8 border-b-4 border-blue-600 inline-block pb-2 uppercase tracking-tighter">API & Keys</h3>
                    <div className="space-y-6">
                        {['Supabase Connection', 'Edge Network', 'Auth Resilience'].map((item, i) => (
                            <div key={i} className="flex justify-between items-center group">
                                <span className="font-bold text-gray-600 group-hover:text-blue-600 transition">{item}</span>
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stable</span>
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-10 p-5 bg-blue-50 text-blue-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition shadow-sm">Rotate Platform Secrets</button>
                </div>

                <div className="bg-gray-900 p-12 rounded-[4rem] shadow-3xl text-white outline outline-1 outline-gray-800">
                    <h3 className="text-xl font-black mb-8 border-b-4 border-indigo-600 inline-block pb-2 uppercase tracking-tighter">Global Policies</h3>
                    <div className="space-y-6 opacity-60">
                        <p className="text-sm font-bold leading-relaxed">Multi-tenant isolation protocols are currently locked. Automated auditing is active across all 3 nodes.</p>
                        <p className="text-sm font-bold leading-relaxed">Resource scaling: <span className="text-indigo-400">DYNAMIC</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
