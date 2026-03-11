import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-20 px-12 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-2">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                        <Logo className="invert" />
                    </Link>
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 mt-6 max-w-xs leading-loose">Trendly.Ai Archive 2026<br />Neural Fashion Discovery Engine</p>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white mb-2 opacity-40">Company</p>
                    <Link to="/about" className="text-xs font-bold hover:text-[#2979FF] transition-colors">About Us</Link>
                    <Link to="/blog" className="text-xs font-bold hover:text-[#2979FF] transition-colors">Editorial & Blog</Link>
                    <Link to="/contact" className="text-xs font-bold hover:text-[#2979FF] transition-colors">Contact</Link>
                    <Link to="/faq" className="text-xs font-bold hover:text-[#2979FF] transition-colors">FAQ</Link>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white mb-2 opacity-40">Legal</p>
                    <Link to="/privacy" className="text-xs font-bold hover:text-[#2979FF] transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="text-xs font-bold hover:text-[#2979FF] transition-colors">Terms & Conditions</Link>
                    <Link to="/user-dashboard" className="text-xs font-bold hover:text-[#2979FF] transition-colors mt-4 text-[#2979FF]">Dashboard</Link>
                    <Link to="/admin-dashboard" className="text-xs font-bold hover:text-pink-500 transition-colors text-pink-500">Admin</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
