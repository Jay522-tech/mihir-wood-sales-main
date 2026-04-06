'use client'

import { Button } from '@/components/ui/button'
import { Star, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ReviewForm } from './ReviewForm'
import { ReviewMedia } from './ReviewMedia'

type Review = {
    id: string
    customerName: string
    rating: number
    content: string
    images?: any[]
    video?: any
    updatedAt: string
}

type Props = {
    reviews: any[]
    productId: string
}

export const ReviewSection: React.FC<Props> = ({ reviews, productId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const displayReviews = reviews.slice(0, 4)
    const hasMore = reviews.length > 4

    // Dynamic rating calculation
    const totalReviews = reviews.length
    const averageRating = totalReviews > 0
        ? Math.round((reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / totalReviews) * 10) / 10
        : 0

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isModalOpen || isFormOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isModalOpen, isFormOpen])

    return (
        <div className="space-y-12">
            {/* Reviews Header (Moved from page.tsx for better integration) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-100">
                <div>
                    <h2 className="text-2xl font-serif text-neutral-900">Customer Excellence</h2>
                    <p className="text-[10px] text-neutral-400 tracking-widest uppercase mt-1">Verified Wood Collector Feedback</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3 bg-neutral-50 px-4 py-2 rounded-2xl border border-neutral-100">
                        <div className="flex text-[#D4BC9B]">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    fill={i < Math.round(averageRating) ? "currentColor" : "none"}
                                    className={i < Math.round(averageRating) ? "" : "text-neutral-200"}
                                />
                            ))}
                        </div>
                        <div className="px-3 py-1 bg-neutral-900 text-white text-[10px] font-bold rounded-full">
                            {totalReviews > 0 ? `${averageRating.toFixed(1)}/5` : '0.0/5'}
                        </div>
                    </div>
                    <Button
                        onClick={() => setIsFormOpen(true)}
                        className="hover:bg-neutral-900 bg-[#D4BC9B] text-black hover:text-white rounded-full px-6 py-2 h-auto text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-sm border-transparent"
                    >
                        Write a Review
                    </Button>
                </div>
            </div>

            {reviews.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
                    {displayReviews.map((review) => (
                        <div key={review.id} className="group pb-8 border-b border-neutral-100 last:border-0 md:[&:nth-last-child(-n+2)]:border-0">
                            <div className="flex items-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-neutral-200"}
                                    />
                                ))}
                                <span className="ml-2 font-medium text-sm text-neutral-900">{review.customerName}</span>
                                <div className="ml-auto flex items-center gap-2">
                                    <span className="text-[10px] text-neutral-400 tracking-wider uppercase">{new Date(review.updatedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>
                            <p className="text-sm text-neutral-600 leading-relaxed italic mb-4">"{review.content}"</p>
                            <ReviewMedia images={review.images || []} video={review.video} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center space-y-4 bg-neutral-50/50 rounded-3xl border border-dashed border-neutral-200">
                    <div className="p-4 bg-white rounded-full w-fit mx-auto shadow-sm">
                        <Star size={32} className="text-neutral-200" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-lg font-serif text-neutral-900">Be the first to review</p>
                        <p className="text-sm text-neutral-500 max-w-xs mx-auto">Share your experience with this masterpiece and help others make a choice.</p>
                    </div>
                    <Button
                        onClick={() => setIsFormOpen(true)}
                        className="bg-neutral-900 text-white rounded-full px-8 py-6 h-auto text-xs font-bold uppercase tracking-widest mt-4"
                    >
                        WRITE THE FIRST REVIEW
                    </Button>
                </div>
            )}

            {hasMore && (
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8 border-t border-neutral-100">
                    <Button
                        variant="outline"
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto rounded-full px-12 py-6 border-neutral-200 hover:bg-neutral-900 hover:text-white transition-all duration-300 font-medium tracking-wide group"
                    >
                        View All {reviews.length} Reviews
                        <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </Button>
                </div>
            )}

            {/* All Reviews Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-white w-full max-w-4xl h-full sm:h-auto sm:max-h-[85vh] rounded-none sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in slide-in-from-bottom-8 duration-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-5 md:p-8 border-b border-neutral-100 bg-neutral-50/50">
                            <div>
                                <h3 className="text-xl md:text-2xl font-serif text-neutral-900">Customer Excellence</h3>
                                <p className="text-xs md:text-sm text-neutral-500">Genuine feedback from our valued collectors</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 rounded-full hover:bg-neutral-200 text-neutral-500 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-5 md:p-8 scrollbar-hide">
                            <div className="space-y-12">
                                {reviews.map((review) => (
                                    <div key={review.id} className="group pb-8 border-b border-neutral-100 last:border-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-1 mb-3">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-neutral-200"}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-between flex-1">
                                                <span className="font-semibold text-neutral-900">{review.customerName}</span>
                                                <span className="text-[10px] text-neutral-400 sm:ml-auto">{new Date(review.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                        <p className="text-base text-neutral-700 leading-relaxed italic mb-6">"{review.content}"</p>
                                        <ReviewMedia images={review.images || []} video={review.video} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 md:p-8 border-t border-neutral-100 bg-neutral-50/50 flex justify-center items-center">
                            <p className="text-[10px] text-neutral-400 tracking-widest uppercase">Mihir Wood Works • Genuine Reviews</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Write a Review Modal */}
            {isFormOpen && (
                <div
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300"
                    onClick={() => setIsFormOpen(false)}
                >
                    <div
                        className="bg-white w-full max-w-xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in slide-in-from-bottom-8 duration-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 md:p-8 border-b border-neutral-100 bg-neutral-50/50">
                            <div>
                                <h3 className="text-2xl font-serif text-neutral-900">Share Your Story</h3>
                                <p className="text-sm text-neutral-500">Your feedback inspires our craftsmanship</p>
                            </div>
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="p-2 rounded-full hover:bg-neutral-200 text-neutral-500 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                            <ReviewForm
                                productId={productId}
                                onClose={() => setIsFormOpen(false)}
                                onSuccess={() => {
                                    // Optionally refresh reviews here
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
