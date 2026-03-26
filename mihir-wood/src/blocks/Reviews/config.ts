import type { Block } from 'payload'

export const ReviewsBlock: Block = {
    slug: 'reviews',
    interfaceName: 'ReviewsBlock',
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'reviews',
            type: 'relationship',
            relationTo: 'reviews',
            hasMany: true,
        },
        {
            name: 'populateBy',
            type: 'select',
            defaultValue: 'collection',
            options: [
                {
                    label: 'All Reviews',
                    value: 'collection',
                },
                {
                    label: 'Individual Selection',
                    value: 'selection',
                },
            ],
        },
    ],
    labels: {
        plural: 'Reviews Blocks',
        singular: 'Reviews Block',
    },
}
