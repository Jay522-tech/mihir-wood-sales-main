import type { Review, ReviewsSectionBlock } from '@/payload-types'
import configPromise from '@payload-config'
import { Quote, Star } from 'lucide-react'
import { getPayload } from 'payload'
import React from 'react'
import { draftMode } from 'next/headers'

export const ReviewsSection: React.FC<ReviewsSectionBlock> = async (props) => {
    const { title, subtitle, populateBy, selectedReviews, showExploreButton, exploreLink, trustedByText, limit } = props

    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })
    let reviews: Review[] = []

    try {
        if (populateBy === 'collection') {
            const fetchedReviews = await payload.find({
                collection: 'reviews',
                draft,
                depth: 1,
                limit: limit || 3,
                sort: '-createdAt',
            })
            reviews = fetchedReviews.docs
        } else {
            reviews =
                (selectedReviews?.map((item) => (typeof item === 'object' ? item : null)).filter(Boolean) as Review[]) ||
                []
        }
    } catch (error) {
        // Silently fail or handle error appropriately in production
    }

    if (!reviews || reviews.length === 0) {
        return null
    }

    return (
        <section className="relative py-16 md:py-24 bg-[#FEFDFB] overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none text-[#D4BC9B]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="luxfloral" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            <circle cx="50" cy="50" r="8" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#luxfloral)" />
                </svg>
            </div>

            <div className="container relative z-10 px-4">
                <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
                    {title && (
                        <div className="inline-block px-5 py-1 bg-[#D4BC9B]/10 border border-[#D4BC9B]/20 rounded-full">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4BC9B]">
                                {title}
                            </h2>
                        </div>
                    )}

                    {subtitle && (
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-none flex flex-col items-center">
                            <span className="text-black mb-2">
                                {subtitle.split(' ').slice(0, 3).join(' ')}
                            </span>
                            <span className="text-[#D4BC9B] drop-shadow-sm">
                                {subtitle.split(' ').slice(3).join(' ')}
                            </span>
                        </h3>
                    )}

                    <div className="flex items-center justify-center gap-4 pt-2">
                        <div className="h-[1px] w-12 bg-[#D4BC9B]/30" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4BC9B]" />
                        <div className="h-[1px] w-12 bg-[#D4BC9B]/30" />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {reviews.map((review, i) => (
                        <div
                            key={i}
                            className="group bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col items-center text-center relative hover:shadow-[0_30px_70px_-10px_rgba(212,188,155,0.25)] hover:-translate-y-2 transition-all duration-500"
                        >
                            <Quote className="w-12 h-12 text-[#D4BC9B]/5 absolute top-10 left-10 transition-all duration-500 group-hover:text-[#D4BC9B]/15 group-hover:scale-110" />

                            <div className="flex gap-1 mb-8">
                                {[...Array(review.rating || 5)].map((_, idx) => (
                                    <Star key={idx} className="w-4 h-4 fill-[#D4BC9B] text-[#D4BC9B] drop-shadow-[0_2px_4px_rgba(212,188,155,0.4)]" />
                                ))}
                            </div>

                            <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-10 italic relative z-10">
                                &ldquo;{review.content}&rdquo;
                            </p>

                            <div className="mt-auto pt-8 border-t border-gray-50 w-full space-y-1">
                                <div className="font-black uppercase tracking-[0.25em] text-[11px] text-gray-900">
                                    {review.customerName}
                                </div>
                                <div className="text-[9px] uppercase tracking-[0.3em] text-[#D4BC9B] font-bold">
                                    {review.location || 'Verified Customer'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center space-y-6">
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
            </div>
        </section>
    )
}
