import type { Block } from 'payload'

export const BrandHeritage: Block = {
    slug: 'brandHeritage',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'A Journey of Hard Work & Passion.',
        },
        {
            name: 'subtitle',
            type: 'text',
            required: true,
            defaultValue: 'BRAND HERITAGE',
        },
        {
            name: 'chapters',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'content',
                    type: 'textarea',
                    required: true,
                },
            ],
        },
    ],
}
