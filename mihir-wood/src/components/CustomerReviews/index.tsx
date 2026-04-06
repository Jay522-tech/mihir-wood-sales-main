import React from 'react'
import { Star, Quote } from 'lucide-react'
import type { Review } from '@/payload-types'

interface CustomerReviewsProps {
    reviews?: Review[]
    title?: string
    subtitle?: string
    showExploreButton?: boolean
    exploreLink?: string
    trustedByText?: string
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({
    reviews = [],
    title = "Voices of Trust",
    subtitle = "Real Stories From Real Homes",
    showExploreButton,
    exploreLink,
    trustedByText
}) => {
    if (!reviews || reviews.length === 0) return null

    return (
        <section className="relative py-16 md:py-24 bg-[#F9F7F2] overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="floral" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                            <circle cx="50" cy="50" r="10" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#floral)" />
                </svg>
            </div>

            <div className="container relative z-10 px-4">
                <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
                    <div className="inline-block px-4 py-1 bg-[#D4BC9B]/10 border border-[#D4BC9B]/20 rounded-full">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4BC9B]">
                            {title}
                        </h2>
                    </div>

                    <h3 className="text-xl md:text-5xl font-black uppercase tracking-tighter italic leading-none flex flex-col items-center">
                        <span className="text-black mb-1">{subtitle.split(' ').slice(0, 3).join(' ')}</span>
                        <span className="text-[#D4BC9B] drop-shadow-sm">{subtitle.split(' ').slice(3).join(' ')}</span>
                    </h3>

                    <div className="flex items-center justify-center gap-4 pt-2">
                        <div className="h-[1px] w-12 bg-[#D4BC9B]/30" />
                        <div className="w-2 h-2 rounded-full bg-[#D4BC9B]" />
                        <div className="h-[1px] w-12 bg-[#D4BC9B]/30" />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <div
                            key={review.id || i}
                            className="group bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50 flex flex-col items-center text-center relative hover:shadow-[0_20px_60px_-10px_rgba(212,188,155,0.3)] hover:-translate-y-2 transition-all duration-500"
                        >
                            <Quote className="w-10 h-10 text-[#D4BC9B]/10 absolute top-8 left-8 transition-transform group-hover:scale-110 group-hover:text-[#D4BC9B]/20" />

                            <div className="flex gap-1.5 mb-6">
                                {[...Array(review.rating || 5)].map((_, idx) => (
                                    <Star key={idx} className="w-4 h-4 fill-[#D4BC9B] text-[#D4BC9B] drop-shadow-[0_2px_4px_rgba(212,188,155,0.5)]" />
                                ))}
                            </div>

                            <div className="relative">
                                <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-8 italic relative z-10">
                                    &ldquo;{review.content}&rdquo;
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-100 w-full">
                                <div className="font-black uppercase tracking-[0.2em] text-[12px] text-black mb-1">
                                    {review.customerName}
                                </div>
                                <div className="text-[10px] alphabet-spacing-[0.1em] uppercase tracking-widest text-[#D4BC9B] font-black">
                                    {review.location || "Verified Customer"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {(showExploreButton || trustedByText) && (
                    <div className="mt-16 text-center space-y-6">
                        {showExploreButton && (
                            <a
                                href={exploreLink || '#'}
                                className="inline-block group relative overflow-hidden bg-black text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] transition-all hover:bg-[#D4BC9B] hover:text-black shadow-2xl active:scale-95"
                            >
                                <span className="relative z-10">Explore All Testimonials</span>
                            </a>
                        )}
                        {trustedByText && (
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] pt-2">
                                {trustedByText}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

export default CustomerReviews
