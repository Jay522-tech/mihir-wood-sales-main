import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const BulkOrderStats: Block = {
    slug: 'bulkOrderStats',
    fields: [
        {
            name: 'mainTitle',
            type: 'text',
            label: 'Top Main Title (Centered)',
            defaultValue: 'Why Choose Mihir Wood',
        },
        {
            name: 'mainSubtitle',
            type: 'text',
            label: 'Top Main Subtitle (Centered)',
            defaultValue: 'For Your Interior Design Needs',
        },
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'Your Trusted Partner for Bulk Orders',
        },
        {
            name: 'subtitle',
            type: 'text',
            required: true,
            defaultValue: 'From concept to delivery, we ensure interiors that impress and last.',
        },
        {
            name: 'stats',
            type: 'array',
            minRows: 1,
            maxRows: 6,
            fields: [
                {
                    name: 'icon',
                    type: 'select',
                    options: [
                        { label: 'Users', value: 'users' },
                        { label: 'Truck', value: 'truck' },
                        { label: 'Shield', value: 'shield' },
                        { label: 'Design Tool', value: 'pen-tool' },
                        { label: 'Factory', value: 'factory' },
                        { label: 'Ruler', value: 'ruler' },
                    ],
                    required: true,
                },
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
            ],
        },
        linkGroup({
            overrides: {
                maxRows: 1,
            },
        }),
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ],
    interfaceName: 'BulkOrderStatsBlock',
}
