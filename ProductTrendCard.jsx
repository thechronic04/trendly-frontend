import React from 'react';
import { ExternalLink, TrendingUp } from 'lucide-react';

const ProductTrendCard = ({ product }) => {
    return (
        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#FF1744] text-white px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full flex items-center gap-1 shadow-md">
                    🔥 Trending
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 border border-black/10 shadow-sm">
                    <TrendingUp className="w-3.5 h-3.5 text-pink-500" />
                    <span className="text-xs font-black">{product.trend_score}</span>
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg leading-tight line-clamp-2">{product.product_name}</h3>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2979FF]">
                        Score: {product.trend_score}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-500">
                        {product.growth_metric || '+42%'}
                    </span>
                </div>

                {product.ai_insight && (
                    <p className="text-xs text-black/60 italic mb-4 line-clamp-2 leading-relaxed bg-blue-50/50 p-2 rounded-lg border border-blue-100/50">
                        "{product.ai_insight}"
                    </p>
                )}

                <button
                    onClick={() => window.open(product.affiliate_link, '_blank')}
                    className="w-full bg-black text-white hover:bg-[#2979FF] transition-colors py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                >
                    <ExternalLink className="w-3.5 h-3.5" /> Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductTrendCard;
