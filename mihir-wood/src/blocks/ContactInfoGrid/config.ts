import type { Block } from 'payload'

export const ContactInfoGrid: Block = {
    slug: 'contactInfoGrid',
    fields: [
        {
            name: 'items',
            type: 'array',
            fields: [
                {
                    name: 'icon',
                    type: 'select',
                    options: [
                        { label: 'Phone', value: 'phone' },
                        { label: 'Map Pin', value: 'map-pin' },
                        { label: 'Clock', value: 'clock' },
                    ],
                    required: true,
                },
                {
                    name: 'label',
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
