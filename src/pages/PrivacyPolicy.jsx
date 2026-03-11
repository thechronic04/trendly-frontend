import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen pt-40 px-6 max-w-[800px] mx-auto text-black dark:text-white mb-20">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8">Privacy <span className="text-[#2979FF]">Policy</span></h1>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-12">Last Updated: October 2026</p>
            
            <div className="space-y-8 opacity-80 leading-relaxed font-medium">
                <section>
                    <h2 className="text-2xl font-black italic mb-4">1. Data Collection</h2>
                    <p>We collect information to provide better trend analysis to all our users. Information we collect includes user interaction data, search histories, and visual search uploads.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-black italic mb-4">2. Neural Processing</h2>
                    <p>Images uploaded for visual search are processed by our Neural Engine. We do not store these images permanently unless explicitly permitted by the user for model training improvements.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-black italic mb-4">3. Data Sharing</h2>
                    <p>We do not sell personal data. Aggregated, anonymized trend data is shared with our partners and available on our public dashboards.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-black italic mb-4">4. Security</h2>
                    <p>We work hard to protect Trendly and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold. We use secure HTTPS, JWT tokens, and regular audits.</p>
                </section>
            </div>
        </div>
    );
}
