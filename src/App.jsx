import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, TrendingUp, Activity, Cpu, X, LogOut, Eye, EyeOff, ExternalLink, MapPin, Heart, BarChart2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || "https://trendly-backend.vercel.app";

const Logo = ({ className = "", showText = true }) => (
    <div className={`flex items-center space-x-4 ${className}`}>
        <div className="relative w-10 h-10 flex flex-col justify-between p-0.5">
            <div className="flex w-full h-1/3 space-x-0.5">
                <div className="w-1/2 h-full bg-[#00E5FF] rounded-sm" />
                <div className="w-1/2 h-full bg-[#2979FF] rounded-sm" />
            </div>
            <div className="flex w-full h-1/3 bg-gradient-to-r from-[#FF5252] to-[#FF1744] rounded-sm my-0.5 shadow-sm" />
            <div className="flex w-full h-1/3 space-x-0.5">
                <div className="w-1/2 h-full bg-[#304FFE] rounded-sm" />
                <div className="w-1/2 h-full bg-[#2979FF] opacity-60 rounded-sm" />
            </div>
        </div>
        {showText && (
            <span className="text-3xl font-black tracking-tighter leading-none select-none">
                trendly<span className="text-[#2979FF]">.</span>Ai
            </span>
        )}
    </div>
);

