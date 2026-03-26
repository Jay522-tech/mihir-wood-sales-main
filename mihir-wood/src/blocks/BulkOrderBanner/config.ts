import { linkGroup } from '@/fields/linkGroup'
import type { Block } from 'payload'

export const BulkOrderBanner: Block = {
    slug: 'bulkOrderBanner',
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'LANY\'S OFFRES GET DRY BULK ON CUSTOM BANNER',
            label: 'Banner Title',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Background Image',
        },
        linkGroup({
            overrides: {
                maxRows: 1,
            }
        }),
    ],
    interfaceName: 'BulkOrderBannerBlock',
    labels: {
        plural: 'Bulk Order Banners',
        singular: 'Bulk Order Banner',
    },
}
