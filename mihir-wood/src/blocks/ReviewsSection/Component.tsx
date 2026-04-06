import type { ReviewsSectionBlock } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { draftMode } from 'next/headers'
import CustomerReviews from '@/components/CustomerReviews'

export const ReviewsSection: React.FC<ReviewsSectionBlock> = async (props) => {
    const { title, subtitle, populateBy, selectedReviews, showExploreButton, exploreLink, trustedByText, limit } = props

    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })
    let reviews: any[] = []

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
                (selectedReviews?.map((item) => (typeof item === 'object' ? item : null)).filter(Boolean)) ||
                []
        }
    } catch (error) {
        // Silently fail or handle error appropriately in production
    }

    if (!reviews || reviews.length === 0) {
        return null
    }

    return (
        <CustomerReviews
            reviews={reviews}
            title={title || undefined}
            subtitle={subtitle || undefined}
            showExploreButton={showExploreButton || undefined}
            exploreLink={exploreLink || undefined}
            trustedByText={trustedByText || undefined}
        />
    )
}

