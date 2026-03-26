import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'

export const Stores: CollectionConfig = {
    slug: 'stores',
    access: {
        create: adminOnly,
        read: adminOrPublishedStatus,
        update: adminOnly,
        delete: adminOnly,
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'updatedAt'],
        group: 'Content',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'address',
            type: 'textarea',
            required: true,
        },
        {
            name: 'phone',
            type: 'text',
        },
        {
            name: 'email',
            type: 'text',
        },
        {
            name: 'location',
            type: 'group',
            fields: [
                {
                    name: 'latitude',
                    type: 'number',
                },
                {
                    name: 'longitude',
                    type: 'number',
                },
            ],
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },
    ],
}
