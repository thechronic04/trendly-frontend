import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut } from 'lucide-react';

const ProfileSidebar = ({ showProfile, setShowProfile, userName, userEmail, profilePic, handleLogout }) => {
    return (
        <AnimatePresence>
            {showProfile && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowProfile(false)} className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-[60]" />
                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full max-w-sm glass z-[70] p-8 dark:bg-[#0A0A0A] dark:border-white/10">
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-xl font-black uppercase tracking-tight dark:text-white">Profile</h2>
                            <button onClick={() => setShowProfile(false)}><X className="w-6 h-6 dark:text-white" /></button>
                        </div>
                        <div className="flex flex-col items-center mb-12">
                            <div className="w-24 h-24 rounded-full bg-black dark:bg-white/10 flex items-center justify-center text-white text-3xl font-black mb-4 overflow-hidden border border-black/10 dark:border-white/10">
                                {profilePic ? <img src={profilePic} alt="P" className="w-full h-full object-cover" /> : <span className="dark:text-white">{userName.charAt(0)}</span>}
                            </div>
                            <h3 className="text-lg font-black dark:text-white">{userName}</h3>
                            <p className="text-xs text-black/40 dark:text-white/40">{userEmail}</p>
                        </div>
                        <div className="space-y-4">
                            <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 p-4 text-red-500 font-black text-[10px] uppercase tracking-widest bg-red-50 dark:bg-red-900/10 rounded-2xl">
                                <LogOut className="w-4 h-4" /> <span>Sign Out</span>
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProfileSidebar;
