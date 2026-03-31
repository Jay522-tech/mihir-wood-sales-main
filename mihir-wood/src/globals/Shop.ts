import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'

export const Shop: GlobalConfig = {
    slug: 'shop',
    access: {
        read: () => true,
        update: adminOnly,
    },
    admin: {
        group: 'Content',
    },
    fields: [
        {
            name: 'banner',
            type: 'group',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    defaultValue: 'Mihir Collection',
                },
                {
                    name: 'subtitle',
                    type: 'text',
                    defaultValue: 'Curated Luxury Furniture',
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                },
            ],
        },
    ],
}
