import type { Block } from 'payload'

export const BlogArchive: Block = {
    slug: 'blogArchive',
    interfaceName: 'BlogArchiveBlock',
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'limit',
            type: 'number',
            defaultValue: 3,
        },
        {
            name: 'selectedPosts',
            type: 'relationship',
            relationTo: 'posts',
            hasMany: true,
            admin: {
                condition: (_, siblingData) => !siblingData.populateBy || siblingData.populateBy === 'selection',
            },
        },
        {
            name: 'populateBy',
            type: 'select',
            defaultValue: 'collection',
            options: [
                {
                    label: 'Recent Posts',
                    value: 'collection',
                },
                {
                    label: 'Individual Selection',
                    value: 'selection',
                },
            ],
        },
    ],
    labels: {
        plural: 'Blog Archives',
        singular: 'Blog Archive',
    },
}
