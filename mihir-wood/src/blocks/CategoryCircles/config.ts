import type { Block } from 'payload'

export const CategoryCircles: Block = {
    slug: 'categoryCircles',
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'Product Categories',
            label: 'Section Title',
        },
        {
            name: 'selectedCategories',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true,
            label: 'Categories To Display',
        },
    ],
    interfaceName: 'CategoryCirclesBlock',
    labels: {
        plural: 'Category Circles Sections',
        singular: 'Category Circles Section',
    },
}
