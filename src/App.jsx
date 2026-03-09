import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, TrendingUp, Activity, Cpu, X, LogOut, Eye, EyeOff, ExternalLink, MapPin, Heart, BarChart2 } from 'lucide-react';
import TrendingProductsSection from './components/TrendingProductsSection';
import AIChatAssistant from './components/AIChatAssistant';
import { api } from './lib/api';

// --- Separate Functional Components (Stability Fix) ---

const Logo = ({ className = "", showText = true }) => (
    <div className={`flex items-center space-x-4 ${className}`}>
        <div className="relative w-10 h-10 flex flex-col justify-between p-0.5">
            <div className="flex w-full h-1/3 space-x-0.5">
                <div className="w-1/2 h-full bg-[#00E5FF] rounded-sm" />
                <div className="w-1/2 h-full bg-[#2979FF] rounded-sm" />
            </div>
            <div className="flex w-full h-1/3 bg-gradient-to-r from-[#FF5252] to-[#FF1744] rounded-sm my-0.5 shadow-sm" />
            <div className="flex w-full h-1/3 space-x-0.5">
                <div className="w-1/2 h-full bg-[#304FFE] rounded-sm" />
                <div className="w-1/2 h-full bg-[#2979FF] opacity-60 rounded-sm" />
            </div>
        </div>
        {showText && (
            <span className="text-3xl font-black tracking-tighter leading-none select-none dark:text-white">
                trendly<span className="text-[#2979FF]">.</span>Ai
            </span>
        )}
    </div>
);

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
                    <img src={image_url} alt={name} className="w-full h-full object-cover" />
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
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
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

