import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
    slug: 'inquiries',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'phoneNumber', 'createdAt'],
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'phoneNumber',
            type: 'text',
            required: true,
        },
        {
            name: 'requirements',
            type: 'textarea',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'new',
            options: [
                {
                    label: 'New',
                    value: 'new',
                },
                {
                    label: 'Contacted',
                    value: 'contacted',
                },
                {
                    label: 'Closed',
                    value: 'closed',
                },
            ],
        },
    ],
}
