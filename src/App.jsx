import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, ChevronRight, Star, TrendingUp, Zap, Activity, Cpu, User, Settings, Heart, X, LogOut, Camera, Eye, EyeOff } from 'lucide-react';



export default function App() {
    const [activeTab, setActiveTab] = useState('clothing');
    const [selectedBrand, setSelectedBrand] = useState('All Brands');
    const [selectedSubCategory, setSelectedSubCategory] = useState('All');
    const [selectedCollection, setSelectedCollection] = useState('All');
    const [isScrolled, setIsScrolled] = useState(false);

    const [isSignedIn, setIsSignedIn] = useState(() => {
        return localStorage.getItem("isSignedIn") === "true";
    });
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [showProfile, setShowProfile] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [tempName, setTempName] = useState("");
    const [profilePic, setProfilePic] = useState(() => {
        return localStorage.getItem("userProfilePic") || "";
    });
    const [userName, setUserName] = useState(() => {
        return localStorage.getItem("userName") || "Guest";
    });
    const [userEmail, setUserEmail] = useState(() => {
        return localStorage.getItem("userEmail") || "";
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");

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
            price: 24999.00,
            category: "clothing",
            subCategory: "Outerwear",
            collection: "New In",
            image_url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
            affiliate_link: "https://www.allsaints.com/",
            trend_score: 95.8,
            predicted_next_month: true,
            momentum: "+24% 7d"
        },
        {
            id: 2,
            name: "Premium Cotton Oxford Shirt",
            brand: "The Bear House",
            price: 2499.00,
            category: "clothing",
            subCategory: "Tops",
            collection: "Ready to Wear",
            image_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
            affiliate_link: "https://thebearhouse.com/",
            trend_score: 87.5,
            predicted_next_month: false,
            momentum: "Steady"
        },
        {
            id: 3,
            name: "Urban Minimalist Tech Shorts",
            brand: "Hermod",
            price: 1899.00,
            category: "clothing",
            subCategory: "Denim", // Grouped as bottoms/denim-adjacent for this mock
            collection: "Urban Street",
            image_url: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
            affiliate_link: "https://hermod.in/",
            trend_score: 91.2,
            predicted_next_month: true,
            momentum: "+15% 7d"
        },
        {
            id: 4,
            name: "Oversized Streetwear Hoodie",
            brand: "Bonkers",
            price: 1599.00,
            category: "clothing",
            subCategory: "Knitwear", // Hoodies/Sweats category
            collection: "New In",
            image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
            affiliate_link: "https://www.bonkerscorner.com/",
            trend_score: 98.4,
            predicted_next_month: true,
            momentum: "+64% 7d"
        },
        {
            id: 5,
            name: "Asymmetric Satin Slip Midi",
            brand: "Zara",
            price: 3499.00,
            category: "clothing",
            subCategory: "Tops", // Categorized as tops/dresses
            collection: "Quiet Luxury",
            image_url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
            affiliate_link: "https://www.zara.com/",
            trend_score: 89.5,
            predicted_next_month: true,
            momentum: "+12% 7d"
        },
        {
            id: 6,
            name: "Wide Leg Cargo Pants",
            brand: "H&M",
            price: 2299.00,
            category: "clothing",
            subCategory: "Denim",
            collection: "Ready to Wear",
            image_url: "https://images.unsplash.com/photo-1542280756-74b2f55e73e1?w=800&q=80",
            affiliate_link: "https://www2.hm.com/",
            trend_score: 94.2,
            predicted_next_month: true,
            momentum: "+38% 7d"
        },
        {
            id: 7,
            name: "Libas Embroidered Kurta Set",
            brand: "Myntra",
            price: 4599.00,
            category: "clothing",
            subCategory: "Knitwear",
            collection: "Selected Edits",
            image_url: "https://images.unsplash.com/photo-1583391733958-d25e07fac0ce?w=800&q=80",
            affiliate_link: "https://www.myntra.com/",
            trend_score: 97.5,
            predicted_next_month: true,
            momentum: "+52% 7d"
        },
        {
            id: 8,
            name: "Urban Explorer Backpack",
            brand: "Hermod",
            price: 3499.00,
            category: "clothing",
            subCategory: "Bags",
            collection: "Accessories",
            image_url: "https://images.unsplash.com/photo-1553062407-98eeb94c6a62?w=800&q=80",
            affiliate_link: "https://hermod.in/",
            trend_score: 92.4,
            predicted_next_month: true,
            momentum: "+8% 7d"
        },

        // MAKEUP
        {
            id: 9,
            name: "Soft Pinch Liquid Blush",
            brand: "Nykaa",
            price: 2499.00,
            category: "makeup",
            subCategory: "Tops", // Visual categories for makeup if needed
            image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
            affiliate_link: "https://www.nykaa.com/",
            trend_score: 98.2,
            predicted_next_month: true,
            momentum: "+45% 7d"
        },
        {
            id: 10,
            name: "Cherry Glow Lip Oil",
            brand: "Nykaa",
            price: 4200.00,
            category: "makeup",
            subCategory: "Jewelry",
            image_url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80",
            affiliate_link: "https://www.nykaa.com/",
            trend_score: 99.1,
            predicted_next_month: true,
            momentum: "+80% 7d"
        },
        {
            id: 11,
            name: "Kay Beauty Matte Lipstick",
            brand: "Nykaa",
            price: 1200.00,
            category: "makeup",
            subCategory: "Jewelry",
            image_url: "https://images.unsplash.com/photo-1625091392900-53bc07684617?w=800&q=80",
            affiliate_link: "https://www.nykaa.com/",
            trend_score: 98.8,
            predicted_next_month: true,
            momentum: "+45% 7d"
        },
        {
            id: 12,
            name: "Liquid Liner Pen",
            brand: "Nykaa",
            price: 899.00,
            category: "makeup",
            subCategory: "Eyewear",
            image_url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
            affiliate_link: "https://www.nykaa.com/",
            trend_score: 87.2,
            predicted_next_month: false,
            momentum: "-2% 7d"
        }
    ];

    const [products, setProducts] = useState(mockProducts);

    // Derived filtering logic
    const currentTabProducts = products.filter(p => p.category === activeTab);
    const availableBrands = ["All Brands", ...new Set(currentTabProducts.map(p => p.brand))];

    // Multi-dimensional filter
    const filteredProducts = currentTabProducts.filter(product => {
        const matchesBrand = selectedBrand === "All Brands" || product.brand === selectedBrand;
        const matchesSubCategory = selectedSubCategory === "All" || product.subCategory === selectedSubCategory;
        const matchesCollection = selectedCollection === "All" || product.collection === selectedCollection;
        return matchesBrand && matchesSubCategory && matchesCollection;
    });

    const handleClearFilters = () => {
        setSelectedBrand("All Brands");
        setSelectedSubCategory("All");
        setSelectedCollection("All");
    };

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

    // Monitor Scroll for Navbar Glass Effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Reset filters when switching tabs is handled by a consolidated useEffect further down

    const handleLogout = () => {
        setIsSignedIn(false);
        setShowProfile(false);
        localStorage.removeItem("isSignedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userProfilePic");
        setProfilePic("");
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

    const handleSaveName = () => {
        if (tempName.trim()) {
            setUserName(tempName);
            localStorage.setItem("userName", tempName);
            setIsEditingName(false);
        }
    };

    const handleLinkGoogle = () => {
        // Mocking a Google profile picture fetch
        const mockGooglePic = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop";
        setProfilePic(mockGooglePic);
        localStorage.setItem("userProfilePic", mockGooglePic);
    };

    // Reset filters when switching tabs
    useEffect(() => {
        handleClearFilters();
    }, [activeTab]);

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

    const SearchOverlay = () => (
        <AnimatePresence>
            {showSearch && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-2xl p-12 overflow-hidden"
                >
                    <div className="max-w-[1400px] mx-auto h-full flex flex-col">
                        <div className="flex justify-between items-center mb-20">
                            <div className="flex items-center space-x-4">
                                <Cpu className="w-5 h-5 text-[#2979FF] animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">Neural Search Active</span>
                            </div>
                            <button onClick={() => setShowSearch(false)} className="group p-4 hover:bg-black/5 rounded-full transition-all">
                                <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                        </div>

                        <div className="relative mb-24">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search Trends, Aesthetics, or Brands..."
                                className="w-full bg-transparent text-6xl md:text-8xl font-black italic tracking-tighter outline-none placeholder:text-black/5"
                            />
                            <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-black/5 overflow-hidden">
                                <motion.div
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#2979FF] to-transparent"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center">
                                    <Sparkles className="w-4 h-4 mr-3 text-pink-500" /> Live Social Trends
                                </h3>
                                <div className="space-y-6">
                                    {['#QuietLuxury', '#UrbanExplorer', '#EveningNoir', '#ArchiveFashion'].map(tag => (
                                        <div key={tag} className="flex items-center justify-between group cursor-pointer">
                                            <span className="text-xl font-bold group-hover:underline italic">{tag}</span>
                                            <TrendingUp className="w-4 h-4 opacity-0 group-hover:opacity-100 text-green-500 transition-all" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8">Quick Discovery</h3>
                                <div className="flex flex-wrap gap-4">
                                    {['Oversized', 'Leather', 'Monochrome', 'Vintage', 'Sustainable', 'Streetwear'].map(chip => (
                                        <button key={chip} className="px-6 py-3 border border-black/5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-[#EDEDED] p-8 rounded-[2rem] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#2979FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h4 className="text-sm font-black mb-4 relative">AI Trend Prediction</h4>
                                <p className="text-xs text-black/40 leading-relaxed mb-6 relative font-medium">
                                    Our neural engines predict a 42% surge in "Distressed Denim" within the next 72 hours across urban hubs.
                                </p>
                                <button className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-black pb-1 relative">Explore Now</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="relative min-h-screen selection:bg-pink-500/40 text-black font-sans overflow-x-hidden">

            {/* Aurora Background Layers */}
            <div className="aurora-bg">
                <div className="aurora-blob blob-1"></div>
                <div className="aurora-blob blob-2"></div>
                <div className="aurora-blob blob-3"></div>
            </div>

            {/* Floating Nano-Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: 0 }}></div>

            {/* Zara-Style Navbar */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 py-8 ${isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-black/5 py-4" : "bg-transparent"
                    }`}
            >
                <div className="max-w-[1800px] mx-auto flex items-center justify-between">

                    {/* Left: Menu & Categories */}
                    <div className="flex items-center space-x-12">
                        <button
                            onMouseEnter={() => setShowMegaMenu(true)}
                            className="flex items-center space-x-3 group"
                        >
                            <div className="flex flex-col space-y-1.5 overflow-hidden">
                                <span className={`h-[1px] bg-black transition-all duration-500 w-8 group-hover:translate-x-4`} />
                                <span className={`h-[1px] bg-black transition-all duration-500 w-5 group-hover:translate-x-2`} />
                                <span className={`h-[1px] bg-black transition-all duration-500 w-8 group-hover:translate-x-0`} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Menu</span>
                        </button>

                        <div className="hidden lg:flex items-center space-x-8">
                            {['New Arrivals', 'Collections', 'Editorial'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        if (item === 'New Arrivals') setSelectedCollection('New In');
                                        else if (item === 'Collections') setSelectedCollection('Ready to Wear');
                                        else if (item === 'Editorial') document.getElementById('editorial-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-50 transition-opacity"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Center: Brand Identity */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <Logo className="scale-75 md:scale-100" />
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-8">
                        <button onClick={() => setShowSearch(true)} className="hover:opacity-50 transition-opacity">
                            <Search className="w-5 h-5 stroke-[1.5px]" />
                        </button>

                        {isSignedIn ? (
                            <div className="flex items-center space-x-6">
                                <button
                                    onClick={() => setShowProfile(true)}
                                    className="flex items-center space-x-2 group"
                                >
                                    <div className="w-6 h-6 rounded-full bg-black/5 border border-black/10 flex items-center justify-center overflow-hidden">
                                        {profilePic ? (
                                            <img src={profilePic} alt="P" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-[10px] font-bold">{userName.charAt(0)}</span>
                                        )}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">{userName}</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowLoginModal(true)}
                                className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black/50 pb-0.5 hover:border-black transition-all"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Bonkers-Style Mega Menu */}
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
                                    <h3
                                        onClick={() => { setSelectedCollection('All'); setSelectedSubCategory('All'); setShowMegaMenu(false); }}
                                        className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-8 cursor-pointer hover:text-black transition-colors"
                                    >
                                        Ready to Wear
                                    </h3>
                                    <div className="flex flex-col space-y-4">
                                        {['New In', 'Tops', 'Denim', 'Outerwear', 'Knitwear'].map(item => (
                                            <button
                                                key={item}
                                                onClick={() => {
                                                    if (item === 'New In') setSelectedCollection('New In');
                                                    else setSelectedSubCategory(item);
                                                    setShowMegaMenu(false);
                                                }}
                                                className="text-2xl font-black italic tracking-tighter hover:translate-x-4 transition-transform text-left"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3
                                        onClick={() => { setSelectedSubCategory('All'); setShowMegaMenu(false); }}
                                        className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-8 cursor-pointer hover:text-black transition-colors"
                                    >
                                        Accessories
                                    </h3>
                                    <div className="flex flex-col space-y-4">
                                        {['Jewelry', 'Bags', 'Footwear', 'Belts', 'Eyewear'].map(item => (
                                            <button
                                                key={item}
                                                onClick={() => {
                                                    setSelectedSubCategory(item);
                                                    setShowMegaMenu(false);
                                                }}
                                                className="text-2xl font-black italic tracking-tighter hover:translate-x-4 transition-transform text-left"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3
                                        onClick={() => { setSelectedCollection('All'); setShowMegaMenu(false); }}
                                        className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-8 cursor-pointer hover:text-black transition-colors"
                                    >
                                        Selected Edits
                                    </h3>
                                    <div className="flex flex-col space-y-4">
                                        {['Quiet Luxury', 'Urban Street', 'Evening Noir', 'The Archive'].map(item => (
                                            <button
                                                key={item}
                                                onClick={() => {
                                                    setSelectedCollection(item);
                                                    setShowMegaMenu(false);
                                                }}
                                                className="text-2xl font-black italic tracking-tighter hover:translate-x-4 transition-transform text-left"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative group overflow-hidden bg-black aspect-[3/4]">
                                    <img
                                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"
                                        alt="Editorial Catch"
                                        className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-white text-[10px] font-black uppercase tracking-[0.5em] -rotate-90">SS 2026 Collection</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

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
                                    onChange={(e) => setEmailInput(e.target.value)}
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
                            <h1 className="heading-jumbo mb-8 transition-all duration-1000">
                                <span className="text-black">Welcome back,</span><br />
                                <span className="text-gradient-accent">{userName}</span>
                            </h1>

                            <p className="text-black/40 text-sm md:text-base max-w-sm font-bold uppercase tracking-widest mb-12 leading-relaxed">
                                AI Stylist Active // {userName}'s trendly.Ai Archive Synced
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
                            <h1 className="heading-jumbo mb-8 transition-all duration-1000">
                                <span className="text-black">Discover Tomorrow's</span><br />
                                <span className="text-gradient-accent">Fashion Today</span>
                            </h1>

                            <p className="text-black/40 text-sm md:text-base max-w-sm font-bold uppercase tracking-widest mb-12 leading-relaxed">
                                Real-time social signals // Predicted for you
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
                    <div className="flex space-x-2 mb-4 sm:mb-0 bg-black/5 p-1 rounded-full border border-black/5">
                        <button
                            onClick={() => setActiveTab('clothing')}
                            className={`relative px-8 py-3 rounded-full text-sm font-bold transition-all z-10 ${activeTab === 'clothing' ? 'text-white' : 'text-black/40 hover:text-black'
                                }`}
                        >
                            {activeTab === 'clothing' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-black rounded-full shadow-lg z-[-1]"
                                />
                            )}
                            <span className="flex items-center"><TrendingUp className="w-4 h-4 mr-2" /> Clothing</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('makeup')}
                            className={`relative px-8 py-3 rounded-full text-sm font-bold transition-all z-10 ${activeTab === 'makeup' ? 'text-white' : 'text-black/40 hover:text-black'
                                }`}
                        >
                            {activeTab === 'makeup' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-black rounded-full shadow-lg z-[-1]"
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
                            {(selectedBrand !== "All Brands" || selectedSubCategory !== "All" || selectedCollection !== "All") && (
                                <button
                                    onClick={handleClearFilters}
                                    className="mr-4 px-3 py-1 bg-black text-white text-[8px] font-black rounded-full hover:bg-pink-500 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            )}
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





                {/* Shop the Look - Interactive Module */}
                <section id="editorial-section" className="py-32 px-6">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="flex flex-col md:flex-row items-start gap-20">
                            <div className="w-full md:w-1/2 relative group rounded-[2rem] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
                                    alt="Shop the Look"
                                    className="w-full aspect-[4/5] object-cover"
                                />
                                {/* Hotspots */}
                                <div
                                    onClick={() => { setSelectedCollection('Urban Street'); setSelectedSubCategory('Outerwear'); }}
                                    className="absolute top-[20%] left-[40%] group/hotspot cursor-pointer"
                                >
                                    <div className="w-4 h-4 bg-white rounded-full animate-ping absolute inset-0" />
                                    <div className="w-4 h-4 bg-white rounded-full relative" />
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1.5 whitespace-nowrap opacity-0 group-hover/hotspot:opacity-100 transition-all text-[8px] font-black uppercase tracking-widest pointer-events-none">
                                        Moto Jacket // ₹24,999
                                    </div>
                                </div>
                                <div
                                    onClick={() => window.open("https://www.bonkerscorner.com/", '_blank')}
                                    className="absolute bottom-[30%] right-[30%] group/hotspot cursor-pointer"
                                >
                                    <div className="w-4 h-4 bg-white rounded-full animate-ping absolute inset-0" />
                                    <div className="w-4 h-4 bg-white rounded-full relative" />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1.5 whitespace-nowrap opacity-0 group-hover/hotspot:opacity-100 transition-all text-[8px] font-black uppercase tracking-widest pointer-events-none">
                                        Street Hoodie // ₹1,599
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 space-y-12">
                                <h3 className="heading-display mb-8">The Urban<br /><span className="italic font-normal">Architect</span></h3>
                                <p className="text-sm text-black/40 leading-relaxed max-w-sm font-medium">
                                    A study in proportions and minimalist silhouettes. Each piece is crafted to transition between the architectural lines of the city and the soft textures of a private sanctuary.
                                </p>
                                <div className="space-y-6">
                                    {[
                                        { name: "Oversized Leather Jacket", price: "₹24,999", brand: "AllSaints", sub: "Outerwear", link: "https://www.allsaints.com/" },
                                        { name: "Oversized Street Hoodie", price: "₹1,599", brand: "Bonkers", sub: "Knitwear", link: "https://www.bonkerscorner.com/" },
                                        { name: "Wide Leg Cargo Pants", price: "₹2,299", brand: "H&M", sub: "Denim", link: "https://www2.hm.com/" }
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            onClick={() => window.open(item.link || "#", '_blank')}
                                            className="flex items-center justify-between border-b border-black/5 pb-4 group cursor-pointer hover:border-black transition-all"
                                        >
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-tighter text-black/40">{item.brand}</p>
                                                <p className="font-bold">{item.name}</p>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <p className="font-bold">{item.price}</p>
                                                <TrendingUp className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={handleClearFilters} className="btn-minimal">Shop Full Look</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* H&M Style Scannable Grid */}
                <section className="py-20 border-t border-black/5">
                    <div className="px-6 mb-12 flex justify-between items-end">
                        <div>
                            <h2 className="heading-display mb-4">Editor's<br /><span className="italic font-normal">Picks</span></h2>
                            <div className="flex space-x-8 mt-8">
                                {['All', 'Clothing', 'Makeup', 'Editorial'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => {
                                            setActiveTab(tab.toLowerCase());
                                            if (tab === 'All') handleClearFilters();
                                        }}
                                        className={`text-[10px] font-black uppercase tracking-[0.3em] pb-1 border-b-2 transition-all duration-500 ${activeTab === tab.toLowerCase() ? "border-black text-black" : "border-transparent text-black/20 hover:text-black"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Sort by:</p>
                            <select className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer">
                                <option>Newest</option>
                                <option>Trending</option>
                                <option>Archive</option>
                            </select>
                        </div>
                    </div>

                    <div className="product-grid">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="product-card-premium group"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden bg-[#EDEDED]">
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                    {/* Action Overlays */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />

                                    <button
                                        onClick={() => window.open(product.affiliate_link, '_blank')}
                                        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 text-[8px] font-black uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl"
                                    >
                                        View on {product.brand}
                                    </button>

                                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all">
                                        <button className="p-2 bg-white text-black rounded-full shadow-lg hover:bg-black hover:text-white transition-colors">
                                            <Heart className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {product.predicted_next_month && (
                                        <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em]">
                                            Hot Entry
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">{product.brand}</p>
                                        <p className="text-xs font-bold leading-none">₹{product.price.toLocaleString('en-IN')}</p>
                                    </div>
                                    <h4 className="text-sm font-bold leading-none mb-3 hover:underline cursor-pointer">{product.name}</h4>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-pink-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-black/60">Score {product.trend_score}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

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
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-3xl font-black border-2 border-white/20 shadow-2xl overflow-hidden">
                                        {profilePic ? (
                                            <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            userName.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <div className="absolute bottom-0 right-0 p-1.5 bg-white text-black rounded-full border-4 border-[#111] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Camera className="w-4 h-4" />
                                    </div>
                                </div>

                                {isEditingName ? (
                                    <div className="flex flex-col items-center space-y-2">
                                        <input
                                            type="text"
                                            value={tempName}
                                            onChange={(e) => setTempName(e.target.value)}
                                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-center font-bold focus:outline-none focus:border-pink-500"
                                            autoFocus
                                        />
                                        <div className="flex space-x-2">
                                            <button onClick={handleSaveName} className="text-xs font-bold text-green-400 hover:text-green-300">Save</button>
                                            <button onClick={() => setIsEditingName(false)} className="text-xs font-bold text-gray-400 hover:text-gray-300">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <h3 className="text-xl font-bold">{userName}</h3>
                                        <button
                                            onClick={() => {
                                                setTempName(userName);
                                                setIsEditingName(true);
                                            }}
                                            className="p-1 hover:bg-white/10 rounded-md transition-colors"
                                        >
                                            <User className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                )}
                                <p className="text-gray-400 text-sm">{userEmail}</p>

                                {!profilePic && (
                                    <button
                                        onClick={handleLinkGoogle}
                                        className="mt-4 flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-bold transition-all"
                                    >
                                        <Cpu className="w-3 h-3 text-pink-400" />
                                        <span>Link Google Profile Picture</span>
                                    </button>
                                )}
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
                                        <TrendingUp className="w-5 h-5 text-blue-400" />
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

            <SearchOverlay />

            {/* Quiet Luxury Footer */}
            <footer className="bg-black text-white py-32 px-12 mt-40">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
                    <div className="col-span-1 md:col-span-2">
                        <Logo className="invert mb-12" />
                        <div className="flex space-x-12 opacity-40">
                            {['Instagram', 'Pinterest', 'Editorial', 'Support'].map(item => (
                                <button key={item} className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors">{item}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-8">Collections</h3>
                        <div className="flex flex-col space-y-3">
                            {['Essential Edit', 'The Archive', 'Urban Luxe', 'SS26 Debut'].map(item => (
                                <button key={item} className="text-sm font-bold hover:underline text-left">{item}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest leading-loose max-w-[200px]">
                            Built for those who navigate the world with aesthetic intention. trendly.Ai Archive 2026.
                        </p>
                    </div>
                </div>
            </footer>
        </div >
    );
}
