import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, TrendingUp } from 'lucide-react';

const SearchOverlay = ({ showSearch, setShowSearch }) => {
    return (
        <AnimatePresence>
            {showSearch && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-white/95 dark:bg-black/95 backdrop-blur-3xl flex flex-col p-12 lg:p-24"
                >
                    <button onClick={() => setShowSearch(false)} className="absolute top-12 right-12 p-4 hover:rotate-90 transition-transform duration-500">
                        <X className="w-10 h-10 dark:text-white" />
                    </button>

                    <div className="max-w-5xl mx-auto w-full pt-20">
                        <div className="relative group">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 opacity-20 group-focus-within:opacity-100 group-focus-within:text-[#2979FF] transition-all dark:text-white" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search Trends, Brands, Collections..."
                                className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 py-8 pl-14 text-4xl lg:text-7xl font-black italic tracking-tighter outline-none focus:border-[#2979FF] transition-all dark:text-white"
                            />
                        </div>

                        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 dark:text-white/40 mb-8">Trending Searches</h4>
                                <div className="flex flex-col space-y-4">
                                    {['Quiet Luxury Coat', 'Ballet Flats Red', 'Mesh Ballerinas', 'Mob Wife Aesthetic'].map(item => (
                                        <button key={item} className="text-xl font-black italic tracking-tight hover:text-[#2979FF] transition-colors dark:text-white flex items-center group">
                                            <TrendingUp className="w-4 h-4 mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 dark:text-white/40 mb-8">Quick Collections</h4>
                                <div className="flex flex-wrap gap-3">
                                    {['Spring 2026', 'Cyber-Punk', 'Eco-Chic', 'Retro-Futurism', 'Gothic Glam'].map(item => (
                                        <button key={item} className="px-6 py-3 bg-black/5 dark:bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all dark:text-white">
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-[#2979FF]/10 to-transparent p-10 rounded-[3rem] border border-[#2979FF]/10 relative overflow-hidden group">
                                <Sparkles className="w-12 h-12 text-[#2979FF] mb-6 group-hover:rotate-12 transition-transform" />
                                <h4 className="text-2xl font-black italic tracking-tighter dark:text-white mb-4">Neural Suggestion</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest leading-loose opacity-60 dark:text-white/60 mb-6">Our engine detects high growth in "Eco-Conscious Denims". Would you like to explore?</p>
                                <button className="text-[10px] font-black uppercase tracking-widest border-b-2 border-[#2979FF] dark:text-white">View Insights</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;
