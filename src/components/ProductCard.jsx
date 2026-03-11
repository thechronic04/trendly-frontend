import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, TrendingUp } from 'lucide-react';

const ProductCard = ({ product, watchlist, toggleWatchlist, handleProductClick }) => {
    const displayName = product.title || product.name;
    const displayImage = product.image_url || product.image;
    const links = product.affiliate_links || (product.affiliate_link ? { amazon: product.affiliate_link } : {});
    const primaryUrl = Object.values(links)[0] || "#";
    const primaryNetwork = Object.keys(links)[0] || "Store";
    const isInWatchlist = watchlist.some(w => w.id === product.id);

    return (
        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="product-card-premium group">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#EDEDED] rounded-[2rem] dark:bg-black/40">
                <img src={displayImage} alt={displayName} crossOrigin="anonymous" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleWatchlist(product); }}
                        className={`p-3 rounded-full backdrop-blur-md transition-all border border-white/20 ${isInWatchlist ? "bg-red-500 text-white" : "bg-white/40 hover:bg-white text-black"}`}
                    >
                        <Heart className={`w-4 h-4 ${isInWatchlist ? "fill-current" : ""}`} />
                    </button>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => window.open(primaryUrl, '_blank')} className="w-full bg-white text-black py-4 rounded-xl text-[9px] font-black uppercase tracking-widest mb-3 hover:bg-blue-500 hover:text-white transition-colors">View on {primaryNetwork}</button>
                    <button onClick={() => handleProductClick(product)} className="w-full bg-black/80 backdrop-blur-md text-white py-4 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center border border-white/10"><Activity className="w-3 h-3 mr-2" /> Neural Analytics</button>
                </div>
            </div>

            <div className="p-6">
                <p className="text-[8px] font-black uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">{product.brand}</p>
                <h4 className="text-xs font-bold mb-4 dark:text-white truncate">{displayName}</h4>
                <div className="flex items-center justify-between">
                    <p className="text-xs font-black dark:text-white">${(product.price || 0).toLocaleString()}</p>
                    <div className="flex items-center text-[8px] font-black uppercase tracking-widest text-pink-500"><TrendingUp className="w-3 h-3 mr-1" /> {product.trend_score}%</div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
