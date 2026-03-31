import type { Block } from 'payload'

export const ReviewsSection: Block = {
    slug: 'reviewsSection',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Section Title',
            defaultValue: 'Voices of Trust',
        },
        {
            name: 'subtitle',
            type: 'text',
            label: 'Subtitle',
            defaultValue: 'Real Stories From Real Homes',
        },
        {
            name: 'populateBy',
            type: 'select',
            defaultValue: 'collection',
            options: [
                { label: 'Collection', value: 'collection' },
                { label: 'Individual Selection', value: 'selection' },
            ],
        },
        {
            name: 'limit',
            type: 'number',
            defaultValue: 3,
            label: 'Review Limit',
            admin: {
                condition: (_: any, siblingData: any) => siblingData.populateBy === 'collection',
            },
        },
        {
            name: 'selectedReviews',
            type: 'relationship',
            admin: {
                condition: (_: any, siblingData: any) => siblingData.populateBy === 'selection',
            },
            hasMany: true,
            relationTo: 'reviews',
        },
        {
            name: 'showExploreButton',
            type: 'checkbox',
            defaultValue: true,
            label: 'Show Explore Button',
        },
        {
            name: 'exploreLink',
            type: 'text',
            defaultValue: '#',
            label: 'Explore Button Link',
            admin: {
                condition: (_: any, siblingData: any) => siblingData.showExploreButton,
            },
        },

        {
            name: 'trustedByText',
            type: 'text',
            defaultValue: 'Trusted by 12,000+ Happy Families',
            label: 'Trusted By Text',
        },
    ],
    interfaceName: 'ReviewsSectionBlock',
    labels: {
        plural: 'Reviews Sections',
        singular: 'Reviews Section',
    },
}
