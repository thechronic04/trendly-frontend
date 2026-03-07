import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag, Search, ChevronRight, Star, TrendingUp, Zap, Activity, Cpu, Eye, EyeOff, User, Settings, Heart, X, LogOut, Camera } from 'lucide-react';

// Container Variants for staggering children
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
};

export default function App() {
    const [activeTab, setActiveTab] = useState('clothing');
    const [selectedBrand, setSelectedBrand] = useState('All Brands');
    const [isScrolled, setIsScrolled] = useState(false);

    const [isSignedIn, setIsSignedIn] = useState(() => {
        return localStorage.getItem("isSignedIn") === "true";
    });
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [userName, setUserName] = useState(() => {
        return localStorage.getItem("userName") || "Guest";
    });
    const [userEmail, setUserEmail] = useState(() => {
        return localStorage.getItem("userEmail") || "";
    });

    // Real-time password validation logic
    const hasLength = passwordInput.length >= 8;
    const hasLetter = /(?=.*[A-Za-z])/.test(passwordInput);
    const hasNumber = /(?=.*\d)/.test(passwordInput);
    const hasSymbol = /(?=.*[^A-Za-z\d])/.test(passwordInput);
    const isPasswordValid = hasLength && hasLetter && hasNumber && hasSymbol;

    // Fallback mock data with high-end aesthetic imagery
    const mockProducts = [
        // CLOTHING
        {
            id: 1,
            name: "Oversized Vintage Leather Moto Jacket",
            brand: "AllSaints",
            price: 329.00,
            category: "clothing",
            image_url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
            affiliate_link: "https://www.allsaints.com/us/men/jackets/leather-jackets",
            trend_score: 95.8,
            predicted_next_month: true,
            momentum: "+24% 7d"
        },
        {
            id: 3,
            name: "Parachute Cargo Utility Pants",
            brand: "Urban Outfitters",
            price: 75.00,
            category: "clothing",
            image_url: "https://images.unsplash.com/photo-1542280756-74b2f55e73e1?w=500&q=80",
            affiliate_link: "https://www.urbanoutfitters.com/mens-pants",
            trend_score: 88.0,
            predicted_next_month: false,
            momentum: "-5% 7d"
        },
        {
            id: 5,
            name: "Asymmetric Satin Slip Midi",
            brand: "& Other Stories",
            price: 129.00,
            category: "clothing",
            image_url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80",
            affiliate_link: "https://www.stories.com/en_usd/clothing/dresses.html",
            trend_score: 89.5,
            predicted_next_month: true,
            momentum: "+12% 7d"
        },
        {
            id: 7,
            name: "Chunky Loafers w/ Hardware",
            brand: "Prada",
            price: 1150.00,
            category: "clothing",
            image_url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
            affiliate_link: "https://www.prada.com/us/en/p/monolith-brushed-leather-loafers/1D649M_B4L_F0002_F_B055",
            trend_score: 97.4,
            predicted_next_month: true,
            momentum: "+42% 7d"
        },
        {
            id: 8,
            name: "Ribbed Knit Halter Top",
            brand: "Zara",
            price: 25.90,
            category: "clothing",
            image_url: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=500&q=80",
            affiliate_link: "https://www.zara.com/us/en/woman-tops-l1322.html",
            trend_score: 82.1,
            predicted_next_month: false,
            momentum: "Steady"
        },
        {
            id: 9,
            name: "Relaxed Fit Trench Coat",
            brand: "Burberry",
            price: 2490.00,
            category: "clothing",
            image_url: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&q=80",
            affiliate_link: "https://us.burberry.com/womens-trench-coats/",
            trend_score: 91.0,
            predicted_next_month: true,
            momentum: "+18% 7d"
        },

        // MAKEUP
        {
            id: 2,
            name: "Soft Pinch Liquid Blush - Virtue",
            brand: "Rare Beauty",
            price: 23.00,
            category: "makeup",
            image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80",
            affiliate_link: "https://www.sephora.com/product/rare-beauty-by-selena-gomez-soft-pinch-liquid-blush-P498484",
            trend_score: 98.2,
            predicted_next_month: true,
            momentum: "+45% 7d"
        },
        {
            id: 4,
            name: "Cherry Glow Lip Oil Hybrid",
            brand: "Dior",
            price: 40.00,
            category: "makeup",
            image_url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80",
            affiliate_link: "https://www.sephora.com/product/dior-lip-glow-oil-P453814",
            trend_score: 99.1,
            predicted_next_month: true,
            momentum: "+80% 7d"
        },
        {
            id: 6,
            name: "Peptide Glazing Fluid Base",
            brand: "Rhode",
            price: 29.00,
            category: "makeup",
            image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
            affiliate_link: "https://www.rhodeskin.com/products/peptide-glazing-fluid",
            trend_score: 93.4,
            predicted_next_month: false,
            momentum: "Steady"
        },
        {
            id: 10,
            name: "Flawless Filter Foundation",
            brand: "Charlotte Tilbury",
            price: 49.00,
            category: "makeup",
            image_url: "https://images.unsplash.com/photo-1512496015851-a1fbcf69f59f?w=500&q=80",
            affiliate_link: "https://www.sephora.com/product/hollywood-flawless-filter-P431108",
            trend_score: 96.5,
            predicted_next_month: true,
            momentum: "+33% 7d"
        },
        {
            id: 11,
            name: "Liquid Liner Pen - Intense Black",
            brand: "Fenty Beauty",
            price: 24.00,
            category: "makeup",
            image_url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=80",
            affiliate_link: "https://fentybeauty.com/products/flyliner-longwear-liquid-eyeliner-cuz-im-black",
            trend_score: 87.2,
            predicted_next_month: false,
            momentum: "-2% 7d"
        },
        {
            id: 12,
            name: "Luminous Silk Concealer",
            brand: "Armani Beauty",
            price: 3900.00,
            category: "makeup",
            image_url: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&q=80",
            affiliate_link: "https://www.sephora.com/product/armani-beauty-luminous-silk-face-under-eye-concealer-P456632",
            trend_score: 90.8,
            predicted_next_month: true,
            momentum: "+14% 7d"
        },
        // MYNTRA, AJIO & NYKAA (INDIA TIER-1 EXCLUSIVES)
        {
            id: 13,
            name: "Libas Embroidered Kurta Set",
            brand: "Myntra",
            price: 2499.00,
            category: "clothing",
            image_url: "https://images.unsplash.com/photo-1583391733958-d25e07fac0ce?w=500&q=80",
            affiliate_link: "https://www.myntra.com/kurta-sets/libas/libas-women-embroidered-kurta-set",
            trend_score: 97.5,
            predicted_next_month: true,
            momentum: "+52% 7d"
        },
        {
            id: 14,
            name: "DNMX Graphic Print T-Shirt",
            brand: "Ajio",
            price: 699.00,
            category: "clothing",
            image_url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80",
            affiliate_link: "https://www.ajio.com/dnmx-men-typographic-print-crew-neck-t-shirt",
            trend_score: 88.0,
            predicted_next_month: false,
            momentum: "+15% 7d"
        },
        {
            id: 15,
            name: "H&M Wide Leg Cargo Pants",
            brand: "Myntra (H&M)",
            price: 2299.00,
            category: "clothing",
            image_url: "https://images.unsplash.com/photo-1542280756-74b2f55e73e1?w=500&q=80",
            affiliate_link: "https://www.myntra.com/trousers/hm",
            trend_score: 94.2,
            predicted_next_month: true,
            momentum: "+38% 7d"
        },
        {
            id: 16,
            name: "Puma Suede Classic Sneakers",
            brand: "Ajio (Puma)",
            price: 4599.00,
            category: "clothing",
            image_url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
            affiliate_link: "https://www.ajio.com/men-sneakers/c/830207010",
            trend_score: 96.0,
            predicted_next_month: true,
            momentum: "+28% 7d"
        },
        {
            id: 17,
            name: "Maybelline Fit Me Foundation",
            brand: "Nykaa",
            price: 599.00,
            category: "makeup",
            image_url: "https://images.unsplash.com/photo-1512496015851-a1fbcf69f59f?w=500&q=80",
            affiliate_link: "https://www.nykaa.com/makeup/face/foundation/c/245",
            trend_score: 92.5,
            predicted_next_month: false,
            momentum: "Steady"
        },
        {
            id: 18,
            name: "Kay Beauty Matte Lipstick",
            brand: "Nykaa (Kay Beauty)",
            price: 999.00,
            category: "makeup",
            image_url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80",
            affiliate_link: "https://www.nykaa.com/makeup/lips/lipstick/c/240",
            trend_score: 98.8,
            predicted_next_month: true,
            momentum: "+45% 7d"
        }
    ];

    const [products, setProducts] = useState(mockProducts);

    // Monitor Scroll for Navbar Glass Effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Reset brand filter when switching tabs
    useEffect(() => {
        setSelectedBrand("All Brands");
    }, [activeTab]);

    const handleLogout = () => {
        setIsSignedIn(false);
        setShowProfile(false);
        localStorage.removeItem("isSignedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
    };

    const handleLogin = () => {
        const derivedName = emailInput.split('@')[0] || "Guest";
        setUserName(derivedName);
        setUserEmail(emailInput);
        setIsSignedIn(true);
        localStorage.setItem("isSignedIn", "true");
        localStorage.setItem("userName", derivedName);
        localStorage.setItem("userEmail", emailInput);
        setShowLoginModal(false);
        setEmailInput("");
        setPasswordInput("");
    };

    const currentTabProducts = products.filter(p => p.category === activeTab);
    const availableBrands = ["All Brands", ...new Set(currentTabProducts.map(p => p.brand))];
    const filteredProducts = selectedBrand === "All Brands"
        ? currentTabProducts
        : currentTabProducts.filter(p => p.brand === selectedBrand);

    // Simulate real-time neural network updates
    useEffect(() => {
        // Poll every 2.5 seconds to simulate incoming live social data
        const interval = setInterval(() => {
            setProducts(currentProducts =>
                currentProducts.map(product => {
                    // Random small fluctuation in AI trend score 
                    const fluctuation = (Math.random() - 0.5) * 0.8;
                    const newScore = Math.min(99.9, Math.max(50, product.trend_score + fluctuation));

                    return {
                        ...product,
                        trend_score: newScore
                    };
                })
            );
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen selection:bg-pink-500/40 text-white font-sans overflow-x-hidden">

            {/* Aurora Background Layers */}
            <div className="aurora-bg">
                <div className="aurora-blob blob-1"></div>
                <div className="aurora-blob blob-2"></div>
                <div className="aurora-blob blob-3"></div>
            </div>

            {/* Floating Nano-Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: 0 }}></div>

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'glass border-white/10 shadow-2xl' : 'bg-transparent border-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
                    <div className="flex justify-between items-center">

                        <div className="flex items-center space-x-3 cursor-pointer group">
                            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform">
                                <Cpu className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-extrabold text-2xl tracking-tighter text-white">
                                Trendly<span className="text-pink-400">.ai</span>
                            </span>
                        </div>

                        {/* Top Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-8 ml-8">
                            <a href="#" className="text-sm font-bold text-white hover:text-pink-400 transition-colors border-b-2 border-pink-500 pb-1">Home</a>
                            <a href="#" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Features</a>
                            <a href="#" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Menu/Categories</a>
                        </div>

                        <div className="hidden md:flex flex-1 max-w-xl mx-8">
                            <div className="relative w-full group">
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                                <div className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-full">
                                    <Search className="absolute left-4 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search AI predicted trends..."
                                        className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-0"
                                    />
                                    <div className="absolute right-2 px-2 py-1 bg-white/10 rounded-full border border-white/5 flex items-center space-x-1">
                                        <kbd className="text-[10px] font-mono text-gray-300">⌘</kbd>
                                        <kbd className="text-[10px] font-mono text-gray-300">K</kbd>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            {isSignedIn ? (
                                <div className="flex items-center space-x-4">
                                    <div
                                        onClick={() => setShowProfile(true)}
                                        className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 p-1.5 pr-4 rounded-full border border-white/10 transition-all cursor-pointer group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xs font-bold border border-white/20 group-hover:scale-105 transition-transform">
                                            {userName.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-semibold text-white hidden sm:block">{userName}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowLoginModal(true)}
                                    className="text-sm font-semibold text-gray-300 hover:text-white transition-colors tracking-wide hidden sm:block"
                                >
                                    Sign In
                                </button>
                            )}
                            <button className="relative px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:bg-gray-100 transform hover:scale-105 transition-all outline-none">
                                Get Premium
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Login Modal Overlay */}
            <AnimatePresence>
                {showLoginModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl px-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-card relative w-full max-w-sm p-8 rounded-[2rem] border border-white/10"
                        >
                            <button
                                onClick={() => setShowLoginModal(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
                            >
                                &times;
                            </button>
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-black text-white mb-2">Welcome Back</h2>
                                <p className="text-sm text-gray-400">Sign in to sync your local trends.</p>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="email"
                                    value={emailInput}
                                    onChange={(e) => { setEmailInput(e.target.value); setLoginError(""); }}
                                    placeholder="Email Address"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                                />
                                <div className="space-y-2">
                                    <div className="relative w-full">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={passwordInput}
                                            onChange={(e) => setPasswordInput(e.target.value)}
                                            placeholder="Password"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    {/* Real-time Checklist */}
                                    {passwordInput.length > 0 && !isPasswordValid && (
                                        <div className="bg-black/40 border border-white/5 rounded-lg p-3 mt-2 grid grid-cols-2 gap-2 text-xs font-semibold">
                                            <div className={`flex items-center ${hasLength ? 'text-green-400' : 'text-gray-500'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full mr-2 ${hasLength ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                                                8+ Characters
                                            </div>
                                            <div className={`flex items-center ${hasLetter ? 'text-green-400' : 'text-gray-500'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full mr-2 ${hasLetter ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                                                Includes Letter
                                            </div>
                                            <div className={`flex items-center ${hasNumber ? 'text-green-400' : 'text-gray-500'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full mr-2 ${hasNumber ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                                                Includes Number
                                            </div>
                                            <div className={`flex items-center ${hasSymbol ? 'text-green-400' : 'text-gray-500'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full mr-2 ${hasSymbol ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                                                Includes Symbol
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button
                                    disabled={!isPasswordValid || emailInput.length === 0}
                                    onClick={handleLogin}
                                    className={`w-full font-bold py-3 rounded-xl transition-all mt-4 shadow-lg ${isPasswordValid && emailInput.length > 0
                                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 shadow-pink-500/20 cursor-pointer"
                                        : "bg-white/10 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    Login Securely
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative rounded-[2.5rem] overflow-hidden mb-16 border border-white/10 glass-card p-10 md:p-16 lg:p-20 flex flex-col items-center text-center shadow-2xl"
                >
                    {/* Internal Glow Effects */}
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="inline-flex items-center space-x-2 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
                    >
                        <div className="pulse-dot mr-1"></div>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">Live Prediction Engine Active</span>
                    </motion.div>

                    {isSignedIn ? (
                        <>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.1] text-glow">
                                <span className="text-white">Welcome back,</span><br />
                                <span className="text-gradient-accent">{userName}.</span>
                            </h1>

                            <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-medium mb-10 leading-relaxed">
                                Your AI Stylist has scanned your synced closet and analyzed your local area. Here are the customized trends matching your aesthetics.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-full text-white font-bold text-lg shadow-[0_10px_40px_rgba(236,72,153,0.4)] flex items-center"
                                >
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Generate Daily Outfit
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="glass px-8 py-4 rounded-full text-white font-bold text-lg transition-colors flex items-center border-green-500/30"
                                >
                                    <Activity className="w-5 h-5 mr-2 text-green-400" />
                                    Closet Synced (142 Items)
                                </motion.button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.1] text-glow">
                                <span className="text-white">Discover Tomorrow’s</span><br />
                                <span className="text-gradient-accent">Fashion Today.</span>
                            </h1>

                            <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-medium mb-10 leading-relaxed">
                                Our neural networks analyze millions of real-time social signals to predict the hottest fashion and makeup trends before they peak.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-full text-white font-bold text-lg shadow-[0_10px_40px_rgba(236,72,153,0.4)] flex items-center"
                                >
                                    <Zap className="w-5 h-5 mr-2" />
                                    View Hyper-Local Trends
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="glass px-8 py-4 rounded-full text-white font-bold text-lg hover:bg-white/10 transition-colors flex items-center"
                                >
                                    <Activity className="w-5 h-5 mr-2" />
                                    Sync Your Closet
                                </motion.button>
                            </div>
                        </>
                    )}
                </motion.div>

                {/* Tab Selection */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-10 border-b border-white/10 pb-4">
                    <div className="flex space-x-2 mb-4 sm:mb-0 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-xl">
                        <button
                            onClick={() => setActiveTab('clothing')}
                            className={`relative px-8 py-3 rounded-full text-sm font-bold transition-all z-10 ${activeTab === 'clothing' ? 'text-black' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {activeTab === 'clothing' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white rounded-full shadow-lg z-[-1]"
                                />
                            )}
                            <span className="flex items-center"><ShoppingBag className="w-4 h-4 mr-2" /> Clothing</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('makeup')}
                            className={`relative px-8 py-3 rounded-full text-sm font-bold transition-all z-10 ${activeTab === 'makeup' ? 'text-black' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {activeTab === 'makeup' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white rounded-full shadow-lg z-[-1]"
                                />
                            )}
                            <span className="flex items-center"><Sparkles className="w-4 h-4 mr-2" /> Makeup</span>
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-4 sm:mb-0">
                        {/* Brand Filter */}
                        <div className="flex items-center space-x-2 bg-black/40 p-1.5 rounded-full border border-white/10 backdrop-blur-xl px-4 py-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mr-2">Brand</span>
                            <select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className="bg-transparent text-white text-sm font-semibold focus:outline-none appearance-none cursor-pointer"
                            >
                                {availableBrands.map(brand => (
                                    <option key={brand} value={brand} className="bg-gray-900 text-white">{brand}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                            {isSignedIn ? (
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 flex items-center">
                                    Personalised Feed Active <Activity className="w-3 h-3 ml-1" />
                                </span>
                            ) : (
                                <>
                                    <span>Powered by</span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center">
                                        Trendly NLP <Cpu className="w-3 h-3 ml-1" />
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Grid Animation Container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    key={activeTab} // Retriggers animation on tab switch
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredProducts.map((product) => (
                        <motion.div
                            variants={itemVariants}
                            key={product.id}
                            className="group glass-card rounded-[2rem] p-4 flex flex-col relative overflow-hidden"
                        >
                            {/* Product Image Wrapper */}
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/5 mb-6">
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform duration-700 ease-[cubic-bezier(0.25, 1, 0.5, 1)] group-hover:scale-110 group-hover:rotate-1"
                                />

                                {/* Image Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                {/* AI Score Badge */}
                                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-xl border border-white/20 text-white text-xs font-black px-3 py-2 rounded-xl flex items-center shadow-lg">
                                    <Star className="w-3.5 h-3.5 text-pink-400 mr-1.5 fill-pink-400" />
                                    {product.trend_score.toFixed(1)} / 100
                                </div>

                                {/* Tags */}
                                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                                    {product.predicted_next_month && (
                                        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                                            🔥 Next Month's Trend
                                        </div>
                                    )}
                                    <div className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1.5 rounded-lg flex items-center whitespace-nowrap">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        {product.momentum}
                                    </div>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="px-2 flex-1 flex flex-col justify-between z-10">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{product.brand}</p>
                                        <p className="text-white text-lg font-black">₹{product.price.toLocaleString('en-IN')}</p>
                                    </div>
                                    <h3 className="font-semibold text-lg text-white leading-tight mb-4">{product.name}</h3>
                                </div>

                                <a
                                    href={product.affiliate_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    referrerPolicy="no-referrer"
                                    className="w-full mt-4 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white text-sm font-bold py-3.5 rounded-xl flex items-center justify-center transition-all group/btn"
                                >
                                    Find Similar & Buy
                                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

            </main>

            {/* Profile Sidebar */}
            <AnimatePresence>
                {showProfile && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowProfile(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-sm glass border-l border-white/10 z-[70] p-8 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-2xl font-black tracking-tight">Your Profile</h2>
                                <button
                                    onClick={() => setShowProfile(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* User Profile Info */}
                            <div className="flex flex-col items-center mb-10">
                                <div className="relative mb-4 group">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-3xl font-black border-2 border-white/20 shadow-2xl">
                                        {userName.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="absolute bottom-0 right-0 p-1.5 bg-white text-black rounded-full border-4 border-[#111] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Camera className="w-4 h-4" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold">{userName}</h3>
                                <p className="text-gray-400 text-sm">{userEmail}</p>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
                                    <p className="text-2xl font-black text-pink-400">24</p>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Liked Trends</p>
                                </div>
                                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
                                    <p className="text-2xl font-black text-purple-400">142</p>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Closet Items</p>
                                </div>
                            </div>

                            {/* Menu Links */}
                            <div className="space-y-2 mb-10">
                                <button className="w-full flex items-center space-x-4 p-4 hover:bg-white/5 rounded-2xl transition-all group">
                                    <div className="p-2 bg-pink-500/10 rounded-xl group-hover:bg-pink-500/20 transition-colors">
                                        <Heart className="w-5 h-5 text-pink-400" />
                                    </div>
                                    <span className="font-bold text-gray-300 group-hover:text-white">Saved Outfits</span>
                                </button>
                                <button className="w-full flex items-center space-x-4 p-4 hover:bg-white/5 rounded-2xl transition-all group">
                                    <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                                        <ShoppingBag className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <span className="font-bold text-gray-300 group-hover:text-white">Trend History</span>
                                </button>
                                <button className="w-full flex items-center space-x-4 p-4 hover:bg-white/5 rounded-2xl transition-all group">
                                    <div className="p-2 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                                        <Settings className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <span className="font-bold text-gray-300 group-hover:text-white">Settings</span>
                                </button>
                            </div>

                            {/* Bottom Actions */}
                            <div className="pt-6 border-t border-white/10">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center space-x-2 p-4 text-gray-400 hover:text-red-400 transition-colors font-bold"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Sign Out of Trendly</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
