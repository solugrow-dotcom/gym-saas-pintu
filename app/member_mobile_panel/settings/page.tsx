export default function SettingsPage() {
    return (
        <div>
            <header className="mb-12">
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Member Security</h1>
            </header>
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-lg border border-gray-100">
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-4 opacity-60 italic underline decoration-blue-600 decoration-2">Secure Information Protocol</p>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Privacy Lock</h3>
                <p className="text-gray-500 font-bold text-sm leading-relaxed mb-8">
                    Your node identity is protected by end-to-end operational sync. Contact your gym administrator for credential updates.
                </p>
                <button className="px-10 py-4 bg-gray-100 text-gray-400 rounded-2xl font-black uppercase text-[10px] tracking-widest transition hover:bg-red-50 hover:text-red-500" onClick={() => alert('Identity lock active')}>Request Deletion</button>
            </div>
        </div>
    )
}
