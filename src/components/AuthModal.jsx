import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Eye, EyeOff } from 'lucide-react';

const AuthModal = ({
    showLoginModal,
    setShowLoginModal,
    isSignUp,
    setIsSignUp,
    fullNameInput,
    setFullNameInput,
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    showPassword,
    setShowPassword,
    loginError,
    isAuthLoading,
    handleAuth,
    resetAuthForm,
    isPasswordValid
}) => {
    return (
        <AnimatePresence>
            {showLoginModal && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl px-4">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card relative w-full max-w-sm p-8 rounded-[2rem] border border-white/10">
                        <button onClick={() => { resetAuthForm(); setShowLoginModal(false); }} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">&times;</button>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black text-white mb-2">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
                            <p className="text-sm text-gray-400">{isSignUp ? "Join the neural fashion revolution." : "Sign in to sync your local trends."}</p>
                            {loginError && <p className="text-xs text-red-500 mt-2 font-bold uppercase tracking-widest">{loginError}</p>}
                        </div>
                        <div className="space-y-4">
                            {isSignUp && (
                                <input type="text" value={fullNameInput} onChange={(e) => setFullNameInput(e.target.value)} placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50" />
                            )}
                            <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50" />
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 pr-12" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                            </div>
                            <button
                                disabled={!isPasswordValid || !emailInput || isAuthLoading}
                                onClick={handleAuth}
                                className={`w-full font-bold py-3 rounded-xl transition-all mt-4 flex items-center justify-center ${isPasswordValid && emailInput ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white cursor-pointer" : "bg-white/10 text-gray-400 cursor-not-allowed"}`}
                            >
                                {isAuthLoading ? (
                                    <Activity className="w-5 h-5 animate-spin" />
                                ) : (
                                    isSignUp ? "Create My Account" : "Login Securely"
                                )}
                            </button>
                            <div className="text-center mt-6">
                                <button
                                    onClick={() => setIsSignUp(!isSignUp)}
                                    className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                                >
                                    {isSignUp ? "Already have an account? Sign In" : "New to Trendly? Create Account"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
