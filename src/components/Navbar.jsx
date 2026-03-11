import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Sparkles, Activity } from 'lucide-react';
import Logo from './Logo';

const Navbar = ({ 
    isScrolled, 
    setShowMegaMenu, 
    setSelectedCollection, 
    darkMode, 
    setDarkMode, 
    setShowSearch, 
    showWatchlist, 
    setShowWatchlist, 
    watchlistCount, 
    isSignedIn, 
    setShowProfile, 
    profilePic, 
    userName, 
    setShowLoginModal 
}) => {
    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 py-8 ${isScrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 py-4" : "bg-transparent"}`}>
            <div className="max-w-[1800px] mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-12">
                    <button onClick={() => setShowMegaMenu(prev => !prev)} className="bg-black text-white dark:bg-white dark:text-black px-6 py-2.5 rounded-full flex items-center space-x-3 group hover:shadow-xl transition-all active:scale-95 z-50">
                        <div className="flex flex-col space-y-1 overflow-hidden opacity-90">
                            <span className="h-[1.5px] bg-white dark:bg-black transition-all duration-500 w-4 group-hover:w-5" />
                            <span className="h-[1.5px] bg-white dark:bg-black transition-all duration-500 w-3 group-hover:w-4" />
                            <span className="h-[1.5px] bg-white dark:bg-black transition-all duration-500 w-5 group-hover:w-3" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] mt-0.5">Menu</span>
                    </button>
                    <div className="hidden lg:flex items-center space-x-8">
                        {['New Arrivals', 'Collections', 'Editorial'].map((item) => (
                            <button key={item} onClick={() => {
                                if (item === 'New Arrivals') setSelectedCollection('New In');
                                else if (item === 'Collections') setSelectedCollection('Ready to Wear');
                                else if (item === 'Editorial') document.getElementById('editorial-section')?.scrollIntoView({ behavior: 'smooth' });
                            }} className="text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2">
                    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <Logo />
                    </Link>
                </div>

                <div className="flex items-center space-x-8">
                    {/* Theme Toggle */}
                    <button onClick={() => setDarkMode(!darkMode)} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all">
                        {darkMode ? <Sparkles className="w-5 h-5 text-yellow-400" /> : <Activity className="w-5 h-5 text-blue-600" />}
                    </button>

                    <button onClick={() => setShowSearch(true)} className="hover:opacity-50 transition-opacity">
                        <Search className="w-5 h-5 stroke-[1.5px]" />
                    </button>

                    {/* Watchlist Trigger */}
                    <button onClick={() => setShowWatchlist(true)} className="relative hover:opacity-50 transition-opacity group">
                        <Heart className={`w-5 h-5 stroke-[1.5px] ${watchlistCount > 0 ? "fill-red-500 stroke-red-500" : ""}`} />
                        {watchlistCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#2979FF] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-black animate-bounce">
                                {watchlistCount}
                            </span>
                        )}
                    </button>

                    {isSignedIn ? (
                        <button onClick={() => setShowProfile(true)} className="flex items-center space-x-2 group">
                            <div className="w-6 h-6 rounded-full bg-black/5 border border-black/10 flex items-center justify-center overflow-hidden">
                                {profilePic ? <img src={profilePic} alt="P" className="w-full h-full object-cover" /> : <span className="text-[10px] font-bold">{userName.charAt(0)}</span>}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">{userName}</span>
                        </button>
                    ) : (
                        <button onClick={() => setShowLoginModal(true)} className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black/50 dark:border-white/50 pb-0.5 hover:border-black dark:hover:border-white transition-all">
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
