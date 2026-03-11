import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Heart, Box, Activity } from 'lucide-react';

export default function UserDashboard() {
    return (
        <div className="min-h-screen pt-40 px-6 max-w-[1400px] mx-auto text-black dark:text-white">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-4">Command <span className="opacity-40">Center</span></h1>
            <p className="opacity-60 mb-16 text-[10px] font-black uppercase tracking-widest text-[#2979FF]">Personal Workspace</p>

            <div className="grid md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="space-y-4">
                    <button className="w-full text-left p-4 rounded-2xl bg-black/5 dark:bg-white/5 font-bold flex items-center">
                        <Activity className="w-5 h-5 mr-3" /> Overview
                    </button>
                    <button className="w-full text-left p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl font-bold flex items-center opacity-60">
                        <Heart className="w-5 h-5 mr-3" /> Watchlist
                    </button>
                    <button className="w-full text-left p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl font-bold flex items-center opacity-60">
                        <Box className="w-5 h-5 mr-3" /> Analytics
                    </button>
                    <button className="w-full text-left p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl font-bold flex items-center opacity-60">
                        <Settings className="w-5 h-5 mr-3" /> Settings
                    </button>
                </div>
                
                {/* Main View */}
                <div className="md:col-span-3 space-y-8">
                    {/* Welcome Card */}
                    <div className="glass-card p-10 rounded-[2rem] border border-black/5 dark:border-white/10 bg-gradient-to-br from-[#2979FF]/10 to-pink-500/10 relative overflow-hidden">
                        <h2 className="text-3xl font-black italic mb-2 relative z-10">Welcome back, Creator.</h2>
                        <p className="opacity-80 font-medium max-w-lg relative z-10">Your neural trends have stabilized. We've detected 4 new macro-patterns since your last session.</p>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl opacity-50 rounded-full mix-blend-overlay"></div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-black/5 dark:bg-white/5 p-6 rounded-3xl border border-black/5 dark:border-white/5 flex flex-col justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-6">Saved Signatures</span>
                            <span className="text-5xl font-black italic">12</span>
                        </div>
                        <div className="bg-black/5 dark:bg-white/5 p-6 rounded-3xl border border-black/5 dark:border-white/5 flex flex-col justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-6">Active Alerts</span>
                            <span className="text-5xl font-black italic">3</span>
                        </div>
                        <div className="bg-black/5 dark:bg-white/5 p-6 rounded-3xl border border-[#2979FF]/20 flex flex-col justify-between relative group overflow-hidden">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#2979FF] mb-6 relative z-10">Accuracy Rating</span>
                            <span className="text-5xl font-black italic relative z-10">94%</span>
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="absolute -bottom-10 -right-10 w-32 h-32 border-4 border border-[#2979FF]/20 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-700"></motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
