import type { Media, Review, ReviewsBlock as ReviewsProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import type { DefaultDocumentIDType } from 'payload'

export const Reviews = async (
    props: ReviewsProps & {
        id?: DefaultDocumentIDType
    }
) => {
    const { id, populateBy, reviews: reviewsFromProps, title } = props

    let reviews: Review[] = []

    if (populateBy === 'collection') {
        const payload = await getPayload({ config: configPromise })

        const fetchedReviews = await payload.find({
            collection: 'reviews',
            depth: 1,
            limit: 10,
        })

        reviews = fetchedReviews.docs
    } else {
        if (reviewsFromProps?.length) {
            reviews = reviewsFromProps.filter(
                (review) => typeof review === 'object' && review !== null
            ) as Review[]
        }
    }

    if (reviews.length === 0) return null

    return (
        <section className="container pb-4" id={`block-${id}`}>
            {title && <h2 className="mb-8 text-2xl font-bold">{title}</h2>}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review, index) => (
                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900" key={index}>
                        <div className="mb-4 flex items-center gap-4">
                            {review.images?.[0] && typeof review.images[0] === 'object' && (
                                <img
                                    alt={review.customerName}
                                    className="h-12 w-12 rounded-full object-cover"
                                    src={(review.images[0] as Media).url!}
                                />
                            )}
                            <div>
                                <h4 className="font-bold">{review.customerName}</h4>
                                <div className="flex text-yellow-500">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i}>{i < (review.rating || 0) ? '★' : '☆'}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="italic text-neutral-600 dark:text-neutral-400">&quot;{review.content}&quot;</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
