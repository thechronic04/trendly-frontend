import React from 'react';

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
            <span className="text-3xl font-black tracking-tighter leading-none select-none dark:text-white">
                trendly<span className="text-[#2979FF]">.</span>Ai
            </span>
        )}
    </div>
);

export default Logo;
