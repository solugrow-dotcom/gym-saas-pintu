'use client'

import Link from 'next/link'
import {
    Dumbbell,
    LayoutDashboard,
    Users,
    CalendarCheck,
    Activity,
    CreditCard,
    BarChart3,
    Settings,
    Download,
    Plus,
    Zap,
    UserPlus,
    TrendingUp,
    TrendingDown,
    MoreVertical,
    Menu
} from 'lucide-react'

export default function DashboardPreviewPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-background-dark text-slate-100 font-display">
            {/* Sidebar Navigation */}
            <aside className="w-64 flex-shrink-0 border-r border-primary/10 bg-background-dark overflow-y-auto hidden md:block">
                <div className="flex flex-col h-full p-4">
                    <div className="flex items-center gap-3 mb-8 px-2">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <Dumbbell className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white text-lg font-bold leading-none tracking-tight">SoluGrow</h1>
                            <p className="text-primary text-[10px] font-black uppercase tracking-widest">Gym Management</p>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-1">
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary text-white font-bold text-sm" href="#">
                            <LayoutDashboard className="w-5 h-5" />
                            <span>Dashboard</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-primary/10 hover:text-primary transition-all font-bold text-sm" href="#">
                            <Users className="w-5 h-5" />
                            <span>Members</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-primary/10 hover:text-primary transition-all font-bold text-sm" href="#">
                            <CalendarCheck className="w-5 h-5" />
                            <span>Attendance</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-primary/10 hover:text-primary transition-all font-bold text-sm" href="#">
                            <Activity className="w-5 h-5" />
                            <span>Trainers</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-primary/10 hover:text-primary transition-all font-bold text-sm" href="#">
                            <CreditCard className="w-5 h-5" />
                            <span>Payments</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-primary/10 hover:text-primary transition-all font-bold text-sm" href="#">
                            <BarChart3 className="w-5 h-5" />
                            <span>Reports</span>
                        </Link>
                    </nav>

                    <div className="pt-4 border-t border-white/5">
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-primary/10 hover:text-primary transition-all font-bold text-sm" href="#">
                            <Settings className="w-5 h-5" />
                            <span>Settings</span>
                        </Link>
                        <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-primary" style={{ backgroundImage: "url('/images/stitch/dashboard.png')" }}></div>
                                <div className="flex flex-col overflow-hidden text-xs">
                                    <p className="font-bold truncate">Alex Rivera</p>
                                    <p className="text-slate-500 truncate">Admin Profile</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-8 space-y-8 bg-mesh">
                {/* Header Section */}
                <header className="flex flex-wrap justify-between items-end gap-4">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">Dashboard Preview</h2>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Welcome back! Here's your facility status for today.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-primary border border-primary/20 rounded-xl font-bold text-sm hover:bg-primary/10 transition-all">
                            <Download className="w-4 h-4" />
                            <span>Export Data</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/30 hover:brightness-110 transition-all">
                            <Plus className="w-4 h-4" />
                            <span>New Member</span>
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard icon={Users} label="Total Members" value="1,284" trend="+12%" />
                    <StatCard icon={Zap} label="Active Now" value="42" trend="+5%" />
                    <StatCard icon={CreditCard} label="Monthly Revenue" value="$12,450" trend="+8%" />
                    <StatCard icon={UserPlus} label="New Joinees" value="12" trend="-2%" negative />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Today Attendance Bar Chart */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold uppercase italic tracking-tight">Today Attendance</h3>
                            <div className="px-2 py-1 bg-primary/20 rounded text-[10px] font-black uppercase text-primary tracking-widest">Last 7 Days</div>
                        </div>
                        <div className="h-64 flex items-end justify-between gap-3 px-2">
                            <Bar height="40%" label="Mon" />
                            <Bar height="65%" label="Tue" />
                            <Bar height="85%" label="Wed" active />
                            <Bar height="55%" label="Thu" />
                            <Bar height="75%" label="Fri" />
                            <Bar height="90%" label="Sat" />
                            <Bar height="35%" label="Sun" />
                        </div>
                    </div>

                    {/* Revenue Line Chart */}
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold uppercase italic tracking-tight">Revenue Growth</h3>
                            <div className="px-2 py-1 bg-primary/20 rounded text-[10px] font-black uppercase text-primary tracking-widest">Jan - Jun 2026</div>
                        </div>
                        <div className="relative flex-1">
                            <svg className="w-full h-full drop-shadow-[0_10px_10px_rgba(249,107,6,0.2)]" viewBox="0 0 400 150">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                        <stop offset="0%" stopColor="#f96b06" stopOpacity="0.3"></stop>
                                        <stop offset="100%" stopColor="#f96b06" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                <path d="M0,130 Q50,110 80,120 T150,80 T220,90 T300,40 T400,20 L400,150 L0,150 Z" fill="url(#chartGradient)"></path>
                                <path d="M0,130 Q50,110 80,120 T150,80 T220,90 T300,40 T400,20" fill="none" stroke="#f96b06" strokeLinecap="round" strokeWidth="4"></path>
                                <circle className="animate-pulse" cx="300" cy="40" fill="#f96b06" r="6"></circle>
                            </svg>
                            <div className="flex justify-between mt-4">
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
                                    <span key={m} className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{m}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Table */}
                <div className="rounded-3xl bg-white/5 border border-white/5 overflow-hidden shadow-massive">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h3 className="text-lg font-bold uppercase italic tracking-tight">Recent Activity</h3>
                        <Link className="text-primary text-sm font-bold uppercase tracking-widest hover:underline" href="#">View Full Report</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                    <th className="px-6 py-4">Member</th>
                                    <th className="px-6 py-4">Activity</th>
                                    <th className="px-6 py-4">Timestamp</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <ActivityRow name="Marcus Chen" activity="Checked In - Main Area" time="2 mins ago" status="Active" color="emerald" />
                                <ActivityRow name="Sarah Jenkins" activity="Payment Received - $120.00" time="15 mins ago" status="Success" color="blue" />
                                <ActivityRow name="David Miller" activity="New Membership - Platinum" time="45 mins ago" status="New" color="primary" />
                                <ActivityRow name="Elena Rodriguez" activity="Personal Training - Booked" time="1 hour ago" status="Scheduled" color="purple" />
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

