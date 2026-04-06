import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const OneStopShop: Block = {
    slug: 'oneStopShop',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'One-Stop Shop For All Things',
        },
        {
            name: 'subtitle',
            type: 'text',
            defaultValue: 'From expert design to flawless installation – everything under one roof',
        },
        {
            name: 'categories',
            type: 'array',
            minRows: 1,
            maxRows: 3,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'items',
                    type: 'array',
                    fields: [
                        {
                            name: 'item',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
            ],
        },
        linkGroup({
            overrides: {
                maxRows: 1,
            },
        }),
    ],
    interfaceName: 'OneStopShopBlock',
}
