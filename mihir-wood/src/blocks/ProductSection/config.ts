import type { Block } from 'payload'

export const ProductSection: Block = {
    slug: 'productSection',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Section Title',
        },
        {
            name: 'subtitle',
            type: 'text',
            label: 'Subtitle / Badge Text',
        },
        {
            name: 'layout',
            type: 'select',
            defaultValue: 'grid',
            options: [
                { label: 'Grid', value: 'grid' },
                { label: 'Carousel', value: 'carousel' },
            ],
            required: true,
        },
        {
            name: 'populateBy',
            type: 'select',
            defaultValue: 'collection',
            options: [
                { label: 'Collection', value: 'collection' },
                { label: 'Individual Selection', value: 'selection' },
                { label: 'New Arrival', value: 'newArrival' },
            ],
        },
        {
            name: 'categories',
            type: 'relationship',
            admin: {
                condition: (_: any, siblingData: any) => siblingData.populateBy === 'collection',
            },
            hasMany: true,
            relationTo: 'categories',
        },
        {
            name: 'limit',
            type: 'number',
            admin: {
                condition: (_: any, siblingData: any) => ['collection', 'newArrival'].includes(siblingData.populateBy),
            },
            defaultValue: 8,
        },
        {
            name: 'selectedProducts',
            type: 'relationship',
            admin: {
                condition: (_: any, siblingData: any) => siblingData.populateBy === 'selection',
            },
            hasMany: true,
            relationTo: 'products',
        },
    ],
    interfaceName: 'ProductSectionBlock',
    labels: {
        plural: 'Product Sections',
        singular: 'Product Section',
    },
}
