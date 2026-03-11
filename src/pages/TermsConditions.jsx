import React from 'react';

export default function TermsConditions() {
    return (
        <div className="min-h-screen pt-40 px-6 max-w-[800px] mx-auto text-black dark:text-white mb-20">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8">Terms & <span className="opacity-40">Conditions</span></h1>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-12">Last Updated: October 2026</p>
            
            <div className="space-y-8 opacity-80 leading-relaxed font-medium">
                <section>
                    <h2 className="text-2xl font-black italic mb-4">1. Acceptance of Terms</h2>
                    <p>By accessing or using the Trendly.Ai platform, you agree to be bound by these Terms. If you disagree with any part of the terms, you do not have permission to access the Service.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-black italic mb-4">2. Use of Analytics</h2>
                    <p>Our Neural Trend Analytics, Alpha Sentiment scores, and Heatmaps are provided for informational and research purposes. We make no guarantees about future market performance based on this data.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-black italic mb-4">3. User Accounts</h2>
                    <p>When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.</p>
                </section>
            </div>
        </div>
    );
}
