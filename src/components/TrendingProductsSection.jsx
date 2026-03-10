import React, { useState, useEffect } from 'react';
import { Sparkles, Activity, RefreshCw } from 'lucide-react';
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
                        {['all', 'fashion', 'makeup', 'accessories', 'skincare'].map(cat => (
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
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <Activity className="w-8 h-8 text-[#2979FF] animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/30 dark:text-white/20">Analyzing Hotspots...</span>
                </div>
            ) : trendingProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <div className="text-center py-20 bg-gray-50 dark:bg-black/20 rounded-3xl border border-dashed border-gray-300 dark:border-white/10 text-black dark:text-white">
                    <Sparkles className="w-10 h-10 mx-auto mb-4 text-black/20 dark:text-white/20" />
                    <p className="text-sm font-bold text-gray-500 dark:text-white/40 uppercase tracking-widest mb-2">
                        {error || `No viral trends detected for ${filter} right now.`}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-white/20 mt-2">
                        Run <code className="bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded">python scripts/run_trend_engine.py</code> to populate trends.
                    </p>
                </div>
            )}
        </section>
    );
};

export default TrendingProductsSection;