const ProductAnalyticsModal = ({ product, onClose }) => {
    if (!product) return null;
    const analytics = product.analytics || {
        engagement_graph: [20, 30, 25, 40, 50, 45, 60],
        social_mentions: "Analysing...",
        top_regions: ["Data Pending"],
        sentiment_score: 70,
        hashtags: []
    };
    const scoreColor = product.trend_score >= 95 ? '#FF1744' : product.trend_score >= 88 ? '#FF5722' : '#2979FF';

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 backdrop-blur-2xl px-4"
            onClick={e => e.target === e.currentTarget && onClose()}>
            <motion.div initial={{ scale: 0.92, y: 24, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.92, y: 24, opacity: 0 }} transition={{ type: "spring", damping: 25 }}
                className="bg-white rounded-[2.5rem] w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]">

                {/* LEFT: Image */}
                <div className="w-full lg:w-2/5 relative bg-[#F0F0F0] flex-shrink-0">
                    <img src={product.image_url} alt={product.name} className="w-full h-72 lg:h-full object-cover" />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                        <div className="bg-black text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Live Trend
                        </div>
                        {product.predicted_next_month && (
                            <div className="bg-[#2979FF] text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full">
                                🔥 Next Month Pick
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-6 right-6 w-16 h-16 rounded-full border-4 flex items-center justify-center"
                        style={{ borderColor: scoreColor, background: 'rgba(255,255,255,0.92)' }}>
                        <div className="text-center">
                            <p className="text-[11px] font-black leading-none" style={{ color: scoreColor }}>{product.trend_score}</p>
                            <p className="text-[7px] font-bold text-black/40 uppercase">Score</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Data */}
                <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
                    <div className="flex justify-between items-start mb-5">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.35em] text-black/40 mb-1">{product.brand} · {product.sub_category}</p>
                            <h2 className="text-2xl lg:text-3xl font-black italic tracking-tight leading-tight">{product.name}</h2>
                            {product.description && <p className="text-xs text-black/50 mt-2 leading-relaxed">{product.description}</p>}
                        </div>
                        <button onClick={onClose} className="p-3 hover:bg-black/5 rounded-full transition-colors flex-shrink-0 ml-4">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-7">
                        <span className="text-2xl font-black">₹{Number(product.price).toLocaleString()}</span>
                        <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-green-700 bg-green-100">{product.momentum}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-5 rounded-2xl">
                            <p className="text-[9px] font-black uppercase tracking-widest text-black/40 mb-3 flex items-center gap-1.5">
                                <Activity className="w-3 h-3 text-blue-500" /> Viral Momentum
                            </p>
                            <div className="flex items-end space-x-1 h-14">
                                {analytics.engagement_graph.map((val, i) => (
                                    <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                                        transition={{ delay: i * 0.08, duration: 0.6 }}
                                        style={{ height: `${val}%`, background: i === analytics.engagement_graph.length - 1 ? '#2979FF' : '#000' }}
                                        className="flex-1 rounded-t-sm origin-bottom" />
                                ))}
                            </div>
                            <p className="text-[8px] text-black/30 font-bold mt-2">Last 7 days</p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-2xl">
                            <p className="text-[9px] font-black uppercase tracking-widest text-black/40 mb-3 flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3 text-pink-500" /> Sentiment
                            </p>
                            <div className="flex items-end gap-2 h-10 mb-2">
                                <span className="text-3xl font-black italic">{analytics.sentiment_score}%</span>
                                <span className="text-[9px] font-bold text-green-500 mb-1">Positive</span>
                            </div>
                            <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${analytics.sentiment_score}%` }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className="h-full rounded-full bg-gradient-to-r from-pink-500 to-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-2xl mb-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-black/40 mb-1 flex items-center gap-1.5">
                                    <BarChart2 className="w-3 h-3 text-purple-500" /> Social Reach
                                </p>
                                <p className="text-3xl font-black italic text-[#2979FF]">{analytics.social_mentions}</p>
                                <p className="text-[8px] font-bold uppercase tracking-widest text-black/20 mt-0.5">Total Mentions · +12% predicted</p>
                            </div>
                            {analytics.hashtags && analytics.hashtags.length > 0 && (
                                <div className="flex flex-col gap-1 items-end">
                                    {analytics.hashtags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-[8px] font-black text-[#2979FF] bg-blue-50 px-2 py-0.5 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-7">
                        <p className="text-[9px] font-black uppercase tracking-widest text-black/40 mb-3 flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-red-400" /> Neural Hotspots
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {analytics.top_regions.map(r => (
                                <span key={r} className="px-3 py-1.5 bg-black text-white text-[9px] font-bold rounded-full">{r}</span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => window.open(product.affiliate_link, '_blank')}
                            className="flex-1 bg-black text-white py-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] hover:bg-[#2979FF] transition-colors flex items-center justify-center gap-2">
                            <ExternalLink className="w-3.5 h-3.5" /> Shop on {product.brand}
                        </button>
                        <button className="px-6 py-4 border-2 border-black/10 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white hover:border-black transition-all">
                            Track
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const SearchOverlay = ({ show, onClose, products }) => {
    const [query, setQuery] = useState('');
    const results = query.length > 1
        ? products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase()) ||
            (p.sub_category || '').toLowerCase().includes(query.toLowerCase())
          ).slice(0, 6)
        : [];

    return (
        <AnimatePresence>
            {show && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-2xl p-8 lg:p-16 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-between items-center mb-12">
                            <div className="flex items-center space-x-3">
                                <Cpu className="w-5 h-5 text-[#2979FF] animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">Neural Search</span>
                            </div>
                            <button onClick={onClose} className="p-4 hover:bg-black/5 rounded-full"><X className="w-7 h-7" /></button>
                        </div>
                        <div className="relative mb-10">
                            <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
                                placeholder="Search products, brands, trends..."
                                className="w-full bg-transparent text-4xl lg:text-6xl font-black italic tracking-tighter outline-none placeholder:text-black/10" />
                            <div className="absolute -bottom-3 left-0 w-full h-[2px] bg-black/5 overflow-hidden">
                                <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#2979FF] to-transparent" />
                            </div>
                        </div>
                        {results.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                                {results.map(p => (
                                    <button key={p.id} onClick={() => window.open(p.affiliate_link, '_blank')}
                                        className="text-left border border-black/5 rounded-2xl overflow-hidden transition-all group hover:shadow-lg">
                                        <img src={p.image_url} alt={p.name} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="p-4">
                                            <p className="text-[8px] font-black uppercase tracking-widest text-black/40">{p.brand}</p>
                                            <p className="text-sm font-bold mt-0.5 leading-tight">{p.name}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-xs font-black">₹{Number(p.price).toLocaleString()}</span>
                                                <span className="text-[8px] font-black text-pink-500 flex items-center gap-1"><TrendingUp className="w-2.5 h-2.5" />{p.trend_score}%</span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : query.length > 1 ? (
                            <p className="text-black/30 font-bold text-xl italic mt-8">No results for "{query}"</p>
                        ) : (
                            <div className="flex flex-wrap gap-3 mt-8">
                                {['Leather Jacket', 'Sunscreen', 'Foundation', 'Hoodie', 'Kurta', 'Sneakers', 'Mascara', 'Serum'].map(chip => (
                                    <button key={chip} onClick={() => setQuery(chip)}
                                        className="px-5 py-2.5 border border-black/8 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                                        {chip}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const ProductCard = ({ product, onAnalytics }) => {
    const scoreColor = product.trend_score >= 95 ? 'text-red-500' : product.trend_score >= 88 ? 'text-orange-500' : 'text-pink-500';
    return (
        <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="product-card-premium group">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#EDEDED]">
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    {product.is_trending_now && (
                        <span className="bg-black text-white px-2.5 py-1 text-[7px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
                            <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse" /> Live
                        </span>
                    )}
                    {product.predicted_next_month && (
                        <span className="bg-[#2979FF] text-white px-2.5 py-1 text-[7px] font-black uppercase tracking-widest rounded-full">🔥 Hot</span>
                    )}
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button onClick={() => window.open(product.affiliate_link, '_blank')}
                        className="w-full bg-white text-black py-3 text-[8px] font-black uppercase tracking-widest mb-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#2979FF] hover:text-white transition-colors">
                        <ExternalLink className="w-3 h-3" /> Shop on {product.brand}
                    </button>
                    <button onClick={() => onAnalytics(product)}
                        className="w-full bg-black/80 text-white py-3 text-[8px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-black transition-colors">
                        <Activity className="w-3 h-3" /> Neural Analytics
                    </button>
                </div>
            </div>
            <div className="p-5">
                <p className="text-[8px] font-black uppercase tracking-widest text-black/40 mb-0.5">{product.brand}</p>
                <h4 className="text-[11px] font-bold mb-3 leading-snug line-clamp-2">{product.name}</h4>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-black">₹{Number(product.price).toLocaleString()}</p>
                    <div className={`flex items-center text-[8px] font-black uppercase tracking-widest ${scoreColor}`}>
                        <TrendingUp className="w-3 h-3 mr-1" /> {product.trend_score}%
                    </div>
                </div>
                <p className="text-[8px] font-bold text-green-600 mt-1.5">{product.momentum}</p>
            </div>
        </motion.div>
    );
};

export default function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('clothing');
    const [selectedSubCategory, setSelectedSubCategory] = useState('All');
    const [selectedBrand, setSelectedBrand] = useState('All Brands');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [isSignedIn, setIsSignedIn] = useState(() => localStorage.getItem('isSignedIn') === 'true');
    const [userName, setUserName] = useState(() => localStorage.getItem('userName') || 'Guest');
    const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || '');
    const [profilePic] = useState(() => localStorage.getItem('userProfilePic') || '');

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then(r => r.json())
            .then(data => { if (Array.isArray(data) && data.length > 0) setProducts(data); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!products.length) return;
        const id = setInterval(() => {
            setProducts(ps => ps.map(p => ({
                ...p, trend_score: Number(Math.min(99.9, Math.max(50, p.trend_score + (Math.random() - 0.5) * 0.8)).toFixed(1))
            })));
        }, 2500);
        return () => clearInterval(id);
    }, [products.length]);

    useEffect(() => {
        const fn = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    useEffect(() => { setSelectedSubCategory('All'); setSelectedBrand('All Brands'); }, [activeTab]);

    const tabProducts = products.filter(p => p.category === activeTab);
    const subCategories = ['All', ...new Set(tabProducts.map(p => p.sub_category).filter(Boolean))];
    const brands = ['All Brands', ...new Set(tabProducts.map(p => p.brand))];
    const filtered = tabProducts.filter(p =>
        (selectedSubCategory === 'All' || p.sub_category === selectedSubCategory) &&
        (selectedBrand === 'All Brands' || p.brand === selectedBrand)
    );

    const isPasswordValid = passwordInput.length >= 8 && /[A-Za-z]/.test(passwordInput) && /\d/.test(passwordInput) && /[^A-Za-z\d]/.test(passwordInput);

    const handleLogin = () => {
        const name = emailInput.split('@')[0] || 'Guest';
        setUserName(name); setUserEmail(emailInput); setIsSignedIn(true);
        localStorage.setItem('isSignedIn', 'true'); localStorage.setItem('userName', name); localStorage.setItem('userEmail', emailInput);
        setShowLoginModal(false); setEmailInput(''); setPasswordInput('');
    };
    const handleLogout = () => {
        setIsSignedIn(false); setShowProfile(false);
        ['isSignedIn', 'userName', 'userEmail', 'userProfilePic'].forEach(k => localStorage.removeItem(k));
    };

    const clothingSubCats = ['New In', 'Tops', 'Dresses', 'Bottoms', 'Outerwear', 'Knitwear', 'Ethnic Wear', 'Footwear', 'Bags', 'Jewelry', 'Eyewear', 'Co-ords'];
    const makeupSubCats = ['Foundation', 'Eye Makeup', 'Lip Makeup', 'Blush', 'Highlighter', 'Skincare', 'Nail Care'];

    return (
        <div className="relative min-h-screen selection:bg-pink-500/40 text-black font-sans overflow-x-hidden">
            <div className="aurora-bg">
                <div className="aurora-blob blob-1" /><div className="aurora-blob blob-2" /><div className="aurora-blob blob-3" />
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: 0 }} />

            {/* NAVBAR */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 py-6 ${isScrolled ? 'bg-white/85 backdrop-blur-xl border-b border-black/5 py-4' : 'bg-transparent'}`}>
                <div className="max-w-[1800px] mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-10">
                        <button onMouseEnter={() => setShowMegaMenu(true)} className="flex items-center space-x-3 group">
                            <div className="flex flex-col space-y-1.5">
                                <span className="h-[1px] bg-black w-8 group-hover:translate-x-3 transition-transform duration-500" />
                                <span className="h-[1px] bg-black w-5 group-hover:translate-x-1.5 transition-transform duration-500" />
                                <span className="h-[1px] bg-black w-8" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Menu</span>
                        </button>
                        <div className="hidden lg:flex items-center space-x-8">
                            <button onClick={() => setActiveTab('clothing')} className="text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">Clothing</button>
                            <button onClick={() => setActiveTab('makeup')} className="text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">Makeup</button>
                            <button onClick={() => { setActiveTab('clothing'); setSelectedSubCategory('All'); }} className="text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">Trending Now</button>
                        </div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2"><Logo /></div>
                    <div className="flex items-center space-x-6">
                        <button onClick={() => setShowSearch(true)} className="hover:opacity-50 transition-opacity"><Search className="w-5 h-5 stroke-[1.5px]" /></button>
                        {isSignedIn ? (
                            <button onClick={() => setShowProfile(true)} className="flex items-center space-x-2">
                                <div className="w-7 h-7 rounded-full bg-black/8 border border-black/10 flex items-center justify-center overflow-hidden">
                                    {profilePic ? <img src={profilePic} alt="" className="w-full h-full object-cover" /> : <span className="text-[11px] font-bold">{userName[0]}</span>}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">{userName}</span>
                            </button>
                        ) : (
                            <button onClick={() => setShowLoginModal(true)} className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black/50 hover:border-black transition-all">Sign In</button>
                        )}
                    </div>
                </div>
            </nav>

            {/* MEGA MENU */}
            <AnimatePresence>
                {showMegaMenu && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onMouseEnter={() => setShowMegaMenu(false)} className="fixed inset-0 bg-white/40 backdrop-blur-md z-[55]" />
                        <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}
                            onMouseLeave={() => setShowMegaMenu(false)}
                            className="fixed top-0 left-0 right-0 bg-white border-b border-black/5 pt-28 pb-16 px-12 z-[56] shadow-2xl">
                            <div className="max-w-[1400px] mx-auto grid grid-cols-5 gap-10">
                                <div>
                                    <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-black/40 mb-6">Clothing</h3>
                                    <div className="flex flex-col space-y-3">
                                        {clothingSubCats.slice(0, 7).map(item => (
                                            <button key={item} onClick={() => { setActiveTab('clothing'); setSelectedSubCategory(item); setShowMegaMenu(false); }}
                                                className="text-xl font-black italic tracking-tighter hover:translate-x-3 transition-transform text-left">{item}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-black/40 mb-6">Accessories</h3>
                                    <div className="flex flex-col space-y-3">
                                        {['Footwear', 'Bags', 'Jewelry', 'Eyewear', 'Co-ords'].map(item => (
                                            <button key={item} onClick={() => { setActiveTab('clothing'); setSelectedSubCategory(item); setShowMegaMenu(false); }}
                                                className="text-xl font-black italic tracking-tighter hover:translate-x-3 transition-transform text-left">{item}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-black/40 mb-6">Beauty</h3>
                                    <div className="flex flex-col space-y-3">
                                        {makeupSubCats.map(item => (
                                            <button key={item} onClick={() => { setActiveTab('makeup'); setSelectedSubCategory(item); setShowMegaMenu(false); }}
                                                className="text-xl font-black italic tracking-tighter hover:translate-x-3 transition-transform text-left">{item}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-2 relative group overflow-hidden bg-black rounded-2xl">
                                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" alt="Shop" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" />
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <p className="text-white text-[9px] font-black uppercase tracking-widest mb-2">New Season</p>
                                        <h3 className="text-white text-3xl font-black italic">Discover All Trends</h3>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* LOGIN */}
            <AnimatePresence>
                {showLoginModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl px-4">
                        <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
                            className="glass-card relative w-full max-w-sm p-8 rounded-[2rem] border border-white/10">
                            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-5 text-gray-400 hover:text-white text-2xl">&times;</button>
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-black text-white mb-2">Welcome Back</h2>
                                <p className="text-sm text-gray-400">Sign in to sync your local trends.</p>
                            </div>
                            <div className="space-y-4">
                                <input type="email" value={emailInput} onChange={e => setEmailInput(e.target.value)} placeholder="Email Address"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:ring-2 focus:ring-pink-500/50" />
                                <div className="relative">
                                    <input type={showPassword ? 'text' : 'password'} value={passwordInput} onChange={e => setPasswordInput(e.target.value)} placeholder="Password"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:ring-2 focus:ring-pink-500/50 pr-12" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <button disabled={!isPasswordValid || !emailInput} onClick={handleLogin}
                                    className={`w-full font-bold py-3 rounded-xl mt-2 transition-all ${isPasswordValid && emailInput ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white cursor-pointer' : 'bg-white/10 text-gray-400 cursor-not-allowed'}`}>
                                    Login Securely
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MAIN */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-44 pb-20">
                {/* Hero */}
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-[2.5rem] overflow-hidden mb-12 border border-white/10 glass-card p-10 md:p-16 flex flex-col items-center text-center shadow-2xl">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
                    <div className="inline-flex items-center space-x-2 bg-black/50 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                        <div className="pulse-dot mr-1" /><span className="text-white">Neural Discovery Active</span>
                    </div>
                    <h1 className="heading-jumbo mb-6 leading-tight">
                        {isSignedIn ? <>Welcome back,<br /><span className="text-gradient-accent">{userName}</span></>
                            : <>Discover Tomorrow's<br /><span className="text-gradient-accent">Fashion Today</span></>}
                    </h1>
                    <div className="flex gap-3 flex-wrap justify-center">
                        <button onClick={() => setActiveTab('clothing')} className="bg-gradient-to-r from-pink-500 to-purple-600 px-7 py-3.5 rounded-full text-white font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center">
                            <Sparkles className="w-3.5 h-3.5 mr-2" /> Fashion
                        </button>
                        <button onClick={() => setActiveTab('makeup')} className="bg-black text-white px-7 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center hover:bg-[#2979FF] transition-colors">
                            <Heart className="w-3.5 h-3.5 mr-2" /> Makeup & Beauty
                        </button>
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-2">
                    {[
                        { label: 'Live Products', value: products.length },
                        { label: 'Trending Now', value: products.filter(p => p.is_trending_now).length },
                        { label: 'Hot Picks', value: products.filter(p => p.predicted_next_month).length },
                        { label: 'Avg Score', value: products.length ? (products.reduce((a, p) => a + p.trend_score, 0) / products.length).toFixed(1) + '%' : '—' }
                    ].map(s => (
                        <div key={s.label} className="flex-shrink-0 border border-black/8 rounded-2xl px-5 py-3">
                            <p className="text-lg font-black">{s.value}</p>
                            <p className="text-[8px] font-black uppercase tracking-widest text-black/40">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-5">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex space-x-1 bg-black/5 p-1 rounded-full border border-black/5">
                            {['clothing', 'makeup'].map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)}
                                    className={`relative px-7 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-white' : 'text-black/40 hover:text-black'}`}>
                                    {activeTab === tab && <motion.div layoutId="activeTab" className="absolute inset-0 bg-black rounded-full z-[-1]" />}
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-0.5 max-w-lg">
                            {subCategories.map(s => (
                                <button key={s} onClick={() => setSelectedSubCategory(s)}
                                    className={`flex-shrink-0 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${selectedSubCategory === s ? 'bg-black text-white border-black' : 'border-black/10 text-black/50 hover:border-black/30'}`}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center gap-2 bg-black/5 px-4 py-2.5 rounded-full">
                            <span className="text-[9px] font-black text-black/30 uppercase tracking-widest">Brand</span>
                            <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}
                                className="bg-transparent text-[9px] font-black uppercase tracking-widest outline-none">
                                {brands.map(b => <option key={b}>{b}</option>)}
                            </select>
                        </div>
                        {(selectedSubCategory !== 'All' || selectedBrand !== 'All Brands') && (
                            <button onClick={() => { setSelectedSubCategory('All'); setSelectedBrand('All Brands'); }}
                                className="text-[8px] font-black uppercase tracking-widest border-b border-black">Clear</button>
                        )}
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-40">
                        <div className="flex flex-col items-center gap-4">
                            <Cpu className="w-8 h-8 text-[#2979FF] animate-pulse" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Neural Engine Loading...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-[9px] font-black uppercase tracking-widest text-black/30 mb-6">{filtered.length} products</p>
                        <div className="product-grid">
                            {filtered.map(p => <ProductCard key={p.id} product={p} onAnalytics={setSelectedProduct} />)}
                        </div>
                        {filtered.length === 0 && (
                            <div className="text-center py-32">
                                <p className="text-4xl font-black italic text-black/10">No products found</p>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Profile */}
            <AnimatePresence>
                {showProfile && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setShowProfile(false)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]" />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            className="fixed top-0 right-0 h-full w-full max-w-sm glass z-[70] p-8">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-xl font-black uppercase">Profile</h2>
                                <button onClick={() => setShowProfile(false)}><X className="w-6 h-6" /></button>
                            </div>
                            <div className="flex flex-col items-center mb-10">
                                <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center text-white text-2xl font-black mb-3 overflow-hidden">
                                    {profilePic ? <img src={profilePic} alt="" className="w-full h-full object-cover" /> : userName[0]}
                                </div>
                                <h3 className="text-lg font-black">{userName}</h3>
                                <p className="text-xs text-black/40">{userEmail}</p>
                            </div>
                            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-black text-[10px] uppercase tracking-widest bg-red-50 rounded-2xl">
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selectedProduct && <ProductAnalyticsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
            </AnimatePresence>
            <SearchOverlay show={showSearch} onClose={() => setShowSearch(false)} products={products} />

            <footer className="bg-black text-white py-16 px-12 mt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <Logo className="invert" />
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-30 text-center">Trendly.Ai Archive 2026 // Neural Fashion Discovery</p>
                </div>
            </footer>
        </div>
    );
}
