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
            ],
        },
    ],
    interfaceName: 'TrustStatsBlock',
    labels: {
        plural: 'Trust Stats Sections',
        singular: 'Trust Stats Section',
    },
}