const SearchOverlay = ({ showSearch, setShowSearch }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);

    const handleVisualSearch = () => {
        setIsUploading(true);
        setScanProgress(0);
        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsUploading(false), 800);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    return (
        <AnimatePresence>
            {showSearch && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[150] bg-white/95 dark:bg-black/95 backdrop-blur-2xl p-12 overflow-y-auto duration-500"
                >
                    <div className="max-w-[1400px] mx-auto min-h-full flex flex-col">
                        <div className="flex justify-between items-center mb-20">
                            <div className="flex items-center space-x-4">
                                <Cpu className="w-5 h-5 text-[#2979FF] animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40 dark:text-white/40">Neural Search Active</span>
                            </div>
                            <button onClick={() => setShowSearch(false)} className="group p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all">
                                <X className="w-8 h-8 dark:text-white group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                        </div>

                        <div className="relative mb-24 group">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search Trends, Aesthetics, or Brands..."
                                className="w-full bg-transparent text-5xl md:text-8xl font-black italic tracking-tighter outline-none placeholder:text-black/5 dark:placeholder:text-white/5 dark:text-white"
                            />
                            <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-black/5 dark:bg-white/5 overflow-hidden">
                                <motion.div
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#2979FF] to-transparent"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center dark:text-white/60">
                                    <Sparkles className="w-4 h-4 mr-3 text-pink-500" /> Live Social Trends
                                </h3>
                                <div className="space-y-6">
                                    {['#QuietLuxury', '#UrbanExplorer', '#EveningNoir', '#ArchiveFashion'].map(tag => (
                                        <div key={tag} className="flex items-center justify-between group cursor-pointer dark:text-white">
                                            <span className="text-xl font-bold group-hover:underline italic">{tag}</span>
                                            <TrendingUp className="w-4 h-4 opacity-0 group-hover:opacity-100 text-green-500 transition-all" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 dark:text-white/60">Quick Discovery</h3>
                                <div className="flex flex-wrap gap-4">
                                    {['Oversized', 'Leather', 'Monochrome', 'Vintage', 'Sustainable', 'Streetwear'].map(chip => (
                                        <button key={chip} className="px-6 py-3 border border-black/5 dark:border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:text-white transition-all">
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Visual Search Section */}
                            <div className="bg-black/5 dark:bg-white/5 rounded-[2.5rem] p-10 border border-dashed border-black/20 dark:border-white/20 flex flex-col items-center justify-center relative overflow-hidden transition-all hover:border-blue-500/50">
                                {isUploading ? (
                                    <div className="text-center w-full py-4">
                                        <Activity className="w-12 h-12 mb-6 mx-auto text-[#2979FF] animate-pulse" />
                                        <h4 className="text-xl font-black italic mb-2 dark:text-white">Neural Scanning...</h4>
                                        <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto">
                                            <motion.div
                                                className="h-full bg-[#2979FF]"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${scanProgress}%` }}
                                            />
                                        </div>
                                        <p className="text-[9px] font-black tracking-[0.3em] opacity-40 dark:text-white/40 uppercase">Isolating signatures</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black mb-6 shadow-xl">
                                            <Cpu className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-black italic mb-2 dark:text-white">Visual Search</h3>
                                        <p className="text-center text-xs opacity-40 dark:text-white/40 mb-8 max-w-[200px] leading-relaxed font-medium">Upload a photo to find trending pattern matches.</p>
                                        <button onClick={handleVisualSearch} className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg active:scale-95">Identify</button>
                                    </>
                                )}
                                {isUploading && (
                                    <motion.div
                                        className="absolute top-0 left-0 right-0 h-1 bg-[#2979FF]/40 blur-md shadow-[0_0_15px_rgba(41,121,255,0.5)] z-20"
                                        animate={{ top: ['0%', '100%', '0%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- Main App Component ---

const mockProductsData = [
    {
        id: 1,
        name: "Oversized Vintage Leather Moto Jacket",
        brand: "AllSaints",
        price: 24999.00,
        category: "clothing",
        subCategory: "Outerwear",
        collection: "New In",
        image_url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
        affiliate_link: "https://www.allsaints.com/",
        trend_score: 95.8,
        predicted_next_month: true,
        momentum: "+24% 7d",
        analytics: {
            engagement_graph: [40, 55, 45, 70, 85, 95, 92],
            social_mentions: "124.5K",
            top_regions: ["New York", "London", "Tokyo"],
            sentiment_score: 92
        }
    },
    {
        id: 2,
        name: "Premium Cotton Oxford Shirt",
        brand: "The Bear House",
        price: 2499.00,
        category: "clothing",
        subCategory: "Tops",
        collection: "Ready to Wear",
        image_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
        affiliate_link: "https://thebearhouse.com/",
        trend_score: 87.5,
        predicted_next_month: false,
        momentum: "Steady",
        analytics: {
            engagement_graph: [60, 62, 58, 65, 63, 67, 65],
            social_mentions: "42.1K",
            top_regions: ["Mumbai", "Sydney", "Dubai"],
            sentiment_score: 85
        }
    },
    {
        id: 3,
        name: "Urban Minimalist Tech Shorts",
        brand: "Hermod",
        price: 1899.00,
        category: "clothing",
        subCategory: "Denim",
        collection: "Urban Street",
        image_url: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
        affiliate_link: "https://hermod.in/",
        trend_score: 91.2,
        predicted_next_month: true,
        momentum: "+15% 7d",
        analytics: {
            engagement_graph: [30, 45, 60, 75, 82, 88, 91],
            social_mentions: "88.9K",
            top_regions: ["Berlin", "Seoul", "Paris"],
            sentiment_score: 89
        }
    },
    {
        id: 4,
        name: "Oversized Streetwear Hoodie",
        brand: "Bonkers",
        price: 1599.00,
        category: "clothing",
        subCategory: "Knitwear",
        collection: "New In",
        image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
        affiliate_link: "https://www.bonkerscorner.com/",
        trend_score: 98.4,
        predicted_next_month: true,
        momentum: "+64% 7d",
        analytics: {
            engagement_graph: [20, 35, 55, 80, 95, 98, 99],
            social_mentions: "256.2K",
            top_regions: ["Los Angeles", "Milan", "Shanghai"],
            sentiment_score: 96
        }
    },
    {
        id: 5,
        name: "Asymmetric Satin Slip Midi",
        brand: "Zara",
        price: 3499.00,
        category: "clothing",
        subCategory: "Tops",
        collection: "Quiet Luxury",
        image_url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
        affiliate_link: "https://www.zara.com/",
        trend_score: 89.5,
        predicted_next_month: true,
        momentum: "+12% 7d",
        analytics: {
            engagement_graph: [50, 45, 60, 55, 75, 85, 89],
            social_mentions: "64.3K",
            top_regions: ["Paris", "Tokyo", "Milan"],
            sentiment_score: 91
        }
    },
    {
        id: 6,
        name: "Wide Leg Cargo Pants",
        brand: "H&M",
        price: 2299.00,
        category: "clothing",
        subCategory: "Denim",
        collection: "Ready to Wear",
        image_url: "https://images.unsplash.com/photo-1542280756-74b2f55e73e1?w=800&q=80",
        affiliate_link: "https://www2.hm.com/",
        trend_score: 94.2,
        predicted_next_month: true,
        momentum: "+38% 7d",
        analytics: {
            engagement_graph: [45, 50, 55, 60, 75, 88, 94],
            social_mentions: "92.4K",
            top_regions: ["London", "NYC", "Paris"],
            sentiment_score: 89
        }
    },
    {
        id: 7,
        name: "Libas Embroidered Kurta Set",
        brand: "Myntra",
        price: 4599.00,
        category: "clothing",
        subCategory: "Knitwear",
        collection: "Selected Edits",
        image_url: "https://images.unsplash.com/photo-1583391733958-d25e07fac0ce?w=800&q=80",
        affiliate_link: "https://www.myntra.com/",
        trend_score: 97.5,
        predicted_next_month: true,
        momentum: "+52% 7d",
        analytics: {
            engagement_graph: [20, 40, 60, 80, 90, 95, 98],
            social_mentions: "154.2K",
            top_regions: ["Mumbai", "Delhi", "Bangalore"],
            sentiment_score: 97
        }
    },
    {
        id: 8,
        name: "Urban Explorer Backpack",
        brand: "Hermod",
        price: 3499.00,
        category: "clothing",
        subCategory: "Bags",
        collection: "Accessories",
        image_url: "https://images.unsplash.com/photo-1553062407-98eeb94c6a62?w=800&q=80",
        affiliate_link: "https://hermod.in/",
        trend_score: 92.4,
        predicted_next_month: true,
        momentum: "+8% 7d",
        analytics: {
            engagement_graph: [15, 25, 20, 35, 30, 45, 92],
            social_mentions: "24.1K",
            top_regions: ["Denver", "Seattle", "Austin"],
            sentiment_score: 84
        }
    },
    {
        id: 9,
        name: "Soft Pinch Liquid Blush",
        brand: "Nykaa",
        price: 2499.00,
        category: "makeup",
        subCategory: "Tops",
        image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
        affiliate_link: "https://www.nykaa.com/",
        trend_score: 98.2,
        predicted_next_month: true,
        momentum: "+45% 7d",
        analytics: {
            engagement_graph: [40, 50, 60, 70, 80, 90, 98],
            social_mentions: "182.4K",
            top_regions: ["Los Angeles", "London", "Sydney"],
            sentiment_score: 94
        }
    },
    {
        id: 10,
        name: "Cherry Glow Lip Oil",
        brand: "Nykaa",
        price: 4200.00,
        category: "makeup",
        subCategory: "Jewelry",
        image_url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80",
        affiliate_link: "https://www.nykaa.com/",
        trend_score: 99.1,
        predicted_next_month: true,
        momentum: "+80% 7d",
        analytics: {
            engagement_graph: [20, 40, 60, 80, 90, 95, 99],
            social_mentions: "310.5K",
            top_regions: ["Seoul", "Tokyo", "NYC"],
            sentiment_score: 97
        }
    },
    {
        id: 11,
        name: "Kay Beauty Matte Lipstick",
        brand: "Nykaa",
        price: 1200.00,
        category: "makeup",
        subCategory: "Jewelry",
        image_url: "https://images.unsplash.com/photo-1625091392900-53bc07684617?w=800&q=80",
        affiliate_link: "https://www.nykaa.com/",
        trend_score: 98.8,
        predicted_next_month: true,
        momentum: "+45% 7d",
        analytics: {
            engagement_graph: [30, 45, 40, 55, 65, 85, 98],
            social_mentions: "92.3K",
            top_regions: ["Berlin", "Milan", "Paris"],
            sentiment_score: 91
        }
    },
    {
        id: 12,
        name: "Liquid Liner Pen",
        brand: "Nykaa",
        price: 899.00,
        category: "makeup",
        subCategory: "Eyewear",
        image_url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
        affiliate_link: "https://www.nykaa.com/",
        trend_score: 87.2,
        predicted_next_month: false,
        momentum: "-2% 7d",
        analytics: {
            engagement_graph: [80, 75, 70, 65, 60, 55, 50],
            social_mentions: "12.8K",
            top_regions: ["Mumbai", "London"],
            sentiment_score: 65
        }
    }
];

export default function App() {
    // --- State Management ---
    const [products, setProducts] = useState(mockProductsData);
    const [activeTab, setActiveTab] = useState('clothing');
    const [selectedBrand, setSelectedBrand] = useState('All Brands');
    const [selectedSubCategory, setSelectedSubCategory] = useState('All');
    const [selectedCollection, setSelectedCollection] = useState('All');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [showProfile, setShowProfile] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [selectedProductAnalytics, setSelectedProductAnalytics] = useState(null);
    const [tempName, setTempName] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [isSignedIn, setIsSignedIn] = useState(() => localStorage.getItem("isSignedIn") === "true");
    const [profilePic, setProfilePic] = useState(() => localStorage.getItem("userProfilePic") || "");
    const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "Guest");
    const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail") || "");

    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
    const [watchlist, setWatchlist] = useState(() => JSON.parse(localStorage.getItem("watchlist") || "[]"));
    const [showWatchlist, setShowWatchlist] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const toggleWatchlist = (product) => {
        setWatchlist(prev => {
            const exists = prev.find(p => p.id === product.id);
            if (exists) {
                return prev.filter(p => p.id !== product.id);
            }
            return [...prev, product];
        });
    };

    // --- Backend Sync: Initial Fetch ---
    useEffect(() => {
        const syncProducts = async () => {
            try {
                const backendProducts = await api.getTrendingProducts();
                if (backendProducts && backendProducts.length > 0) {
                    setProducts(backendProducts);
                }
            } catch (err) {
                console.warn("Backend unavailable, using high-fidelity mock data.", err);
            }
        };
        syncProducts();
    }, []);

    // --- Derived Data ---
    const currentTabProducts = products.filter(p => p.category === activeTab);
    const availableBrands = ["All Brands", ...new Set(currentTabProducts.map(p => p.brand))];

    const filteredProducts = currentTabProducts.filter(product => {
        const matchesBrand = selectedBrand === "All Brands" || product.brand === selectedBrand;
        const matchesSubCategory = selectedSubCategory === "All" || product.subCategory === selectedSubCategory;
        const matchesCollection = selectedCollection === "All" || product.collection === selectedCollection;
        return matchesBrand && matchesSubCategory && matchesCollection;
    });

    const hasLength = passwordInput.length >= 8;
    const hasLetter = /(?=.*[A-Za-z])/.test(passwordInput);
    const hasNumber = /(?=.*\d)/.test(passwordInput);
    const hasSymbol = /(?=.*[^A-Za-z\d])/.test(passwordInput);
    const isPasswordValid = hasLength && hasLetter && hasNumber && hasSymbol;

    // --- Handlers ---
    const handleClearFilters = () => {
        setSelectedBrand("All Brands");
        setSelectedSubCategory("All");
        setSelectedCollection("All");
    };

    const handleLogin = async () => {
        setLoginError("");
        try {
            const data = await api.login(emailInput, passwordInput);
            const derivedName = emailInput.split('@')[0] || "Guest";
            setUserName(derivedName);
            setUserEmail(emailInput);
            setIsSignedIn(true);
            localStorage.setItem("isSignedIn", "true");
            localStorage.setItem("userName", derivedName);
            localStorage.setItem("userEmail", emailInput);
            setShowLoginModal(false);
            setEmailInput("");
            setPasswordInput("");
        } catch (err) {
            setLoginError(err.message || "Invalid credentials.");
        }
    };

    const handleLogout = () => {
        api.clearToken();
        setIsSignedIn(false);
        setShowProfile(false);
        localStorage.removeItem("isSignedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userProfilePic");
        setProfilePic("");
    };

    const handleSaveName = () => {
        if (tempName.trim()) {
            setUserName(tempName);
            localStorage.setItem("userName", tempName);
            setIsEditingName(false);
        }
    };

    const handleLinkGoogle = () => {
        const mockGooglePic = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop";
        setProfilePic(mockGooglePic);
        localStorage.setItem("userProfilePic", mockGooglePic);
    };

    // --- Effects ---
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        handleClearFilters();
    }, [activeTab]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProducts(currentProducts =>
                currentProducts.map(product => {
                    const fluctuation = (Math.random() - 0.5) * 0.8;
                    const newScore = Math.min(99.9, Math.max(50, product.trend_score + fluctuation));
                    return { ...product, trend_score: Number(newScore.toFixed(1)) };
                })
            );
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Behavior Tracking System
    useEffect(() => {
        if (selectedProductAnalytics) {
            api.trackEvent('VIEW', selectedProductAnalytics.id, {
                product_name: selectedProductAnalytics.name,
                category: selectedProductAnalytics.category
            }).catch(() => null); // Silent fail for local dev
        }
    }, [selectedProductAnalytics]);

    const handleProductClick = async (product) => {
        try {
            // Fetch real-time analytics from Neural Engine
            const data = await api.getProductAnalytics(product.id);
            setSelectedProductAnalytics({ ...product, analytics: data.analytics });
        } catch (err) {
            // Fallback to local trend calculation if backend offline
            setSelectedProductAnalytics(product);
        }

        // Track the click intent
        api.trackEvent('CLICK', product.id).catch(() => null);
    };

    // --- Template Render ---
    return (
        <div className="relative min-h-screen selection:bg-pink-500/40 text-black dark:text-white font-sans overflow-x-hidden transition-colors duration-500">
            {/* Aurora Background Layers */}
            <div className="aurora-bg opacity-40 dark:opacity-20">
                <div className="aurora-blob blob-1"></div>
                <div className="aurora-blob blob-2"></div>
                <div className="aurora-blob blob-3"></div>
            </div>

            {/* Floating Nano-Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', opacity: 0.05, backgroundSize: '40px 40px', zIndex: 0 }}></div>

            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 py-8 ${isScrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 py-4" : "bg-transparent"}`}>
                <div className="max-w-[1800px] mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-12">
                        <button onMouseEnter={() => setShowMegaMenu(true)} className="flex items-center space-x-3 group">
                            <div className="flex flex-col space-y-1.5 overflow-hidden">
                                <span className="h-[1px] bg-black dark:bg-white transition-all duration-500 w-8 group-hover:translate-x-4" />
                                <span className="h-[1px] bg-black dark:bg-white transition-all duration-500 w-5 group-hover:translate-x-2" />
                                <span className="h-[1px] bg-black dark:bg-white transition-all duration-500 w-8 group-hover:translate-x-0" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Menu</span>
                        </button>
                        <div className="hidden lg:flex items-center space-x-8">
                            {['New Arrivals', 'Collections', 'Editorial'].map((item) => (
                                <button key={item} onClick={() => {
                                    if (item === 'New Arrivals') setSelectedCollection('New In');
                                    else if (item === 'Collections') setSelectedCollection('Ready to Wear');
                                    else if (item === 'Editorial') document.getElementById('editorial-section')?.scrollIntoView({ behavior: 'smooth' });
                                }} className="text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <Logo />
                        </button>
                    </div>

                    <div className="flex items-center space-x-8">
                        {/* Theme Toggle */}
                        <button onClick={() => setDarkMode(!darkMode)} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all">
                            {darkMode ? <Sparkles className="w-5 h-5 text-yellow-400" /> : <Activity className="w-5 h-5 text-blue-600" />}
                        </button>

                        <button onClick={() => setShowSearch(true)} className="hover:opacity-50 transition-opacity">
                            <Search className="w-5 h-5 stroke-[1.5px]" />
                        </button>

                        {/* Watchlist Trigger */}
                        <button onClick={() => setShowWatchlist(true)} className="relative hover:opacity-50 transition-opacity group">
                            <Heart className={`w-5 h-5 stroke-[1.5px] ${watchlist.length > 0 ? "fill-red-500 stroke-red-500" : ""}`} />
                            {watchlist.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#2979FF] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-black animate-bounce">
                                    {watchlist.length}
                                </span>
                            )}
                        </button>

                        {isSignedIn ? (
                            <button onClick={() => setShowProfile(true)} className="flex items-center space-x-2 group">
                                <div className="w-6 h-6 rounded-full bg-black/5 border border-black/10 flex items-center justify-center overflow-hidden">
                                    {profilePic ? <img src={profilePic} alt="P" className="w-full h-full object-cover" /> : <span className="text-[10px] font-bold">{userName.charAt(0)}</span>}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">{userName}</span>
                            </button>
                        ) : (
                            <button onClick={() => setShowLoginModal(true)} className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black/50 dark:border-white/50 pb-0.5 hover:border-black dark:hover:border-white transition-all">
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mega Menu */}
            <AnimatePresence>
                {showMegaMenu && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseEnter={() => setShowMegaMenu(false)} className="fixed inset-0 bg-white/40 backdrop-blur-md z-[55]" />
                        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} onMouseLeave={() => setShowMegaMenu(false)} className="fixed top-0 left-0 right-0 bg-white border-b border-black/5 pt-32 pb-20 px-12 z-[56] shadow-2xl">
                            <div className="max-w-[1400px] mx-auto grid grid-cols-4 gap-12">
                                <div>
                                    <h3 onClick={() => { setSelectedCollection('All'); setSelectedSubCategory('All'); setShowMegaMenu(false); }} className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-8 cursor-pointer hover:text-black transition-colors">Ready to Wear</h3>
                                    <div className="flex flex-col space-y-4">
                                        {['New In', 'Tops', 'Denim', 'Outerwear', 'Knitwear'].map(item => (
                                            <button key={item} onClick={() => { if (item === 'New In') setSelectedCollection('New In'); else setSelectedSubCategory(item); setShowMegaMenu(false); }} className="text-2xl font-black italic tracking-tighter hover:translate-x-4 transition-transform text-left">{item}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 onClick={() => { setSelectedSubCategory('All'); setShowMegaMenu(false); }} className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-8 cursor-pointer hover:text-black transition-colors">Accessories</h3>
                                    <div className="flex flex-col space-y-4">
                                        {['Jewelry', 'Bags', 'Footwear', 'Belts', 'Eyewear'].map(item => (
                                            <button key={item} onClick={() => { setSelectedSubCategory(item); setShowMegaMenu(false); }} className="text-2xl font-black italic tracking-tighter hover:translate-x-4 transition-transform text-left">{item}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 onClick={() => { setSelectedCollection('All'); setShowMegaMenu(false); }} className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-8 cursor-pointer hover:text-black transition-colors">Selected Edits</h3>
                                    <div className="flex flex-col space-y-4">
                                        {['Quiet Luxury', 'Urban Street', 'Evening Noir', 'The Archive'].map(item => (
                                            <button key={item} onClick={() => { setSelectedCollection(item); setShowMegaMenu(false); }} className="text-2xl font-black italic tracking-tighter hover:translate-x-4 transition-transform text-left">{item}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative group overflow-hidden bg-black aspect-[3/4]">
                                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" alt="Editorial" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Login Modal */}
            <AnimatePresence>
                {showLoginModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl px-4">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card relative w-full max-w-sm p-8 rounded-[2rem] border border-white/10">
                            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">&times;</button>
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-black text-white mb-2">Welcome Back</h2>
                                <p className="text-sm text-gray-400">Sign in to sync your local trends.</p>
                                {loginError && <p className="text-xs text-red-500 mt-2 font-bold uppercase tracking-widest">{loginError}</p>}
                            </div>
                            <div className="space-y-4">
                                <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50" />
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 pr-12" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                                </div>
                                <button disabled={!isPasswordValid || !emailInput} onClick={handleLogin} className={`w-full font-bold py-3 rounded-xl transition-all mt-4 ${isPasswordValid && emailInput ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white cursor-pointer" : "bg-white/10 text-gray-400 cursor-not-allowed"}`}>Login Securely</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-48 pb-20">
                {/* Hero */}
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-[2.5rem] overflow-hidden mb-16 border border-white/10 glass-card p-10 md:p-16 flex flex-col items-center text-center shadow-2xl">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="inline-flex items-center space-x-2 bg-black/50 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
                        <div className="pulse-dot mr-1"></div>
                        <span className="text-white">Neural Discovery Active</span>
                    </div>
                    <h1 className="heading-jumbo mb-8 leading-tight">
                        {isSignedIn ? <>Welcome back,<br /><span className="text-gradient-accent">{userName}</span></> : <>Discover Tomorrow's<br /><span className="text-gradient-accent">Fashion Today</span></>}
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={() => document.getElementById('product-discovery-grid')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-full text-white font-black text-xs uppercase tracking-widest shadow-xl flex items-center group/btn cursor-pointer"
                        >
                            <Sparkles className="w-4 h-4 mr-2 group-hover/btn:animate-spin" /> {isSignedIn ? "Generate Daily Edit" : "Explore Collections"}
                        </button>
                    </div>
                </motion.div>

                {/* AI Trending Now Section - Integrated via Automated Real-Time Scrapers */}
                <TrendingProductsSection watchlist={watchlist} onToggleWatchlist={toggleWatchlist} />

                {/* Tabs & Filters */}
                <div id="product-discovery-grid" className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-8 scroll-mt-32">
                    <div className="flex space-x-2 bg-black/5 p-1 rounded-full border border-black/5">
                        {['clothing', 'makeup'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`relative px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-white' : 'text-black/40 hover:text-black'}`}>
                                {activeTab === tab && <motion.div layoutId="activeTab" className="absolute inset-0 bg-black rounded-full z-[-1]" />}
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 bg-black/5 p-2 rounded-full px-4">
                            <span className="text-[10px] font-black text-black/20 uppercase tracking-widest">Brand</span>
                            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none">
                                {availableBrands.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>
                        {(selectedBrand !== "All Brands" || selectedSubCategory !== "All") && <button onClick={handleClearFilters} className="text-[8px] font-black uppercase tracking-widest border-b border-black">Clear</button>}
                    </div>
                </div>

                {/* Grid */}
                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="product-card-premium group">
                            <div className="relative aspect-[3/4] overflow-hidden bg-[#EDEDED]">
                                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleWatchlist(product); }}
                                        className={`p-3 rounded-full backdrop-blur-md transition-all ${watchlist.some(w => w.id === product.id) ? "bg-red-500 text-white" : "bg-white/80 hover:bg-white text-black"}`}
                                    >
                                        <Heart className={`w-4 h-4 ${watchlist.some(w => w.id === product.id) ? "fill-current" : ""}`} />
                                    </button>
                                </div>
                                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-black/0 group-hover:bg-black/20 transition-all opacity-0 group-hover:opacity-100">
                                    <button onClick={() => window.open(product.affiliate_link, '_blank')} className="w-full bg-white text-black py-3 text-[8px] font-black uppercase tracking-widest mb-2">View on {product.brand}</button>
                                    <button onClick={() => handleProductClick(product)} className="w-full bg-black text-white py-3 text-[8px] font-black uppercase tracking-widest flex items-center justify-center"><Activity className="w-3 h-3 mr-2" /> Neural Analytics</button>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-[8px] font-black uppercase tracking-widest text-black/40 mb-1">{product.brand}</p>
                                <h4 className="text-xs font-bold mb-4">{product.name}</h4>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-black">₹{product.price.toLocaleString()}</p>
                                    <div className="flex items-center text-[8px] font-black uppercase tracking-widest text-pink-500"><TrendingUp className="w-3 h-3 mr-1" /> {product.trend_score}%</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Profile Sidebar */}
            <AnimatePresence>
                {showProfile && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowProfile(false)} className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-[60]" />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full max-w-sm glass z-[70] p-8 dark:bg-[#0A0A0A] dark:border-white/10">
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-xl font-black uppercase tracking-tight dark:text-white">Profile</h2>
                                <button onClick={() => setShowProfile(false)}><X className="w-6 h-6 dark:text-white" /></button>
                            </div>
                            <div className="flex flex-col items-center mb-12">
                                <div className="w-24 h-24 rounded-full bg-black dark:bg-white/10 flex items-center justify-center text-white text-3xl font-black mb-4 overflow-hidden border border-black/10 dark:border-white/10">
                                    {profilePic ? <img src={profilePic} alt="P" className="w-full h-full object-cover" /> : <span className="dark:text-white">{userName.charAt(0)}</span>}
                                </div>
                                <h3 className="text-lg font-black dark:text-white">{userName}</h3>
                                <p className="text-xs text-black/40 dark:text-white/40">{userEmail}</p>
                            </div>
                            <div className="space-y-4">
                                <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 p-4 text-red-500 font-black text-[10px] uppercase tracking-widest bg-red-50 dark:bg-red-900/10 rounded-2xl">
                                    <LogOut className="w-4 h-4" /> <span>Sign Out</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Watchlist Drawer */}
            <AnimatePresence>
                {showWatchlist && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowWatchlist(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-[#0A0A0A] z-[101] shadow-2xl p-8 flex flex-col border-l border-black/5 dark:border-white/10"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-3xl font-black italic tracking-tighter dark:text-white">Saved Trends</h2>
                                <button onClick={() => setShowWatchlist(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                                    <X className="w-6 h-6 dark:text-white" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
                                {watchlist.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40 dark:text-white">
                                        <Heart className="w-12 h-12 mb-4 stroke-[1px]" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Your watchlist is empty</p>
                                    </div>
                                ) : (
                                    watchlist.map(item => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex gap-4 group"
                                        >
                                            <div className="w-24 aspect-[3/4] bg-gray-100 dark:bg-white/5 overflow-hidden rounded-xl border border-black/5 dark:border-white/10">
                                                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 dark:text-white/40 mb-1">{item.brand}</p>
                                                    <h4 className="text-sm font-black leading-tight dark:text-white line-clamp-2">{item.name}</h4>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <button
                                                        onClick={() => { setSelectedProductAnalytics(item); setShowWatchlist(false); }}
                                                        className="text-[8px] font-black uppercase tracking-widest border-b border-black dark:border-white dark:text-white hover:opacity-50 transition-opacity"
                                                    >
                                                        View Insights
                                                    </button>
                                                    <button
                                                        onClick={() => toggleWatchlist(item)}
                                                        className="text-red-500 hover:scale-110 transition-transform p-2"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            {watchlist.length > 0 && (
                                <button
                                    className="mt-8 w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:-translate-y-1 transition-transform shadow-xl"
                                >
                                    Export Neural Edit
                                </button>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Modals */}
            <AnimatePresence>
                <ProductAnalyticsModal selectedProductAnalytics={selectedProductAnalytics} setSelectedProductAnalytics={setSelectedProductAnalytics} />
            </AnimatePresence>
            <SearchOverlay showSearch={showSearch} setShowSearch={setShowSearch} />

            <footer className="bg-black text-white py-20 px-12 mt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
                    <div>
                        <Logo className="invert" />
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 mt-4">Trendly.Ai Archive 2026 // Neural Fashion Discovery</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white mb-1">Contact Us</p>
                        <a href="tel:6000010206" className="text-[13px] font-black tracking-wide text-white hover:text-pink-400 transition-colors">📞 +91 6000010206</a>
                        <p className="text-[13px] font-black tracking-wide text-white">📍 Katakipara, Lokhra, Guwahati</p>
                    </div>
                </div>
            </footer>

            <AIChatAssistant />




        </div>
    );
}
