import React from 'react';
import { ExternalLink, TrendingUp, Heart } from 'lucide-react';

const ProductTrendCard = ({ product, watchlist = [], onToggleWatchlist }) => {
    const isWatched = watchlist && watchlist.some(w => w.id === product.id);

    return (
        <div className="bg-white dark:bg-[#0A0A0A] rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-black/20">
                <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

                <div className="absolute top-3 left-3 bg-[#FF1744] text-white px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-md">
                    🔥 Trending
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 border border-black/10 dark:border-white/10 shadow-sm">
                    <TrendingUp className="w-3.5 h-3.5 text-pink-500" />
                    <span className="text-xs font-black dark:text-white">{product.trend_score}</span>
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg leading-tight line-clamp-2 dark:text-white">{product.product_name}</h3>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2979FF] dark:text-[#00E5FF]">
                        Score: {product.trend_score}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-500">
                        {product.growth_metric || '+42%'}
                    </span>
                </div>

                {product.ai_insight && (
                    <p className="text-xs text-black/60 dark:text-white/40 italic mb-4 line-clamp-2 leading-relaxed bg-blue-50/50 dark:bg-blue-900/10 p-2 rounded-lg border border-blue-100/50 dark:border-blue-900/20">
                        "{product.ai_insight}"
                    </p>
                )}

                <button
                    onClick={() => window.open(product.affiliate_link, '_blank')}
                    className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-[#2979FF] dark:hover:bg-[#00E5FF] transition-colors py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                >
                    <ExternalLink className="w-3.5 h-3.5" /> Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductTrendCard;
