import type { Block } from 'payload'

export const FeatureGrid: Block = {
    slug: 'featureGrid',
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'subtitle',
            type: 'text',
        },
        {
            name: 'features',
            type: 'array',
            fields: [
                {
                    name: 'icon',
                    type: 'select',
                    options: [
                        { label: 'Shield', value: 'shield' },
                        { label: 'Award', value: 'award' },
                        { label: 'Star', value: 'star' },
                        { label: 'Check', value: 'check' },
                        { label: 'Globe', value: 'globe' },
                    ],
                },
                {
                    name: 'title',
                    type: 'text',
                },
                {
                    name: 'description',
                    type: 'textarea',
                },
            ],
        },
        {
            name: 'image',
            type: 'relationship',
            relationTo: 'media',
        },
    ],
    interfaceName: 'FeatureGridBlock',
}
