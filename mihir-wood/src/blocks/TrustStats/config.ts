import type { Block } from 'payload'

export const TrustStats: Block = {
    slug: 'trustStats',
    fields: [
        {
            name: 'stats',
            type: 'array',
            label: 'Statistics',
            minRows: 1,
            maxRows: 4,
            fields: [
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                    label: 'Value (e.g. 10k+)',
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Label (e.g. Happy Families)',
                },
                {
                    name: 'icon',
                    type: 'select',
                    label: 'Icon',
                    options: [
                        { label: 'Users', value: 'users' },
                        { label: 'Home', value: 'home' },
                        { label: 'Award', value: 'award' },
                        { label: 'Clock', value: 'clock' },
                        { label: 'Check', value: 'check' },
                    ],
                }
            ],
        },
    ],
    interfaceName: 'TrustStatsBlock',
    labels: {
        plural: 'Trust Stats Sections',
        singular: 'Trust Stats Section',
    },
}
