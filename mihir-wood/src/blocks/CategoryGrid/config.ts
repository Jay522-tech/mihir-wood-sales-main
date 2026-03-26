import type { Block } from 'payload'

export const CategoryGrid: Block = {
    slug: 'categoryGrid',
    interfaceName: 'CategoryGridBlock',
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'categories',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true,
            required: true,
        },
    ],
    labels: {
        plural: 'Category Grids',
        singular: 'Category Grid',
    },
}
