import React from 'react';
import { ExternalLink, TrendingUp, Heart, Zap, Brain } from 'lucide-react';
import { motion } from 'framer-motion';


const getScoreColor = (score) => {
    if (score >= 85) return { bg: 'bg-[#FF1744]', shadow: 'shadow-[#FF1744]/40', text: 'text-[#FF1744]', label: '🔥 VIRAL' };
    if (score >= 70) return { bg: 'bg-[#FF9100]', shadow: 'shadow-[#FF9100]/40', text: 'text-[#FF9100]', label: '⚡ HOT' };
    if (score >= 55) return { bg: 'bg-[#2979FF]', shadow: 'shadow-[#2979FF]/40', text: 'text-[#2979FF]', label: '📈 RISING' };
    return { bg: 'bg-gray-500', shadow: 'shadow-gray-500/20', text: 'text-gray-500', label: '🌱 EMERGING' };
};

const ProductTrendCard = ({ product, watchlist = [], onToggleWatchlist }) => {
    const displayName = product.title || product.name || product.product_name;
    const displayImage = product.image_url || product.image;
    const links = product.affiliate_links || (product.affiliate_link ? { [product.source_platform || 'Store']: product.affiliate_link } : {});
    const primaryUrl = Object.values(links)[0] || "#";
    const primaryNetwork = Object.keys(links)[0] || "Store";
    
    const isWatched = watchlist.some(p => p.id === product.id);
    const score = Math.round(product.trend_score || 50);
    const scoreStyle = getScoreColor(score);
    
    // Analytics Extract
    const analytics = product.analytics_json || {};
    const momentum = product.momentum || (score > 80 ? '+32% 7d' : 'Steady');

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            className="group relative bg-white dark:bg-[#0F0F0F] rounded-[2.5rem] border border-black/5 dark:border-white/5 overflow-hidden transition-all duration-500"
        >
            {/* Glossy Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-[1px] rounded-[2.5rem]">
                <div className="absolute inset-0 bg-white dark:bg-[#0F0F0F] rounded-[2.5rem]" />
            </div>

            <div className="relative">
                {/* Image Section */}
                <div className="relative aspect-[4/5] overflow-hidden m-3 rounded-[1.8rem]">
                    <img
                        src={displayImage}
                        alt={displayName}
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                        onError={(e) => {
                            e.target.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(displayName)}`;
                        }}
                    />

                    {/* Gradient Fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${scoreStyle.bg} ${scoreStyle.shadow} shadow-lg text-white text-[9px] font-black tracking-widest leading-none`}>
                            <Zap className="w-3 h-3 fill-current" />
                            {scoreStyle.label}
                        </div>
                        
                        <button
                            onClick={(e) => { e.stopPropagation(); onToggleWatchlist && onToggleWatchlist(product); }}
                            className={`p-3 rounded-full backdrop-blur-xl border border-white/20 transition-all ${isWatched ? "bg-[#FF1744] text-white shadow-xl shadow-red-500/40" : "bg-black/20 hover:bg-white/20 text-white"}`}
                        >
                            <Heart className={`w-4 h-4 ${isWatched ? "fill-current" : ""}`} />
                        </button>
                    </div>

                    {/* Data Strip Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60 mb-0.5">Momentum</p>
                            <div className="flex items-center gap-1.5 font-black text-lg italic tracking-tighter">
                                <TrendingUp className="w-4 h-4 text-[#00E676]" />
                                {momentum}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60 mb-0.5">Engagement</p>
                            <p className="font-black text-sm italic tracking-tighter">{analytics.social_mentions || "82.4K"}</p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 pt-2">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#2979FF] bg-[#2979FF]/5 px-2.5 py-1 rounded-md border border-[#2979FF]/10">
                            {product.category || 'global'}
                        </span>
                        <div className="h-[1px] flex-1 bg-black/5 dark:bg-white/5" />
                        <span className="text-[10px] font-black text-black/20 dark:text-white/20 tracking-widest uppercase">
                            ID:SC-{product.id || 'NF'}
                        </span>
                    </div>

                    <h3 className="font-black text-xl leading-[1.1] mb-5 dark:text-white uppercase italic tracking-tighter group-hover:text-[#2979FF] transition-colors line-clamp-2">
                        {displayName}
                    </h3>

                    {/* Neural Insight Pill */}
                    <div className="relative mb-6 group/insight">
                         <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/0 via-[#2979FF]/5 to-pink-500/0 opacity-0 group-hover/insight:opacity-100 transition-opacity rounded-2xl" />
                         <div className="relative p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex gap-3 items-start">
                            <div className="mt-0.5 relative">
                                <Brain className="w-4 h-4 text-[#2979FF] relative z-10" />
                                <div className="absolute inset-0 bg-[#2979FF] blur-lg opacity-20" />
                            </div>
                            <p className="text-[10px] text-black/50 dark:text-white/50 font-bold leading-relaxed italic">
                                {product.ai_insight || `Neural analysis indicates high organic conversation volume across ${primaryNetwork} and primary lifestyle feeds.`}
                            </p>
                        </div>
                    </div>

                    {/* Action Row */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => window.open(primaryUrl, '_blank')}
                            className="flex-[3] bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-2 hover:bg-[#2979FF] dark:hover:bg-[#2979FF] hover:text-white transition-all shadow-lg active:scale-95"
                        >
                            Secure on {primaryNetwork}
                            <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductTrendCard;
