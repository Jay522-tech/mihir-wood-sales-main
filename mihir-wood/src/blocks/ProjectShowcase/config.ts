import type { Block } from 'payload'

export const ProjectShowcase: Block = {
    slug: 'projectShowcase',
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
            name: 'layout',
            type: 'select',
            defaultValue: 'grid',
            options: [
                { label: 'Grid', value: 'grid' },
                { label: 'Slider', value: 'slider' },
            ],
        },
        {
            name: 'projects',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                },
                {
                    name: 'location',
                    type: 'text',
                },
                {
                    name: 'image',
                    type: 'relationship',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
    ],
    interfaceName: 'ProjectShowcaseBlock',
}
