import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MegaMenu = ({ showMegaMenu, setShowMegaMenu, setSelectedCollection, setSelectedSubCategory }) => {
    return (
        <AnimatePresence>
            {showMegaMenu && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        onMouseEnter={() => setShowMegaMenu(false)} 
                        className="fixed inset-0 bg-white/40 backdrop-blur-md z-[55]" 
                    />
                    <motion.div 
                        initial={{ y: -50, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        exit={{ y: -50, opacity: 0 }} 
                        onMouseLeave={() => setShowMegaMenu(false)} 
                        className="fixed top-0 left-0 right-0 bg-white border-b border-black/5 pt-32 pb-20 px-12 z-[56] shadow-2xl"
                    >
                        <div className="max-w-[1400px] mx-auto grid grid-cols-4 gap-12">
                            <div>
                                <h3 onClick={() => { setSelectedCollection('All'); setSelectedSubCategory('All'); setShowMegaMenu(false); }} className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-8 cursor-pointer hover:text-black transition-colors">Ready to Wear</h3>
                                <div className="flex flex-col space-y-4">
                                    {['New In', 'Tops', 'Denim', 'Outerwear', 'Knitwear'].map(item => (
                                        <button key={item} onClick={() => { if (item === 'New In') setSelectedCollection('New In'); else setSelectedSubCategory(item); setShowMegaMenu(false); }} className="text-2xl font-black italic tracking-tighter hover:translate-x-4 transition-transform text-left">{item}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 onClick={() => { setSelectedSubCategory('All'); setShowMegaMenu(false); }} className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-8 cursor-pointer hover:text-black transition-colors">Accessories</h3>
                                <div className="flex flex-col space-y-4">
                                    {['Jewelry', 'Bags', 'Footwear', 'Belts', 'Eyewear'].map(item => (
                                        <button key={item} onClick={() => { setSelectedSubCategory(item); setShowMegaMenu(false); }} className="text-2xl font-black italic tracking-tighter hover:translate-x-4 transition-transform text-left">{item}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 onClick={() => { setSelectedCollection('All'); setShowMegaMenu(false); }} className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-8 cursor-pointer hover:text-black transition-colors">Selected Edits</h3>
                                <div className="flex flex-col space-y-4">
                                    {['Quiet Luxury', 'Urban Street', 'Evening Noir', 'The Archive'].map(item => (
                                        <button key={item} onClick={() => { setSelectedCollection(item); setShowMegaMenu(false); }} className="text-2xl font-black italic tracking-tighter hover:translate-x-4 transition-transform text-left">{item}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="relative group overflow-hidden bg-black aspect-[3/4] rounded-2xl border border-white/10">
                                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" crossOrigin="anonymous" alt="Editorial" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MegaMenu;
