import React from 'react';
import { ExternalLink, TrendingUp, Heart, Zap, Brain } from 'lucide-react';
import { motion } from 'framer-motion';


const getScoreColor = (score) => {
    if (score >= 85) return { bg: 'bg-gradient-to-r from-red-500 to-pink-500', text: 'text-red-500', label: '🔥 VIRAL' };
    if (score >= 70) return { bg: 'bg-gradient-to-r from-orange-500 to-yellow-500', text: 'text-orange-500', label: '⚡ HOT' };
    if (score >= 55) return { bg: 'bg-gradient-to-r from-blue-500 to-cyan-500', text: 'text-blue-500', label: '📈 RISING' };
    return { bg: 'bg-gradient-to-r from-gray-400 to-gray-500', text: 'text-gray-500', label: '🌱 EMERGING' };
};

const ProductTrendCard = ({ product, watchlist = [], onToggleWatchlist }) => {
    const displayName = product.title || product.name || product.product_name;
    const displayImage = product.image_url || product.image;
    const links = product.affiliate_links || (product.affiliate_link ? { [product.source_platform || 'Store']: product.affiliate_link } : {});
    const primaryUrl = Object.values(links)[0] || "#";
    const primaryNetwork = Object.keys(links)[0] || "Store";
    
    // Derived values to fix ReferenceErrors
    const isWatched = watchlist.some(p => p.id === product.id);
    const score = Math.round(product.trend_score || 50);
    const scoreStyle = getScoreColor(score);

    return (
        <div className="bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] border border-black/5 dark:border-white/5 overflow-hidden group hover:shadow-3xl hover:shadow-pink-500/10 transition-all duration-700 hover:-translate-y-2 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Image Section */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 dark:bg-black/40">
                <img
                    src={displayImage}
                    alt={displayName}
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    onError={(e) => {
                        e.target.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(displayName)}`;
                    }}
                />

                {/* Heart Toggle */}
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-500 z-10">
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleWatchlist && onToggleWatchlist(product); }}
                        className={`p-3 rounded-full backdrop-blur-2xl border border-white/20 transition-all ${isWatched ? "bg-red-500 text-white shadow-lg shadow-red-500/40" : "bg-white/40 hover:bg-white text-black dark:bg-black/20 dark:text-white"}`}
                    >
                        <Heart className={`w-4 h-4 ${isWatched ? "fill-current" : ""}`} />
                    </button>
                </div>

                {/* Trend Status Badge */}
                <div className={`absolute top-5 left-5 ${scoreStyle.bg} text-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-full flex items-center gap-2 shadow-2xl z-10`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    {scoreStyle.label}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 relative z-10">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2979FF] dark:text-[#00E5FF] px-3 py-1 bg-blue-500/5 rounded-full border border-blue-500/10">
                        {product.category || 'trending'}
                    </span>
                    <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-lg">
                        <TrendingUp className={`w-3.5 h-3.5 ${scoreStyle.text}`} />
                        <span className="text-xs font-black dark:text-white">{score}</span>
                    </div>
                </div>

                <h3 className="font-black text-xl leading-tight line-clamp-2 dark:text-white mb-6 italic tracking-tighter uppercase group-hover:text-pink-500 transition-colors">
                    {displayName}
                </h3>

                {/* AI Insight Pill */}
                {product.ai_insight && (
                    <div className="mb-8 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex gap-3">
                        <Brain className="w-5 h-5 text-purple-500 flex-shrink-0" />
                        <p className="text-[11px] text-black/50 dark:text-white/40 font-bold leading-relaxed line-clamp-3 italic">
                            "{product.ai_insight}"
                        </p>
                    </div>
                )}

                {/* Action Row */}
                <div className="flex gap-3">
                    <button
                        onClick={() => window.open(primaryUrl, '_blank')}
                        className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-[#2979FF] dark:hover:bg-[#00E5FF] transition-all py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-2xl shadow-xl"
                    >
                        Secure on {primaryNetwork}
                    </button>
                    <button
                        onClick={() => onToggleWatchlist && onToggleWatchlist(product)}
                        className={`p-4 rounded-2xl border transition-all ${isWatched ? 'border-red-500 bg-red-500/5 text-red-500' : 'border-black/5 dark:border-white/5 hover:border-black dark:hover:border-white dark:text-white'}`}
                    >
                        <Heart className={`w-4 h-4 ${isWatched ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ProductTrendCard;