function StatCard({ icon: Icon, label, value, trend, negative = false }: any) {
    return (
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col gap-1 relative overflow-hidden group hover:border-primary/30 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all">
                <Icon className="w-10 h-10 text-primary" />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{label}</p>
            <p className="text-3xl font-black italic tracking-tighter text-white">{value}</p>
            <div className="flex items-center gap-1 mt-2">
                <TrendingUp className={`w-3 h-3 ${negative ? 'text-rose-500 rotate-180' : 'text-emerald-500'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${negative ? 'text-rose-500' : 'text-emerald-500'}`}>{trend}</span>
                <span className="text-slate-600 text-[8px] font-black uppercase tracking-[0.2em] ml-1">vs period</span>
            </div>
        </div>
    )
}

function Bar({ height, label, active = false }: any) {
    return (
        <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
            <div
                className={`w-full rounded-t-xl transition-all duration-300 ${active ? 'bg-primary shadow-[0_-8px_20px_rgba(249,107,6,0.3)]' : 'bg-primary/20 group-hover:bg-primary/40'}`}
                style={{ height }}
            ></div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-primary' : 'text-slate-600'}`}>{label}</span>
        </div>
    )
}

function ActivityRow({ name, activity, time, status, color }: any) {
    const statusColors: any = {
        emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        primary: 'bg-primary/10 text-primary border-primary/20',
        purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20'
    }

    return (
        <tr className="hover:bg-white/5 transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cover bg-center border border-white/10" style={{ backgroundImage: "url('/images/stitch/dashboard.png')" }}></div>
                    <div className="font-bold text-sm text-slate-100">{name}</div>
                </div>
            </td>
            <td className="px-6 py-4 text-xs font-medium text-slate-400">{activity}</td>
            <td className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-600">{time}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${statusColors[color]}`}>
                    {status}
                </span>
            </td>
            <td className="px-6 py-4 text-center">
                <button className="text-slate-600 hover:text-primary transition-all">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </td>
        </tr>
    )
}
