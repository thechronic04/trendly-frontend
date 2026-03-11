import React from 'react';
import { motion } from 'framer-motion';
import { Users, LayoutDashboard, Settings, Activity, Database, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen pt-40 px-6 max-w-[1400px] mx-auto text-black dark:text-white">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-4 text-[#FF5252]">System <span className="opacity-40">Admin</span></h1>
            <p className="opacity-60 mb-16 text-[10px] font-black uppercase tracking-widest mt-2">Privileged Access Only</p>

            <div className="grid md:grid-cols-5 gap-8">
                {/* Sidebar */}
                <div className="space-y-4">
                    <button className="w-full text-left p-4 rounded-2xl bg-[#FF5252]/10 font-bold flex items-center text-[#FF5252] border border-[#FF5252]/20">
                        <LayoutDashboard className="w-5 h-5 mr-3" /> Control Panel
                    </button>
                    <button className="w-full text-left p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl font-bold flex items-center opacity-60">
                        <Users className="w-5 h-5 mr-3" /> Users Mgt
                    </button>
                    <button className="w-full text-left p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl font-bold flex items-center opacity-60">
                        <Database className="w-5 h-5 mr-3" /> Neural Sync
                    </button>
                    <button className="w-full text-left p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl font-bold flex items-center opacity-60">
                        <Settings className="w-5 h-5 mr-3" /> Preferences
                    </button>
                </div>
                
                {/* Main View */}
                <div className="md:col-span-4 space-y-8">
                    {/* Status Alert */}
                    <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex items-center text-yellow-600 dark:text-yellow-400 text-sm font-bold">
                        <AlertCircle className="w-5 h-5 mr-3" />
                        Neural Cluster Node #3 is experiencing high latency syncing global mentions.
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-black/5 dark:bg-white/5 p-6 rounded-3xl border border-black/5 dark:border-white/5">
                            <span className="block text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">Total Users</span>
                            <span className="text-4xl font-black italic">14.2K</span>
                        </div>
                        <div className="bg-black/5 dark:bg-white/5 p-6 rounded-3xl border border-black/5 dark:border-white/5">
                            <span className="block text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">Active Signatures</span>
                            <span className="text-4xl font-black italic">89</span>
                        </div>
                        <div className="bg-black/5 dark:bg-white/5 p-6 rounded-3xl border border-black/5 dark:border-white/5">
                            <span className="block text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">API Requests</span>
                            <span className="text-4xl font-black italic">1.2M</span>
                        </div>
                        <div className="bg-black/5 dark:bg-white/5 p-6 rounded-3xl border border-[#00E5FF]/20 text-[#00E5FF]">
                            <span className="block text-[10px] font-black uppercase tracking-widest opacity-70 mb-4 flex items-center"><Activity className="w-3 h-3 mr-2" /> Model State</span>
                            <span className="text-4xl font-black italic">Optimal</span>
                        </div>
                    </div>

                    {/* Recent Users List */}
                    <div className="bg-black/5 dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden">
                        <div className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Recent Signups</h3>
                            <button className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">View All</button>
                        </div>
                        <div className="p-0">
                            {[1,2,3].map(i => (
                                <div key={i} className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10" />
                                        <div>
                                            <p className="font-bold">User {i}</p>
                                            <p className="text-xs opacity-40">user{i}@example.com</p>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-[#2979FF]">Active</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
