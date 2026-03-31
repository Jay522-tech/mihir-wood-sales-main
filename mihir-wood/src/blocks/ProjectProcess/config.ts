import type { Block } from 'payload'

export const ProjectProcess: Block = {
    slug: 'projectProcess',
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'Design Your Dream Space',
            label: 'Section Title',
        },
        {
            name: 'variant',
            type: 'select',
            defaultValue: 'default',
            options: [
                { label: 'Default (Staggered)', value: 'default' },
                { label: 'Grid (4 Columns)', value: 'grid' },
            ],
            admin: {
                description: 'Select the layout style for the process steps.',
            },
        },
        {
            name: 'subtitle',
            type: 'text',
            defaultValue: 'Complete Furniture Solutions for Hospitality & Commercial Spaces',
            label: 'Subtitle',
        },
        {
            name: 'steps',
            type: 'array',
            label: 'Process Steps',
            minRows: 1,
            maxRows: 6,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    label: 'Step Title',
                },
                {
                    name: 'description',
                    type: 'textarea',
                    required: true,
                    label: 'Step Description',
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: 'Step Image',
                },
            ],
        },
    ],
    interfaceName: 'ProjectProcessBlock',
    labels: {
        plural: 'Project Process Sections',
        singular: 'Project Process Section',
    },
}
