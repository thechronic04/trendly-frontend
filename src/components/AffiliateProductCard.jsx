import React from 'react';

/**
 * Affiliate Product Card Component
 * A reusable component for displaying products with affiliate links
 * Supports light and dark mode with Trendly brand styling
 */
const AffiliateProductCard = ({ product }) => {
    const {
        title,
        description,
        image,
        price,
        originalPrice,
        affiliateLink,
        rating,
        reviewCount,
        badge
    } = product;

    // Calculate discount percentage if original price exists
    const discountPercent = originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : null;

    return (
        <div className="bg-white dark:bg-[#111111] rounded-xl shadow-lg dark:shadow-black/30 border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-2xl dark:hover:shadow-black/50 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 group">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent pointer-events-none" />

                {/* Badge (e.g., "Best Seller", "Top Rated") */}
                {badge && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#2979FF] to-[#304FFE] text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                        {badge}
                    </div>
                )}

                {/* Discount Badge */}
                {discountPercent && (
                    <div className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1.5 rounded-full text-sm font-black shadow-lg animate-pulse">
                        -{discountPercent}%
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-[#2979FF] transition-colors">
                    {title}
                </h3>

                {/* Rating */}
                {rating && (
                    <div className="flex items-center mb-4">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 dark:text-gray-600 fill-gray-200 dark:fill-gray-600'
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>
                        {reviewCount && (
                            <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                ({reviewCount.toLocaleString()} reviews)
                            </span>
                        )}
                    </div>
                )}

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-sm flex-grow leading-relaxed">
                    {description}
                </p>

                {/* Price Section */}
                <div className="mt-auto mb-6">
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-black text-gray-900 dark:text-white">
                            ${price}
                        </span>
                        {originalPrice && (
                            <span className="text-lg text-gray-400 dark:text-gray-500 line-through decoration-rose-500/50">
                                ${originalPrice}
                            </span>
                        )}
                    </div>
                </div>

                {/* Call to Action Button */}
                <a
                    href={affiliateLink}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="w-full bg-gradient-to-r from-[#2979FF] to-[#304FFE] text-white font-bold py-4 px-6 rounded-xl hover:from-[#1565C0] hover:to-[#283593] transition-all duration-300 text-center inline-block shadow-lg shadow-[#2979FF]/20 dark:shadow-[#2979FF]/10 hover:shadow-[#2979FF]/30 hover:scale-[1.02] active:scale-95"
                >
                    View on Amazon →
                </a>
            </div>
        </div>
    );
};

/**
 * Product Grid Component
 * Displays multiple products in a responsive grid
 */
export const AffiliateProductGrid = ({ products }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Affiliate Disclosure */}
            <div className="bg-[#2979FF]/5 dark:bg-[#2979FF]/10 border border-[#2979FF]/20 dark:border-[#2979FF]/20 p-5 mb-12 rounded-2xl flex items-start gap-4">
                <div className="bg-[#2979FF] text-white rounded-full p-1 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Editorial Disclosure</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                        Trendly is supported by its audience. When you purchase through links on our site, we may earn an affiliate commission at no extra cost to you. We only recommend products we've vetted and would use ourselves.
                    </p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {products.map((product, index) => (
                    <AffiliateProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AffiliateProductCard;
