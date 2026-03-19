import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

// New Component Imports
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import MegaMenu from './components/MegaMenu';
import AuthModal from './components/AuthModal';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductAnalyticsModal from './components/ProductAnalyticsModal';
import SearchOverlay from './components/SearchOverlay';
import WatchlistDrawer from './components/WatchlistDrawer';
import ProfileSidebar from './components/ProfileSidebar';
import Footer from './components/Footer';

// Pre-existing Components
import TrendingProductsSection from './components/TrendingProductsSection';
import AIChatAssistant from './components/AIChatAssistant';
import { AffiliateProductGrid } from './components/AffiliateProductCard';

// Utils & Data
import { api } from './lib/api';
import { mockProductsData, affiliateProducts } from './lib/mockData';

// Pages
import About from './pages/About';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';




export default function App() {
    // --- State Management ---
    const [products, setProducts] = useState(mockProductsData);
    const [activeTab, setActiveTab] = useState('clothing');
    const [selectedBrand, setSelectedBrand] = useState('All Brands');
    const [selectedSubCategory, setSelectedSubCategory] = useState('All');
    const [selectedCollection, setSelectedCollection] = useState('All');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [showProfile, setShowProfile] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [selectedProductAnalytics, setSelectedProductAnalytics] = useState(null);
    const [tempName, setTempName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [fullNameInput, setFullNameInput] = useState("");
    const [isAuthLoading, setIsAuthLoading] = useState(false);

    const [isSignedIn, setIsSignedIn] = useState(() => localStorage.getItem("isSignedIn") === "true");
    const [profilePic, setProfilePic] = useState(() => localStorage.getItem("userProfilePic") || "");
    const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "Guest");
    const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail") || "");

    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
    const [watchlist, setWatchlist] = useState(() => JSON.parse(localStorage.getItem("watchlist") || "[]"));
    const [showWatchlist, setShowWatchlist] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const toggleWatchlist = (product) => {
        setWatchlist(prev => {
            const exists = prev.find(p => p.id === product.id);
            if (exists) {
                return prev.filter(p => p.id !== product.id);
            }
            return [...prev, product];
        });
    };

    // --- Backend Sync: Initial Fetch ---
    useEffect(() => {
        const syncProducts = async () => {
            try {
                const backendProducts = await api.getTrendingProducts();
                if (backendProducts && backendProducts.length > 0) {
                    setProducts(backendProducts);
                }
            } catch (err) {
                console.warn("Backend unavailable, using high-fidelity mock data.", err);
            }
        };
        syncProducts();
    }, []);

    // --- Derived Data ---
    const availableCategories = products.length > 0 ? [...new Set(products.map(p => p.category || "Uncategorized"))] : ['clothing', 'makeup'];
    
    // Automatically select the first valid category when products change
    useEffect(() => {
        if (availableCategories.length > 0 && !availableCategories.includes(activeTab)) {
            setActiveTab(availableCategories[0]);
        }
    }, [availableCategories, activeTab]);

    const currentTabProducts = products.filter(p => (p.category || "Uncategorized") === activeTab);
    const availableBrands = ["All Brands", ...new Set(currentTabProducts.map(p => p.brand || "Unknown"))];

    const filteredProducts = currentTabProducts.filter(product => {
        const matchesBrand = selectedBrand === "All Brands" || product.brand === selectedBrand;
        const matchesSubCategory = selectedSubCategory === "All" || (product.subCategory || "All") === selectedSubCategory;
        const matchesCollection = selectedCollection === "All" || (product.collection || "All") === selectedCollection;
        return matchesBrand && matchesSubCategory && matchesCollection;
    });

    const hasLength = passwordInput.length >= 8;
    const hasLetter = /(?=.*[A-Za-z])/.test(passwordInput);
    const hasNumber = /(?=.*\d)/.test(passwordInput);
    const hasSymbol = /(?=.*[^A-Za-z\d])/.test(passwordInput);
    const isPasswordValid = hasLength && hasLetter && hasNumber && hasSymbol;

    // --- Handlers ---
    const handleClearFilters = () => {
        setSelectedBrand("All Brands");
        setSelectedSubCategory("All");
        setSelectedCollection("All");
    };

    const handleAuth = async () => {
        setLoginError("");
        setIsAuthLoading(true);
        try {
            if (isSignUp) {
                // Handle Signup
                await api.signup(emailInput, passwordInput, fullNameInput);
                // After signup, automatically login or prompt to login. 
                // For now, let's login directly if sign up is successful (mocked backend usually returns user)
                const data = await api.login(emailInput, passwordInput);
                const derivedName = fullNameInput || emailInput.split('@')[0] || "Guest";
                setUserName(derivedName);
                setUserEmail(emailInput);
                setIsSignedIn(true);
                localStorage.setItem("isSignedIn", "true");
                localStorage.setItem("userName", derivedName);
                localStorage.setItem("userEmail", emailInput);
                setShowLoginModal(false);
                resetAuthForm();
            } else {
                // Handle Login
                const data = await api.login(emailInput, passwordInput);
                const derivedName = emailInput.split('@')[0] || "Guest";
                setUserName(derivedName);
                setUserEmail(emailInput);
                setIsSignedIn(true);
                localStorage.setItem("isSignedIn", "true");
                localStorage.setItem("userName", derivedName);
                localStorage.setItem("userEmail", emailInput);
                setShowLoginModal(false);
                resetAuthForm();
            }
        } catch (err) {
            setLoginError(err.message || "Authentication failed.");
        } finally {
            setIsAuthLoading(false);
        }
    };

    const resetAuthForm = () => {
        setEmailInput("");
        setPasswordInput("");
        setFullNameInput("");
        setLoginError("");
        setIsSignUp(false);
    };

    const handleLogout = () => {
        api.clearToken();
        setIsSignedIn(false);
        setShowProfile(false);
        localStorage.removeItem("isSignedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userProfilePic");
        setProfilePic("");
    };

    const handleSaveName = () => {
        if (tempName.trim()) {
            setUserName(tempName);
            localStorage.setItem("userName", tempName);
            setIsEditingName(false);
        }
    };

    const handleLinkGoogle = () => {
        const mockGooglePic = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop";
        setProfilePic(mockGooglePic);
        localStorage.setItem("userProfilePic", mockGooglePic);
    };

    // --- Effects ---
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        handleClearFilters();
    }, [activeTab]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProducts(currentProducts =>
                currentProducts.map(product => {
                    const fluctuation = (Math.random() - 0.5) * 0.8;
                    const newScore = Math.min(99.9, Math.max(50, product.trend_score + fluctuation));
                    return { ...product, trend_score: Number(newScore.toFixed(1)) };
                })
            );
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Behavior Tracking System
    useEffect(() => {
        if (selectedProductAnalytics) {
            api.trackEvent('VIEW', selectedProductAnalytics.id, {
                product_name: selectedProductAnalytics.name,
                category: selectedProductAnalytics.category
            }).catch(() => null); // Silent fail for local dev
        }
    }, [selectedProductAnalytics]);

    const handleProductClick = async (product) => {
        try {
            // Fetch real-time analytics from Neural Engine
            const data = await api.getProductAnalytics(product.id);
            // API returns TrendingProduct which has analytics_json
            setSelectedProductAnalytics({ ...product, analytics: data.analytics_json || data.analytics });
        } catch (err) {
            // Fallback to local trend calculation if backend offline
            setSelectedProductAnalytics(product);
        }

        // Track the click intent
        api.trackEvent('CLICK', product.id).catch(() => null);
    };

    // --- Template Render ---
    return (
        <div className="relative min-h-screen selection:bg-pink-500/40 text-black dark:text-white font-sans overflow-x-hidden transition-colors duration-500">
            {/* Aurora Background Layers */}
            <div className="aurora-bg">
                <div className="aurora-blob blob-1"></div>
                <div className="aurora-blob blob-2"></div>
                <div className="aurora-blob blob-3"></div>
            </div>

            {/* Grainy Texture Overlay */}
            <div className="fixed inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>

            {/* Floating Nano-Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', opacity: 0.05, backgroundSize: '40px 40px', zIndex: 0 }}></div>

            <Navbar 
                isScrolled={isScrolled}
                setShowMegaMenu={setShowMegaMenu}
                setSelectedCollection={setSelectedCollection}
                setDarkMode={setDarkMode}
                darkMode={darkMode}
                setShowSearch={setShowSearch}
                setShowWatchlist={setShowWatchlist}
                watchlist={watchlist}
                isSignedIn={isSignedIn}
                setShowProfile={setShowProfile}
                profilePic={profilePic}
                userName={userName}
                setShowLoginModal={setShowLoginModal}
            />

            <MegaMenu 
                showMegaMenu={showMegaMenu}
                setShowMegaMenu={setShowMegaMenu}
                setSelectedCollection={setSelectedCollection}
                setSelectedSubCategory={setSelectedSubCategory}
            />

            <AuthModal 
                showLoginModal={showLoginModal}
                setShowLoginModal={setShowLoginModal}
                isSignUp={isSignUp}
                setIsSignUp={setIsSignUp}
                loginError={loginError}
                emailInput={emailInput}
                setEmailInput={setEmailInput}
                passwordInput={passwordInput}
                setPasswordInput={setPasswordInput}
                fullNameInput={fullNameInput}
                setFullNameInput={setFullNameInput}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isAuthLoading={isAuthLoading}
                handleAuth={handleAuth}
                resetAuthForm={resetAuthForm}
                isPasswordValid={isPasswordValid}
            />

            <Routes>
                <Route path="/" element={
                    <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-48 pb-20">
                        <Hero isSignedIn={isSignedIn} userName={userName} />

                        <TrendingProductsSection watchlist={watchlist} onToggleWatchlist={toggleWatchlist} />

                        {/* Tabs & Filters */}
                        <div id="product-discovery-grid" className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-8 scroll-mt-32">
                            <div className="flex space-x-2 bg-black/5 p-1 rounded-full border border-black/5 overflow-x-auto max-w-full hide-scrollbar">
                                {availableCategories.slice(0, 5).map(tab => (
                                    <button key={tab} onClick={() => setActiveTab(tab)} className={`relative px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-white' : 'text-black/40 hover:text-black'}`}>
                                        {activeTab === tab && <motion.div layoutId="activeTab" className="absolute inset-0 bg-black rounded-full z-[-1]" />}
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2 bg-black/5 p-2 rounded-full px-4">
                                    <span className="text-[10px] font-black text-black/20 uppercase tracking-widest">Brand</span>
                                    <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none">
                                        {availableBrands.map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>
                                {(selectedBrand !== "All Brands" || selectedSubCategory !== "All") && <button onClick={handleClearFilters} className="text-[8px] font-black uppercase tracking-widest border-b border-black">Clear</button>}
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="product-grid">
                            {filteredProducts.map(product => (
                                <ProductCard 
                                    key={product.id}
                                    product={product}
                                    watchlist={watchlist}
                                    toggleWatchlist={toggleWatchlist}
                                    handleProductClick={handleProductClick}
                                />
                            ))}
                        </div>

                        {/* Affiliate Top Picks Section */}
                        <section id="editorial-section" className="mt-24 mb-12">
                            <div className="text-center mb-4">
                                <div className="inline-flex items-center space-x-3 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                                    <Activity className="w-3 h-3 text-[#2979FF]" />
                                    <span className="text-black/60 dark:text-white/60">Curated by Trendly.Ai</span>
                                </div>
                                <h2 className="heading-display dark:text-white">Top Picks For You</h2>
                                <p className="text-black/40 dark:text-white/40 font-bold mt-3 text-sm max-w-lg mx-auto">Handpicked products our neural engine recommends based on current market trends</p>
                            </div>
                            <AffiliateProductGrid products={affiliateProducts} />
                        </section>
                    </main>
                } />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>

            <ProfileSidebar 
                showProfile={showProfile}
                setShowProfile={setShowProfile}
                profilePic={profilePic}
                userName={userName}
                userEmail={userEmail}
                handleLogout={handleLogout}
            />

            <WatchlistDrawer 
                showWatchlist={showWatchlist}
                setShowWatchlist={setShowWatchlist}
                watchlist={watchlist}
                setSelectedProductAnalytics={setSelectedProductAnalytics}
                toggleWatchlist={toggleWatchlist}
            />

            <AnimatePresence>
                {selectedProductAnalytics && (
                    <ProductAnalyticsModal 
                        selectedProductAnalytics={selectedProductAnalytics} 
                        setSelectedProductAnalytics={setSelectedProductAnalytics} 
                    />
                )}
            </AnimatePresence>

            <SearchOverlay showSearch={showSearch} setShowSearch={setShowSearch} />

            <Footer />

            <AIChatAssistant />
        </div>
    );
}
