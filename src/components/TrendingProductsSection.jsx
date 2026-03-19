import React, { useState, useEffect } from 'react';
import { Sparkles, Activity, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';

import ProductTrendCard from './ProductTrendCard';

const TrendingProductsSection = ({ watchlist = [], onToggleWatchlist }) => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [error, setError] = useState(null);

    const fetchTrends = async () => {
        setLoading(true);
        setError(null);
        try {
            let data;
            if (filter === 'all') {
                data = await api.getTrendingDiscoveredProducts();
            } else {
                data = await api.getTrendingByCategory(filter);
            }
            // Handle both array response and {data: [...]} response
            const products = Array.isArray(data) ? data : (data.data || []);
            setTrendingProducts(products);
        } catch (err) {
            console.error("Error fetching trends:", err);
            setError("Could not load trends. Run the trend engine first.");
            setTrendingProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrends();
    }, [filter]);

    return (
        <section className="py-20 mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div>
                    <h2 className="text-4xl font-black italic tracking-tighter flex items-center gap-3 dark:text-white">
                        <Sparkles className="w-8 h-8 text-pink-500" /> Trending Now
                    </h2>
                    <p className="text-black/50 dark:text-white/40 font-bold mt-2">AI-detected viral products sweeping the internet</p>
                </div>

                <div className="flex items-center gap-4 mt-6 md:mt-0">
                    {/* Refresh Button */}
                    <button
                        onClick={fetchTrends}
                        className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all border border-black/5 dark:border-white/10"
                        title="Refresh trends"
                    >
                        <RefreshCw className={`w-4 h-4 dark:text-white ${loading ? 'animate-spin' : ''}`} />
                    </button>

                    {/* Category Filters */}
                    <div className="flex gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/10 flex-wrap justify-center">
                        {['all', 'fashion', 'makeup', 'skincare'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-6 glass rounded-[3rem] border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#2979FF]/5 to-[#E04296]/5 animate-pulse" />
                    <Activity className="w-12 h-12 text-[#2979FF] animate-bounce" />
                    <div className="flex flex-col items-center">
                        <span className="text-[12px] font-black uppercase tracking-[0.4em] text-black/40 dark:text-white/40 mb-2">Neural Scanning...</span>
                        <div className="w-48 h-1 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-1/2 h-full bg-[#2979FF]"
                            />
                        </div>
                    </div>
                </div>
            ) : trendingProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {trendingProducts.map((product, idx) => (
                        <ProductTrendCard
                            key={product.id || idx}
                            product={product}
                            watchlist={watchlist}
                            onToggleWatchlist={onToggleWatchlist}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 glass-dark rounded-[3rem] border border-white/10 px-8 relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
                    <Sparkles className="w-16 h-16 mx-auto mb-6 text-[#2979FF] opacity-50" />
                    <h3 className="text-2xl font-black italic tracking-tighter mb-4 dark:text-white uppercase leading-none">Scanning Market Signatures...</h3>
                    <p className="text-sm font-bold text-gray-400 dark:text-white/40 uppercase tracking-widest mb-8 max-w-md mx-auto">
                        {error || "We're currently parsing global datasets for the next viral breakout."}
                    </p>
                    <button
                        onClick={fetchTrends}
                        className="bg-white text-black px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:-translate-y-1 transition-transform shadow-2xl"
                    >
                        Re-Probe Engine
                    </button>
                </div>
            )}

        </section>
    );
};

export default TrendingProductsSection;
