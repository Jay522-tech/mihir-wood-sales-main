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
            name: 'selectedReviews',
            type: 'relationship',
            admin: {
                condition: (_: any, siblingData: any) => siblingData.populateBy === 'selection',
            },
            hasMany: true,
            relationTo: 'reviews',
        },
    ],
    interfaceName: 'ReviewsSectionBlock',
    labels: {
        plural: 'Reviews Sections',
        singular: 'Reviews Section',
    },
}
