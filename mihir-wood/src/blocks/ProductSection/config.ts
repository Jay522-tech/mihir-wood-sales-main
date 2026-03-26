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
                { label: 'Grid (Best Sellers)', value: 'grid' },
                { label: 'Carousel (New Arrivals)', value: 'carousel' },
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
                condition: (_: any, siblingData: any) => siblingData.populateBy === 'collection',
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
