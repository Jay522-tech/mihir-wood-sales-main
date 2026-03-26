import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import { slugField } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
    access: {
        create: adminOnly,
        read: adminOrPublishedStatus,
        update: adminOnly,
        delete: adminOnly,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'updatedAt'],
        group: 'Content',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'excerpt',
            type: 'textarea',
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        slugField(),
    ],
}
