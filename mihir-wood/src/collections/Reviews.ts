import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
    slug: 'reviews',
    access: {
        create: () => true, // Allow anyone to submit a review (or adjust to authenticated)
        read: adminOrPublishedStatus,
        update: adminOnly,
        delete: adminOnly,
    },
    admin: {
        useAsTitle: 'customerName',
        defaultColumns: ['customerName', 'location', 'rating', 'updatedAt'],
        group: 'Content',
    },
    fields: [
        {
            name: 'product',
            type: 'relationship',
            relationTo: 'products',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'customerName',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'location',
                    type: 'text',
                    label: 'Customer Location',
                    admin: {
                        placeholder: 'e.g. Mumbai, India',
                    },
                },
            ],
        },
        {
            name: 'rating',
            type: 'number',
            min: 1,
            max: 5,
            required: true,
            admin: {
                step: 1,
                placeholder: 'Rate from 1 to 5',
            },
        },
        {
            name: 'content',
            type: 'textarea',
            required: true,
        },
        {
            name: 'images',
            type: 'upload',
            relationTo: 'media',
            hasMany: true,
        },
        {
            name: 'video',
            type: 'upload',
            relationTo: 'media',
        },
    ],
    versions: {
        drafts: true,
    },
}
