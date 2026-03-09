import React, { useState, useEffect } from 'react';
import { Sparkles, Activity } from 'lucide-react';
import ProductTrendCard from './ProductTrendCard';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const TrendingProductsSection = () => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, fashion, makeup

    useEffect(() => {
        setLoading(true);
        let endpoint = `${API_URL}/trending-products`;
        if (filter !== 'all') {
            endpoint = `${API_URL}/trending-products/${filter}`;
        }

        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                setTrendingProducts(data);
            })
            .catch(err => console.error("Error fetching trends:", err))
            .finally(() => setLoading(false));
    }, [filter]);

    return (
        <section className="py-20 mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div>
                    <h2 className="text-4xl font-black italic tracking-tighter flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-pink-500" /> Trending Now
                    </h2>
                    <p className="text-black/50 font-bold mt-2">AI-detected viral products sweeping the internet</p>
                </div>

                {/* Category Filters (Section 12) */}
                <div className="flex gap-2 mt-6 md:mt-0 bg-black/5 p-1 rounded-full border border-black/5">
                    {['all', 'fashion', 'makeup'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-black text-white' : 'text-black/50 hover:text-black'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <Activity className="w-8 h-8 text-[#2979FF] animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/30">Analyzing Hotspots...</span>
                </div>
            ) : trendingProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {trendingProducts.map((product, idx) => (
                        <ProductTrendCard key={product.id || idx} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">No viral trends detected for {filter} right now.</p>
                </div>
            )}
        </section>
    );
};

export default TrendingProductsSection;
