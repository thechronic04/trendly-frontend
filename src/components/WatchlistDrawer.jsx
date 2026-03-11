import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

const WatchlistDrawer = ({ showWatchlist, setShowWatchlist, watchlist, toggleWatchlist, setSelectedProductAnalytics }) => {
    return (
        <AnimatePresence>
            {showWatchlist && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowWatchlist(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-[#0A0A0A] z-[101] shadow-2xl p-8 flex flex-col border-l border-black/5 dark:border-white/10"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-3xl font-black italic tracking-tighter dark:text-white">Saved Trends</h2>
                            <button onClick={() => setShowWatchlist(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                                <X className="w-6 h-6 dark:text-white" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
                            {watchlist.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40 dark:text-white">
                                    <Heart className="w-12 h-12 mb-4 stroke-[1px]" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Your watchlist is empty</p>
                                </div>
                            ) : (
                                watchlist.map(item => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-4 group"
                                    >
                                        <div className="w-24 aspect-[3/4] bg-gray-100 dark:bg-white/5 overflow-hidden rounded-xl border border-black/5 dark:border-white/10">
                                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 dark:text-white/40 mb-1">{item.brand}</p>
                                                <h4 className="text-sm font-black leading-tight dark:text-white line-clamp-2">{item.name}</h4>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <button
                                                    onClick={() => { setSelectedProductAnalytics(item); setShowWatchlist(false); }}
                                                    className="text-[8px] font-black uppercase tracking-widest border-b border-black dark:border-white dark:text-white hover:opacity-50 transition-opacity"
                                                >
                                                    View Insights
                                                </button>
                                                <button
                                                    onClick={() => toggleWatchlist(item)}
                                                    className="text-red-500 hover:scale-110 transition-transform p-2"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {watchlist.length > 0 && (
                            <button
                                className="mt-8 w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:-translate-y-1 transition-transform shadow-xl"
                            >
                                Export Neural Edit
                            </button>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WatchlistDrawer;
