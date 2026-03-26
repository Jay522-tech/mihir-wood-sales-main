import type { Block } from 'payload'

export const CustomFurniture: Block = {
    slug: 'customFurniture',
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'Bespoke Craftmanship',
            label: 'Section Title',
        },
        {
            name: 'mainImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Main Showcase Image',
        },
        {
            name: 'samples',
            type: 'array',
            label: 'Material Samples (3 images)',
            minRows: 3,
            maxRows: 3,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
        {
            name: 'formTitle',
            type: 'text',
            defaultValue: 'YOUR CHOICE, OUR MASTERY.',
            label: 'Form Title',
        },
        {
            name: 'formSubtitle',
            type: 'text',
            defaultValue: 'Bespoke material and fabric options available.',
            label: 'Form Subtitle',
        },
    ],
    interfaceName: 'CustomFurnitureBlock',
    labels: {
        plural: 'Custom Furniture Sections',
        singular: 'Custom Furniture Section',
    },
}
