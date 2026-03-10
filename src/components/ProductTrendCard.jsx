import React from 'react';
import { ExternalLink, TrendingUp, Heart, Zap, Brain } from 'lucide-react';

const getScoreColor = (score) => {
    if (score >= 85) return { bg: 'bg-gradient-to-r from-red-500 to-pink-500', text: 'text-red-500', label: '🔥 VIRAL' };
    if (score >= 70) return { bg: 'bg-gradient-to-r from-orange-500 to-yellow-500', text: 'text-orange-500', label: '⚡ HOT' };
    if (score >= 55) return { bg: 'bg-gradient-to-r from-blue-500 to-cyan-500', text: 'text-blue-500', label: '📈 RISING' };
    return { bg: 'bg-gradient-to-r from-gray-400 to-gray-500', text: 'text-gray-500', label: '🌱 EMERGING' };
};

const ProductTrendCard = ({ product, watchlist = [], onToggleWatchlist }) => {
    const isWatched = watchlist && watchlist.some(w => w.id === product.id);
    const scoreStyle = getScoreColor(product.trend_score || 0);
    const score = product.trend_score || 0;

    return (
        <div className="bg-white dark:bg-[#0A0A0A] rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden group hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-500 hover:-translate-y-1">
            {/* Image Section */}
            <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-black/20">
                <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                        e.target.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(product.product_name)}`;
                    }}
                />

                {/* Heart Toggle */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500 z-10">
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleWatchlist && onToggleWatchlist(product); }}
                        className={`p-2.5 rounded-full backdrop-blur-md transition-all ${isWatched ? "bg-red-500 text-white" : "bg-white/80 hover:bg-white text-black dark:bg-black/50 dark:text-white"}`}
                    >
                        <Heart className={`w-3.5 h-3.5 ${isWatched ? "fill-current" : ""}`} />
                    </button>
                </div>

                {/* Trend Status Badge */}
                <div className={`absolute top-3 left-3 ${scoreStyle.bg} text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-lg`}>
                    {scoreStyle.label}
                </div>

                {/* Score Badge */}
                <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-black/80 backdrop-blur-sm px-3.5 py-2 rounded-xl flex items-center gap-2 border border-black/10 dark:border-white/10 shadow-lg">
                    <TrendingUp className={`w-3.5 h-3.5 ${scoreStyle.text}`} />
                    <span className="text-sm font-black dark:text-white">{score}</span>
                    <span className="text-[8px] font-bold text-black/30 dark:text-white/30">/100</span>
                </div>

                {/* Source platforms indicator */}
                {product.sources && product.sources.length > 1 && (
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span className="text-[8px] font-black text-white/80 uppercase tracking-wider">
                            {product.sources.length} Sources
                        </span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Category Tag */}
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#2979FF] dark:text-[#00E5FF]">
                        {product.category || 'trending'}
                    </span>
                    {product.growth_metric && (
                        <span className="text-[10px] font-black text-green-500 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {product.growth_metric}
                        </span>
                    )}
                </div>

                {/* Product Name */}
                <h3 className="font-bold text-lg leading-tight line-clamp-2 dark:text-white mb-3">
                    {product.product_name}
                </h3>

                {/* Score Bar */}
                <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-bold text-black/30 dark:text-white/30 uppercase tracking-wider">Trend Score</span>
                        <span className="text-[10px] font-black dark:text-white">{score}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${scoreStyle.bg} rounded-full transition-all duration-1000`}
                            style={{ width: `${score}%` }}
                        />
                    </div>
                </div>

                {/* AI Insight */}
                {product.ai_insight && (
                    <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-blue-50/80 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 border border-blue-100/50 dark:border-blue-900/20">
                        <div className="flex items-center gap-1.5 mb-1">
                            <Brain className="w-3 h-3 text-blue-500" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-blue-500">AI Insight</span>
                        </div>
                        <p className="text-[11px] text-black/60 dark:text-white/50 leading-relaxed line-clamp-2">
                            {product.ai_insight}
                        </p>
                    </div>
                )}

                {/* Buy Button */}
                <button
                    onClick={() => window.open(product.affiliate_link, '_blank')}
                    className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-[#2979FF] dark:hover:bg-[#00E5FF] transition-all py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg"
                >
                    <ExternalLink className="w-3.5 h-3.5" /> Shop Now
                </button>
            </div>
        </div>
    );
};

export default ProductTrendCard;
