import React from 'react';
import { motion } from 'framer-motion';
import { X, Activity, Sparkles, Heart } from 'lucide-react';

const ProductAnalyticsModal = ({ selectedProductAnalytics, setSelectedProductAnalytics }) => {
    if (!selectedProductAnalytics) return null;

    const analytics = selectedProductAnalytics.analytics || {
        engagement_graph: [10, 20, 15, 25, 30, 25, 40],
        social_mentions: "Analysing...",
        top_regions: ["NYC", "Paris", "Seoul"],
        sentiment_score: 82
    };
    const { name, brand, image_url, trend_score } = selectedProductAnalytics;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] flex items-center justify-center bg-black/90 backdrop-blur-3xl px-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                className="bg-white dark:bg-[#0A0A0A] rounded-[3.5rem] w-full max-w-5xl overflow-hidden shadow-4xl flex flex-col md:flex-row h-[90vh] md:h-auto border border-black/5 dark:border-white/10"
            >
                {/* Left: Product Visuals */}
                <div className="w-full md:w-2/5 relative bg-[#EDEDED] dark:bg-black/40">
                    <img src={image_url} alt={name} crossOrigin="anonymous" className="w-full h-full object-cover" />

                    <div className="absolute top-8 left-8 bg-black dark:bg-white text-white dark:text-black px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl">
                        ID: {selectedProductAnalytics.id}
                    </div>
                    {/* Visual DNA Badge */}
                    <div className="absolute bottom-8 left-8 right-8 p-6 glass dark:glass-dark rounded-2xl border border-white/20">
                        <p className="text-[9px] font-black uppercase tracking-widest mb-2 opacity-50 dark:text-white/40">Neural Signature</p>
                        <div className="h-1 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#2979FF] to-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Data & Analytics */}
                <div className="w-full md:w-3/5 p-10 md:p-14 overflow-y-auto custom-scrollbar">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2979FF] dark:text-[#00E5FF] mb-3">{brand}</p>
                            <h2 className="text-4xl font-black italic tracking-tighter dark:text-white leading-none">{name}</h2>
                        </div>
                        <button onClick={() => setSelectedProductAnalytics(null)} className="p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all">
                            <X className="w-6 h-6 dark:text-white" />
                        </button>
                    </div>

                    {/* Analytics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                        {/* Velocity Chart */}
                        <div className="bg-black/[0.03] dark:bg-white/[0.03] p-8 rounded-[2rem] border border-black/5 dark:border-white/5 relative overflow-hidden group">
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-[9px] font-black uppercase tracking-widest opacity-40 dark:text-white/40 flex items-center">
                                    <Activity className="w-3 h-3 mr-2" /> Neural Velocity
                                </p>
                                <span className="text-[10px] font-black text-green-500 uppercase">+18.2%</span>
                            </div>

                            <div className="h-32 relative">
                                <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#2979FF" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="#2979FF" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <motion.path
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 2 }}
                                        d="M0,80 Q50,60 100,70 T200,40 T300,50 T400,20 V100 H0 Z"
                                        fill="url(#chartGrad)"
                                        stroke="#2979FF"
                                        strokeWidth="3"
                                    />
                                    <motion.circle
                                        animate={{ r: [3, 6, 3], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        cx="400" cy="20" r="4" fill="#2979FF"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Sentiment Alpha */}
                        <div className="bg-black/[0.03] dark:bg-white/[0.03] p-8 rounded-[2rem] border border-black/5 dark:border-white/5">
                            <p className="text-[9px] font-black uppercase tracking-widest opacity-40 dark:text-white/40 flex items-center mb-6">
                                <Sparkles className="w-3 h-3 mr-2 text-pink-500" /> Alpha Sentiment
                            </p>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-4xl font-black italic tracking-tighter dark:text-white">{analytics.sentiment_score}%</span>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#2979FF] dark:text-[#00E5FF]">Neural Alpha</p>
                                    <p className="text-[8px] font-black uppercase text-green-500 tracking-widest">Bullish Momentum</p>
                                </div>
                            </div>
                            <div className="w-full h-2 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${analytics.sentiment_score}%` }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-pink-500 via-blue-500 to-green-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Regional Heatmap Section */}
                    <div className="mb-12">
                        <section className="bg-black/[0.03] dark:bg-white/[0.03] p-8 rounded-[2rem] border border-black/5 dark:border-white/5 relative overflow-hidden">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 dark:text-white/40">Global Market Hotspots</h3>
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                                    <span className="text-[8px] font-black uppercase tracking-widest dark:text-white">Live Data</span>
                                </div>
                            </div>

                            {/* Stylized Heatmap Visualization */}
                            <div className="relative aspect-[21/9] bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-black/5 dark:border-white/5 overflow-hidden">
                                <div className="absolute inset-0 opacity-20 dark:opacity-40 flex items-center justify-center grayscale">
                                    {/* Mock SVG Map Nodes */}
                                    <div className="flex gap-4">
                                        {[...Array(15)].map((_, i) => (
                                            <div key={i} className="flex flex-col gap-2">
                                                {[...Array(6)].map((_, j) => (
                                                    <div key={j} className="w-2 h-2 rounded-sm bg-black dark:bg-white opacity-20" />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* pulsing hotspot indicators */}
                                <div className="absolute top-1/4 left-1/4 group/hot">
                                    <span className="absolute w-8 h-8 rounded-full bg-[#2979FF]/20 animate-ping" />
                                    <span className="relative block w-3 h-3 rounded-full bg-[#2979FF] shadow-[0_0_15px_#2979FF]" />
                                    <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white px-2 py-1 rounded-md text-[8px] font-black uppercase opacity-0 group-hover/hot:opacity-100 transition-opacity">Paris +24%</span>
                                </div>
                                <div className="absolute top-1/2 left-3/4 group/hot">
                                    <span className="absolute w-12 h-12 rounded-full bg-pink-500/20 animate-ping" />
                                    <span className="relative block w-4 h-4 rounded-full bg-pink-500 shadow-[0_0_15px_#FF5252]" />
                                    <span className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white px-2 py-1 rounded-md text-[8px] font-black uppercase opacity-0 group-hover/hot:opacity-100 transition-opacity">Seoul +88% Viral</span>
                                </div>
                                <div className="absolute bottom-1/3 left-1/2 group/hot">
                                    <span className="absolute w-6 h-6 rounded-full bg-green-500/20 animate-ping" />
                                    <span className="relative block w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#4CAF50]" />
                                    <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white px-2 py-1 rounded-md text-[8px] font-black uppercase opacity-0 group-hover/hot:opacity-100 transition-opacity">NYC Emerging</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#0A0A0A] bg-gray-200 dark:bg-white/10 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} crossOrigin="anonymous" alt="user" />
                                </div>

                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#0A0A0A] bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-[8px] font-black">+42K</div>
                        </div>
                        <div className="flex gap-4 flex-1 sm:flex-initial">
                            <button
                                onClick={() => window.open(selectedProductAnalytics.affiliate_link, '_blank')}
                                className="flex-1 sm:px-12 bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:-translate-y-1 transition-transform shadow-xl"
                            >
                                Secure Now
                            </button>
                            <button className="p-5 border border-black/10 dark:border-white/10 rounded-2xl group hover:border-[#2979FF] transition-colors">
                                <Heart className="w-5 h-5 dark:text-white group-hover:fill-[#2979FF] transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProductAnalyticsModal;
