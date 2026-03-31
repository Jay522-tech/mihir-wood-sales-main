import { linkGroup } from '@/fields/linkGroup'
import type { Block } from 'payload'

export const BulkOrderBanner: Block = {
    slug: 'bulkOrderBanner',
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'TRANSFORM YOUR SPACE',
            label: 'Banner Title (White Text)',
        },
        {
            name: 'highlightText',
            type: 'text',
            defaultValue: 'AT SCALE',
            label: 'Highlighted Text (Gold Text)',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Background Image',
            required: true,
        },
        linkGroup(),
    ],
    interfaceName: 'BulkOrderBannerBlock',
    labels: {
        plural: 'Bulk Order Banners',
        singular: 'Bulk Order Banner',
    },
}
